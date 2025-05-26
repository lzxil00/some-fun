// 一个数组：数组长度30，元素：1-100整数，从小到大排序，
// 已知50，若不在数组中，返回-1，若在，找到第一次出现的下标

// 构造数组
const arr = [];
for (let i = 0; i < 30; i++) {
  arr[i] = i;
}
arr.sort((a, b) => a > b ? 1 : -1);
console.log(arr);


const findIndex = (array, value, distance = [0, array.length]) => {
  if (distance[0] === distance[1] || array[distance[0]] !== value || array[distance[1]] !== value) return -1;
  const index = Math.floor((distance[1] - distance[0]) / 2 + distance[0])
  const middle = array[index];
  if (middle === value) { // 找到，返回下标
    return index;
  } else if (middle < value) { // 在后一半，递归查找
    return findIndex(array, value, [index, distance[1]])
  } else if (middle > value) { // 在前一半，递归查找
    return findIndex(array, value, [distance[0], index])
  }
}

console.log(findIndex(arr, 50))
