const router = require('koa-router')()
const { version } = require('../config/config')
const categoriesController = require('../controllers/categories')

router.prefix('/api_v'+version+'/category')
// 获取分类列表
router.post('/getCategoryList',categoriesController.getCategoryList)
// 添加分类
router.post('/insertCategory',categoriesController.insertCategory)
// 修改分类
router.post('/editCategory',categoriesController.editCategory)
// 删除分类
router.post('/delCategory',categoriesController.delCategory)

module.exports = router
