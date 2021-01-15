// 权限验证中间件
const userGroupProwerDao = require('../dao/user_group_power')
const { path } = require('../config/noFilter')
module.exports = function() {
    return async function(ctx, next) {
        let userInfo = ''
        let isPass = false
        /* web/admin web无需权限验证 */
        if (ctx.request.path.indexOf('web')) {
            isPass = true
        } else {
            if (ctx.request.path !== '/favicon.ico') {
                if (ctx.header.authorization) { // 已经登陆
                    userInfo = ctx.verify(ctx.header.authorization).data
                }
                if (userInfo.gid) {
                     isPass = await userGroupProwerDao.verifyPrower()
                }
            }
        }
        if (isPass) {
            await next()
        } else {
            ctx.fail(500,'无权限操作')
        }
    }
}