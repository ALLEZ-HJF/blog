const router = require('koa-router')()
const commentsController = require('../controllers/comments')
const { version } = require('../config/config')


router.prefix('/api_v'+version+'/comments')

// 删除评论
router.post('/delComment',commentsController.delComment)
// 添加评论
router.post('/insertComment',commentsController.insertComment)
// 获取评论＋回复
router.post('/getCommentByAid',commentsController.getCommentByAid)

module.exports = router
