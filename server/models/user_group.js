const db = require('../config/db')
const Sequelize = db.sequelize
// 引入数据表模型
const user_group = db.user_group

class UserGroupModel {
    // 获取用户组列表
    static async getUserGroupList(data) {
        return await user_group.findAll(data)
    }
}

module.exports = UserGroupModel