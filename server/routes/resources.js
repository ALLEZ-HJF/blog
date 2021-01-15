const router = require('koa-router')()
const { version } = require('../config/config')
const resourcesController = require('../controllers/resources')

router.prefix('/api_v'+version+'/resources')

router.post('/web/insertResource',resourcesController.insertResource)
router.post('/admin/getResourceList',resourcesController.getResourceList)
router.post('/admin/delResource',resourcesController.delResource)


module.exports = router
