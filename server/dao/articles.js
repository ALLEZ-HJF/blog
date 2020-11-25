const db = require('../config/db')
const sequelize = db.sequelize
const Op = db.Op
// 引入数据表模型
const articles = db.articles
const categories = db.categories
const article_category = db.article_category
const users = db.users

class articlesDao {
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
            item.state = 'invalid'
        })
        await article.setCategories(categorys)
        return article
    }

    static async getArticleByAid(aid) {
        return await articles.findByPk(aid,{
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

    // 根据分类获取文章列表
    static async getArticleByCid(data) {
        let aids = await article_category.findAll({
            where: {
                cid: data.cid,
                state: data.state || 'valid'
            },
            attributes: ['aid'],
            offset: Number(data.page_num - 1) * Number(data.page_size) || 0,
            limit: Number(data.page_size) || 10
        })
        let count = await article_category.count({
            where: {
                cid: data.cid,
                state: data.state || 'valid'
            }
        })
        aids = aids.map((item) => {
            return item.aid
        })
        let rows = ''
        if (aids.length !== 0) {
            rows =  await articles.findAll({
                where: {
                    aid: aids
                },
                include:[
                    {
                        model: users,
                        attributes: ['nickname','avatar','uid']
                    },
                    {
                        model: categories,
                        attributes: ['name','cid'],
                        through: { attributes: [] },
                        required: false
                    }
                ],
            })
        }
        let result = [ {count: count, rows:rows } ]
        return result
    }

    // 获取文章列表
    static async getArticleList(data) {
        let where = {}
        if (data.cids) {
            where.cid = data.cids.split(',')
        }
        let allData = await articles.findAll({
            attributes: ['aid','title','sub_title','content','state','create_time','update_time','uid','look_num','comment_num','imgs'],
            where: {
                aid: {
                    [Op.like]: `%${data.aid || ''}%`
                },
                uid: {
                    [Op.like]: `%${data.uid || ''}%`
                },
                title: {
                    [Op.like]: `%${data.title || ''}%`
                },
                state: data.state || 'valid'
            },
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
            offset: Number(data.page_num - 1) * Number(data.page_size) || 0,
            limit: Number(data.page_size) || 10
        })
        let count = await articles.count({
            where: {
                aid: {
                    [Op.like]: `%${data.aid || ''}%`
                },
                uid: {
                    [Op.like]: `%${data.uid || ''}%`
                },
                title: {
                    [Op.like]: `%${data.title || ''}%`
                },
                state: data.state || 'valid'
            }
        })
        return { count: count , rows: allData}
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
                aid: data.aid,
                state: 'valid'
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
        let result = articles.update({state: 'lock'},{
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