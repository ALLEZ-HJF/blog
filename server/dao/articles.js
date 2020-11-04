const db = require('../config/db')
const sequelize = db.sequelize
const Op = db.Op
// 引入数据表模型
const articles = db.articles
const users = db.users
const categories = db.categories

class articlesDao {
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
        return await articles.update({state:'valid',update_time: Date.now()},{
            where: {
                aid: data.aid
            }
        })
    }
    // 修改文章
    static async editArticle(data) {
        data.update_time = Date.now()
        return await articles.update(data,{
            where: {
                aid: data.aid,
                uid: data.uid
            }
        })
    }
    // 删除文章 state => lock
    static async delArticle(data) {
        data.update_time = Date.now()
        return await articles.update({state: 'lock'},{
            where: {
                aid: data.aid
            }
        })
    }
    // 添加文章
    static async insertArticle(data) {
        return await articles.create(data)
    }
    // 获取文章列表
    static async getArticleList(data) {
        return await articles.findAndCountAll({
            attributes: ['aid','title','sub_title','content','state','create_time','update_time','uid','look_num',sequelize.col('user.nickname'),sequelize.col('user.avatar'),sequelize.col('category.cid'),sequelize.col('category.name')],
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
                cid: {
                    [Op.like]: `%${data.cid || ''}%`
                },
                state: data.state || 'invalid'
            },
            include:[
                {
                    model: users,
                    attributes: []
                },
                {
                    model: categories,
                    attributes: []
                }
            ],
            raw:true,
            offset: Number(data.page_num - 1) * Number(data.page_size) || 0,
            limit: Number(data.page_size) || 10
        })
    }
}

module.exports = articlesDao