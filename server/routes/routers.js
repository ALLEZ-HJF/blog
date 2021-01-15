const router = require('koa-router')()
const routersController = require('../controllers/routers')
const { version } = require('../config/config')


router.prefix('/api_v'+version+'/routers')

router.post('/admin/insertRouter', routersController.insertRouter)
router.post('/admin/editRouter', routersController.editRouter)
router.post('/admin/delRouter', routersController.delRouter)
router.post('/web/getWebRouterList', routersController.getWebRouterList)
router.post('/admin/getRouterList', routersController.getRouterList)

module.exports = router
