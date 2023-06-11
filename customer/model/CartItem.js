
export default class CartItem {
    constructor(product, quantity) {
        this.product = product,
            this.quantity = quantity;
    }
    Plus(quantity){
        return this.quantity += quantity
    }
}