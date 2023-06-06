
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
        
        <button class = "btn btn-dark" value ="${product.id}">Delete</button>
        </td>
        </tr>
        `

        getEle('adminProductTbl').innerHTML = contentHTML
    }
}

// Run the function:
fetchData().then(() => {
    renderProduct();
})