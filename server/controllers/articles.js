const articlesDao = require('../dao/articles')

class articlesController {

    // 获取用户组列表
    static async getArticleList(ctx) {
        const data = ctx.request.body
        const res = await articlesDao.getArticleList(data)
        ctx.response.status = 200
        ctx.success(200,'获取成功',res)
    }
}

module.exports = articlesController