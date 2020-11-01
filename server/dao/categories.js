const db = require('../config/db')
const sequelize = db.sequelize
const Op = db.Op
// 引入数据表模型
const categories = db.categories

class categoriesDao {
   // 获取分类列表
   static async getCategoryList(data) {
      return await categories.findAndCountAll({
        where: {
          state: 'valid',
          pid: data.pid || 0
        }
      })
   }
   // 添加分类
   static async insertCategory(data) {
      data.create_time = Date.now()
      return await categories.create(data)
   }
  // 修改分类
  static async editCategory(data) {
    data.update_time = Date.now()
    return await categories.update(data,{
      where: {
        cid: data.cid
      }
    })
  }
  // 删除分类
  static async delCategory(data) {
    data.update_time = Date.now()
    return await categories.update({state:'lock'},{
      where: {
        cid: data.cid
      }
    })
  }
}

module.exports = categoriesDao