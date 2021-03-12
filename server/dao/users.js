const { sequelize } = require('../config/db')
const db = require('../config/db')
const moment = require('moment')
const Op = db.Op
// 引入数据表模型
const users = db.users
const user_group = db.user_group
const articles = db.articles

class userDao {
    // 忘记密码
    static async forgetPassword(data) {
        return users.update({ password: data.newPassword }, {
            where: {
                email: data.email,
                username: data.username
            }
        })
    }
    // 作者排行榜
    static async getUserRankingList(data) {
        return await users.findAll({
            attributes: [
                'uid','username','nickname','phone','avatar','introduction',
                [sequelize.literal(`(SELECT COUNT(*) FROM articles WHERE articles.uid = users.uid and articles.state = 'valid')`),'article_count'],
                [sequelize.literal(`(SELECT SUM(articles.look_num) FROM articles WHERE articles.uid = users.uid and articles.state = 'valid')`),'article_look_num']
            ],
            where: sequelize.where(sequelize.literal(`(SELECT COUNT(*) FROM articles WHERE articles.uid = users.uid)`), { [Op.gt] : 0} ),
            include: [
                {
                    model: articles,
                    attributes: []
                }
            ],
            order: sequelize.literal('(SELECT SUM(articles.look_num) FROM articles WHERE articles.uid = users.uid) DESC'),
            offset: Number(data.page_num - 1) * Number(data.page_size) || 0,
            limit: Number(data.page_size) || 10
        })
    } 

    // 根据用户名查询到密码返回对比
    static async login(data) {
        return await users.findOne({
            attributes: ['uid','username','nickname','password','phone','avatar','introduction','state','gid','email'],
            where: {
                username: data.username,
                state: 'valid'
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
    // 修改用户后台
    static async updateUser(data) {
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
    // 添加管理员用户
    static async insertAdminUser(data) {
        return await users.create(data)
    }
    // 根据id 或 用户名 查询用户
    static async getUserInfo(data) {
        var arr = ['uid','username','email','phone']
        let orList = []
        for (const key in data) {
            if (arr.indexOf(key) !== -1) {
                let obj = {}
                 obj[key] = data[key] || ''
                 orList.push(obj)
            }
        }
        if (orList.length === 0) {
            orList.push({
                state: data.state || 'valid'
            })
        }
        return await users.findOne({
            attributes: {
                exclude: ['password']
            },
            where: {
                state: data.state || 'valid',
                [Op.or]: orList
            }
        })
    }
    // 获取今日新增用户数量
    static async getNewUserCount() {
        return await users.count({
            where: {
                create_time: {
                    [Op.gte]: moment().format('YYYY-MM-DD')
                }
            }
        })
    }
    static async getUserList(data) {
       var arr = ['uid','username','phone','email']
       let orList = []
       for (const key in data) {
           if (arr.indexOf(key) !== -1) {
               let obj = {}
                obj[key] = {
                    [Op.like]: `%${data[key] || '' }%`
                }
                orList.push(obj)
           }
       }
       if (orList.length === 0) {
           orList.push({
               state: data.state || 'valid'
           })
       }
        return await users.findAndCountAll({
            attributes: ['uid','username','nickname','phone','avatar','introduction','state','gid','email','sex',sequelize.col('user_group.groupName')],
            where: {
                state: data.state || 'valid',
                [Op.or]: orList
            },
            include: {
                model: user_group,
                attributes: []
            },
            raw:true,
            offset: Number(data.page_num - 1) * Number(data.page_size) || 0,
            limit: Number(data.page_size) || 10
        })
    }
}

module.exports = userDao