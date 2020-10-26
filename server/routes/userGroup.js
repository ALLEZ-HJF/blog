const router = require('koa-router')()
const UserGroupController = require('../controllers/UserGroup')

router.prefix('api_v1/userGroup')

router.post('/getUserGroupList',UserGroupController.getUserGroupList)

module.exports = router
