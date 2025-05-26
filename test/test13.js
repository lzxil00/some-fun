const map = (rect) => {
  const n = rect.length; // 边长
  if (n === 1) {
    console.log(rect[0][0]);
    return;
  }
  if (n === 0) {
    return;
  }

  // 遍历top边
  rect[0].forEach(item => {
    console.log(item);
  })
  // 遍历right边
  for (let i = 1; i < n; i++) {
    console.log(rect[i][n - 1])
  }
  // 遍历bottom边
  for (let i = n - 2; i >= 0; i--) {
    console.log(rect[n - 1][i]);
  }
  // 遍历left边
  for (let i = n - 2; i > 0; i--) {
    console.log(rect[i][0])
  }
  // 生成下一次递归rect
  const nextRect = rect.slice(1, n - 1).map(arr => arr.slice(1, n - 1))
  map(nextRect);
}

const rect = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]

map(rect)
// 1,2,3,6,9,8,7,4,5,
/**
 *
 n=1 c=1*1+0
 n=2 c=2*2 + (2-2) = 2*2 + 0
 n=3 c=3*3 + (3-2) = 3*3 + 1
 n=4 c=4*4 + (4-2) + (2-2) = 4*4 + 2
 n=5 c=5*5 + (5-2) + (3-2) = 5*5 + 3 + 1
 n=6 c=6*6 + (6-2) + (4-2) + (2-2) = 6*6 + 4 + 2
 n=7 c=7*7 + (7-2) + (5-2) + (3-2) = 7*7 + 5 + 3 + 1
 n=n c=n*n + (n-1)*(n-1)/4
 * @type {number}
 */
