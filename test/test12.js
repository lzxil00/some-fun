// 腾讯-医药-1面
// 1 获取最多的子母和数字
const getMaxCharList = (str) => {
  if (typeof str !== 'string') throw new Error('请传入字符串');
  if (str.length === 0) throw new Error('字符串长度需大于0');
  // 用于存储数据 [char,count][] char为对应字符，count为出现次数
  const storeList = [];
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const map = storeList.find(item => item[0] === char);
    if (map) { // 已有，次数+1
      map[1] = map[1] + 1;
    } else { // 没有，新增，次数为1
      storeList.push([char, 1]);
    }
  }
  // 排序
  const sortList = storeList.sort((a, b) => a[1] < b[1] ? 1 : -1)
  // 获取最大值
  const max = sortList[0][1];
  // 找到与最大值相同的前几项，并转换输出
  return sortList.filter(([, count]) => count === max).map(([char]) => char);
}
console.log(getMaxCharList("abcdccbdb58575"));


// 2 闭包实现定时器输出1-500；
const runInterval = () => {
  let count = 1;
  const timer = setInterval(() => {
    if (count > 50) clearInterval(timer);
    else console.log(count++);
  }, 1000)
}
runInterval();


// 3 字符串格式化函数
const format = (str, obj) => {
  const reg = /{c*\}/;
  console.log(reg.exec(str))
}
console.log(format(
  '<div>I am {name}, my website is <a href="{website}">{website}</a>!</div>',
  {
    name: 'james',
    website: 'https://www.qq.com'
  }));


// 4 定义一个列表
class List {
  constructor() {
    this.store = [];
    for (let i = 0; i < arguments.length; i++) {
      this.store.push(arguments[i])
    }
    this.length = this.store.length;
  }

  add() {
    for (let i = 0; i < arguments.length; i++) {
      this.store.push(arguments[i])
    }
    this.length = this.store.length;
  }

  all() {
    return this.store;
  }
}

const ls = new List('A', 'B', 'C');
ls.add('D', 'E');
console.log(ls.length);
console.log(ls.all());

// 5 见html1


// 6 不会


// 7 排序
const sortArr = (arr) => {
  if (!Array.isArray(arr)) throw new Error('请传入数组');
  return arr.sort((a, b) => {
    if (a.age > b.age) {
      return 1;
    } else {
      if (a.age === b.age) {
        if (a.group < b.group) {
          return 1
        } else {
          return 0
        }
      }
      return -1;
    }
  })
}
const list = [
  {age: 12, group: 1},
  {age: 20, group: 3},
  {age: 12, group: 23},
]
console.log(sortArr(list))


// 8 见html2
