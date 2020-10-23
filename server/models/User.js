const db = require('../config/db')
const Sequelize = db.sequelize
// 引入数据表模型
const User = Sequelize.import('../schema/User');
// 自动创建数据表
User.sync({force:false})

class UserModel {
    // 创建用户模型
    static async addUser(data) {
        return await User.create(data)
    }

    static async getAllUser() {
        return await User.findAll({
            attributes: ['username','nickname','phone','id','avater']
        })
    }
}

module.exports = UserModel