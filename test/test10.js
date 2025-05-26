// 字节3面
//line=readline()
//print(line)

const countMultiStr = (str) => {
  let temp = '';
//   let count = 0;
  let charCount = 1;
  let multiStrArr = [];
  for (let i = 0; i <= str.length; i++) {
    if (str[i] === temp) {
      charCount++;
    } else {
      temp = str[i];
      if (charCount > 1) { // 是叠词
//         count++;
        console.log(multiStrArr.find(([char, charNum])=> char===str[i] && charCount === charNum))
        if(!multiStrArr.find(([char, charNum])=> char===str[i] && charCount === charNum)){
          multiStrArr.push([str[i], charCount])
        }
      }
      charCount = 1;
    }
  }
  return multiStrArr.length;
}

console.log(countMultiStr('abcdaaabbccccddddefgaaa'));
