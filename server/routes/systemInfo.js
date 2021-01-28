const router = require('koa-router')()
const { version } = require('../config/config')
router.prefix('/api_v'+version+'/systemInfo')

router.all('/admin/data', async (ctx) => {
    ctx.websocket.on('message', function(message) {
        // do something with the message from client
            console.log(message);
        ctx.websocket.send('链接成功')
    });
})

module.exports = router
