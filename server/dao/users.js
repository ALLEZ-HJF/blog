const db = require('../config/db')
const Op = db.Op
// 引入数据表模型
const user = db.user
const user_group = db.user_group

class userDao {
    // 修改用户
    static async editUser(data) {
        return await user.update(data,{
            where: {
                uid: data.uid
            }
        })
    }
    // 删除用户 state => lock
    static async delUser(data) {
        return await user.update({state: 'lock'},{
            where: {
                uid: data.uid
            }
        })
    }
    // 添加用户
    static async insertUser(data) {
        return await user.create(data)
    }
    // 根据id 或 用户名 查询用户
    static async getUserByNameOrUid(data) {
        if (!data.uid) {
            data.uid = '' 
        }
        if (!data.username) {
            data.username = ''
        }
        return await user.findOne({
            where: {
                [Op.or]: [
                    { uid: data.uid },
                    { username: data.username }
                ]
            }
        })
    }
    static async getUserList(data) {
        if (!data.username) {
            data.username = ''
        }
        if (!data.phone) {
            data.phone = ''
        }
        if (!data.state) {
            data.state = 'valid'
        }
        if (!data.page_num) {
            data.page_num = 0
        } else {
            data.page_num = --data.page_num * data.page_size
        }
        if (!data.page_size) {
            data.page_size = 10
        } else {
            data.page_size = Number(data.page_size)
        }
        return await user.findAndCountAll({
            attributes: ['uid','username','nickname','phone','avater','introduction','state','gid'],
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
                attributes: ['groupName']
            },
            offset: data.page_num,
            limit: data.page_size
        })
    }
}

module.exports = userDao