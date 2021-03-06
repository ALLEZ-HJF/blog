const categoriesDao = require('../dao/categories')


function formatCategoryList(filterArr,arr) {
  filterArr.forEach(item => {
    item.children = arr.filter(sItem => {
      return sItem.pid === item.cid
    })
    if (item.children.length > 0) {
      formatCategoryList(item.children,arr)
    }
  })
  return filterArr
}

class categoriesController {
  // 获取分类列表
  static async getCategoryList(ctx) {
     const param = ctx.request.body
     const data = await categoriesDao.getCategoryList(param)
     if (param.state === 'valid') {
      let arr = JSON.parse(JSON.stringify(data.rows)) 
      let filterArr = arr.filter(item => {
        return item.pid === 0
      })
      filterArr = formatCategoryList(filterArr,arr)
      ctx.success(200,'获取成功',{count: data.count, rows: filterArr})
     } else {
      ctx.success(200,'获取成功',data)
     }
  }
  
  // 添加分类
  static async insertCategory(ctx) {
    const param = ctx.request.body
    const data = await categoriesDao.insertCategory(param)
    ctx.response.status = 200
    ctx.success(200,'添加成功',data)
 }

 // 修改分类
 static async editCategory(ctx) {
  const param = ctx.request.body
  if (!param.cid) {
    ctx.fail(500,'请输入分类id')
    return
  }
  param.update_time = Date.now()
  const data = await categoriesDao.editCategory(param)
  if (data[0]) {
    ctx.response.status = 200
    ctx.success(200,'修改成功')
  } else {
    ctx.response.status = 500
    ctx.success(500,'修改失败')
  }
  
}

// 删除分类
static async delCategory(ctx) {
  const param = ctx.request.body
  if (!param.cid) {
    ctx.fail(500,'请输入分类id')
    return
  }
  param.update_time = Date.now()
  const data = await categoriesDao.delCategory(param)
  if (data[0]) {
    ctx.response.status = 200
    ctx.success(200,'删除成功')
  } else {
    ctx.response.status = 500
    ctx.success(500,'修改失败')
  }
}
}

module.exports = categoriesController