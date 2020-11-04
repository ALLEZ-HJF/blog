const { sequelize } = require('../config/db')
const db = require('../config/db')
const Op = db.Op
// 引入数据表模型
const users = db.users
const user_group = db.user_group

class userDao {
    // 根据用户名查询到密码返回对比
    static async login(data) {
        return await users.findOne({
            attributes: ['uid','username','nickname','password','phone','avatar','introduction','state','gid'],
            where: {
                username: data.username
            }
        })
    }
    // 修改用户
    static async editUser(data) {
        data.update_time = Date.now()
        return await users.update(data,{
            where: {
                uid: data.uid
            }
        })
    }
    // 删除用户 state => lock
    static async delUser(data) {
        data.update_time = Date.now()
        return await users.update({state: 'lock'},{
            where: {
                uid: data.uid
            }
        })
    }
    // 添加用户
    static async insertUser(data) {
        data.create_time = Date.now()
        return await users.create(data)
    }
    // 根据id 或 用户名 查询用户
    static async getUserByNameOrUid(data) {
        return await users.findOne({
            attributes: ['uid','username','nickname','phone','avatar','introduction','state','gid'],
            where: {
                [Op.or]: [
                    { uid: data.uid },
                    { username: data.username },
                    { email: data.email }
                ]
            }
        })
    }
    static async getUserList(data) {
        return await users.findAndCountAll({
            attributes: ['uid','username','nickname','phone','avatar','introduction','state','gid',sequelize.col('user_group.groupName')],
            where: {
                [Op.and]: [
                    {
                        username: {
                            [Op.like]: `%${data.username}%`
                        }
                    },
                    {
                        phone: {
                            [Op.like]: `%${data.phone}%`
                        }
                    },
                    {
                        state: data.state
                    }
                ]
            },
            include: {
                model: user_group,
                attributes: []
            },
            raw:true,
            offset: data.page_num,
            limit: data.page_size
        })
    }
}

module.exports = userDao