const db = require('../config/db')
const Sequelize = db.sequelize
// 引入数据表模型
const articles = db.articles
const users = db.users

class articlesDao {
    // 获取用户组列表
    static async getArticleList(data) {
        return await articles.findAndCountAll({})
    }
}

module.exports = articlesDao