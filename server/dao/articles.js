const db = require('../config/db')
const { filterParams } = require('../utils')
const sequelize = db.sequelize
const moment = require('moment')
const Op = db.Op
// 引入数据表模型
const articles = db.articles
const categories = db.categories
const article_category = db.article_category
const users = db.users

class articlesDao {
    // 推荐, 取消推荐
    static async setArticleRecommend(data) {
        return await articles.update({ is_recommend: data.is_recommend }, {
            where: {
                aid: data.aid
            }
        })
    }

    // 添加文章
    static async insertArticle(data) {
        let article = await articles.create(data)
        let cids = data.cids.split(',')
        let categorys = await categories.findAll({
            where: {
                cid: cids
            }
        })
        categorys.forEach(item => {
            item.state = data.state
        })
        await article.setCategories(categorys)
        return article
    }

    static async getArticleByAid(aid) {
        return await articles.findOne({
            where: {
                aid: aid,
                state: 'valid'
            },
            include:[
                {
                    model: users,
                    attributes: ['nickname','username','avatar','uid', 'introduction']
                },
                {
                    model: categories,
                    attributes: ['name','cid'],
                    through: { attributes: [] },
                    required: false
                }
            ]
        })
    }
    // 获取新增文章数量与未审核数量
    static async getArticleSummary() {
        const newCount = await articles.count({
            where: {
                create_time: {
                    [Op.gte]: moment().format('YYYY-MM-DD')
                }
            }
        })
        const invalidCount = await articles.count({
            where: {
                state: 'invalid'
            }
        })
        return {newCount:newCount,invalidCount: invalidCount}
    }

    // 后台获取文章列表
    static async getAdminArticleList(data) {
        let params = filterParams(data, ['aid', 'uid', 'title', 'state'])
        if (data.title) {
            let obj = {}
            for (const key in params) {
                if (key === 'title') {
                    // title 模糊查询
                    obj['title'] = {
                        [Op.like]: '%'+params[key]+'%'
                    }
                } else {
                    obj[key] = params[key]
                }
            }
            params = obj
        }
        let list = await articles.findAndCountAll({
            where: params,
            include: [
                {
                    model: users,
                    attributes: ['nickname','username','avatar','uid']
                },
                {
                    model: categories,
                    attributes: ['name','cid'],
                    through: { attributes: [] },
                    required: true
                }
            ],
            distinct: true,
            order: [[data.sortKey ? data.sortKey : 'create_time', 'DESC'] ],
            offset: Number(data.page_num - 1) * Number(data.page_size) || 0,
            limit: Number(data.page_size) || 10
        })
        return list
    }

    // 获取文章列表
    static async getArticleList(data) {
        let where = {}
        if (data.cids) {
            where.cid = data.cids.split(',')
        }
        let obj = {}
        let params = filterParams(data, ['title' , 'is_recommend', 'uid', 'state'])
        for (const key in params) {
            if (key === 'title') {
                // title 模糊查询
                obj['title'] = {
                    [Op.like]: '%'+params[key]+'%'
                }
            } else {
                if (key === 'is_recommend') {
                    obj[key] = params[key] === 'true' ? true : false
                } else {
                    obj[key] = params[key]
                }
            }
        }
        let list = await articles.findAndCountAll({
            attributes: ['aid','title','sub_title','content','state','create_time','update_time','uid','look_num','comment_num','imgs'],
            where: obj ,
            include:[
                {
                    model: users,
                    attributes: ['nickname','username','avatar','uid']
                },
                {
                    model: categories,
                    where: where,
                    attributes: ['name','cid'],
                    through: { attributes: [] },
                    required: true
                }
            ],
            distinct: true,
            order: [[data.sortKey ? data.sortKey : 'create_time', 'DESC'] ],
            offset: Number(data.page_num - 1) * Number(data.page_size) || 0,
            limit: Number(data.page_size) || 10
        })
        return list
    }

    // 添加评论数或者减少评论数
    static async handleArticleCommentNum(data,flag) {
        let article = await articles.findByPk(data.aid)
        let num = flag ? ++ article.comment_num : -- article.comment_num
        await articles.update({comment_num: num, update_time: Date.now()},{
            where: {
                aid: data.aid,
                state: 'valid'
            }
        })
    }

     // 添加阅读量
    static async addArticleLookNum(data) {
        let article = await articles.findByPk(data.aid)
        return await articles.update({look_num: ++article.look_num ,update_time: Date.now()},{
            where: {
                aid: data.aid
            }
        })
    }
     // 审核文章 state => valid
    static async articleVerify(data) {
        let result = await articles.update({state:'valid',update_time: Date.now()},{
            where: {
                aid: data.aid
            }
        })
        article_category.update({state:'valid'},{
            where: {
                aid: data.aid
            }
        })
        return result
    }
    // 修改文章
    static async editArticle(data) {
        data.update_time = Date.now()
        let cids = data.cids.split(',')
        let categorys = await categories.findAll({
            where: {
                cid: cids
            }
        })
        let result = []
        let article = await articles.findByPk(data.aid)
        if (article === null) {
            result = [0]
        } else {
            result = articles.update(data,{
                where: {
                    aid: data.aid,
                    uid: data.uid
                }
            })
            await article.setCategories(categorys)
        }
        return result
    }
    // 删除文章 state => lock
    static async delArticle(data) {
        data.update_time = Date.now()
        let result = articles.update({state: 'delete'},{
            where: {
                aid: data.aid
            }
        })
        article_category.update({state:'lock'},{
            where: {
                aid: data.aid
            }
        })
        return result 
    }

}

module.exports = articlesDao