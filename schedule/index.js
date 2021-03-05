/**
 * Google日历录入课程表csv文件内容生成器
 * 导入方式：https://support.google.com/calendar/answer/37118?hl=zh-Hans#
 *
 */

// 课程数据
const originData = [
  {
    code: 'M503063B[01]',
    name: '<项目管理学>',
    subject: '<项目管理学>',
    cycle: '第01-04,06-08,11周',
    location: 'SD306',
    date: '周六',
    startDate: '2021-03-06',
    endDate: '2021-03-06',
    time: '1',
    startTime: '08:00 AM',
    endTime: '09:50 AM',
    allDayEvent: 'False',
  },
  {
    code: 'C403010B[01]',
    name: '<数据挖掘与商务智能>',
    cycle: '第12-14,16-20周',
    location: 'SD103',
    date: '周六',
    time: '1',
  },
  {
    code: 'M503063B[01]',
    name: '<项目管理学>',
    cycle: '第01-04,06-08,11周',
    location: 'SD306',
    date: '周六',
    time: '2',
  },
  {
    code: 'C403010B[01]',
    name: '<数据挖掘与商务智能>',
    cycle: '第12-14,16-20周',
    location: 'SD103',
    date: '周六',
    time: '2',
  },
  {
    code: 'A209002B[13]',
    name: '<中国特色社会主义理论与实践研究>',
    cycle: '第01-12周',
    location: 'SY106',
    date: '周日',
    time: '1',
  },
  {
    code: 'M503205B[02]',
    name: '<项目计划与控制>',
    cycle: '第13-14,16-20周',
    location: 'SD306',
    date: '周日',
    time: '1',
  },
  {
    code: 'A209002B[13]',
    name: '<中国特色社会主义理论与实践研究>',
    cycle: '第01-12周',
    location: 'SY106',
    date: '周日',
    time: '2',
  },
  {
    code: 'M503205B[02]',
    name: '<项目计划与控制>',
    cycle: '第13-14,16-20周',
    location: 'SD306',
    date: '周日',
    time: '2',
  },
  {
    code: 'M503035B[03]',
    name: '<新兴技术应用与工程（区块链/AI/5G等）>',
    cycle: '第01-04,06-08,11周',
    location: 'SD104',
    date: '周六',
    time: '4',
  },
  {
    code: 'A203005B[06]',
    name: '<工程伦理>',
    cycle: '第12-14,16-20周',
    location: 'SD306',
    date: '周六',
    time: '4',
  },
  {
    code: 'M503035B[03]',
    name: '<新兴技术应用与工程（区块链/AI/5G等）>',
    cycle: '第01-04,06-08,11周',
    location: 'SD104',
    date: '周六',
    time: '5',
  },
  {
    code: 'A203005B[06]',
    name: '<工程伦理>',
    cycle: '第12-14,16-20周',
    location: 'SD306',
    date: '周六',
    time: '5',
  },
  {
    code: 'M503053B[02]',
    name: '<互联网与工程管理>',
    cycle: '第01-04,06,10-11,13周',
    location: 'SD103',
    date: '周日',
    time: '4',
  },
  {
    code: 'C403015B[05]',
    name: '<研究方法与论文写作>',
    cycle: '第07,12,16,20周',
    location: 'SY207',
    date: '周日',
    time: '4',
  },
  {
    code: 'M503053B[02]',
    name: '<互联网与工程管理>',
    cycle: '第01-04,06,10-11,13周',
    location: 'SD103',
    date: '周日',
    time: '5',
  },
  {
    code: 'C403015B[05]',
    name: '<研究方法与论文写作>',
    cycle: '第07,12,16,20周',
    location: 'SY207',
    date: '周日',
    time: '5',
  },
]
// 上课时间对应表
const MAP_time = {
  '1': ['08:00', '09:50'],
  '2': ['10:10', '12:00'],
  '3': ['12:10', '14:00'],
  '4': ['14:10', '16:00'],
  '5': ['16:20', '18:10'],
  '6': ['19:00', '20:50'],
  '7': ['21:00', '21:50'],
}
// 星期对应表
const MAP_date = {
  '周一': 0,
  '周二': 1,
  '周三': 2,
  '周四': 3,
  '周五': 4,
  '周六': 5,
  '周日': 6,
}
// 开学时间
const START_DATE = new Date(2021, 2, 1);
console.log(`开学时间：${formatDate(START_DATE, 'yyyy-mm-dd')}`);

/**
 * 时间计算方法
 * @param oldDate 【String】需要计算的日期字符串    (eg.'20160101'/'201601'/'2016')
 * @param count 【Number】计算数值    (eg. 1 / -1 / 5)
 * @returns {string}
 */
