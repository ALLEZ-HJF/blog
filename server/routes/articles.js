const router = require('koa-router')()
const { version } = require('../config/config')
const articlesController = require('../controllers/articles')

router.prefix('/api_v'+version+'/articles')
// 获取文章列表
router.post('/getArticleList',articlesController.getArticleList)
// 添加文章
router.post('/insertArticle',articlesController.insertArticle)
// 删除文章
router.post('/delArticle',articlesController.delArticle)
// 修改文章
router.post('/editArticle',articlesController.editArticle)

module.exports = router
