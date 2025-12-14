
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
        "referrer": "https://right-mc.bestdo.com/order/createOrder?mer_item_id=10230291000004&book_day=2025-12-16&hour=14&type=swimbod",
        "body": "mer_id=1023029&mer_item_id=10230291000004&book_day=2025-12-16&username=%E6%9E%97%E5%AD%90%E9%9B%84&phone=17600546606&hour=14&type=swimbod&price_time_id=0&post_key=",
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    });
}

bookFunc().then(res => res.json()).then(json => console.log(json)).catch(err => console.log(err));