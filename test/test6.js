// [1,2] [2,1]
// 全排列
// 获取数组的所有排列方式
// in: [1, 2, 3] out: [ [ 1, 2, 3 ], [ 1, 3, 2 ], [ 2, 1, 3 ], [ 2, 3, 1 ], [ 3, 1, 2 ], [ 3, 2, 1 ] ]
// in: [1, 1, 3] out: [ [ 1, 1, 3 ], [ 1, 3, 1 ], [ 3, 1, 1 ] ]
const allSort = (arr) => {
  if (arr.length === 2) {
    if (arr[0] === arr[1]) return [arr];
    return [arr, [arr[1], arr[0]]]
  } else {
    const result = [];
    arr.forEach((item, i) => {
      const tempArr = [...arr]
      tempArr.splice(i, 1)
      allSort(tempArr).forEach(subArr => {
        result.push([item, ...subArr])
      })
    })
    // 去重
    const newResult = [];
    result.forEach(item => {
      if (!newResult.find(a => {
        for (let i = 0; i < a.length; i++) {
          if (a[i] !== item[i]) return false;
        }
        return true;
      })) {
        newResult.push(item)
      }
    })
    return newResult;
  }
}

console.log(allSort([1, 2, 3]));

console.log(allSort([1, 1, 3]));
