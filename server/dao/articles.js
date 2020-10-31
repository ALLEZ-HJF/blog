const db = require('../config/db')
const sequelize = db.sequelize
const Op = db.Op
// 引入数据表模型
const articles = db.articles
const users = db.users

class articlesDao {
    // 修改文章
    static async editArticle(data) {
        return await articles.update(data,{
            where: {
                aid: data.aid,
                uid: data.uid
            }
        })
    }
    // 删除文章 state => lock
    static async delArticle(data) {
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
    // 获取用户组列表
    static async getArticleList(data) {
        return await articles.findAndCountAll({
            attributes: ['aid','title','sub_title','content','state','create_time','update_time','uid',sequelize.col('user.nickname'),sequelize.col('user.avater')],
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
                state: data.state || 'invalid'
            },
            include: {
                model: users,
                attributes: []
            },
            raw:true,
            offset: Number(data.page_num - 1) * Number(data.page_size) || 0,
            limit: Number(data.page_size) || 10
        })
    }
}

module.exports = articlesDao