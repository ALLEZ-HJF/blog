const router = require('koa-router')()
const svgCaptcha = require('svg-captcha')
const fs = require('fs')
const path = require('path')

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.post('/getVerifyCode', async (ctx, next) => {
 var captcha = svgCaptcha.create({
   size: 4,
   fontSize: 40,
   width: 100,
   height: 40,
   background:'#ccc'
 })
 ctx.response.type = 'image/svg+xml'
 ctx.body = captcha.data
 ctx.session.captcha = captcha.text
})

router.post('/uploadFile', async (ctx, next) => {
  const file = ctx.request.files.file
  // 创建可读写流 
  const reader = fs.createReadStream(file.path)
  let filePath = '/public/uploads/'+ file.name
  // 创建可写流
  const upStream = fs.createWriteStream(filePath);
  // 可读流通过管道写入可写流
  reader.pipe(upStream);
  ctx.body = {
    code: 200,
    msg: '上传成功',
    data: filePath
  }
})


module.exports = router
