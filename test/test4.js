// 找到数组中出现最多的数字

// const arr = [1, 2, 3, 4, 5, 1, 3, 3, 1, 2, 3, 56, 12]
//
// const findCountMax = (arr) => {
//   const store = {};
//   arr.forEach(item => {
//     if (typeof store[item] === 'undefined') {
//       store[item] = 1;
//     } else {
//       store[item] = store[item] + 1;
//     }
//   });
//   const sortArr = Object.entries(store).sort((a, b) => b[1] - a[1] > 0 ? 1 : -1);
//   return Number(sortArr[0][0])
// }
// console.log(findCountMax(arr));

// 数组转树
const arr = [
  {id: 2, name: '部门B', parentId: 0},
  {id: 3, name: '部门C', parentId: 1},
  {id: 1, name: '部门A', parentId: 2},
  {id: 4, name: '部门D', parentId: 1},
  {id: 5, name: '部门E', parentId: 2},
  {id: 6, name: '部门F', parentId: 3},
  {id: 7, name: '部门G', parentId: 2},
  {id: 8, name: '部门H', parentId: 4}
]

const arrToTree = arr => {
const root = {id: 0, name: 'root'};
  const tempArr = [...arr,root];
  tempArr.forEach(item=>{
    const parent = tempArr.find(o=>o.id=== item.parentId);
    if(parent){
      if(parent.children) parent.children.push(item);
      else parent.children = [item];
    }
  })
  return root;
}

const result = arrToTree(arr);

console.log(result);
