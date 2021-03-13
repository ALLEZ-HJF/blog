const replysDao = require('../dao/replys')
const articles = require('../dao/articles')
var { client } = require('../config/baiduApi.js')
class replysController {
    // 添加回复
    static async insertReply(ctx) {
        const param = ctx.request.body
        const userInfo = ctx.verify(ctx.header.authorization).data
        param.uid = userInfo.uid
        if (!param.commid) {
            ctx.fail(500,'请输入评论id')
        } else if (!param.content && !param.imgs) {
            ctx.fail(500,'请输入内容或图片')
        } else if (!param.aid) {
            ctx.fail(500,'请输入文章id')
        } else {
            const isPass = await client.textCensorUserDefined(param.content)
            if (isPass.conclusionType === 1) {
                const res = await replysDao.insertReply(param)
                ctx.response.status = 200
                ctx.success(200,'回复成功',res)
                articles.handleArticleCommentNum({aid:param.aid},true)
            } else {
                ctx.fail(500, '回复失败' + isPass.data.map(x => x.msg).join(','))
            }
        }
    }
    // 删除回复
    static async delReply(ctx) {
        const param = ctx.request.body
        if (!param.rid) {
            ctx.fail(500,'请输入回复id')
            return
        }
        if (!param.aid) {
            ctx.fail(500,'请输入文章id')
            return
        }
        const data = await replysDao.delReply(param)
        if (data[0]) {
            ctx.success(200,'删除成功')
            articles.handleArticleCommentNum({aid:param.aid},false)

        } else {
            ctx.fail(500,'删除失败')
        }
    }
}

module.exports = replysController