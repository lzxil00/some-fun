/**
 * 交大选课平台 课程实时查询+提示
 *
 * 北京交通大学教学服务平台 https://aa.bjtu.edu.cn/course_selection/gscourseselect/lists/
 *
 * @return {string}
 */


// const getUrl = () => `https://aa.bjtu.edu.cn/course_selection/gscourseselect/lists/?t=${Math.random()}`;
// const getUrl = () => `https://aa.bjtu.edu.cn/course_selection/gscourseselect/lists/`;
const getUrl = () => `https://aa.bjtu.edu.cn/course_selection/courseselecttask/remains/?kkxsh=&kch=A209002B&jsh=6122&skxq=&skjc=&has_advance_query=`;
const music = 'https://downsc.chinaz.net/Files/DownLoad/sound1/202007/13195.mp3'; // 提示音乐

let iframe = document.createElement('iframe');
iframe.src = getUrl();
iframe.onload = () => {
    // let table = iframe.contentDocument.getElementById('select-table');
    let table = iframe.contentDocument.getElementsByTagName('table').item(0);
    let tdText = table.children.item(0) //tbody
        // .children.item(3) // tr
        .children.item(2) // tr
        // .children.item(0) // td
        .children.item(6) // td
        .innerText;
    // if (tdText === '无余量') {
    if (tdText === '0') {
        setTimeout(() => iframe.contentWindow.location.reload(), 2000);
    }
    else {
        let audio= new Audio(music);
        audio.play();
    }
}
document.body.appendChild(iframe);

