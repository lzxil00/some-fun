const timeData = [
    { start: '2022-10-18 10:02:31', end: '2022-10-18 10:32:21' },
    { start: '2022-10-13 09:50:37', end: '2022-10-13 10:28:02' },
    { start: '2022-10-12 09:48:07', end: '2022-10-12 10:19:28' },
    { start: '2022-09-19 09:43:20', end: '2022-09-19 10:16:10' },
    { start: '2022-09-15 09:55:25', end: '2022-09-15 10:24:35' },
    { start: '2022-09-14 09:52:26', end: '2022-09-14 10:33:56' },
    { start: '2022-09-13 09:52:55', end: '2022-09-13 10:23:05' },
    { start: '2022-09-09 09:52:15', end: '2022-09-09 10:36:20' },
    { start: '2022-09-08 10:01:44', end: '2022-09-08 10:48:30' },
    { start: '2022-09-07 10:01:31', end: '2022-09-07 10:47:47' },
    { start: '2022-09-06 10:04:32', end: '2022-09-06 10:46:55' },
    { start: '2022-09-05 09:53:55', end: '2022-09-05 10:32:08' },
    { start: '2022-09-02 10:12:58', end: '2022-09-02 10:48:45' },
    { start: '2022-09-01 09:56:05', end: '2022-09-01 10:37:32' },
    { start: '2022-08-31 09:54:08', end: '2022-08-31 10:35:43' },
];

for (let i = 0; i < timeData.length; i++) {
    console.log(getWeekDay(timeData[i]), getCost(timeData[i]), getTime(timeData[i]), getDay(timeData[i]));
}

function getCost(timeInfo) {
    const { start, end } = timeInfo;
    const startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();
    return Math.round((endTime - startTime) / 1000 / 60);
}

function getWeekDay(timeInfo) {
    const { start } = timeInfo;
    const day = new Date(start).getDay();
    const dayMap = ['日', '一', '二', '三', '四', '五', '六'];
    return `周${ dayMap[day] }`;
}

function getTime(timeInfo) {
    const { start,end } = timeInfo;
    return start.split(' ')[1] + ' ' + end.split(' ')[1];
}

function getDay(timeInfo) {
    const { start } = timeInfo;
    return start.split(' ')[0];
}