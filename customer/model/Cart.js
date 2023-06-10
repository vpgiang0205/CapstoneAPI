function Cart() {
    this.arr = [];

    this.addToCart = function (cartItem) {
        this.arr.push(cartItem);
    };
}
