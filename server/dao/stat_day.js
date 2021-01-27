const { sequelize } = require('../config/db')
const moment = require('moment')
const db = require('../config/db')
const Op = db.Op
// 引入数据表模型
const statDay = db.stat_day

class statDayDao {
    static async insertDayData(param) {
        let taday = moment().subtract(1, 'days').format('YYYY-MM-DD')
        let tomorrow = moment().add(1, 'days').format('YYYY-MM-DD')
        let data = await statDay.findOne({
            where: {
                ip: param.ip,
                create_time: {
                    [Op.between]: [taday,tomorrow]
                }
            }
        })
        if (!data) {
            // 如果有数据不添加
            return await statDay.create(param)
        }
    } 
    static async getVisitData(param) {
        let where = {}
        if (param.start_time && param.end_time) {
            where.create_time = {
                [Op.between]: [param.start_time, moment(param.end_time).add(1, 'days').format('YYYY-MM-DD')]
            }
        }
        return await statDay.findAndCountAll({
           where,
           group: 'time'
        })
    }
    static async getTodayVisitCount() {
        return await statDay.count({
            where: {
                create_time: {
                     [Op.between]: [moment().subtract(1, 'days').format('YYYY-MM-DD'), moment().add(1, 'days').format('YYYY-MM-DD')]
                }
            }
         })
    }
}

module.exports = statDayDao