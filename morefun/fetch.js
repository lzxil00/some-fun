require('isomorphic-fetch');

let TIME_OUT = 100;
let start_orderId = 30138635; // 8位数
let count = 1000;
let phone = '13241625824'; // 泽民
// let phone = '17600546600'; // 雄

const orderIdList = new Array(count).fill(0).map((o, i) => start_orderId + i);

const api_coupon = (orderId) => `https://api.i-morefun.com/app/coupon/v1/couponTypeList?orderId=${orderId}&phone=${phone}`;
const resultUrl = (orderId) => `https://static.i-morefun.com/redEnvelopes/index.html?orderId=1604394383297_p_1002&id=${orderId}`

const getInfo = (id) => fetch(api_coupon(id))
    .then(res => res.json())
    .catch(e => {
        console.log(e);
    });

const returnList = [];
const validResult = (modelData = [], strict = true) => {
    if ((strict && modelData.length > 2 && modelData.length < 5) || (!strict && modelData.length > 0)) {
        if (!modelData.find(({telPhone = '', couponPrice = 0}) => telPhone === "176*****606" || couponPrice === 0.88)) {
            return true;
        }
    }
    return false;
};

// Promise.all(orderIdList.map(getInfo)).then(jsonList => {
//     jsonList.forEach(({modelData = []}, i) => {
//         console.log(orderIdList[i], modelData.length);
//         if (validResult(modelData)) returnList.push(orderIdList[i])
//     });
//     returnList.forEach(id => {
//         console.log(resultUrl(id));
//     });
// });


const continueQuery = (orderId) => {
    if (orderId > (start_orderId + count)) {
        returnList.forEach(id => {
            console.log(resultUrl(id));
        });
        return null;
    }
    getInfo(orderId).then(({modelData = []}) => {
        console.log(orderId, modelData.length);
        if (validResult(modelData, false)) console.log(resultUrl(orderId));
        if (validResult(modelData)) {
            console.log(resultUrl(orderId), '!!!!!!!');
            returnList.push(orderId);
        }
        setTimeout(() => continueQuery(orderId + 1), TIME_OUT);
    })
};

continueQuery(start_orderId);
