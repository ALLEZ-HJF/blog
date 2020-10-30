const router = require('koa-router')()
const userController = require('../controllers/users')
const { version } = require('../config/config')


router.prefix('/api_v'+version+'/users')
// 获取用户列表
router.post('/getUserList',userController.getUserList)
// 添加用户
router.post('/register',userController.insertUser)
// 删除用户
router.post('/delUser',userController.delUser)
// 修改用户
router.post('/editUser',userController.editUser)
// 用户登录
router.post('/login',userController.login)

module.exports = router
