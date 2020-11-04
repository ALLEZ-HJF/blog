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
                commid: data.commid,
                aid: data.aid
            }
        })
    }
     // 添加评论
    static async insertComment(data) {
        return comments.create(data)
    }
    // 获取评论＋回复 根据文章id获取
    static async getCommentByAid(data) {
        return comments.findAll({
            where: {
                aid:data.aid,
                state: data.state || 'valid'
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
                    },
                    required:false
                }
            ]
        })
    }
}

module.exports = commentsDao