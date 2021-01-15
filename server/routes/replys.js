const router = require('koa-router')()
const { version } = require('../config/config')
const replysController = require('../controllers/replys')

router.prefix('/api_v'+version+'/replys')
// 添加回复
router.post('/web/insertReply',replysController.insertReply)
// 删除回复
router.post('/web/delReply',replysController.delReply)
module.exports = router
