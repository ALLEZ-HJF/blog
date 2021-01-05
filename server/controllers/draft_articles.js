const draftArticlesDao = require('../dao/draft_articles')

class draftArticlesController {

    // 根据用户id获取草稿文章列表
    static async getDraftArticleList(ctx) {
        const token = ctx.header.authorization
        const uid = ctx.verify(token).data.uid
        const param = ctx.request.query
        param.uid = uid
        const res = await draftArticlesDao.getDraftArticleList(param)
        ctx.response.status = 200
        ctx.success(200,'获取成功',res)
    }
    //  添加草稿    
    static async insertDraftArticle(ctx) {
        const param = ctx.request.body
        if (!param.title) {
            ctx.fail(500,'请输入标题')
        } else if (!param.content) {
            ctx.fail(500,'请输入文章内容')
        } else {
            const token = ctx.header.authorization
            param.uid = ctx.verify(token).data.uid
            const data = await draftArticlesDao.insertDraftArticle(param)
            if (data.did) {
                ctx.success(200,'新增草稿成功',data)
            } else {
                ctx.fail(500,'新增草稿失败',data)
            }
        }
    }

    // 更改草稿
    static async editDraftArticle(ctx) {
        const param = ctx.request.body
        if (!param.did) {
            ctx.fail(500,'更新失败,草稿id不能为空')
        } else if (!param.title) {
            ctx.fail(500,'请输入标题')
        } else if (!param.content) {
            ctx.fail(500,'请输入文章内容')
        } else {
            param.update_time = Date.now()
            const data = await draftArticlesDao.editDraftArticle(param)
            if (data[0]) {
                ctx.success(200,'修改成功')
            } else {
                ctx.fail(500,'修改失败')
            }
        }
    }

    // 删除草稿
    static async delDraftArticle(ctx) {
        const param = ctx.request.body
        if (!param.did) {
            ctx.fail(500,'草稿id不能为空')
        } else {
            const data = await draftArticlesDao.delDraftArticle(param.did)
            if (data) {
                ctx.success(200,'删除成功')
            } else {
                ctx.fail(500,'删除失败')
            }
        }
    }
}

module.exports = draftArticlesController