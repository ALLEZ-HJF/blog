const router = require('koa-router')()
const userController = require('../controllers/User')

router.prefix('/users')

router.post('/getAll',userController.getAll)
router.post('/addUser',userController.addUser)


module.exports = router
