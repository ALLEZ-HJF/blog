function responseData(option={}) {
    return async function(ctx,next) {
        ctx.success = function(code,msg,data) {
            ctx.response.status = 200
            ctx.body = {
                code: code || 200,
                msg: msg || 'success',
                data: data || ''
            }
        }
        ctx.fail = function(code,msg,data) {
            ctx.response.status = 500
            ctx.body = {
                code: code || 500,
                msg: msg || 'fail',
                data: data || ''
            }
        }
        await next()
    }
}

module.exports = responseData