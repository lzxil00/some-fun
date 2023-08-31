// 通行证类型
const sldttype = [
    '25,3,6', // 普通护照
    '2,3,6', // 往来港澳通行证
    '2,6', // 往来台湾通行证
]

// 获取行政区市
const xzqhList = (sldttype) => fetch(`https://zwfw.gaj.beijing.gov.cn/crjbjj/api/getBookXzqh?sldttype=${sldttype}&t=1691644764707`, {
    "headers": {
        "accept": "*/*",
        "accept-language": "zh,zh-TW;q=0.9,zh-CN;q=0.8,en;q=0.7",
        "cache-control": "no-cache",
        "pragma": "no-cache",
        "sec-ch-ua": "\"Not.A/Brand\";v=\"8\", \"Chromium\";v=\"114\", \"Google Chrome\";v=\"114\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest"
    },
    "referrer": "https://zwfw.gaj.beijing.gov.cn/crjbjj/apply/toBook",
    "referrerPolicy": "no-referrer-when-downgrade",
    "body": null,
    "method": "GET",
    "mode": "cors",
    "credentials": "include"
});

// 获取受理点
const getSldtByXzqh = (xzqh) => fetch(`https://zwfw.gaj.beijing.gov.cn/crjbjj/api/getSldtByXzqh?sldttype=25,3,6&xzqh=${xzqh}&t=1691644614617`, {
    "headers": {
        "accept": "*/*",
        "accept-language": "zh,zh-TW;q=0.9,zh-CN;q=0.8,en;q=0.7",
        "cache-control": "no-cache",
        "pragma": "no-cache",
        "sec-ch-ua": "\"Not.A/Brand\";v=\"8\", \"Chromium\";v=\"114\", \"Google Chrome\";v=\"114\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest"
    },
    "referrer": "https://zwfw.gaj.beijing.gov.cn/crjbjj/apply/toBook",
    "referrerPolicy": "no-referrer-when-downgrade",
    "body": null,
    "method": "GET",
    "mode": "cors",
    "credentials": "include"
});

// 获取日期
const getRqList = (sld) => fetch(`https://zwfw.gaj.beijing.gov.cn/crjbjj/api/getRqList?sld=${sld}&t=1691644988711`, {
    "headers": {
        "accept": "*/*",
        "accept-language": "zh,zh-TW;q=0.9,zh-CN;q=0.8,en;q=0.7",
        "cache-control": "no-cache",
        "pragma": "no-cache",
        "sec-ch-ua": "\"Not.A/Brand\";v=\"8\", \"Chromium\";v=\"114\", \"Google Chrome\";v=\"114\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest"
    },
    "referrer": "https://zwfw.gaj.beijing.gov.cn/crjbjj/apply/toBook",
    "referrerPolicy": "no-referrer-when-downgrade",
    "body": null,
    "method": "GET",
    "mode": "cors",
    "credentials": "include"
});


/**
 * 填写fetch方法用于数据请求
 * @returns {Promise<Response>}
 */
const fetchFunc = () => {
    return fetch('');
}

/**
 * 填写数据请求回来后的判断逻辑
 * @returns {boolean}
 */
const checkFunc = (json) => {
    return false
}
