const db = require('../config/db')
const Op = db.Op
// 引入数据表模型
const codes = db.codes

class codesDao {
    // 查询验证码
    static async getCodeInfo(code_id) {
        return await codes.findByPk(code_id)
    }
    // 添加验证码
    static async insertCode(data) {
        return await codes.create(data)
    }
    // 删除验证码
    static async delCode(data) {
        return await codes.destroy({
            where: {
                code_id: data.code_id
            }
        })
    }
}

module.exports = codesDao