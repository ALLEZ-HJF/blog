const userDao = require('../dao/users')

class userController {
    // 获取所有用户
    static async getUserList(ctx) {
        let param = ctx.request.body
        if (!param.username) {
            param.username = ''
        }
        if (!param.phone) {
            param.phone = ''
        }
        if (!param.state) {
            param.state = 'valid'
        }
        if (!param.page_num) {
            param.page_num = 0
        } else {
            param.page_num = --param.page_num * param.page_size
        }
        if (!param.page_size) {
            param.page_size = 10
        } else {
            param.page_size = Number(param.page_size)
        }
        const data = await userDao.getUserList(param)
        ctx.response.status = 200
        ctx.success(200,'获取成功',data)
    }
    // 添加用户
    static async insertUser(ctx) {
        let param = ctx.request.body
        if (!param.uid) {
            param.uid = '' 
        }
        if (!param.username) {
            param.username = ''
        }
        const data = await userDao.getUserByNameOrUid(param)
        if (!data) {
            const data = await userDao.insertUser(param)
            ctx.response.status = 200
            ctx.success(200,'添加成功',data)
        } else {
            ctx.fail(500,'用户已存在')
        }
    }
    // 删除用户
    static async delUser(ctx) {
        let body = ctx.request.body
        const data = await userDao.delUser(body)
        ctx.response.status = 200
        ctx.success(200,'删除成功',data)
    }
    // 修改用户
    static async editUser(ctx) {
        let body = ctx.request.body
        const data = await userDao.editUser(body)
        ctx.response.status = 200
        ctx.success(200,'修改成功',data)
    }
}

module.exports = userController