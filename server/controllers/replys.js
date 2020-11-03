const replysDao = require('../dao/replys')

class replysController {
    // 添加回复
    static async insertReply(ctx) {
        const param = ctx.request.body
        const userInfo = ctx.verify(ctx.header.authorization).data
        param.uid = userInfo.uid
        param.create_time = Date.now()
        param.update_time = Date.now()
        if (!param.commid) {
            ctx.fail(500,'请输入评论id')
        } else if (!param.content && !param.imgs) {
            ctx.fail(500,'请输入内容或图片')
        } else {
            const res = await replysDao.insertReply(param)
            ctx.response.status = 200
            ctx.success(200,'回复成功')
        }
    }
    // 添加回复
    static async delReply(ctx) {
        const param = ctx.request.body
        if (!param.rid) {
            ctx.fail(500,'请输入回复id')
            return
        }
        const data = await replysDao.delReply(param)
        if (data[0]) {
            ctx.success(200,'删除成功')
        } else {
            ctx.fail(500,'删除失败')
        }
    }
}

module.exports = replysController