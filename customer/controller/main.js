import Api from '../services/api.js';
const api = new Api();

// GetEle:
function getEle(id) {
    return document.getElementById(id)
}

// Render:
const renderProduct = (data) => {
    api.callApi("product", "GET", null)
        .then((rs) => {
            let data = rs.data;
            let contentHTML = "";
            if (data && data.length > 0) {
                data.forEach((product) => {
                    let truncatedDesc = product.desc.length > 100 ? product.desc.slice(0, 50) + "..." : product.desc;
                    contentHTML +=
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
                                        <button id="" class="" onclick="btnAddToCart(${product.id})" value="${product.id}" >Add to Cart</button>
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
            }
            getEle("customerProductList").innerHTML = contentHTML;
        })
        .catch((error) => {
            console.log(error)
        })
};
renderProduct();
// sort
getEle('selectType').onchange = function (value) {
    console.log(value)
    sortKind(value)
}
function sortKind(kind) {

    api.callApi("product", "GET", null)
        .then((response) => {
            var productArr = response.data;
            var contentHTML = "";
            for (var i = 0; i < productArr.length; i++) {
                var product = productArr[i];
                if (product.type === kind && kind !== "Type") {
                    var truncatedDesc = product.desc.length > 100 ? product.desc.slice(0, 50) + "..." : product.desc;
                    contentHTML +=
                        `
                            <div class="col-lg-3 col-md-6 my-3">
                                <div class="card text-black h-100">
                                    <div class="card__Overlay">
                                        <div class="card__OverlayHeader">${product.name}</div>
                                            <div class="card__OverlayBody">
                                                <p>Screen: ${product.screen}</p>
                                                <p>Back Camera: ${product.blackCamera}</p>
                                                <p>Front Camera: ${product.frontCamera}</p>
                                                <br>
                                                <a href="">Click here for more details</a>
                                            </div>

                                            <div class = "card__OverlayFooter"><button id="" class="" value="${product.id}" >Add to Cart</button></div>
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
                }
            }
            getEle("customerProductList").innerHTML = contentHTML;
        })
        .catch((error) => {
            console.log(error)
        })
}
// // Cart
// var cartArr = [];

// function getItem(id) {
//     return axios
//         .get(`https://64832aa2f2e76ae1b95c0f17.mockapi.io/product/${id}`)
//         .then((response) => {
//             var itemdata = response.data;

//             // data to Model CartItem
//             let cartItem = new CartItem(
//                 itemdata.id,
//                 itemdata.name,
//                 itemdata.price,
//                 itemdata.img,
//                 itemdata.screen,
//                 itemdata.blackCamera,
//                 itemdata.frontCamera,
//                 itemdata.desc,
//                 itemdata.type,
//                 1
//             );
//             return cartItem;
//         })
//         .catch((error) => {
//             console.log(error);
//         });
// }

// function pushLocalStorageToArray(cartArr) {
//     var cartData = localStorage.getItem("cart");
//     if (cartData) {
//         var parsedData = JSON.parse(cartData);
//         cartArr.push(...parsedData);
//     }
// }
// // Add to cart
// function addToCart(id) {
//     getItem(id)
//         .then((cartItem) => {
//             if (cartItem.id != cartArr.cartItem.id) {
//                 var content = `
//             <p>${cartItem.name}</p>
//             <p>Price: ${cartItem.price}</p>
//             <p>Quantity: ${cartItem.quantity}</p>
//             <button class="remove-item" onclick="removeCartItem()">Remove</button>
//             `;



//                 cartArr.push(cartItem);
//                 getEle('cartContent').innerHTML += content;


//                 cart.addToCart(cartItem); // Add item to the cart
//                 setLocalStorage();
//             }
//         })
//         .catch((error) => {
//             console.log(error);
//         });
// }


// // Show cart items
// function renderCartItem(cartData) {

//     // Generate HTML content based on the cart data
//     var content = "";
//     if (cartData) {
//         getEle("cartCount").innerHTML = cartArr.length;
//         for (var i = 0; i < cartData.length; i++) {
//             var item = cartData[i]
//             content += `
//             <div>
//               <p>${item.name}</p>
//               <p>Price: ${item.price}</p>
//               <p>Quantity: ${item.quantity}</p>
//               <button class="remove-item" onclick="removeCartItem()">Remove</button>
//             </div>
//           `;
//         };
//     } else {
//         content = "<p>No items in the cart.</p>";
//     }

//     // Update the inner HTML of the cartContent element
//     document.getElementById("cartContent").innerHTML = content;
// }

// // Run this function to render the table:
// renderProduct();
// renderCartItem();



// // LocalStorage
// function setLocalStorage() {
//     //convert Json => String
//     var dataString = JSON.stringify(cart.arr);
//     //set localStorage
//     localStorage.setItem("cart", dataString);
// }

// function getLocalStorage() {
//     //check condition
//     if (localStorage.getItem("cart")) {
//         var dataString = localStorage.getItem("cart");
//         //convert String => Json
//         cart.arr = JSON.parse(dataString);
//         renderCartItem(cart.arr)
//     }
// }

// getLocalStorage();

// // Clear
// function clearBtn() {
//     localStorage.removeItem("cart");
//     renderCartItem(cart.arr)
// }
