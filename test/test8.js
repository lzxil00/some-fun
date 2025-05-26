// shopee
// this 指向问题
var length = 10;
var fn = function () {
  console.log(this.length)
}

var a = {
  length: 5,
  method: function (fn) {
    fn();
    arguments[0]();
  }
}

a.method(fn, 1);
