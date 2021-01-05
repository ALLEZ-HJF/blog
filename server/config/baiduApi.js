var AipContentCensorClient = require("../sdk/baidu").contentCensor;

// 设置APPID/AK/SK
var APP_ID = "23487413";
var API_KEY = "g1Xp1FF7iyCEAv6DjeDkZDfn";
var SECRET_KEY = "20lLo04SyVphnOO9hAuElysRiT4Z8O5o";

// 新建一个对象，建议只保存一个对象调用服务接口
const client = new AipContentCensorClient(APP_ID, API_KEY, SECRET_KEY)

module.exports = {
    client: client
}