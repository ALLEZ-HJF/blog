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
        return comments.findAndCountAll({
            where: {
                aid:data.aid,
                state: data.state || 'valid'
            },
            as: 'comments',
            include: [
                {
                    model: replys,
                    attributes: ['rid','commid','uid','pid','content','imgs','state','create_time'],
                    as: 'replys',
                    where: {
                        state: 'valid'
                    },
                    required : false,
                    include: [
                        {
                            model: users,
                            attributes: ['nickname','avatar']
                        },
                        {
                            model: replys,
                            required : false,
                            attributes: ['rid','commid','uid','pid','content','imgs','state','create_time'],
                            as:'replys', 
                            where: {
                                state: 'valid'
                            }
                        }
                    ],
                    required:false
                },
                {
                    model: users,
                    attributes: ['nickname','avatar']
                }
            ],
            offset: Number(data.page_num - 1) * Number(data.page_size) || 0,
            limit: Number(data.page_size) || 10,
            order: [['create_time','DESC'],['replys','create_time','DESC']]
        })
    }
}

module.exports = commentsDao