const resourcesDao = require('../dao/resources')

class resourcesController {
    //  获取资源列表
    static async getResourceList(ctx) {
        const param = ctx.request.body
        const res = await resourcesDao.getResourceList(param)
        ctx.success(200,'获取成功',res)
    }

    static async insertResource(ctx,resourceList) {
        const uid = ctx.verify(ctx.header.authorization).data.uid
        if (!resourceList|| resourceList.length === 0) {
            ctx.fail(500,'数据不能为空')
            return false
        }
        resourceList.forEach(item => {
            item.uid = uid
        })
        const res = await resourcesDao.insertResource(resourceList)
        ctx.success(200,'添加成功',res)
    }
     // 删除资源
    static async delResource(ctx) {
        const param = ctx.request.body
        if (!param.rid) {
            ctx.fail(500,'请输入资源id')
            return false
        }
        const res = await resourcesDao.delResource(param.rid)
        if (res[0]) {
            ctx.success(200,'删除成功')
        } else {
            ctx.fail(500,'删除失败')
        }
    }
}

module.exports = resourcesController