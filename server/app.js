const path = require('path')
const Koa = require('koa')
const Router = require('koa-router')
// 引入static中间件
const koaStatic = require('koa-static')
const app = new Koa()
const routers = require('./router/index.js')

// 配置路由
app.use(routers.routes())

// 启动
app.listen(4000, () => {
  console.log('IIIIIIIIII am starting')
})

