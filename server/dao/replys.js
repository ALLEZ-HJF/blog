const db = require('../config/db')
const sequelize = db.sequelize
const Op = db.Op
// 引入数据表模型
const replys = db.replys
const users = db.users
const categories = db.categories

class replysDao {
    // 添加回复
    static async insertReply(data) {
        return await replys.create(data)
    }
    // 删除回复
    static async delReply(data) {
        return await replys.update({state:'lock'},{
            where: {
                rid: data.rid
            }
        })
    }
}

module.exports = replysDao