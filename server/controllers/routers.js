const routersDao = require('../dao/routers')

class routerController {
    // 添加路由
    static async insertRouter(ctx) {
        const param = ctx.request.body
        if (!param.name) {
            ctx.fail(500,'请输入名称')
            return false
        }
        const res = await routersDao.insertRouter(param)
        ctx.success(200,'添加成功',res)
    }
    // 修改路由
    static async editRouter(ctx) {
        const param = ctx.request.body
        if (!param.id) {
            ctx.fail(500,'请携带权限id')
            return false
        }
        const res = await routersDao.editRouter(param)
        if (res[0]) {
            ctx.success(200,'修改成功')
        } else {
            ctx.fail(500,'修改失败')
        }
    }
    // 删除路由
    static async delRouter(ctx) {
        const param = ctx.request.body
        if (!param.id) {
            ctx.fail(500,'请携带权限id')
            return false
        }
        const res = await routersDao.delRouter(param)
        if (res[0]) {
            ctx.success(200,'删除成功')
        } else {
            ctx.fail(500,'删除失败')
        }
    }
    // 全部路由
    static async getRouterList(ctx) {
        const param = ctx.request.body
        const res = await routersDao.getRouterList(param)
        ctx.success(200,'获取成功', res)
    }
    // 用户路由
    static async getWebRouterList(ctx) {
        const res = await routersDao.getWebRouterList()
        ctx.success(200,'获取成功',res)
    }
}

module.exports = routerController