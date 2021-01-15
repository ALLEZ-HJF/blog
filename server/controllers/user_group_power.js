const userGroupPowerDao = require('../dao/user_group_power')

class userGroupPowerController {
    static async getPowerByGid(ctx) {
        const params = ctx.request.body
        if (!params.gid) {
            ctx.fail(500,'用户组id不能为空')
        } else {
            const data = await userGroupPowerDao.getPowerByGid(params)
            ctx.success(200,'获取成功',data)
        }
    }
    static async editPowerByGid(ctx) {
        const params = ctx.request.body
        if (!params.gid) {
            ctx.fail(500,'用户组id不能为空')
        } else if (!params.rid_str) {
            ctx.fail(500,'请选择需要分配的权限')
        } else {
            const data = await userGroupPowerDao.editPowerByGid(params.gid, params.rid_str.split(','))
            ctx.success(200,'分配成功',data)
        }
    }
}

module.exports = userGroupPowerController