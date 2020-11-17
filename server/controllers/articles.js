const articlesDao = require('../dao/articles')

class articlesController {

    // 获取文章
    static async getArticleList(ctx) {
        const param = ctx.request.body
        const res = await articlesDao.getArticleList(param)
        ctx.response.status = 200
        ctx.success(200,'获取成功',res)
    }

    static async getArticleByAid(ctx) {
        const aid = ctx.request.body.aid
        if (!aid) {
            ctx.fail(500,'请输入文章id')
            return false
        }
        const res = await articlesDao.getArticleByAid(aid)
        ctx.response.status = 200
        ctx.success(200,'获取成功',res)
    }

    static async getArticleByCid(ctx) {
        const param = ctx.request.body
        const res = await articlesDao.getArticleByCid(param)
        ctx.response.status = 200
        ctx.success(200,'获取成功',res)
    }

    // 发布文章
    static async insertArticle(ctx) {
        const param = ctx.request.body
        const userInfo = ctx.verify(ctx.header.authorization).data
        param.uid = userInfo.uid
        param.create_time = Date.now()
        param.update_time = Date.now()
        if (!param.title) {
            ctx.fail(500,'请输入标题')
        } else if (!param.content) {
            ctx.fail(500,'请输入内容')
        } else if (!param.cids) {
            ctx.fail(500,'请选择分类')
        } else {
            const res = await articlesDao.insertArticle(param)
            ctx.response.status = 200
            ctx.success(200,'发布成功,等待审核',res)
        }
    }
    // 删除文章
    static async delArticle(ctx) {
        const param = ctx.request.body
        if (!param.aid) {
            ctx.fail(500,'请输入文章id')
            return
        }
        const res = await articlesDao.delArticle(param)
        if (res[0]) {
            ctx.success(200,'删除成功',res)
        } else {
            ctx.fail(500,'删除失败')
        }
    }

    // 修改文章
    static async editArticle(ctx) {
        const param = ctx.request.body
        const token = ctx.header.authorization
        if (!param.aid) {
            ctx.fail(500,'请输入文章id')
            return
        }
        if (!param.uid) {
            ctx.fail(500,'请输入用户id')
            return
        }
        if (ctx.verify(token).data.uid != param.uid) {
            ctx.fail(500,'无法修改他人文章')
            return
        }
        const res = await articlesDao.editArticle(param)
        if (res[0]) {
            ctx.success(200,'修改成功',res)
        } else {
            ctx.fail(500,'修改失败')
        }
    }

     // 文章审核
     static async articleVerify(ctx) {
        const param = ctx.request.body
        if (!param.aid) {
            ctx.fail(500,'请输入文章id')
            return
        }
        const res = await articlesDao.articleVerify(param)
        if (res[0]) {
            ctx.response.status = 200
            ctx.success(200,'审核成功',res)
        } else {
            ctx.fail(500,'审核失败')
        }
    }
    // 添加阅读量
    static async addArticleLookNum(ctx) {
        const param = ctx.request.body
        if (!param.aid) {
            ctx.fail(500,'请输入文章id')
            return
        }
        const res = await articlesDao.addArticleLookNum(param)
        if (res[0]) {
            ctx.response.status = 200
            ctx.success(200,'成功')
        } else {
            ctx.fail(500,'失败')
        }
    }
}

module.exports = articlesController