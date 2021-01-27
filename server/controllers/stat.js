const statDayDao = require('../dao/stat_day')
const usersDao = require('../dao/users')
const articlesDao = require('../dao/articles')
const { getClientIP }  = require('../utils/index')

class statController {
    static async insertDayData(ctx) {
        const ip = getClientIP(ctx)
        const browser = ctx.header['user-agent']
        const data = await statDayDao.insertDayData({ip,browser})
        ctx.success(200,'记录成功',data)
    }
    static async getVisitData(ctx) {
        const param = ctx.request.query
        const data = await statDayDao.getVisitData(param)
        let countArr = data.count.map(x => x.count)
        let timeArr = data.rows.map(x => x.time)
        ctx.success(200,'获取成功',{data:　countArr, time: timeArr} )
    }
    // 首页汇总
    static async getSummaryData(ctx) {
       const userCount = await usersDao.getNewUserCount()
       const articleCount = await articlesDao.getArticleSummary()
       const tadayVisitCount = await statDayDao.getTodayVisitCount()
       ctx.success(200,'获取成功', {newUser: userCount, newArticleCount: articleCount.newCount, invalidArticleCount: articleCount.invalidCount, tadayVisitCount: tadayVisitCount })
    }
}

module.exports = statController