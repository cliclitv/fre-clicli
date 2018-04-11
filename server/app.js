const path = require('path')
const Koa = require('koa')
const Router = require('koa-router')
// 引入static中间件
const koaStaticServer = require('koa-static-server')
const koaStatic = require('koa-static')
// 引入post请求中间件
const bodyparser = require('koa-bodyparser')
const app = new Koa()
const routers = require('./routers/index.js')

const mongoose = require('mongoose')

// 连接数据库
const DB_URL = 'mongodb://127.0.0.1:27017/idanmu'
mongoose.connect(DB_URL)
mongoose.connection.on('connected', () => {
    console.log('连接成功啦~')
})

// 配置bodyparser
app.use(bodyparser())

// 配置静态文件目录
app.use(koaStaticServer({rootDir: 'react', rootPath: '/admin'}))
app.use(koaStatic(path.join( __dirname,  './dist')))

// 配置路由
app.use(routers.routes())

// 启动
app.listen(4000, () => {
    console.log('IIIIIIIIII am starting')
})

