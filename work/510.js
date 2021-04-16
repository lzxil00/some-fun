/**
 * 510亲友日预约 查漏
 * 预定页面使用此脚本
 */

function INeedQuota() {
  const button = document.getElementsByClassName('button-iw4lje29')[0];
  button.click();
  setTimeout(() => {
    const dialog = document.getElementsByClassName("kuma-dlg-content")[0];
    if (dialog.innerHTML.indexOf('亲，5月10日报名人数已满') > 0) {
      console.log('满员')
      const close = document.querySelector('.kuma-dlg-content .kuma-dlg-close');
      close.click();
      setTimeout(() => test(), 2000);
    } else {
      const music = 'https://downsc.chinaz.net/Files/DownLoad/sound1/202007/13195.mp3'; // 提示音乐
      const audio = new Audio(music);
      audio.play();
    }
  }, 2000);
}

INeedQuota();
