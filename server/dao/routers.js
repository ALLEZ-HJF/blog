const db = require('../config/db')
const routers = db.routers
const user_group_power = db.user_group_power
const Op = db.Op

class routersDao {
    // 添加路由
    static async insertRouter(data) {
        return await routers.create(data)
    }
    // 修改路由
    static async editRouter(data) {
        data.update_time = Date.now()
        return await routers.update(data,{
            where: {
                id: data.id
            }
        })
    }
    // 删除路由
    static async delRouter(data) {
        data.update_time = Date.now()
        return await routers.update({'state': 'lock'},{
            where: {
                id: data.id
            }
        })
    }
    // 获取路由列表
    static async getRouterList(data) {
        return await routers.findAll({
            where: {
                state: data.state || 'valid',
                role: data.role || 'user',
                is_page: 'yes',
                pid: null
            },
            order: [['sort','DESC']],
            include : {
                model: routers,
                as:'child', 
                required : false,
                where: {
                    state: data.state || 'valid',
                    role: data.role || 'user',
                    is_page: 'yes'
                },
                include : {
                    model: routers,
                    as:'child',
                    required : false,
                    where: {
                        state: data.state || 'valid',
                        role: data.role || 'user',
                        is_page: 'yes'
                    },
                    include : {
                        model: routers,
                        as:'child',
                        required : false,
                        where: {
                            state: data.state || 'valid',
                            role: data.role || 'user',
                            is_page: 'yes'
                        }
                    }
                }
            }
        })
    }
    // 获取用户组的路由
    static async getAdminRouterList(gid) {
        const prowerArr = await user_group_power.findAll({
            attributes: ['rid'],
            where: {
                gid: gid
            }
        })
        const rids = prowerArr.map(x => x.rid)
        return await routers.findAll({
            where: {
                is_page: 'yes',
                pid: null,
                rid: rids
            },
            order: [['sort','DESC']],
            include : {
                model: routers,
                as:'child', 
                required : false,
                where: {
                    rid: rids,
                    is_page: 'yes'
                },
                include : {
                    model: routers,
                    as:'child', 
                    required : false,
                    where: {
                        rid: rids,
                        is_page: 'yes'
                    },
                    include : {
                        model: routers,
                        as:'child', 
                        required : false,
                        where: {
                            rid: rids,
                            is_page: 'yes'
                        }
                    }
                }
            }
        })
    }
    // 获取路由列表 不需要登录
    static async getWebRouterList() {
        return await routers.findAll({
            where: {
                role: 'user',
                state: 'valid',
                is_page: 'yes',
                pid: null
            },
            order: [['sort','DESC']],
            include : {
                model: routers,
                as:'child', 
                required : false,
                where: {
                    role: 'user',
                    state: 'valid',
                    is_page: 'yes',
                },
                include : {
                    model: routers,
                    as:'child',
                    required : false,
                    include : {
                        model: routers,
                        as:'child',
                        required : false,
                        where: {
                            role: 'user',
                            state: 'valid',
                            is_page: 'yes',
                        }
                    }
                }
            }
        })
    }
}

module.exports = routersDao