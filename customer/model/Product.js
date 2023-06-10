class Product {
    constructor(id, name, price, img, screen, blackCamera, frontCamera, desc, type) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.img = img;
        this.screen = screen;
        this.blackCamera = blackCamera;
        this.frontCamera = frontCamera;
        this.desc = desc;
        this.type = type;
    }
    // Các phương thức khác
    getProductById(id){
        const api = new Api();
        api.callApi(id , 'GET', null)
        .then ((response) =>{
            console.log(response.data)
        })
        .catch ((error) => { console.log(error) })
    }
}

export default Product;
