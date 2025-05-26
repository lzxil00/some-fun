// 腾讯面试题-一面 未完成

function findSubstring(str){
  let tempStr = '';
  for (let index = 0; index < str.length; index++) {
    const char = str[index];
    if(tempStr.indexOf(char)>=0){ //找到相同字符
      return tempStr;
    } else { // 未找到，添加到后面
      tempStr += char;
    }
  }
  return str;
}

function maxSubstring(str) {
  let resultStr = '';
  for (let index = 0; index < str.length; index++) {
    const testStr = str.substring(index,str.length);
    const substring = findSubstring(testStr);
    if(substring.length>resultStr){
      resultStr = substring;
    }
  }
  return resultStr;
}

console.log(maxSubstring('12432565')); // 43256
