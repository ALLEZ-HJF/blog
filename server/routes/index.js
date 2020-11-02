const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/apidoc', function (req, res, next) {
  　　res.type('text/html')
  　　res.sendfile('public/apidoc/index.html')
});

module.exports = router
