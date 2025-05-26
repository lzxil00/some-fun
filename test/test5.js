// 防抖
const debounce = (func, wait = 0) => {
  if (typeof func !== 'function') {
    throw new TypeError('第一个参数应为函数');
  }
  let timer = null;
  return function () {
    const context = this;
    const args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(context, args);
      timer = null
    }, wait);
  }
}

// 节流
const throttle = function (func, delay) {
  if (typeof func !== 'function') {
    throw new TypeError('第一个参数应为函数');
  }
  let timer = null;
  return function () {
    const context = this;
    const args = arguments;
    if (!timer) {
      timer = setTimeout(() => {
        func.apply(context, args);
      }, delay)
      timer = null;
    }
  }
}

// test
let timer = setTimeout(() => {
  console.log(123);
}, 1000);
console.log(timer);
setTimeout(() => {
  console.log(234)
  console.log(timer)
}, 2000)
