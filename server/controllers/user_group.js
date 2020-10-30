const userGroupDao = require('../dao/user_group')

class userGroupController {

    // 获取用户组列表
    static async getUserGroupList(ctx) {
        const data = ctx.request.body
        const res = await userGroupDao.getUserGroupList(data)
        ctx.response.status = 200
        ctx.success(200,'获取成功',res)
    }
}

module.exports = userGroupController