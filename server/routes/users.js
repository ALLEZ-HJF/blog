const router = require('koa-router')()
const userController = require('../controllers/users')

router.prefix('/api_v1/users')
// 获取用户列表
router.post('/getUserList',userController.getUserList)
// 添加用户
router.post('/register',userController.insertUser)
// 删除用户
router.post('/delUser',userController.delUser)
// 修改用户
router.post('/editUser',userController.editUser)

module.exports = router
