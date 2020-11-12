const db = require('../config/db')
const Sequelize = db.sequelize
// 引入数据表模型
const user_group = db.user_group

class UserGroupDao {
    // 获取用户组列表
    static async getUserGroupList(data) {
        return await user_group.findAndCountAll({
            where: {
                state: data.state || 'valid'
            },
            offset: Number(data.page_num - 1) * Number(data.page_size) || 0,
            limit: Number(data.page_size) || 10
        })
    }

    // 添加用户组
    static async insertUserGroup(data) {
        return await user_group.create(data)
    }
     // 修改用户组
    static async editUserGroup(data) {
        return await user_group.update(data,{
            where: {
                gid: data.gid
            }
        })
    }
    // 删除用户组
    static async delUserGroup(data) {
        return await user_group.update({state: 'lock'},{
            where: {
                gid: data.gid
            }
        })
    }
}

module.exports = UserGroupDao