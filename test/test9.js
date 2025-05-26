/**
 * 去除字符串中出现次数最少的字符，不改变原字符串的顺序。
 例：“ababac” —— “ababa”
 “aaabbbcceeff” —— “aaabbb”
 */

const deleteMinChar = (str) => {
  const obj = {}
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (obj[char]) {
      obj[char] = obj[char] + 1;
    } else {
      obj[char] = 1;
    }
  }
  const sortArr = Object.entries(obj).sort((a, b) => a[1] < b[1] ? -1 : 1);
  let minCount = sortArr[0][1];
  let resultStr = str;
  for (let i = 0; i < sortArr.length; i++) {
    const [char, count] = sortArr[i];
    if (count === minCount) {
      // const reg = new RegExp(`${char}`)
      resultStr = resultStr.replaceAll(char, '');
    } else {
      break;
    }
  }
  return resultStr;
}
console.log(deleteMinChar('ababac'));
console.log(deleteMinChar('aaabbbcceeff'));

const a = {};

typeof a === 'object'
Array.isArray(a)
