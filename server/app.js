const Koa = require('koa')
const app = new Koa()

// 配置路由

let router

if (process.env.NODE_ENV === 'development') {
  router = require('./ssr-dev')
} else {
  router = require('./ssr-online')
}

app.use(router.routes())

// 启动
app.listen(4000, () => {
  console.log('IIIIIIIIII am starting')
})

