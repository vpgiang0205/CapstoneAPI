import Api from '../services/api.js';
import Product from '../model/Product.js';
import CartItem from '../model/CartItem.js';
const api = new Api();
// GetEle:
const getEle = (id) => document.getElementById(id)

// RenderUI of the page
function renderUI(data) {
    let content = "";
    if (data && data.length > 0) {
        data.forEach((product) => {
            let truncatedDesc = product.desc.length > 100 ? product.desc.slice(0, 50) + "..." : product.desc;
            content +=
                `
                        <div class="col-lg-3 col-md-6 my-3">
                            <div class="card text-black h-100">
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
                                        <button type="button" class=""  onclick="btnAddToCart(${product.id})" >Add to Cart</button>
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

// Render Product:
function renderProduct() {
    api.callApi("product", "GET", null)
        .then((rs) => {
            // run renderUI
            renderUI(rs.data)
        })
        .catch((error) => {
            console.log(error)
        })
};
renderProduct()


// Clear
function clearBtn() {
    localStorage.removeItem("cart");
    renderCartItem(cart.arr)
}

// Sort
getEle('selectType').addEventListener("change", async () => {
    const value = getEle('selectType').value

    let result = await api.callApi("product", "GET", null)
    if (result.status == 200 && result.statusText === "OK") { // success
        let mangTimKiem = [];
        mangTimKiem = result.data.filter((product) => product.type === value)
        renderUI(mangTimKiem)
    }
})


// LocalStorage
function setLocalStorage() {
    //convert Json => String
    var dataString = JSON.stringify(cart.arr);
    //set localStorage
    localStorage.setItem("cart", dataString);
}

function getLocalStorage() {
    //check condition
    if (localStorage.getItem("cart")) {
        var dataString = localStorage.getItem("cart");
        //convert String => Json
        cart.arr = JSON.parse(dataString);
        renderCartItem(cart)
    }
}
getLocalStorage();


// Cart 
let cart = [];

window.btnAddToCart = async (value) => {
    const phoneData = await api.callApi(`product/${value}`, 'GET', null);
    const { id, name, price, screen, backCamera, frontCamera, img, desc, type } = phoneData.data;
    const product = new Product(id, name, price, img, screen, backCamera, frontCamera, desc, type);

    const newCartItem = new CartItem(product, 1);

    let cartItem = findItemById(cart, newCartItem.product.id);

    if (cartItem.length === 0) {
        cart.push(newCartItem);
        console.log('Thêm sản phẩm vào giỏ hàng thành công!');
    } else {
        cartItem.quantity++
        console.log('Số lượng sản phẩm đã được cập nhật!');
    }

};

function findItemById(cart, id) {
    return cart.filter((item) => item.product.id === id);
}

// Render cart and other functions...
function renderCartItem(cart) {
    console.log(cart)
    // const cartItemHTML = `
    //     <div class="cart-item">
    //         <div class="item-name">${cart.product.name}</div>
    //         <div class="item-quantity">${cart.quantity}</div>
    //         <div class="item-price">${cart.price}</div>
    //     </div>
    // `;
    // getEle('cartContent').innerHTML += cartItemHTML
    // return cartItemHTML;
}
// Export necessary functions if needed