function calcDate(oldDate, count) {
  let yyyy = '';
  let mm = '';
  let dd = '';
  let newDate = null;
  let returnDate = '';
  // 判断年月日类型
  let length = oldDate.length;
  switch (length) {
    // 年类型
    case 4:
      yyyy = oldDate.slice(0, 4);
      returnDate = (Number(yyyy) + count).toString();
      break;
    // 月类型
    case 6:
      // 转为日期类型
      yyyy = oldDate.slice(0, 4);
      mm = oldDate.slice(4, 6);
      newDate = new Date(`${yyyy}-${mm}-01`);
      // 计算
      newDate.setMonth(newDate.getMonth() + count);
      // 小于 10 加 0
      mm = (newDate.getMonth() + 1) < 10 ? '0' + (newDate.getMonth() + 1) : (newDate.getMonth() + 1).toString();
      yyyy = newDate.getFullYear().toString();
      returnDate = yyyy + mm;
      break;
    //日类型
    case 8:
      // 转为日期类型
      yyyy = oldDate.slice(0, 4);
      mm = oldDate.slice(4, 6);
      dd = oldDate.slice(6, 8);
      newDate = new Date(`${yyyy}-${mm}-${dd}`);
      // 计算
      newDate.setDate(newDate.getDate() + count);
      // 小于 10 加 0
      dd = newDate.getDate() < 10 ? '0' + newDate.getDate() : newDate.getDate().toString();
      mm = (newDate.getMonth() + 1) < 10 ? '0' + (newDate.getMonth() + 1) : (newDate.getMonth() + 1).toString();
      yyyy = newDate.getFullYear().toString();
      returnDate = yyyy + mm + dd;
      break;
    default:
      returnDate = '';
  }
  return returnDate;
}

/**
 * 格式化日期
 * @param {Date, string} date
 * @param {string} type
 * @returns {string}
 */
function formatDate(date, type) {
  if (typeof (date) === 'undefined') {
    return '';
  }
  if (typeof (date) === 'string') {
    let dd = 1, mm = 0, yyyy = Number(date.substring(0, 4));
    date = date.substring(0, 10);
    switch (date.length) {
      case 4:// yyyy
        break;
      case 6:// yyyymm
        mm = Number(date.substring(4, 6));
        break;
      case 7:// yyyy-mm
        mm = Number(date.substring(5, 7));
        break;
      case 8:// yyyymmdd
        mm = Number(date.substring(4, 6));
        dd = Number(date.substring(6, 8));
        break;
      case 10:// yyyy-mm-dd
        mm = Number(date.substring(5, 7));
        dd = Number(date.substring(8, 10));
        break;
      default:
        break;
    }
    date = new Date(yyyy, mm - 1, dd);
  }
  const pad = n => n < 10 ? `0${n}` : n.toString();
  let dd = pad(date.getDate());
  let mm = pad(date.getMonth() + 1);
  let yyyy = pad(date.getFullYear());
  let hh = pad(date.getHours());
  let mi = pad(date.getMinutes());
  let ss = pad(date.getSeconds());
  return !type ? `${yyyy}-${mm}-${dd}` :
    type.replace('yyyy', yyyy)
      .replace('mm', mm)
      .replace('dd', dd)
      .replace('hh', hh)
      .replace('mi', mi)
      .replace('ss', ss);
}

/**
 * 获取周数
 * @param str
 * @return {[]}
 */
function transCycle(str = '') {
  str = str.replace('第', '').replace('周', '')
  const list = str.split(',');
  const returnList = [];
  list.forEach(weeks => {
    const [start, end] = weeks.split('-');
    returnList.push(Number(start));
    if (end) {
      let i = Number(start) + 1;
      while (i <= Number(end)) {
        returnList.push(i);
        i++;
      }
    }
  })
  return returnList;
}

/**
 * 获取日期
 */
function getDate(week, date) {
  const forCalcDate = formatDate(START_DATE, 'yyyymmdd');
  // 第一周的日期
  const firstDate = calcDate(forCalcDate, MAP_date[date]);
  // 第week周的日期
  const realDate = calcDate(firstDate, 7 * (week - 1));
  return formatDate(realDate, 'yyyy-mm-dd');
}

// 数据准备
const list = [];
originData.forEach(item => {
  const weeks = transCycle(item.cycle);
  weeks.forEach(week => {
    const obj = {};
    obj.subject = item.name;
    obj.location = item.location;
    [obj.startTime, obj.endTime] = MAP_time[item.time];
    obj.startDate = obj.endDate = getDate(week, item.date);
    list.push(obj);
    obj.allDayEvent = 'False';
    obj.description = '';
    obj.private = '';
  })
})

// 输出
console.log('===================================以下内容为csv文件内容===================================');
console.log('Subject,Start date,Start time,End Date,End Time,All Day Event,Description,Location,Private');
list.forEach(item => {
  const {subject, startDate, startTime, endDate, endTime, allDayEvent, description, location, private} = item;
  const arr = [subject, startDate, startTime, endDate, endTime, allDayEvent, description, location, private]
  console.log(arr.join(','))
})
console.log('===================================以上内容为csv文件内容===================================');
