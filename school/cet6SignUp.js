/**
 * cet报名
 *
 * 报名刷新是否有名额 http://cet-bm.neea.edu.cn/
 *
 * @return {string}
 */

// 第一部分
const getUrl = () => `http://cet-bm.neea.edu.cn/`;

let iframe = document.createElement('iframe');
iframe.src = getUrl();
iframe.style.width = '100vw'
iframe.style.height = '1000px'

document.body.appendChild(iframe);
window.myIframe = iframe;


// 第二部分
const music = 'https://downsc.chinaz.net/Files/DownLoad/sound1/202007/13195.mp3'; // 提示音乐
window.myIframe.onload = () => {
  let tdText = document.getElementsByClassName("label label-danger")[0].innerText
  if (tdText === '无') {
    setTimeout(() => window.myIframe.contentWindow.location.reload(), 2000);
  } else {
    let audio = new Audio(music);
    audio.play();
  }
}
window.myIframe.contentWindow.location.reload()
