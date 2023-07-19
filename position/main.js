import { locationList } from "./location.js";

const map = new BMapGL.Map('container');
map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放

// 地图居中
const point = new BMapGL.Point(116.404, 39.915);
map.centerAndZoom(point, 15);

locationList.forEach(item => {
    const point = new BMapGL.Point(item.lng, item.lat)
    const circle = new BMapGL.Circle(point, 500, {strokeColor: "blue", strokeWeight: 2, strokeOpacity: 0.5}); //创建圆
    map.addOverlay(circle); //增加圆
    map.addOverlay(new BMapGL.Marker(point, {title: item.name}))
})
