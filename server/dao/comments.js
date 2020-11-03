const db = require('../config/db')
const Op = db.Op
const sequelize = db.sequelize
const comments = db.comments
const replys = db.replys
const users = db.users

class commentsDao {
     // 删除评论
     static async delComment(data) {
        return comments.update({state:'lock'},{
            where: {
                commid: data.commid
            }
        })
    }
     // 添加评论
    static async insertComment(data) {
        return comments.create(data)
    }
    // 获取评论列表
    static async getCommentList(data) {
        return comments.findAndCountAll({
            where: {
                aid:data.aid,
                state: data.state || 'valid',
                uid: {
                    [Op.like]: `%${data.uid || ''}%`
                }
            },
            include: [
                {
                    model: replys,
                    attributes: ['rid','commid','uid','pid','content','imgs','state','create_time'],
                    where: {
                        state: 'valid'
                    },
                    include: {
                        model: users,
                        attributes: ['nickname','avatar']
                    }
                }
            ],
            offset: Number(data.page_num - 1) * Number(data.page_size) || 0,
            limit: Number(data.page_size) || 10
        })
    }
}

module.exports = commentsDao