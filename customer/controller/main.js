import Cart from '../model/Cart.js';
import CartItem from '../model/CartItem.js';
import Product from '../model/Product.js';
import Api from '../services/api.js';
const api = new Api();
const cart = new Cart();
// GetEle:
const getEle = (id) => document.getElementById(id)

// -----------------------------------------------------------------------------------------------------------------------
/** ProductPage: */

// Call API get Product:
function renderProduct() {
    api.callApi("product", "GET", null)
        .then((rs) => {
            // run renderUI of the page
            renderUI(rs.data)
        })
        .catch((error) => {
            console.log(error)
        })
};
renderProduct()


// RenderUI of the page
function renderUI(data) {
    let content = "";
    if (data && data.length > 0) {
        data.forEach((product) => {
            let truncatedDesc = product.desc.length > 100 ? product.desc.slice(0, 50) + "..." : product.desc;
            content +=
                `
                        <div class="col-lg-3 col-md-6 my-3">
                            <div class="card product text-black h-100">
                            <div class="card__Overlay">
                                        <div class="card__OverlayHeader">
                                        ${product.name}
                                        </div>
                                        <div class="card__OverlayBody">
                                            <p>Screen: ${product.screen}</p>
                                            <p>Back Camera: ${product.blackCamera}</p>
                                            <p>Front Camera: ${product.frontCamera}</p>
                                            <br>
                                            <a href="">Click here for more details</a>
                                        </div>
                                        <div class = "card__OverlayFooter">
                                        <button type="button" class="" id="btnAdd" onclick="btnAddToCart(${product.id})" >Add to Cart</button>
                                        </div>
                            </div>
                                <img src="${product.img}" class="" alt="${product.name}">
                                <div class="card-body">
                                <p>${product.type}</p>
                                <h5 class="card-title">${product.name}</h5>
                                <p class="card-text">${truncatedDesc}</p>
                                <p class="card-text">Price: ${product.price}</p>
                                </div>
                            </div>
                        </div>
                            `;
        })
        getEle("customerProductList").innerHTML = content;
    }
}

// Filter:
getEle('selectType').addEventListener("change", async () => {
    const type = getEle('selectType').value
    if (type.length == 0) {
        renderProduct()
    } else {
        let response = await api.callApi("product", "GET", null)
        if (response.status == 200 && response.statusText === "OK") { // success
            let FilterArr = [];
            FilterArr = response.data.filter((product) => product.type == type)
            console.log(FilterArr)
            if (FilterArr.length == 0 && type.length > 0) {
                console.log("rong")
            }
            renderUI(FilterArr)
        }
    }
})

// -----------------------------------------------------------------------------------------------------------------
/** CART */

// CartArr
let cartArr = [];

// CartBtn: Add
window.btnAddToCart = async (value) => {
    // Khi nhấn thêm, gọi API để lấy dữ liệu sản phẩm
    const phoneData = await api.callApi(`product/${value}`, 'GET', null);

    // Tạo các biến và gán giá trị từ dữ liệu lấy được
    const { id, name, price, screen, backCamera, frontCamera, img, desc, type } = phoneData.data;

    // Tạo đối tượng sản phẩm với các giá trị đã lấy được
    const product = new Product(id, name, price, img, screen, backCamera, frontCamera, desc, type);

    // Tạo đối tượng mới sẽ được thêm vào giỏ hàng với số lượng là 1
    const newCartItem = new CartItem(product, 1);

    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
    let cartItem = product.checkProductExist(cartArr, newCartItem.product.id);

    if (cartItem.length === 0) {
        // Nếu sản phẩm chưa tồn tại, thêm vào giỏ hàng
        cartArr.push(newCartItem);
        console.log('Thêm sản phẩm vào giỏ hàng thành công!');
    } else {
        // Chạy vòng lặp check các sản phẩm 
        for (let i = 0; i < cartItem.length; i++) {
            const item = cartItem[i];
            // Nếu id của item (sản phẩm) trong giỏ hàng có cùng id sản phẩm mới thêm vào thì
            if (item.product.id === newCartItem.product.id) {
                // Tăng số lượng của item đã có +1
                item.quantity++;
                console.log('Số lượng sản phẩm đã được cập nhật!');
                console.log(item.quantity);
                break; // Thoát khỏi vòng lặp sau khi tìm thấy sản phẩm
            }
        }
    }
    setLocalStorage();
    renderCartItem(cartArr);
};

