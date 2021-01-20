// 权限验证中间件
const userGroupProwerDao = require('../dao/user_group_power')
const usersDao = require('../dao/users')
module.exports = function() {
    return async function(ctx, next) {
        let userInfo = ''
        let isPass = false
        /* web/admin web无需权限验证 */
        if (ctx.request.path.indexOf('web') !== -1) {
            isPass = true
        } else {
            if (ctx.request.path !== '/favicon.ico') {
                if (ctx.header.authorization) { // 已经登陆
                    const info = ctx.verify(ctx.header.authorization).data
                    userInfo = await usersDao.getUserInfo({uid:info.uid})
                    if (userInfo.gid) {
                        // 管理员
                        let pathArr = ctx.request.path.split('/')
                        pathArr.splice(0,2)
                        isPass = await userGroupProwerDao.verifyPrower(pathArr.join('/'), userInfo.gid)
                    } else {
                        isPass = false
                    }
                } else {
                    isPass = false
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