// 获取用户ip地址
function getClientIP(req) {
    let ip= req.headers['x-forwarded-for'] || // 判断是否有反向代理 IP
      req.ip  ||
      req.connection.remoteAddress || // 判断 connection 的远程 IP
      req.socket.remoteAddress || // 判断后端的 socket 的 IP
      req.connection.socket.remoteAddress || ''
    if(ip) {
      ip = ip.replace('::ffff:', '')
    }
    return ip;
  }

  // 过滤传递参数 只保留需要的字段参数 data 页面传递参数数据  params需要的参数数组
  function filterParams(data, params = [] ) {
    let obj = {}
    for (const key in data) {
      if (params.indexOf(key) !== -1) {
        obj[key] = data[key]
      }
    }
    return Object.keys(obj).length === 0 ? null : obj
  }
  
  module.exports = { getClientIP,filterParams }