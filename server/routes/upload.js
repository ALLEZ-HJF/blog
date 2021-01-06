const router = require('koa-router')()
const fs = require('fs')
const path = require('path')
const { version } = require('../config/config')
var { client } = require('../config/baiduApi.js')


router.prefix('/api_v'+version+'/upload')

// 多文件上传
router.post('/uploadFile', async (ctx, next) => {
  const files = ctx.request.files.file
  let fileTypeArr = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif']  // 允许上传的格式
  let imgArr = []
  // 如果没有文件夹创建文件夹
  const isDir = fs.existsSync(path.resolve('./public/uploads/'))
  if (!isDir) {
    fs.mkdirSync(path.resolve('./public/uploads/'))
  }
  if (files.length) {
    for (let file of files) {
      if (fileTypeArr.indexOf(file.type) !== -1) {
        const base64Img = Buffer.from(fs.readFileSync(files.path)).toString('base64')
        const isPass = await client.imageCensorUserDefined(base64Img, 'base64')
        if (isPass.conclusionType === 1) {
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
      }
    }
  } else {
    if (fileTypeArr.indexOf(files.type) === -1) {
      ctx.fail(500,'暂不支持上传该类型的文件')
      return false
    }
    const base64Img = Buffer.from(fs.readFileSync(files.path)).toString('base64')
    const isPass = await client.imageCensorUserDefined(base64Img, 'base64')
    if (isPass.conclusionType === 1) {
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
    } else {
      ctx.fail(500,isPass.data[0].msg)
      return
    }
  }
  if (imgArr.length) {
    ctx.success(200,'上传成功',imgArr)
  } else {
    ctx.fail(500,'上传失败')
  }
})

module.exports = router
