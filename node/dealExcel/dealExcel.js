const XLSX = require('xlsx');

// 读文件
const wb = XLSX.readFile("information_list.xlsx");
// 获取excel文件的第一个sheet
const sheet = wb.Sheets[wb.SheetNames[0]]
// 获取范围
const ref = sheet['!ref'];
const {col_star, col_end, row_star, row_end} = splitRef(ref);

const authorList = [];

for (let i = row_star + 1; i <= row_end; i++) {
  if (i % 200 === 0) console.log(i)
  if(!sheet['C' + i]) continue;
  const list = sheet['C' + i].v.split(';');
  for (let j = 0; j < list.length; j++) {
    const name = list[j].trim()
    if (!authorList.find(({authorfullname}) => authorfullname === name)) {
      const address = list.length === 1 ? sheet['D' + i].v : getAddress(name, sheet['D' + i].v);
      if (address) {
        authorList.push({
          authorfullname: name,
          address,
          country: getCountry(address)
        })
      }
    }
  }
}

writeFile(toSheet(authorList))

// [Kleshinski, Catherine E.; Wilson, Kelly Schwind; Stevenson-Street, Julia M.] Purdue Univ, W Lafayette, IN 47907 USA; [Scott, Brent A.] Michigan State Univ, E Lansing, MI 48824 USA
// authorfullname,address,country


function getAddress(name, sheetElement) {
  if(!sheetElement.includes('[')) return sheetElement;
  name = name.replace('(', '\\(').replace(')', '\\)');
  const reg = new RegExp(`.*\\[[^\\[]*${name}[^\\]]*\]([^;]*)`)
  if (reg.exec(sheetElement) === null) {
    // debugger
    return '';
  }
  return reg.exec(sheetElement)[1].trim();
}

function getCountry(address) {
  if (!address) return '';
  const result = /\s(\w*)$/.exec(address);
  if(!result) {
    console.log(address)
    return ''
  }
  return result[1]
}

function splitRef(ref) {
  const reg_col_star = /([A-Z]*)/ //列起始位置
  const reg_col_end = /:([A-Z]*)/ //列结束位置
  const reg_row_star = /[A-Z]*(\d*)/ //行起始位置
  const reg_row_end = /:[A-Z]*(\d*)/ //行结束位置
  return {
    col_star: reg_col_star.exec(ref)[1],
    col_end: reg_col_end.exec(ref)[1],
    row_star: Number(reg_row_star.exec(ref)[1]),
    row_end: Number(reg_row_end.exec(ref)[1]),
  }
}

function toSheet(data) {
  const colList = [
    {key: 'A', label: 'authorfullname'},
    {key: 'B', label: 'address'},
    {key: 'C', label: 'country'},
  ];
  const result = {
    A1: {v: 'authorfullname'},
    B1: {v: 'address'},
    C1: {v: 'country'},
    '!ref': 'A1:C' + data.length,
  };
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < colList.length; j++) {
      const key = colList[j].key + (i + 2);
      const v = data[i][colList[j].label];
      result[key] = {v}
    }
  }
  return result;
}

// 使用sheet写文件
function writeFile(sheet) {
  // 构建 workbook 对象
  const workbook = {
    SheetNames: ['sheet'],
    Sheets: {sheet}
  };

  // 导出 Excel
  XLSX.writeFile(workbook, 'output.xlsx');
}
