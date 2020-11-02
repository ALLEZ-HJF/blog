const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const koaBody = require('koa-body');
const responseData = require('./middleware/responseData')
const path = require('path')
const koajwt = require('koa-jwt')
const { singKey,version } = require('./config/config')
const handleToken = require('./middleware/handleToken')

const index = require('./routes/index')
const users = require('./routes/users')
const userGroup = require('./routes/user_group')
const articles = require('./routes/articles')
const categories = require('./routes/categories')
const comments = require('./routes/comments')
const upload = require('./routes/upload')



// 文件上传
app.use(koaBody({
  multipart: true,
  formidable: {
      maxFileSize: 200*1024*1024    // 设置上传文件大小最大限制，默认2M
  }
}))

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))
// 自定义统一返回数据格式
app.use(responseData())
app.use(handleToken())

// logger
app.use(async (ctx, next) => {
  try {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
  } catch (err) {
    ctx.response.status = err.statusCode || err.status || 500;
    if (ctx.response.status === 401) {
      ctx.response.body = {
          msg: '登录失效,请重新登录',
          code: ctx.response.status 
      };
    } else {
      ctx.response.body = {
          msg: err.message,
          code: ctx.response.status 
      };
    }
    // 手动释放error事件
    ctx.app.emit('error', err, ctx);
  }
})

// token验证
app.use(koajwt({
  secret: singKey
}).unless({
  path: [`/api_v${version}/users/login`,`/api_v${version}/users/register`,/^\/uploads/]
}));

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(userGroup.routes(), userGroup.allowedMethods())
app.use(articles.routes(), articles.allowedMethods())
app.use(categories.routes(), categories.allowedMethods())
app.use(comments.routes(), comments.allowedMethods())
app.use(upload.routes(), upload.allowedMethods())


// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
