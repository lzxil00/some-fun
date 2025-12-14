const itemArr = [
    { "mer_item_id": 10230291000000, "name": "北京索菲特大酒店", },
    { "mer_item_id": 10230291000003, "name": "北京金融街丽思卡尔顿酒店", },
    { "mer_item_id": 10230291000004, "name": "北京东方君悦大酒店", },
    { "mer_item_id": 10230291000005, "name": "北京华彬费尔蒙酒店", },
    { "mer_item_id": 10230291000006, "name": "北京西单美爵酒店", }
];
const verifyDateArr = [
    '2025-12-14',
    '2025-12-15',
    '2025-12-16',
];

/**
 * 填写fetch方法用于数据请求
 * @returns {Promise<Response>}
 */
const fetchFunc = (id, date) => {
    return fetch("https://right-mc.bestdo.com/item/ajaxGetValidPriceTime", {
        "headers": {
            "accept": "application/json, text/javascript, */*; q=0.01",
            "accept-language": "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "sec-ch-ua": "\"Chromium\";v=\"142\", \"Google Chrome\";v=\"142\", \"Not_A Brand\";v=\"99\"",
            "sec-ch-ua-mobile": "?1",
            "sec-ch-ua-platform": "\"Android\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest"
        },
        "referrer": "https://right-mc.bestdo.com/item/info?mer_item_id=10230291000000&type=swimbod",
        "body": `mer_item_id=${id}&date=${date}&ids=12355`,
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    });
}

/**
 * 填写预约方法
 * @returns {Promise<Response>}
 */
const bookFunc = () => {
    return fetch("https://right-mc.bestdo.com/order/createSportsOrder", {
        "headers": {
            "accept": "application/json, text/javascript, */*; q=0.01",
            "accept-language": "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "sec-ch-ua": "\"Chromium\";v=\"142\", \"Google Chrome\";v=\"142\", \"Not_A Brand\";v=\"99\"",
            "sec-ch-ua-mobile": "?1",
            "sec-ch-ua-platform": "\"Android\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest"
        },
        "referrer": "https://right-mc.bestdo.com/order/createOrder?mer_item_id=10230291000004&book_day=2025-12-16&hour=14&type=swimbod&token=dkshfklmsbddsdsdskjdkj",
        "body": "mer_id=1023029&mer_item_id=10230291000004&book_day=2025-12-16&username=%E6%9E%97%E5%AD%90%E9%9B%84&phone=17600546606&hour=14&type=swimbod&price_time_id=0&post_key=",
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    });
}

/**
 * 填写数据请求回来后的判断逻辑
 * @returns {boolean}
 */
const checkFunc = (json) => {
    /**
     * {
        "data": {
            "showHourStr": "6:00,7:00,8:00,9:00,10:00,11:00,12:00,13:00,14:00,15:00,16:00,17:00,18:00,19:00,20:00",
            "inventory": 0,
            "isToday": 1
        },
        "status": 200
        }
    */
    if (json.data?.inventory > 0) {
        return true;
    }
    return false;

    // 当天某个时段是否有号
    // const timeList = [
    //   '17:55,18:25',
    //   '18:30,19:00',
    //   '19:25,19:55',
    // ]
    // return json.data?.[0]?.some(item => item.oh_qty > 0 && timeList.includes(item.cat_code)) ?? false;
}

const DELAY_TIME = 200 * 40;

/**
 * 主程序
 * @returns {Promise<void>}
 */
const main = async () => {
    let count = 0;
    const delay = (time) => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, time);
        });
    };

    const playMusic = () => {
        const music = 'https://downsc.chinaz.net/Files/DownLoad/sound1/202007/13195.mp3'; // 提示音乐
        let audio = new Audio(music);
        audio.muted = false;
        audio.play();
    }
    // 测试音乐播放
    playMusic();

    const checkTicket = async (fetchFunc, checkFunc) => {
        count++;
        await delay(DELAY_TIME);
        // 遍历所有 item 和日期组合
        const tasks = itemArr.flatMap(item =>
            verifyDateArr.map(date =>
                fetchFunc(item.mer_item_id, date)
                    .then(res => res.json())
                    .then(json => {
                        if (checkFunc(json)) {
                            const now = new Date();
                            const dataStr = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
                            console.log(`查询第${count}次，项目【${item.name}】日期【${date}】通过检测，时间：${dataStr}`);
                            // bookFunc().then(res => res.json()).then(json => console.log(json)).catch(err => console.log(err));
                            return true; // 只要有一个成功即返回成功
                        }
                        return false;
                    })
                    .catch(e => {
                        console.log(`查询第${count}次，项目【${item.name}】日期【${date}】请求失败，原因：`, e);
                        return false;
                    })
            )
        );

        // 并行执行所有请求，任意一个成功即整体成功
        const results = await Promise.all(tasks);
        const hasSuccess = results.some(r => r);
        return hasSuccess ? Promise.resolve() : Promise.reject();
    }

    const autoCheck = (fetchFunc, checkFunc, globalResolve) => {
        return new Promise(resolve => {
            checkTicket(fetchFunc, checkFunc).then(() => {
                globalResolve ? globalResolve() : resolve()
            }).catch(() => {
                console.log(`查询第${count}次，所有项目所有日期均未通过检测，等待${DELAY_TIME / 1000}秒后重试`);
                return autoCheck(fetchFunc, checkFunc, globalResolve || resolve)
            })
        })
    }

    await delay(DELAY_TIME);
    await autoCheck(fetchFunc, checkFunc);
    playMusic();
}

const result = main();
console.log(result)
