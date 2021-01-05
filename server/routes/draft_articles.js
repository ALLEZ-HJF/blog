const router = require('koa-router')()
const { version } = require('../config/config')
const draftArticlesController = require('../controllers/draft_articles')

router.prefix('/api_v'+version+'/draftArticles')
// 获取草稿文章列表
router.get('/getDraftArticleList',draftArticlesController.getDraftArticleList)
router.post('/insertDraftArticle',draftArticlesController.insertDraftArticle)
router.post('/editDraftArticle',draftArticlesController.editDraftArticle)
router.post('/delDraftArticle',draftArticlesController.delDraftArticle)

module.exports = router
