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
    // 验证权限
    static async verifyPrower(path, gid) {
        // 根据api path查询 返回rid 根据rid 查询这个组是否分配了权限
        const apiInfo = await routers.findOne({
            attributes: ['rid'],
            where: {
                api: path
            }
        })
        if (apiInfo) {
            const power = await user_group_power.findOne({
                where: {
                    rid: apiInfo.rid,
                    gid: gid
                }
            })
            if (power.id) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }
}

module.exports = UserGroupPowerDao