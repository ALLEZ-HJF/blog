const router = require('koa-router')()
const { version } = require('../config/config')
router.prefix('/api_v'+version+'/systemInfo')
const userGroupProwerDao = require('../dao/user_group_power')
const os = require('os');
const osUtil = require('os-utils')
router.all('/admin/data', async (ctx) => {
    let params = ctx.request.query
    if (JSON.stringify(params) !== '{}' ) {
        const isPass =  await userGroupProwerDao.verifyPrower(params.api, params.gid)
        if (isPass) {
            ctx.websocket.on('message', function(message) {
                // 查询系统信息
                // 内存
                const memory  =  {
                    total: Math.floor((os.totalmem() / 1024 / 1024 / 1024) * 100) / 100 ,
                    free: Math.floor((os.freemem() / 1024 / 1024 / 1024) * 100) / 100 ,
                    ratio: Math.floor((os.freemem() / os.totalmem())*100) / 100 
                }
                const systemInfo = {
                    platform: os.platform(),
                    type: os.type(),
                    hostname: os.hostname(),
                    release: os.release()
                }
                const cpuInfo = {
                    ratio: '',
                    countCpus: os.cpus().length,
                    cpuName: os.cpus()[0].model
                }
                osUtil.cpuUsage(function(val) {
                    cpuInfo.ratio = Math.floor(val * 100) / 100 
                    ctx.websocket.send(JSON.stringify({code: 200, memoryInfo: memory, systemInfo: systemInfo, cpuInfo: cpuInfo}))
                })
            });
        } else {
            ctx.websocket.send(JSON.stringify({code: 500, msg: '无权限操作'}))
        }
    } else {
        ctx.websocket.send(JSON.stringify({code: 500, msg: '请携带参数'}))
    }
})

module.exports = router
