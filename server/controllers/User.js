const userModel = require('../models/user')

class userController {
    // 获取所有用户
    static async getUserList(ctx) {
        const data = await userModel.getUserList()
        ctx.response.status = 200
        ctx.body = {
            code: 200,
            data: data,
            msg: '获取成功'
        }
    }
    // 添加用户
    static async addUser(ctx) {
        let body = ctx.request.body
        const data = await userModel.addUser(body)
        ctx.response.status = 200
        ctx.body = {
            code: 200,
            data: data,
            msg: '添加成功'
        }
    }
}

module.exports = userController