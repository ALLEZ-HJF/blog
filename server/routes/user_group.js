const router = require('koa-router')()
const UserGroupController = require('../controllers/user_group')
const { version } = require('../config/config')

router.prefix('/api_v'+version+'/userGroup')
// 用户组列表
router.post('/getUserGroupList',UserGroupController.getUserGroupList)
// 添加用户组
router.post('/insertUserGroup',UserGroupController.insertUserGroup)
// 修改用户组
router.post('/editUserGroup',UserGroupController.editUserGroup)
// 删除用户组
router.post('/delUserGroup',UserGroupController.delUserGroup)

module.exports = router
