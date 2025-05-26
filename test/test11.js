// 小红书-2面

// 写一个阿拉伯数字转中文的方法
// toChineseNum(2345) //  二千三百四十五
// toChineseNum(341205)//  三十四万一千二百零五
// toChineseNum(340001200567)//  三千四百亿零一百二十万零五百六十七


const MAP_NUM = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']

const toChineseNum = (num) => {
  let str = '';
  // 个位
  // str = MAP_NUM[num % 10] + str;
  // // 十位
  // str = num % 100 === 0 ? ('零' + str) : (MAP_NUM[num % 100] + '十' + str);
  // // 百位
  // str = MAP_NUM[num % 1000] + '百' + str;
  // // 千位
  // str = MAP_NUM[num % 10000] + '千' + str;
  // // 万位
  // str = MAP_NUM[num % 10000] + '万' + str;

  let numStr = String(num);
  const unit = ['', '十', '百', '千']
  for (let i = numStr.length - 1; i >= 0; i--) {
    const char = numStr[i];
    // 一个4位周期
    if ((numStr.length - 1 - i) % 4 === 0 && i !== numStr.length - 1) {
      str = ['万', '亿'][(numStr.length - 1 - i) / 4 - 1] + str;
    }
    if (char === '0') {
      str = '零' + str;
    } else {
      str = MAP_NUM[Number(char)] + unit[(numStr.length - 1 - i) % 4] + str
    }
  }
  //  进行去重 零 todo
  // str.replace('零零','零');
  // const reg = /零+/;
  // str.replace(reg, '零')

  str = str.replace('零零', '零');
  str = str.replace('零零', '零');
  str = str.replace('零零', '零');
  // 重复
  // 去重零
  return str;
}

console.log(toChineseNum(2345));
console.log(toChineseNum(341205));
console.log(toChineseNum(340001200567));
