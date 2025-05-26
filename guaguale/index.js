const get50List = () => {
  const list = [];
  for (let i = 1; i < 51; i++) {
    list.push(i);
  }
  return list;
}
const getIndex = (len) => {
  let num = Math.floor(len * Math.random());
  if (num === len) {
    return getIndex();
  } else {
    return num;
  }
}
const getList = (len) => {
  const returnList = [];
  const list = get50List();
  for (let i = 0; i < len; i++) {
    returnList.push(list.splice(getIndex(50 - i), 1)[0])
  }
  return returnList;
}


const getResult = () => {
  let a = getList(5);
  let b = getList(20);
  return b.some(n => a.includes(n));
}

let successCount = 0
const all = 100000;
for (let i = 0; i < all; i++) {
  if (getResult()) successCount++
}
console.log((successCount / all).toFixed(2))
