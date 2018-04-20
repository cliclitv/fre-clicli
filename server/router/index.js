/*整合所有子路由*/

const Router = require('koa-router')

const routers = new Router()
let ssr

const article = require('./article')
const user = require('./user')

if (process.env.NODE_ENV === 'development') {
  ssr = require('../controller/ssr-dev')
} else {
  ssr = require('../controller/ssr-online')
}

// 注册子路由
routers.use('/article', article.routes())
routers.use('/user', user.routes())
routers.use('*', ssr.routes())

module.exports = routers
