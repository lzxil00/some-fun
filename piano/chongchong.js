/**
 * 虫虫钢琴
 * 获取曲谱
 */

const sheetListDom = document.querySelectorAll('img.img');

// language=HTML
let html = '';
for (let i = 1; i < sheetListDom.length; i++) {
  html += `
<div>
  <img src="${sheetListDom.item(i).src}" alt="${i}">
</div>
`
}
document.body.innerHTML = html;
