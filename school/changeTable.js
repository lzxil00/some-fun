/**
 * 交大选课平台表格展开方式
 *
 * 北京交通大学教学服务管理平台 https://aa.bjtu.edu.cn/course_selection/gscourseselect/lists/
 *
 *
 */

window.self_tableNodes = document.getElementsByClassName('scroll-content');
for (let i = 0; i < self_tableNodes.length; i++) {
    self_tableNodes.item(i).style.maxHeight = '';
}
window.self_style = document.createElement('style');
self_style.innerText = '.ellipsis{ white-space: inherit;} .scroll-content{max-height:1000px !important;}';
document.head.appendChild(self_style);
