const userGroupDao = require('../dao/user_group')

class userGroupController {

    // 获取用户组列表
    static async getUserGroupList(ctx) {
        const param = ctx.request.body
        const data = await userGroupDao.getUserGroupList(param)
        ctx.success(200,'获取成功',data)
    }

    // 添加用户组
    static async insertUserGroup(ctx) {
        const param = ctx.request.body
        if (!param.groupName) {
            ctx.fail(500,'请输入用户组名称')
            return
        }
        param.create_time = Date.now()
        const data = await userGroupDao.insertUserGroup(param)
        ctx.success(200,'创建成功',data)
    }

     // 修改用户组
     static async editUserGroup(ctx) {
        const param = ctx.request.body
        if (!param.gid) {
            ctx.fail(500,'请输入用户组id')
            return
        }
        param.update_time = Date.now()
        const data = await userGroupDao.editUserGroup(param)
        if (data[0]) {
            ctx.success(200,'修改成功')
        } else {
            ctx.fail(500,'修改失败')
        }
    }

    // 删除用户组
    static async delUserGroup(ctx) {
        const param = ctx.request.body
        if (!param.gid) {
            ctx.fail(500,'请输入用户组id')
            return
        }
        param.update_time = Date.now()
        const data = await userGroupDao.delUserGroup(param)
        if (data[0]) {
            ctx.success(200,'删除成功')
        } else {
            ctx.fail(500,'删除失败')
        }
    }
}

module.exports = userGroupController