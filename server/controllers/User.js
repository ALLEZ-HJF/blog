const userModel = require('../models/user')

class userController {
    // 获取所有用户
    static async getUserList(ctx) {
        const data = await userModel.getUserList(ctx.request.body)
        ctx.response.status = 200
        ctx.success(200,'获取成功',data)
    }
    // 添加用户
    static async insertUser(ctx) {
        let body = ctx.request.body
        const data = await userModel.getUserByNameOrUid(body)
        if (!data) {
            const data = await userModel.insertUser(body)
            ctx.response.status = 200
            ctx.success(200,'添加成功',data)
        } else {
            ctx.fail(500,'用户已存在')
        }
    }
    // 删除用户
    static async delUser(ctx) {
        let body = ctx.request.body
        const data = await userModel.delUser(body)
        ctx.response.status = 200
        ctx.success(200,'删除成功',data)
    }
    // 修改用户
    static async editUser(ctx) {
        let body = ctx.request.body
        const data = await userModel.editUser(body)
        ctx.response.status = 200
        ctx.success(200,'修改成功',data)
    }
}

module.exports = userController