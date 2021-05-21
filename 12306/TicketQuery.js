/**
 * 火车票 查漏
 * 火车票查询页面使用此脚本
 */

function INeedTicket() {

  const trainList = ['G2404', 'G2406', 'G2408', 'G2482'];

  const success = () => {
    const music = 'https://downsc.chinaz.net/Files/DownLoad/sound1/202007/13195.mp3'; // 提示音乐
    const audio = new Audio(music);
    audio.play();
  }

  const button = document.getElementById('query_ticket');
  button.click();
  setTimeout(() => {
    const table = document.getElementById('queryLeftTable');
    let hasTicket = false;
    for (let i = 0; i < Math.floor(table.children.length / 2); i++) {
      const train = table.children.item(i * 2);
      const id = train.getElementsByClassName('number')[0].innerText;
      if (trainList.includes(id)  // 是选择的车次
        && [1, 2, 3].some((index) => train.children.item(index).innerText !== '候补')) { // 商务座 一等座 二等座是否为候补
        hasTicket = true;
      }
    }
    if (hasTicket) { // 有票
      console.log('有票')
      success();
    } else { // 没票
      console.log('没票')
      setTimeout(() => INeedTicket(), 5000);
    }
  }, 2000);
}

INeedTicket();
