const db = require('../config/db')
const Sequelize = db.sequelize
// 引入数据表模型
const user = Sequelize.import('../schema/user');
// 自动创建数据表
user.sync({force:false})

class userModel {
    // 创建用户模型
    static async adduser(data) {
        return await user.create(data)
    }

    static async getUserList() {
        return await user.findAll({
            attributes: ['username','nickname','phone','avater']
        })
    }
}

module.exports = userModel