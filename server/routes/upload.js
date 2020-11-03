const router = require('koa-router')()
const fs = require('fs')
const path = require('path')
const { version } = require('../config/config')


router.prefix('/api_v'+version+'/upload')

// 多文件上传
router.post('/uploadFile', async (ctx, next) => {
  const files = ctx.request.files.file
  let imgArr = []
  // 如果没有文件夹创建文件夹
  const isDir = fs.existsSync(path.resolve('./public/uploads/'))
  if (!isDir) {
    fs.mkdirSync(path.resolve('./public/uploads/'))
  }
  if (files.length) {
    for (let file of files) {
      // 创建可读流
      const reader = fs.createReadStream(file.path);
      // 获取上传文件扩展名
      const fileName = Date.now()+'.'+file.type.split('/')[1]
      let filePath = path.resolve(`./public/uploads/${fileName}`)
      let respPath = ctx.origin +  `/uploads/${fileName}`
      imgArr.push(respPath)
      // 创建可写流
      const upStream = fs.createWriteStream(filePath);
      // 可读流通过管道写入可写流
      reader.pipe(upStream);
    }
  } else {
    const reader = fs.createReadStream(files.path);
    // 获取上传文件扩展名
    const fileName = Date.now()+'.'+files.type.split('/')[1]
    let filePath = path.resolve(`./public/uploads/${fileName}`)
    let respPath = ctx.origin +  `/uploads/${fileName}`
    imgArr.push(respPath)
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
  }
  if (imgArr.length) {
    ctx.success(200,'上传成功',imgArr)
  } else {
    ctx.fail(500,'上传失败')
  }
})

module.exports = router