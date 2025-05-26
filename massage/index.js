/**
 * 填写fetch方法用于数据请求
 * @returns {Promise<Response>}
 */
const fetchFunc = () => {
    return fetch("https://lark.openryan.com/ryan/phs/phs3/api/seldate?org_head=tt101&login_type=4", {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "zh,zh-TW;q=0.9,zh-CN;q=0.8,en;q=0.7",
            "cache-control": "no-cache",
            "content-type": "application/json;charset=UTF-8",
            "pragma": "no-cache",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin"
        },
        "referrer": "https://lark.openryan.com/aco/?lang=en-US&open_in_browser=true&ver=30&org_head=tt101&login_type=4",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": "{\"svc_gcode\":\"20010\",\"org_pos\":\"TT111\",\"item_id\":\"TT11110000013\",\"doctor_id\":\"\"}",
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
    // 前n天是否有号
    const n = 1;
    for (let i = 0; i < n; i++) {
        if (json.data?.[0]?.[i]?.oh_qty > 0) {
            return true;
        }
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
    // 测试音乐播放
    playMusic();

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
                    console.log(`查询第${count}次，检测失败，继续查询`, json)
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
