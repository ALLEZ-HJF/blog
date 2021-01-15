const router = require('koa-router')()
const { version } = require('../config/config')
const draftArticlesController = require('../controllers/draft_articles')

router.prefix('/api_v'+version+'/draftArticles')
// 获取草稿文章列表
router.get('/web/getDraftArticleList',draftArticlesController.getDraftArticleList)
router.post('/web/insertDraftArticle',draftArticlesController.insertDraftArticle)
router.post('/web/editDraftArticle',draftArticlesController.editDraftArticle)
router.post('/web/delDraftArticle',draftArticlesController.delDraftArticle)

module.exports = router
