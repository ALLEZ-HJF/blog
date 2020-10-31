const jwt = require('jsonwebtoken')
const { singKey } = require('../config/config')
function handleToken() {
  return async function (ctx,next) {
    ctx.sign = function (data,option) {
      return jwt.sign(data,singKey,option)
    }
    ctx.verify = function (token) {
      return jwt.verify(token.split(' ')[1], singKey)
    }
    await next()
  }
}

module.exports = handleToken