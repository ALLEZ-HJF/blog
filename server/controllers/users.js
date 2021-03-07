const userDao = require('../dao/users')
const codesDao = require('../dao/codes')
const bcrypt = require('bcrypt')
const sendEmail = require('../middleware/sendEmail')

class userController {
    // 获取用户详情
    static async getUserInfo(ctx) {
        let param = ctx.request.body
        if (JSON.stringify(param) === '{}' ) {
            // 没有数据时 解析token
            if (ctx.header.authorization) {
                const userInfo = ctx.verify(ctx.header.authorization).data
                param.uid = userInfo.uid
                let data = await userDao.getUserInfo(param)
                ctx.success(200,'获取成功',data)
            } else {
                ctx.fail(500,'获取失败')
            }
        } else {
            let data = await userDao.getUserInfo(param)
            ctx.success(200,'获取成功',data)
        }
        
    }
    // 作者排行榜
    static async getUserRankingList(ctx) {
        let param = ctx.request.body
        let data = await userDao.getUserRankingList(param)
        ctx.success(200,'获取成功',data)
    }

    // 发送邮箱验证码
    static async sendCode(ctx) {
        let param = ctx.request.body
        let userInfo = ''
        let msg = ''
        let numArr = []
        for(let i=0;i<4;i++) {
            let num = Math.floor(Math.random()*10)
            numArr.push(num)
        }
        switch (Number(param.type)) {
            case 1:
                // 登录
                try {
                    userInfo = await userDao.getUserInfo(param)
                    param.email = userInfo.email
                    msg = '【小何博客】用户登录: 验证码是:' + numArr.join('') + '有效期10分钟!'
                } catch (error) {
                    ctx.fail(500,'用户不存在')
                    return
                }
                break;
            case 2:
                // 注册
                msg = '【小何博客】用户注册: 验证码是:' + numArr.join('') + ',有效期10分钟!'
                break;
            case 3:
                // 设置密码
                msg = '【小何博客】重置密码: 验证码是:' + numArr.join('') + ',有效期10分钟!'
                break;
        }
        if (!param.email && Number(param.type) === 2) {
            ctx.fail(500,'请输入邮箱地址')
            return
        }
        const isSend = sendEmail(param.email,msg)
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
        if (ctx.header.authorization) {
            const userInfo = ctx.verify(ctx.header.authorization).data
            if (!userInfo.gid && param.gid) {
                delete param.gid 
            }
        } else {
            delete param.gid 
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
            param.nickname = ''
            const userInfo = await userDao.getUserInfo(param)
            if (!userInfo) {
                const data = await userDao.insertUser(param)
                const token = ctx.sign({data},{ expiresIn: '15d' })
                let userInfo = JSON.parse(JSON.stringify(data))
                delete userInfo.password
                ctx.response.status = 200
                ctx.success(200,'注册成功',{token : token, data: userInfo})
            } else {
                ctx.fail(500,'用户已存在')
            }
        }
    }
    // 添加管理员用户
    static async insertAdminUser(ctx) {
        let param = ctx.request.body
        if (!param.username) {
            ctx.fail(500,'请输入用户名')
        } else if (!param.nickname) {
            ctx.fail(500,'请输入昵称')
        } else if (!param.password) {
            ctx.fail(500,'请输入密码')
        } else if (!param.email) {
            ctx.fail(500,'请输入邮箱地址')
        } else if (!param.gid) {
            ctx.fail(500,'请选择用户组')
        } else {
            const userInfo = await userDao.getUserInfo(param)
            if (!userInfo) {
                param.password = bcrypt.hashSync(param.password,10)
                const data = await userDao.insertAdminUser(param)
                ctx.success(200,'添加成功', data)
            } else {
                ctx.fail(500,'用户已存在')
            }
        }
    }
    // 删除用户
    static async delUser(ctx) {
        let body = ctx.request.body
        body.update_time = Date.now()
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
        if (body.phone) {
           const data = await userDao.getUserInfo({phone: body.phone})
           if (data &&  data !== '') {
             ctx.fail(500,'该手机已绑定')
             return
           }
        }
        const userInfo = ctx.verify(ctx.header.authorization).data
        if (body.gid && !userInfo.gid) {
            delete body.gid
        }
        delete body.state
        delete body.create_time
        body.update_time = Date.now()
        const data = await userDao.editUser(body)
        ctx.response.status = 200
        ctx.success(200,'修改成功',data)
    }
    // 忘记密码
    static async forgetPassword(ctx) {
        let body = ctx.request.body
        if (!body.username) {
            ctx.fail(500,'请输入用户名')
        } else if (!body.email) {
            ctx.fail(500, '请输入邮箱')
        } else if (!body.newPassword) {
            ctx.fail(500, '请输入新密码')
        } else if (!body.code_id) {
            ctx.fail(500, '请携带验证码id')
        } else {
            // 判断这个邮箱是否属于这个账号
            const userInfo = await userDao.getUserInfo({email: body.email})
            if (userInfo) {
                if (userInfo.email === body.email && userInfo.username === body.username) {
                    // 查询验证码是否正确
                    const codeInfo = await codesDao.getCodeInfo(body.code_id)
                    if (codeInfo) {
                        // 判断是否过期
                        if ((new Date().getTime() - new Date(codeInfo.create_time).getTime()) / 60 / 1000 > 10){
                            ctx.fail(500,'验证码已过期,请重新发送')
                            codesDao.delCode({code_id: body.code_id})
                        } else if (codeInfo.code != body.code) {
                            ctx.fail(500,'验证码错误')
                        } else {
                            // 修改操作
                            body.newPassword =  bcrypt.hashSync(body.newPassword,10)
                            const data = await userDao.forgetPassword(body)
                            ctx.success(200,'修改成功', data)
                        }
                    } else {
                        ctx.fail(500, '验证码失效')
                    }
                } else {
                    ctx.fail(500, '邮箱地址或账号有误!')
                }
            } else {
                ctx.fail(500,'该邮箱地址未绑定账号')
            }
        }
    }
    // 修改用户后台
    static async updateUser(ctx) {
        let body = ctx.request.body
        if (body.password) {
            // 加密密码
            body.password = bcrypt.hashSync(body.password,10)
        }
        if (!body.uid) {
            ctx.fail(500,'用户ID不能为空')
            return
        }
        if (!body.gid) {
            body.gid = null
        }
        body.update_time = Date.now()
        const data = await userDao.updateUser(body)
        ctx.success(200,'修改成功',data)
    }
}

module.exports = userController