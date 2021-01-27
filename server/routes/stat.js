const router = require('koa-router')()
const statController = require('../controllers/stat')
const { version } = require('../config/config')


router.prefix('/api_v'+version+'/stat')
// 添加日访问量数据
router.post('/web/insertDayData',statController.insertDayData)
router.get('/admin/getVisitData',statController.getVisitData)
// 首页汇总 今日新增用户 今日新增文章数量 待审核文章数量
router.get('/admin/getSummaryData',statController.getSummaryData)
module.exports = router
