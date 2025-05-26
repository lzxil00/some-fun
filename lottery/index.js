const LUCKY_ONE_DOM = document.getElementById('show-lucky-wrap');
const IMAGE_LIST = document.getElementById('image-list').children;
const HAS_LUCKY_DOM = document.getElementById('has-lucky-list');

function getLuckyOne() {
  const length = IMAGE_LIST.length;
  if(length === 0) {
    alert('抽奖结束，刷新页面重新抽奖');
    return;
  }
  const luckyNum = Math.floor(length * Math.random());
  const luckyOne = IMAGE_LIST.item(luckyNum);
  showLuckOne(luckyOne);
}

function showLuckOne(luckyOne) {
  LUCKY_ONE_DOM.appendChild(luckyOne)
  LUCKY_ONE_DOM.classList.add('showLuckWrap')
}

function hiddenCurrentLucky() {
  LUCKY_ONE_DOM.classList.remove('showLuckWrap');
  const luckyOne = LUCKY_ONE_DOM.children.item(0);
  HAS_LUCKY_DOM.appendChild(luckyOne);
}
