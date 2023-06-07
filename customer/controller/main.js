// GetEle:
function getEle(id) {
    return document.getElementById(id)
}

// Render:
var renderProduct = () => {
    axios.get("https://64709e4f3de51400f724a111.mockapi.io/product")
        .then((response) => {
            var productArr = response.data;
            var contentHTML = "";
            for (var i = 0; i < productArr.length; i++) {
                var product = productArr[i];
                var truncatedDesc = product.desc.length > 100 ? product.desc.slice(0, 50) + "..." : product.desc;
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
                      <button id="" class="" >Add to Cart</button>
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
            }

            getEle("customerProductList").innerHTML = contentHTML;
        })
        .catch((error) => {
            console.log(error);
        });
};

// Run this function to render the table:
renderProduct();