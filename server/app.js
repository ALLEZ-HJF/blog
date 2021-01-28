const Koa = require('koa')
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const koaBody = require('koa-body');
const koajwt = require('koa-jwt')
const cors = require('koa2-cors');
const websockify = require('koa-websocket'); // 加入websocket
const app = websockify(new Koa())

// 配置与中间件
const { singKey } = require('./config/config')
const { path } = require('./config/noFilter')
const { logger, accessLogger } = require('./config/logger');
const responseData = require('./middleware/responseData')
const handleToken = require('./middleware/handleToken')
const verifyPrower = require('./middleware/verifyPrower')

// 路由
const index = require('./routes/index')
const users = require('./routes/users')
const userGroup = require('./routes/user_group')
const articles = require('./routes/articles')
const categories = require('./routes/categories')
const comments = require('./routes/comments')
const upload = require('./routes/upload')
const replys = require('./routes/replys')
const stat = require('./routes/stat')
const draftArticles = require('./routes/draft_articles')
const resources = require('./routes/resources')
const routers = require('./routes/routers')
const user_group_power = require('./routes/user_group_power')
const systemInfo = require('./routes/systemInfo')

// 允许跨域
app.use(cors());
// 访问日志
app.use(accessLogger())
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
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))
// 自定义统一返回数据格式
app.use(responseData())
app.use(handleToken())
app.use(verifyPrower())
// token验证
app.use(koajwt({
  secret: singKey
}).unless({
  path: path  // 不验证的api
}));

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(userGroup.routes(), userGroup.allowedMethods())
app.use(articles.routes(), articles.allowedMethods())
app.use(categories.routes(), categories.allowedMethods())
app.use(comments.routes(), comments.allowedMethods())
app.use(upload.routes(), upload.allowedMethods())
app.use(replys.routes(), replys.allowedMethods())
app.use(stat.routes(), stat.allowedMethods())
app.use(draftArticles.routes(), draftArticles.allowedMethods())
app.use(resources.routes(), resources.allowedMethods())
app.use(routers.routes(), routers.allowedMethods())
app.use(user_group_power.routes(), user_group_power.allowedMethods())
app.ws.use(systemInfo.routes()).use(systemInfo.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  ctx.response.status = err.statusCode || err.status || 500;
    if (ctx.response.status === 401) {
      ctx.response.body = {
          msg: '登录失效,请重新登录',
          code: ctx.response.status 
      };
      ctx.response.status = 200
    } else {
      ctx.response.body = {
          msg: err.message,
          code: ctx.response.status 
      };
    }
    logger.error(err);
    console.error('server error', err, ctx)
});

module.exports = app
