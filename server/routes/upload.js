const router = require('koa-router')()
const fs = require('fs')
const path = require('path')
const { version } = require('../config/config')
var { client } = require('../config/baiduApi.js')
const resourcesController = require('../controllers/resources')


router.prefix('/api_v'+version+'/upload')

async function upload(file, ctx ) {
  const reader = fs.createReadStream(file.path);
  // 获取上传文件扩展名
  const fileName = Date.now()+'.'+file.type.split('/')[1]
  let filePath = path.resolve(`./public/uploads/${fileName}`)
  let respPath = ctx.origin +  `/uploads/${fileName}`
  // 创建可写流
  const upStream = fs.createWriteStream(filePath);
  // 可读流通过管道写入可写流
  reader.pipe(upStream);
  return respPath
}
// 检测图片是否合规
async function checkImg(path) {
  const base64Img = Buffer.from(fs.readFileSync(path)).toString('base64')
  return await client.imageCensorUserDefined(base64Img, 'base64')
}

// 多文件上传
router.post('/web/uploadFile', async (ctx, next) => {
  const files = ctx.request.files.file
  let fileTypeArr = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif']  // 允许上传的格式
  let imgArr = []
  // 如果没有文件夹创建文件夹
  const isDir = fs.existsSync(path.resolve('./public/uploads/'))
  if (!isDir) {
    fs.mkdirSync(path.resolve('./public/uploads/'))
  }
  if (files.length) {
    let arr = []
    for (let file of files) {
      if (fileTypeArr.indexOf(file.type) !== -1 && (file.size / 1024 / 1024) < 2) {
        const isPass = await checkImg(file.path)
        if (isPass.conclusionType === 1) {
          const filePath = await upload(file, ctx)
          imgArr.push(filePath)
          arr.push({resource_name: file.name, resource_url: filePath})
        }
      }
    }
    resourcesController.insertResource(ctx, arr )
  } else {
    if (fileTypeArr.indexOf(files.type) === -1) {
      ctx.fail(500,'暂不支持上传该类型的文件')
      return false
    }
    if ((files.size / 1024 / 1024) > 2 ) {
      ctx.fail(500,'文件大小不能大于2M')
      return false
    }
    const isPass = await checkImg(files.path)
    if (isPass.conclusionType === 1) {
      const filePath = await upload(files, ctx)
      resourcesController.insertResource(ctx, [{resource_name: files.name, resource_url: filePath}])
      imgArr.push(filePath)
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
