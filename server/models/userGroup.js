const db = require('../config/db')
const Sequelize = db.sequelize
// 引入数据表模型
const UserGroup = Sequelize.import('../schema/UserGroup');
// 自动创建数据表
UserGroup.sync({force:false})

class UserGroupModel {
    // 获取用户组列表
    static async getUserGroupList(data) {
        return await UserGroup.findAll(data)
    }
}

module.exports = UserGroupModel