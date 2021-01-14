const router = require('koa-router')()
const userGroupPowerController = require('../controllers/user_group_power')
const { version } = require('../config/config')

router.prefix('/api_v'+version+'/user_group_power')
router.post('/getPowerByGid', userGroupPowerController.getPowerByGid)
router.post('/editPowerByGid', userGroupPowerController.editPowerByGid)

module.exports = router
