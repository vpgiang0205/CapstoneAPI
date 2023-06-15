function Validation() {
  this.isEmpty = (value, errorID, mess) => {
    if (value === "") {
      //false
      getEle(errorID).style.display = "block";
      getEle(errorID).innerHTML = mess;
      return false;
    }
    //true
    getEle(errorID).style.display = "none";
    getEle(errorID).innerHTML = "";
    return true;
  };
  this.isLong = function (value, errorID, mess) {
    if (min <= value.length && value.length <= max) {
      //true
      getEle(errorID).style.display = "none";
      getEle(errorID).innerHTML = "";
      return true;
    }
    //false
    getEle(errorID).style.display = "block";
    getEle(errorID).innerHTML = mess;
    return false;
  };
  this.isString = function (value, errorID, mess) {
    var letter =
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
      "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
      "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
    if (value.match(letter)) {
      //true
      getEle(errorID).style.display = "none";
      getEle(errorID).innerHTML = "";
      return true;
    }
    //false
    getEle(errorID).style.display = "block";
    getEle(errorID).innerHTML = mess;
    return false;
  };
  this.isType = function (value, errorID, mess){
    if (getEle(idSelect).selectedIndex !== 0) {
        //true
        getEle(errorID).style.display = "none";
        getEle(errorID).innerHTML = "";
        return true;
      }
      //false
      getEle(errorID).style.display = "block";
      getEle(errorID).innerHTML = mess;
      return false;
  }
  this.isID = function (value, errorID, mess, arr) {
    var exist = false;
    for (var i = 0; i < arr.length; i++) {
      var product = arr[i];
      if (product.id == value) {
        exist = true;
        break;
      }
    }
    if (exist) {
      //sai
      getEle(errorID).style.display = "block";
      getEle(errorID).innerHTML = mess;
      return false;
    }
    //đúng
    getEle(errorID).style.display = "none";
    getEle(errorID).innerHTML = "";
    return true;
  };
}
