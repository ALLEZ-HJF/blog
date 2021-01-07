const router = require('koa-router')()
const { version } = require('../config/config')
const resourcesController = require('../controllers/resources')

router.prefix('/api_v'+version+'/resources')

router.post('/getResourceList',resourcesController.getResourceList)
router.post('/insertResource',resourcesController.insertResource)
router.post('/delResource',resourcesController.delResource)


module.exports = router
