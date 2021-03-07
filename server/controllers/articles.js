const articlesDao = require('../dao/articles')
var { client } = require('../config/baiduApi.js')
const { filterParams } = require('../utils')

class articlesController {

    static async setArticleRecommend(ctx) {
        const param =  filterParams(ctx.request.body, ['aid', 'is_recommend'])
        const res = await articlesDao.setArticleRecommend(param)
        ctx.response.status = 200
        ctx.success(200,'修改成功',res)
    }

    // 获取后台文章列表
    static async getAdminArticleList(ctx) {
        const param =  filterParams(ctx.request.body, ['aid', 'uid', 'title', 'state', 'page_num', 'page_size'])
        const res = await articlesDao.getAdminArticleList(param)
        ctx.response.status = 200
        ctx.success(200,'获取成功',res)
    }
    // 获取文章
    static async getArticleList(ctx) {
        const param = filterParams(ctx.request.body, ['title','is_recommend', 'sortKey' , 'cids' , 'uid' ,'page_num', 'page_size', 'state'])
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

    // 发布文章
    static async insertArticle(ctx) {
        const param = ctx.request.body
        const userInfo = ctx.verify(ctx.header.authorization).data
        param.uid = userInfo.uid
        if (!param.title) {
            ctx.fail(500,'请输入标题')
        } else if (!param.content) {
            ctx.fail(500,'请输入内容')
        } else if (!param.cids) {
            ctx.fail(500,'请选择分类')
        } else {
            // 将标题 副标题 内容合并用于审核字符串是否含有敏感词汇
            let str = ''
            if (param.sub_title) {
                str = str.concat(param.title+',',param.sub_title + ',',param.content)
            } else {
                str = str.concat(param.title + ',',param.content)
            }
           const isPass = await client.textCensorUserDefined(str)
           if (isPass.conclusionType === 1) {
                param.state = 'valid'
           } else {
                param.state = 'invalid'
           }
           const res = await articlesDao.insertArticle(param)
           ctx.success(200,  param.state === 'valid' ? '发布成功' : '发布成功, 请等待管理员审核',res)
        }
    }
    // 删除文章
    static async delArticle(ctx) {
        const param = ctx.request.body
        if (!param.aid) {
            ctx.fail(500,'请输入文章id')
            return
        }
        param.update_time = Date.now()
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
        if (!param.content) {
            ctx.fail(500,'请输入文章内容')
            return
        }
        if (!param.title) {
            ctx.fail(500,'请输入文章标题')
            return
        }
        if (!param.cids) {
            ctx.fail(500,'请选择分类')
            return
        }
        param.update_time = Date.now()
        // 将标题 副标题 内容合并用于审核字符串是否含有敏感词汇
        let str = ''
        if (param.sub_title) {
            str = str.concat(param.title+',',param.sub_title + ',',param.content)
        } else {
            str = str.concat(param.title + ',',param.content)
        }
        const isPass = await client.textCensorUserDefined(str)
        if (isPass.conclusionType === 1) {
                param.state = 'valid'
        } else {
                param.state = 'invalid'
        }
        const res = await articlesDao.editArticle(param)
        if (res[0]) {
            ctx.success(200, param.state === 'valid' ? '修改成功' : '修改成功,请等待管理员审核',res)
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
        param.update_time = Date.now()
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