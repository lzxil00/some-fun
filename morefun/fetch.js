require('isomorphic-fetch');

const TIME_OUT = 100;
const start_orderId = 30121000; // 8位数
const count = 1000;
// const phone = '13241625824'; // 泽民
const phone = '17600546600'; // 雄

const oldData = require('./data'); // 旧数据
const returnList = [];
const returnListImportant = [];

const api_coupon = (orderId) => `https://api.i-morefun.com/app/coupon/v1/couponTypeList?orderId=${orderId}&phone=${phone}`;
const resultUrl = (orderId) => `https://static.i-morefun.com/redEnvelopes/index.html?orderId=1604394383297_p_1002&id=${orderId}`

// 网络查询数据
const getInfo = (id) => fetch(api_coupon(id))
  .then(res => res.json())
  .catch(e => {
    console.log(e);
  });

// 校验结果是否符合
const validResult = (modelData = [], strict = true) => {
  if ((strict && modelData.length > 2 && modelData.length < 5) || (!strict && modelData.length > 0)) {
    if (!modelData.find(({telPhone = '', couponPrice = 0}) => telPhone === "176*****606" || couponPrice === 0.88)) {
      return true;
    }
  }
  return false;
};

// 延迟
const wait = (time) => new Promise(resolve => {
  setTimeout(() => resolve(), time);
});

// 遍历查询
const query = async (orderIdList) => {
  for (let i = 0; i < orderIdList.length; i++) {
    let orderId = orderIdList[i];
    const {modelData = []} = await getInfo(orderId);
    console.log(orderId, modelData.length);
    if (validResult(modelData, false)) {
      console.log(resultUrl(orderId));
      returnList.push(orderId);
    }
    if (validResult(modelData)) {
      console.log(resultUrl(orderId), '!!!!!!!');
      returnListImportant.push(orderId);
    }
    await wait(TIME_OUT);
  }
}

// 获取数组
const getList = (startId = 0, length = 0) => {
  const arr = [];
  for (let i = 0; i < length; i++) {
    arr.push(startId + i);
  }
  return arr;
}

// 最新数组由旧数据+新数据
const orderIdList = [...oldData, ...getList(start_orderId, count)];
query(orderIdList).then(() => {
  console.log("===================================================")
  returnList.forEach(id => console.log(resultUrl(id)));
  returnListImportant.forEach(id => console.log(resultUrl(id), '!!!!!!!'));
});
