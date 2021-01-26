const router = require('koa-router')()
const { version } = require('../config/config')
const articlesController = require('../controllers/articles')

router.prefix('/api_v'+version+'/articles')
// 获取文章列表
router.post('/web/getArticleList',articlesController.getArticleList)
// 根据文章id找文章详情
router.post('/web/getArticleByAid',articlesController.getArticleByAid)
// 根据分类获取文章列表
router.post('/web/getArticleByCid',articlesController.getArticleByCid)
// 添加文章
router.post('/web/insertArticle',articlesController.insertArticle)
// 删除文章
router.post('/web/delArticle',articlesController.delArticle)
// 修改文章
router.post('/web/editArticle',articlesController.editArticle)
// 增加文章阅读量
router.post('/web/addArticleLookNum',articlesController.addArticleLookNum)

// 审核文章
router.post('/admin/articleVerify',articlesController.articleVerify)
// 获取文章列表
router.post('/admin/getArticleList',articlesController.getArticleList)
// 添加文章
router.post('/admin/insertArticle',articlesController.insertArticle)
// 修改文章
router.post('/admin/editArticle',articlesController.editArticle)
// 删除文章
router.post('/admin/delArticle',articlesController.delArticle)

module.exports = router
