const db = require('../config/db')
const Sequelize = db.sequelize
// 引入数据表模型
const user_group_power = db.user_group_power
const routers = db.routers
const user_group = db.user_group

class UserGroupPowerDao {
    // 获取用户组已分配的权限
    static async getPowerByGid(param) {
       let allRouter = await routers.findAll({
           where: {
               state: 'valid',
               role: param.role || 'user',
               pid: null
           },
           order: [['sort','DESC']],
            include : {
                model: routers,
                as:'child', 
                required : false,
                include : {
                    model: routers,
                    as:'child',
                    required : false
                }
            }
       })
       let data =  await user_group_power.findAll({
            where: {
                gid: param.gid
            }
        })
       return { router: allRouter, data: data.map(x => x.rid) }
    }
    static async editPowerByGid(gid,rids) {
        let routerArr = await routers.findAll({
            where: {
                rid: rids
            }
        })
        let userGroup = await user_group.findByPk(gid)
        return await userGroup.setRouters(routerArr)
    }
}

module.exports = UserGroupPowerDao