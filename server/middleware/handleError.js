// 处理错误中间件
function handleError () {
    return async function(ctx, next) {
        try {
            await next()
        } catch (error) {
            if (error.message && error.name === 'TokenExpiredError') {
                // 登录失效
                ctx.fail(401,'登录失效,请重新登录!')
            } else {
                ctx.fail(500,error.message || '系统异常')
            }
        }
    }
}

module.exports = handleError