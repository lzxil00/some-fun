/**
 * 递归遍历N叉树结构，并找到符合条件的节点，条件：存在一个孙子节点的value值为1
 * @param parentId
 * @return {[]|*[]}
 */

// 生成树结构
const initTree = (parentId) => {
  if (parentId.split('-').length > 3) return [];
  const tree = [];
  const childrenLength = Math.random() * 10 % 10 + 1;
  for (let i = 0; i < childrenLength; i++) {
    const id = `${parentId}-${i}`;
    tree.push({id, value: Math.random() > 0.2 ? 1 : 0, children: initTree(id)});
  }
  return tree;
}

// 判断是否为要找的节点
const isRightNode = (node) => {
  const children = node.children; // 子节点树
  for (let i = 0; i < children.length; i++) {
    const child = children[i]; // 各个子节点
    const grandchildren = child.children; // 孙子节点树
    for (let j = 0; j < grandchildren.length; j++) {
      const grandchild = grandchildren[j]; // 孙子节点
      // 只要有一个孙子节点value为1，则此节点就是要寻找的节点
      if (grandchild.value === 1) return true;
    }
  }
  return false;
}

// 生成一课树
const tree = initTree('0');
// 存储符合条件的节点列表
const rightNodeList = [];
// 递归遍历树
const mapTree = (tree) => {
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (isRightNode(node)) rightNodeList.push(node);
    mapTree(node.children);
  }
}
mapTree(tree);

console.log(rightNodeList.length, rightNodeList.map(({id}) => id));
