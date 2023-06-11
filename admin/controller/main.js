var productArr = [];

// GetEle:
function getEle(id) {
    return document.getElementById(id);
}

// Get user input
function getUserInput() {
    var name = getEle('name').value;
    var price = getEle('price').value;
    var screen = getEle('screen').value;
    var blackCamera = getEle('blackCamera').value;
    var frontCamera = getEle('frontCamera').value;
    var img = getEle('img').value;
    var desc = getEle('desc').value;
    var type = getEle('type').value;

    var productData = { name, price, screen, blackCamera, frontCamera, img, desc, type };

    return productData;
}

// Add
function productAdd() {
    var productData = getUserInput();
    axios
        .post('https://64832aa2f2e76ae1b95c0f17.mockapi.io/product', {
            name: productData.name,
            price: productData.price,
            screen: productData.screen,
            blackCamera: productData.blackCamera,
            frontCamera: productData.frontCamera,
            img: productData.img,
            desc: productData.desc,
            type: productData.type,
        })
        .then((response) => {
            console.log(response);
            alert('Added New Product!');
            renderProduct();
        })
        .catch((error) => {
            console.log(error);
        });
}

// Delete
function productDelete(id) {
    console.log(id);
    axios
        .delete(`https://64832aa2f2e76ae1b95c0f17.mockapi.io/product/${id}`)
        .then((response) => {
            alert('Deleted product with id: ' + id);
            renderProduct();
        })
        .catch((error) => {
            console.log(error);
        });
}

// Render:
var renderProduct = (price) => {
    axios
        .get('https://64832aa2f2e76ae1b95c0f17.mockapi.io/product')
        .then((response) => {
            productArr = response.data;
            var contentHTML = '';
            for (var i = 0; i < productArr.length; i++) {
                var product = productArr[i];
                var stt = 1;
                contentHTML += `<tr>
          <td>${stt++}</td>
          <td>${product.id}</td>
          <td>${product.name}</td>
          <td>${product.price}</td>
          <td> <img src=${product.img}></td>
          <td>${product.desc}</td>
          <td>
            <button class="btn btn-danger" data-toggle="modal" data-target="#modelId" value="${product.id}">Edit</button>
            <button class="btn btn-dark" value="" onclick="productDelete(${product.id})">Delete</button>
          </td>
        </tr>`;
            }

            getEle('adminProductTbl').innerHTML = contentHTML;
        })
        .catch((error) => {
            console.log(error);
        });
};

function search() {
    var nameSearch = getEle('searchInput').value;
    axios
        .get(`https://64832aa2f2e76ae1b95c0f17.mockapi.io/product?name=${nameSearch}`)
        .then((response) => {
            if (response.status === 200) {
                // Check if the response is valid (status code 200)
                productArr = response.data;
                var contentHTML = '';
                var stt = 1;

                for (var i = 0; i < productArr.length; i++) {
                    var product = productArr[i];

                    contentHTML += `<tr>
            <td>${stt++}</td>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td><img src="${product.img}"></td>
            <td>${product.desc}</td>
            <td>
              <button class="btn btn-danger" data-toggle="modal" data-target="#modelId" value="${product.id}">Edit</button>
              <button class="btn btn-dark" value="" onclick="productDelete(${product.id})">Delete</button>
            </td>
          </tr>`;
                }

                getEle('adminProductTbl').innerHTML = contentHTML;
            } else {
                console.log('Invalid response'); // Handle the case of an invalid response
            }
        })
        .catch((error) => {
            console.log(error);
        });
}
// Price: Descending
var sortDescending = () => {
    axios
        .get('https://64832aa2f2e76ae1b95c0f17.mockapi.io/product')
        .then((response) => {
            productArr = response.data;
            productArr.sort((a, b) => b.price - a.price);

            renderSortedProducts();
        })
        .catch((error) => {
            console.log(error);
        });
};
function toggleSortButtons() {
    var sortButtons = document.getElementById("sortButtons");
    sortButtons.classList.toggle("d-none");
}

// Price: Ascending
var sortAscending = () => {
    axios
        .get('https://64832aa2f2e76ae1b95c0f17.mockapi.io/product')
        .then((response) => {
            productArr = response.data;
            productArr.sort((a, b) => a.price - b.price);

            renderSortedProducts();
        })
        .catch((error) => {
            console.log(error);
        });
};


// Hàm render danh sách sản phẩm đã được sắp xếp
var renderSortedProducts = () => {
    var contentHTML = '';
    for (var i = 0; i < productArr.length; i++) {
        var product = productArr[i];
        var stt = 1;
        contentHTML += `<tr>
            <td>${stt++}</td>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td> <img src=${product.img}></td>
            <td>${product.desc}</td>
            <td>
                <button class="btn btn-danger" data-toggle="modal" data-target="#modelId" value="${product.id}">Edit</button>
                <button class="btn btn-dark" value="" onclick="productDelete(${product.id})">Delete</button>
            </td>
        </tr>`;
    }

    getEle('adminProductTbl').innerHTML = contentHTML;
};
// Run this function to render the table:
renderProduct();
