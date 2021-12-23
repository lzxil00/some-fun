// 回形顺时针遍历矩阵法
// 顺时针遍历
function clockwise(arr = []) {
  let result = [];
  if (!Array.isArray(arr) || arr.length === 0) {
    return result;
  }
// 确定需要遍历几圈
  let [row, col, len] = getRowCol(arr);
  for (let i = 0; i < len; i++) {
// 确定四个边界的坐标
    let [leftUp, rightUp, leftDown, rightDown] = getVertex(i, row, col);
// 按题目要求方向遍历四条边,本题顺时针  leftUp -> rightUp
    for (let j = leftUp[1]; j < rightUp[1]; j++) {
      result.push(arr[leftUp[0]][j]);
    }
// rightUp -> rightDown 注意顶点不要重复算进去
    for (let j = rightUp[0]; j < rightDown[0]; j++) {
      result.push(arr[j][rightUp[1]]);
    }
// rightDown -> leftDown 注意顶点不要重复算进去
    for (let j = rightDown[1]; j > leftDown[1]; j--) {
      result.push(arr[rightDown[0]][j]);
    }
// leftDown -> leftUp 注意顶点不要重复算进去
    for (let j = rightDown[0]; j > leftUp[0]; j--) {
      result.push(arr[j][leftUp[1]]);
    }
  }
  return result;
}

// 逆时针遍历
function anticlockwise(arr = []) {
  let result = [];
  if (!Array.isArray(arr) || arr.length === 0) {
    return result;
  }
  let [row, col, len] = getRowCol(arr);
  for (let i = 0; i < len; i++) {
    let [leftUp, rightUp, leftDown, rightDown] = getVertex(i, row, col);
// leftUp -> leftDown
    for (let j = leftUp[0]; j < leftDown[0]; j++) {
      result.push(arr[j][leftUp[1]]);
    }
// leftDown -> rightDown 注意顶点不要重复算进去
    for (let j = leftDown[1]; j < rightDown[1]; j++) {
      result.push(arr[leftDown[0]][j]);
    }
// rightDown -> rightUp 注意顶点不要重复算进去
    for (let j = rightDown[0]; j > rightUp[0]; j--) {
      result.push(arr[j][rightDown[1]]);
    }
// rightUp -> leftUp 注意顶点不要重复算进去
    for (let j = rightDown[1]; j > leftUp[1]; j--) {
      result.push(arr[leftUp[0]][j]);
    }
  }
  return result;
}

// 我是为了写别的方法复用抽出来的这个几个小函数，如果面试官纠结这点空间开销，就不要抽了
function getRowCol(arr) {
  let row = arr.length;
  let col = arr[0].length;
  let len = (Math.min(row, col) + 1) / 2;
// 可以不取整，反正小于x和小于x.5都能停止循环
  return [row, col, len];
}

function getVertex(i, row, col) {
  let leftUp = [i, 0 + i];
  let rightUp = [i, col - 1 - i];
  let leftDown = [row - 1 - i, 0 + i];
  let rightDown = [row - 1 - i, col - 1 - i];
  return [leftUp, rightUp, leftDown, rightDown];
}

function rectMap() {
  let arr = [];
  let row = 5;
  let col = 6;
  let len = row * col;
  let temp = [];
  for (let i = 1; i <= len; i++) {
    temp.push(i);
    if (i % col === 0) {
      arr.push(temp);
      temp = [];
    }
  }
  console.log(arr, clockwise(arr), anticlockwise(arr));
}

rectMap();
