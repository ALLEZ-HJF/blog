const UserModel = require('../models/User')

class userController {
    // 获取所有用户
    static async getAll(ctx) {
        const data = await UserModel.getAllUser()
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
        const data = await UserModel.addUser(body)
        ctx.response.status = 200
        ctx.body = {
            code: 200,
            data: data,
            msg: '添加成功'
        }
    }
}

module.exports = userController