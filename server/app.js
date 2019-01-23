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

app.use(koaStatic(path.join(__dirname, '../dist')))
app.use(router.routes())

app.listen(3000, () => {
  console.log('clicli started on 3000')
})

