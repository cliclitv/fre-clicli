const Koa = require('koa')
const app = new Koa()

let router

if (process.env.NODE_ENV === 'development') {
  router = require('./ssr-dev')
} else {
  router = require('./ssr-online')
}
app.use(router.routes())

app.listen(3000, '0.0.0.0', () => {
  console.log('ssr started on 3000')
})

