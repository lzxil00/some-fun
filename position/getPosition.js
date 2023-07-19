import {nameList} from "./nameList.js";

const map = new BMapGL.Map('container');
map.centerAndZoom(new BMapGL.Point(116.331398, 39.897445), 12);
//创建地址解析器实例
const myGeo = new BMapGL.Geocoder();

let count = 0
const getPosition = name => {
  count++;
  return new Promise((resolve, reject) => {
    let index = count;
    setTimeout(() => {
      myGeo.getPoint(name, function (point) {
        console.log(`${index}/${nameList.length + 1}`);
        if (point) {
          resolve({point, name})
        } else {
          reject(`未找到：${name}`)
        }
      }, '北京市')
    }, count * 500)
  })
}

Promise.all(nameList.map(getPosition))
  .then(result => {
    console.log(result.map(({point, name}) => `{name: '${name}', lng: ${point.lng}, lat: ${point.lat}},`).join(''))
  })
  .catch(e => {
    console.log(e)
  })
