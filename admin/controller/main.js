
var productArr = []
function fetchData() {
    return axios.get('https://64709e4f3de51400f724a111.mockapi.io/product')
        .then((response) => {
            productArr = response.data;
        })
        .catch((error) => {
            console.log(error);
        });
}

// GetEle:
function getEle(id) {
    return document.getElementById(id)
}

// Add
function productAdd() {
    var name = getEle('name').value;
    var price = getEle('price').value;
    var screen = getEle('screen').value;
    var blackCamera = getEle('blackCamera').value;
    var frontCamera = getEle('frontCamera').value;
    var img = getEle('img').value;
    var desc = getEle('desc').value;
    var type = getEle('type').value;


    var product = {
        name,
        price,
        screen,
        blackCamera,
        frontCamera,
        img,
        desc,
        type,
    }

    axios.post('https://64709e4f3de51400f724a111.mockapi.io/product')
        .then((response) => {
            console.log(response);
            console.log("added")
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
            fetchData().then(() => {
                renderProduct();
            })
        })
        .catch((error) => {
            console.log(error);
        });
}


// Render: 
var renderProduct = () => {
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
}

// Run this function to rerender the table:
fetchData().then(() => {
    renderProduct();
})