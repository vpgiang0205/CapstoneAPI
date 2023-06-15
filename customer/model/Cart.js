export default class Cart {
    constructor (data){
        this.arr = [];
    }
    addItem(data){
        this.arr.push(data)
    }

    findItemById = (id,cartArr) => {
        return cartArr = cartArr.filter((item) => item.product.id == id);
        
    };

    findOtherItemById = (id, cartArr) => {
        return cartArr = cartArr.filter((item) => item.product.id != id);
    };
}