const userDao = require('../dao/users')
const codesDao = require('../dao/codes')
const bcrypt = require('bcrypt')
const sendEmail = require('../middleware/sendEmail')

class userController {

    // 作者排行榜
    static async getUserRankingList(ctx) {
        let param = ctx.request.body
        let data = await userDao.getUserRankingList(param)
        ctx.success(200,'获取成功',data)
    }

    // 发送邮箱验证码
    static async sendCode(ctx) {
        let param = ctx.request.body
        if (!param.email) {
            ctx.fail(500,'请输入邮箱地址')
            return
        }
        let numArr = []
        for(let i=0;i<4;i++) {
            let num = Math.floor(Math.random()*10)
            numArr.push(num)
        }
        const isSend = sendEmail(param.email,'用户注册','验证码是:' + numArr.join(''),'验证码是:' + numArr.join('') + ', 有效期 10 分钟！')
        if (isSend) {
            const data = await codesDao.insertCode({code: numArr.join(''), create_time: Date.now()})
            ctx.success(200,'发送成功',data.code_id)
        } else {
            ctx.fail(500,'发送失败')
        }
    }
    // 用户登录
    static async login(ctx) {
        let param = ctx.request.body
        if (!param.username) {
            ctx.fail(500,'请输入账号')
        } else if (!param.password) {
            ctx.fail(500,'请输入密码')
        } else {
            const data = await userDao.login(param)
            ctx.response.status = 200
            if (data) {
                const confirmRes = bcrypt.compareSync(param.password, data.password)
                if (confirmRes) {
                    // 密码正确 创建token
                    const token = ctx.sign({data},{ expiresIn: '24h' })
                    ctx.success(200,'登录成功',{token : token, data})
                } else {
                 ctx.fail(500,'密码错误')
                }
            } else {
                ctx.fail(500,'账号不存在')
            }
        }
    }

    // 获取所有用户
    static async getUserList(ctx) {
        let param = ctx.request.body
        if (!param.username) {
            param.username = ''
        }
        if (!param.phone) {
            param.phone = ''
        }
        if (!param.state) {
            param.state = 'valid'
        }
        if (!param.page_num) {
            param.page_num = 0
        } else {
            param.page_num = --param.page_num * param.page_size
        }
        if (!param.page_size) {
            param.page_size = 10
        } else {
            param.page_size = Number(param.page_size)
        }
        const data = await userDao.getUserList(param)
        ctx.response.status = 200
        ctx.success(200,'获取成功',data)
    }
    // 添加用户
    static async insertUser(ctx) {
        let param = ctx.request.body
        const verify = await codesDao.getCodeInfo(param.code_id)
        if (!param.uid) {
            param.uid = '' 
        }
        if (!param.username) {
            ctx.fail(500,'请输入用户名')
        } else if (!param.password) {
            ctx.fail(500,'请输入密码')
        } else if (!param.email) {
            ctx.fail(500,'请输入邮箱地址')
        } else if (verify.code != param.code) {
            ctx.fail(500,'验证码错误')
        } else if ((new Date().getTime() - new Date(verify.create_time).getTime()) / 60 / 1000 > 10){
            ctx.fail(500,'验证码已过期,请重新发送')
            codesDao.delCode({code_id: param.code_id})
        }else {
            param.password = bcrypt.hashSync(param.password,10)
            const data = await userDao.getUserByNameOrUid(param)
            if (!data) {
                const data = await userDao.insertUser(param)
                ctx.response.status = 200
                ctx.success(200,'添加成功',data)
            } else {
                ctx.fail(500,'用户已存在')
            }
        }
    }
    // 删除用户
    static async delUser(ctx) {
        let body = ctx.request.body
        const data = await userDao.delUser(body)
        ctx.response.status = 200
        ctx.success(200,'删除成功',data)
    }
    // 修改用户
    static async editUser(ctx) {
        let body = ctx.request.body
        const data = await userDao.editUser(body)
        ctx.response.status = 200
        ctx.success(200,'修改成功',data)
    }
}

module.exports = userController