const router = require('koa-router')()
const { version } = require('../config/config')
const articlesController = require('../controllers/articles')

router.prefix('/api_v'+version+'/articles')
// 获取文章列表
router.post('/getArticleList',articlesController.getArticleList)
// 根据文章id找文章详情
router.post('/getArticleByAid',articlesController.getArticleByAid)
// 根据分类获取文章列表
router.post('/getArticleByCid',articlesController.getArticleByCid)
// 添加文章
router.post('/insertArticle',articlesController.insertArticle)
// 删除文章
router.post('/delArticle',articlesController.delArticle)
// 修改文章
router.post('/editArticle',articlesController.editArticle)
// 审核文章
router.post('/articleVerify',articlesController.articleVerify)
// 增加文章阅读量
router.post('/addArticleLookNum',articlesController.addArticleLookNum)

module.exports = router
