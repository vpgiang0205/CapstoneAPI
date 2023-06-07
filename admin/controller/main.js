
var productArr = []

// GetEle:
function getEle(id) {
    return document.getElementById(id)
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
    axios.post('https://64709e4f3de51400f724a111.mockapi.io/product', {
        name: productData.name,
        price: productData.price,
        screen: productData.screen,
        blackCamera: productData.blackCamera,
        frontCamera: productData.frontCamera,
        img: productData.img,
        desc: productData.desc,
        type: productData.type
    })
        .then((response) => {
            console.log(response);
            alert("Added New Product!")
            renderProduct();
        })
        .catch((error) => {
            console.log(error);
        });
}


// Delete
function productDelete(id) {
    console.log(id)
    axios.delete(`https://64709e4f3de51400f724a111.mockapi.io/product/${id}`)
        .then((response) => {
            alert(`deleted product with id: ` + id)
            renderProduct();
        })
        .catch((error) => {
            console.log(error);
        });
}


// Render: 
var renderProduct = () => {
    axios.get('https://64709e4f3de51400f724a111.mockapi.io/product')
        .then((response) => {
            productArr = response.data;


            var contentHTML = "";
            for (var i = 0; i < productArr.length; i++) {
                var product = productArr[i];
                var stt = 1;
                contentHTML +=
                    `<tr>
        <td>${stt++}</td>
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>${product.img}</td>
        <td>${product.desc}</td>
        <td>
        <button class = "btn btn-danger" data-toggle="modal" data-target="#modelId" value ="${product.id}">Edit</button>
        
        <button class = "btn btn-dark" value ="" onclick="productDelete(${product.id})">Delete</button>
        </td>
        </tr>
        `

                getEle('adminProductTbl').innerHTML = contentHTML
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

// Run this function to render the table:
renderProduct();
