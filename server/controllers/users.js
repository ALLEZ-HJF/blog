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
        let isLogin = param.isLogin
        if (isLogin === 'true') {
            try {
                const userInfo = await userDao.getUserByNameOrUid(param)
                param.email = userInfo.email
            } catch (error) {
                ctx.fail(500,'用户不存在')
                return
            }
        }
        if (!param.email && !isLogin) {
            ctx.fail(500,'请输入邮箱地址')
            return
        }
        let numArr = []
        for(let i=0;i<4;i++) {
            let num = Math.floor(Math.random()*10)
            numArr.push(num)
        }
        const isSend = sendEmail(param.email, isLogin === 'true' ? '用户登录' : '用户注册','验证码是:' + numArr.join(''),'验证码是:' + numArr.join('') + ', 有效期 10 分钟！')
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
        } else if (!param.code_id) {
            ctx.fail(500,'请携带验证码key')
        } else {
            const verify = await codesDao.getCodeInfo(param.code_id)
            if (verify.code != param.code) {
                ctx.fail(500,'验证码错误')
            } else if ((new Date().getTime() - new Date(verify.create_time).getTime()) / 60 / 1000 > 10){
                ctx.fail(500,'验证码已过期,请重新发送')
                codesDao.delCode({code_id: param.code_id})
            }else { 
                const data = await userDao.login(param)
                ctx.response.status = 200
                if (data) {
                    const confirmRes = bcrypt.compareSync(param.password, data.password)
                    if (confirmRes) {
                        // 密码正确 创建token
                        const token = ctx.sign({data},{ expiresIn: '15d' })
                        let userInfo = JSON.parse(JSON.stringify(data))
                        delete userInfo.password
                        ctx.success(200,'登录成功',{token : token, data: userInfo})
                        codesDao.delCode({code_id: param.code_id})
                    } else {
                     ctx.fail(500,'密码错误')
                    }
                } else {
                    ctx.fail(500,'账号不存在')
                }
            }
        }
    }

    // 获取所有用户
    static async getUserList(ctx) {
        let param = ctx.request.body
        const data = await userDao.getUserList(param)
        ctx.response.status = 200
        ctx.success(200,'获取成功',data)
    }
    // 添加用户
    static async insertUser(ctx) {
        let param = ctx.request.body
        const verify = await codesDao.getCodeInfo(param.code_id)
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
            param.nickname = ''
            const userInfo = await userDao.getUserByNameOrUid(param)
            if (!userInfo) {
                const data = await userDao.insertUser(param)
                const token = ctx.sign({data},{ expiresIn: '15d' })
                let userInfo = JSON.parse(JSON.stringify(data))
                delete userInfo.password
                ctx.response.status = 200
                ctx.success(200,'添加成功',{token : token, data: userInfo})
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
        if (body.password) {
            // 加密密码
            body.password = bcrypt.hashSync(body.password,10)
        }
        const data = await userDao.editUser(body)
        ctx.response.status = 200
        ctx.success(200,'修改成功',data)
    }
}

module.exports = userController