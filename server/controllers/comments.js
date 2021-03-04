const commentsDao = require('../dao/comments')
const articlesDao = require('../dao/articles')

class commentsController {
    // 删除评论
    static async delComment(ctx) {
        const param = ctx.request.body
        if (!param.commid) {
            ctx.fail(500,'请输入评论id')
            return
        }
        if (!param.aid) {
            ctx.fail(500,'请输入文章')
            return
        }
        param.update_time = Date.now()
        const data = await commentsDao.delComment(param)
        if (data[0]) {
            ctx.success(200,'删除成功')
            articlesDao.handleArticleCommentNum({aid: param.aid},false)
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
        const data = await commentsDao.insertComment(param)
        ctx.response.status = 200
        ctx.success(200,'评论成功',data)
        // 为文章添加评论数
        articlesDao.handleArticleCommentNum({aid:param.aid},true)
    }
    // 获取评论＋回复 根据文章id获取
    static async getCommentByAid(ctx) {
        const param = ctx.request.body
        if (!param.aid) {
            ctx.fail(500,'请输入文章id')
            return
        }
        const data = await commentsDao.getCommentByAid(param)
        ctx.success(200,'获取成功',data)
    }
}

module.exports = commentsController