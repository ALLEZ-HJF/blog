const commentsDao = require('../dao/comments')

class commentsController {
    // 删除评论
    static async delComment(ctx) {
        const param = ctx.request.body
        if (!param.commid) {
            ctx.fail(500,'请输入评论id')
            return
        }
        const data = await commentsDao.delComment(param)
        if (data[0]) {
            ctx.success(200,'删除成功')
        } else {
            ctx.fail(500,'删除失败')
        }
    }
    // 添加评论
    static async insertComment(ctx) {
        const param = ctx.request.body
        if (!param.aid) {
            ctx.fail(500,'请输入文章id')
            return
        }
        if (!param.content && !param.imgs) {
            ctx.fail(500,'请输入内容或图片')
            return
        }
        const userInfo = ctx.verify(ctx.request.header.authorization).data
        param.uid = userInfo.uid
        param.nickname = userInfo.nickname
        param.avatar = userInfo.avatar
        param.create_time = Date.now()
        const data = await commentsDao.insertComment(param)
        ctx.response.status = 200
        ctx.success(200,'评论成功',data)
    }
    // 获取评论列表
    static async getCommentList(ctx) {
        const param = ctx.request.body
        if (!param.aid) {
            ctx.fail(500,'请输入文章id')
            return
        }
        const data = await commentsDao.getCommentList(param)
        let replys = []
        data.rows.forEach(item => {
            item.replys.forEach((item2,index) => {
               if (item2.pid !== 0) {
                    replys.push(item2)
                    item.replys.splice(index,1)
               }
            })
            replys.forEach(item3 => {
                item.replys.forEach((item2,index) => {
                    item2.replys = []
                    if (item2.rid === item3.pid) {
                        item2.replys.push(item3)
                        replys.splice(index,1)
                    }
                 })
            })
        })
        ctx.success(200,'获取成功',data)
    }
}

module.exports = commentsController