const db = require('../config/db')
const sequelize = db.sequelize
const Op = db.Op
// 引入数据表模型
const draftArticles = db.draft_articles

class draftArticlesDao {

   // 获取草稿文章列表
   static async getDraftArticleList(data) {
      return await draftArticles.findAndCountAll({
        where: {
          uid: data.uid || ''
        },
        offset: Number(data.page_num - 1) * Number(data.page_size) || 0,
        limit: Number(data.page_size) || 10
      })
   }

  //  添加草稿
  static async insertDraftArticle(data) {
    return await draftArticles.create(data)
  }

  // 更改草稿
  static async editDraftArticle(data) {
    return await draftArticles.update(data,{
      where: {
        did: data.did
      }
    })
  }

  // 删除草稿
  static async delDraftArticle(did) {
    return await draftArticles.destroy({
      where: {
        did: did
      }
    })
  }
}

module.exports = draftArticlesDao