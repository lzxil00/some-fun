/**
 * 填写fetch方法用于数据请求
 * @returns {Promise<Response>}
 */
const fetchFunc = () => {
    return fetch("https://health.bytedance.com/byte-health/api/user/v1/pe/packages/26777810/query-schedule", {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "cn",
            "cache-control": "no-cache",
            "content-type": "application/json",
            "pragma": "no-cache",
            "redirect-url": "https://health.bytedance.com/reserve",
            "sec-ch-ua": "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Google Chrome\";v=\"116\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"macOS\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest"
        },
        "referrer": "https://health.bytedance.com/reserve",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": "{\"hospitalCode\":\"2034\",\"startTime\":1692947317784,\"endTime\":1700841600000,\"extraPackageCodes\":\"866506,866626,866685,866602,866650,866410\"}",
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
    return json.data.schedule.filter((_, index) => index > 2 && index < 6).some(({periods}) => periods[0].availableNum > 0)
}

/**
 * 查询间隔
 * @type {number}
 */
const DELAY_TIME = 5 * 1000;

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

    const checkTicket = async (fetchFunc, checkFunc) => {
        count++;
        await delay(DELAY_TIME * 2);
        return new Promise((resolve, reject) => {
            fetchFunc().then(res => res.json()).then(json => {
                if (checkFunc(json)) {
                    const date = new Date();
                    const dataStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
                    console.log(`查询第${count}次，通过检测，时间：${dataStr}`)
                    resolve();
                } else {
                    console.log(`查询第${count}次，检测失败，继续查询`)
                    reject();
                }
            }).catch(e => {
                console.log(`查询第${count}次，请求失败，原因：`, e)
            })
        })
    }

    const autoCheck = (fetchFunc, checkFunc, globalResolve) => {
        return new Promise(resolve => {
            checkTicket(fetchFunc, checkFunc).then(() => {
                globalResolve ? globalResolve() : resolve()
            }).catch(() => {
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
