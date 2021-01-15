const router = require('koa-router')()
const userController = require('../controllers/users')
const { version } = require('../config/config')


router.prefix('/api_v'+version+'/users')
// 获取用户列表
router.post('/admin/getUserList',userController.getUserList)
// 删除用户
router.post('/admin/delUser',userController.delUser)
// 添加用户
router.post('/web/register',userController.insertUser)
// 修改用户
router.post('/web/editUser',userController.editUser)
// 用户登录
router.post('/web/login',userController.login)
// 发送验证码
router.post('/web/sendCode',userController.sendCode)
// 作者排行榜
router.post('/web/getUserRankingList',userController.getUserRankingList)
// 获取用户详情
router.post('/web/getUserInfo',userController.getUserInfo)


module.exports = router
