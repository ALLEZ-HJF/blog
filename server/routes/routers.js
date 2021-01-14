const router = require('koa-router')()
const routersController = require('../controllers/routers')
const { version } = require('../config/config')


router.prefix('/api_v'+version+'/routers')

router.post('/insertRouter', routersController.insertRouter)
router.post('/editRouter', routersController.editRouter)
router.post('/delRouter', routersController.delRouter)
router.post('/getWebRouterList', routersController.getWebRouterList)
router.post('/getRouterList', routersController.getRouterList)

module.exports = router
