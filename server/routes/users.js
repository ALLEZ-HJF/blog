const router = require('koa-router')()
const userController = require('../controllers/User')

router.prefix('api_v1/users')

router.post('/getUserList',userController.getUserList)
router.post('/addUser',userController.addUser)


module.exports = router
