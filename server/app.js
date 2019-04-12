const path = require('path')
const Koa = require('koa')
const koaStatic = require('koa-static')
const app = new Koa()

let router

if (process.env.NODE_ENV === 'development') {
  router = require('./ssr-dev')
} else {
  router = require('./ssr-online')
}
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', 'https://admin.clicli.us')
  await next()
})
app.use(koaStatic(path.join(__dirname, '../dist')))
app.use(router.routes())

app.listen(3000, '0.0.0.0', () => {
  console.log('clicli started on 3000')
})

