/**
 * 获取文章
 */

// 删除jammer
const jammerList = document.getElementsByClassName('jammer');
for (let i = jammerList.length - 1; i >= 0; i--) {
  jammerList.item(i).remove();
}

// 删除<span style="display:none">乱码</span>

const spanList = document.getElementsByTagName('span');
for (let i = spanList.length - 1; i >= 0; i--) {
  spanList.item(i).remove();
}

// 获取标题
// const title = document.getElementsByClassName('ts').item(0).innerText;
// const title = document.title.split(' - Powered by Discuz!')[0] + '.txt\n\n';
const title = document.title.split(' - TT1069同志貼圖交友網')[0] + '.txt\n\n';
// 获取文章
const trList = document.getElementsByClassName('t_f');
let article = '';
for (let i = 0; i < trList.length; i++) {
  article += trList.item(i).innerText;
}
setTimeout(() => {
  navigator.clipboard.writeText(title + article)
  console.log('成功')
}, 2000)
