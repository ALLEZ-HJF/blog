const db = require('../config/db')
const Op = db.Op

// 引入数据表模型
const resources = db.resources

class resourcesDao {

   // 获取资源列表
   static async getResourceList(data) {
      return await resources.findAndCountAll({
        where: {
          uid: {
            [Op.like]: `%${data.uid || ''}%`
          }
        },
        offset: Number(data.page_num - 1) * Number(data.page_size) || 0,
        limit: Number(data.page_size) || 10
      })
   }

  //  添加资源(添加多个)
  static async insertResource(data) {
    return await resources.bulkCreate(data)
  }
  // 删除资源
  static async delResource(rid) {
    return await resources.update({ state: 'lock' },{
      where: {
        rid: rid
      }
    })
  }
}

module.exports = resourcesDao