// Cart:Render
function renderCartItem(cartArr) {
    const cartItemsHTML = cartArr
        .map(
            (cartItem, index) => {
                if (cartItem.quantity === 0) {
                    return ""; // Skip rendering for items with quantity 0
                }
                return `
          <div class="card mb-3 p-2 bg-secondary">
            <div id="cardItem" class="d-flex justify-content-between align-items-center">
              <span class="mx-2">${index + 1} </span><img width="100" src="${cartItem.product.img}">
              <div>
                <div class="px-2">${cartItem.product.name}</div>
                <div class="text-center mt-2">
                  <button onclick="decreaseQuantity(${cartItem.product.id})" class="btn-danger miniBtn">
                    <i class="fa-solid fa-minus"></i>
                  </button>
                  ${cartItem.quantity}
                  <button onclick="increaseQuantity(${cartItem.product.id})" class="btn-danger miniBtn">
                    <i class="fa-solid fa-plus"></i>
                  </button>
                </div>
              </div>
              <div class="text-center cardItemFooter">
                ${cartItem.product.price * cartItem.quantity}$
                <div>
                  <button onclick="deleteCartItem(${cartItem.product.id})" class="btn-danger mt-2 p-2">
                    remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        `;
            }
        )
        .join("");
    const cartBillTotal = cartArr.reduce(
        (sum, cartItem) => sum + cartItem.product.price * cartItem.quantity,
        0
    );

    count(cartArr); // Pass the cartArr to the count function
    getEle("cartContent").innerHTML = cartItemsHTML;
    getEle("cartBillTotal").innerText = cartBillTotal + "$";
}

// CartBtn: Delete Item
window.deleteCartItem = (id) => {
    cartArr = cart.findOtherItemById(id, cartArr);
    console.log("Deleted cart item:", id);

    count();
    renderCartItem(cartArr);
    setLocalStorage();
}

// CartBtn: decrease
window.decreaseQuantity = (id) => {
    const filteredItems = cart.findItemById(id, cartArr);
    const cartItem = filteredItems[0];

    if (cartItem) {
        cartItem.quantity--; // Decrease the quantity by 1

        if (cartItem.quantity === 0) {
            // Remove the item from the cart
            cartArr = cart.findOtherItemById(id, cartArr);
            console.log("Deleted cart item:", id);

            // Remove item from local storage
            cartArr = cartArr.filter((item) => item.product.id !== id);
            console.log("Removed item:", cartItem.product.name);
            setLocalStorage(); // Update local storage with modified cartArr
        }

        console.log("Updated quantity:", cartItem.quantity);
        renderCartItem(cartArr);
        setLocalStorage(); // Update local storage with modified cartArr
        count(); // Update the cart count in the UI
    }
};

// CartBtn: increase
window.increaseQuantity = (id) => {
    const filteredItems = cart.findItemById(id, cartArr);
    const cartItem = filteredItems[0];

    if (cartItem) {
        cartItem.quantity++; // Increase the quantity by 1

        if (cartItem.quantity === 0) {
            // Remove the item from the cart
            cartArr = cartArr.filter((item) => item.product.id !== id);
            console.log("Increase item:", cartItem.product.name);
            setLocalStorage();
        }
        console.log("Updated quantity:", cartItem.quantity);
        renderCartItem(cartArr);
        setLocalStorage(); // Update local storage with modified cartArr
        count(); // Update the cart count in the UI
    }
};

// LocalStorage
function setLocalStorage() {
    var dataString = JSON.stringify(cartArr);
    localStorage.setItem("cart", dataString);
}

function getLocalStorage() {
    if (localStorage.getItem("cart")) {
        var dataString = localStorage.getItem("cart");
        cartArr = JSON.parse(dataString);
        renderCartItem(cartArr);
    }
}

// CartBtn: clear
window.clearLocalStorage = clearLocalStorage;
function clearLocalStorage() {
    localStorage.removeItem("cart");
    cartArr = [];
    count()
    renderCartItem(cartArr);
}

// Count:
function count() {
    var cartCount = cartArr.length;
    getEle('cartCount').innerText = cartCount;
    getEle('cartCountItem').innerText = cartCount;


    const totalQuantity = cartArr.reduce((sum, cartItem) => sum + cartItem.quantity, 0);

    getEle('cartCount').innerText = cartCount;
    getEle('cartBillSubTotal').innerText = totalQuantity;
}

// Run count product in cart: 
count();

// Get localstorage item:
getLocalStorage();


