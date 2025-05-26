/**
 * 问卷调查
 */

function getRandomIndexWithPower(list) {
  const allP = list.reduce((a, b) => a + b.power, 0)
  const num = Math.random() * 0.999;
  let index = 0;
  while (num > list.slice(0, index + 1).reduce((a, b) => a + b.power, 0) / allP) {
    index++;
  }
  return index;
}

const rolePower = [
  {title: 'pm', power: 1},
  {title: 'pd', power: 1},
  {title: 'qa', power: 2},
  {title: 'rd', power: 4},
  {title: 'ui', power: 2},
  {title: 'nothing', power: 0.5},
]

const checkboxPower = [
  {title: '1', power: 10},
  {title: '2', power: 1},
  {title: '3', power: 0},
  {title: '4', power: 0},
  {title: '5', power: 0},
]

for (let i = 1; i <= 9; i++) {
  if (i === 1) {
    document.getElementById(`q${i}_${getRandomIndexWithPower(rolePower) + 1}`).click();
    console.log(getRandomIndexWithPower(rolePower) + 1)
  } else {
    document.getElementById(`q${i}_${getRandomIndexWithPower(checkboxPower) + 1}`).click();
    console.log(getRandomIndexWithPower(rolePower) + 1 )
  }
}

document.getElementById('submit_button').click();

setTimeout(()=>{
  window.location.href = 'https://www.wjx.cn/vj/Y01XlYQ.aspx'
}, 2000)
