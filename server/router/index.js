// 整合所有路由

const Router = require('koa-router')

const routers = new Router()

const article = require('./article')
const user = require('./user')
const option = require('./option')
const comment = require('./comment')
let ssr

if (process.env.NODE_ENV === 'development') {
  ssr = require('../controller/ssr-dev')
} else {
  ssr = require('../controller/ssr-online')
}

// 注册子路由
routers.use('/article', article.routes())
routers.use('/user', user.routes())
routers.use('/option', option.routes())
routers.use('/comment', comment.routes())
routers.use('*', ssr.routes())

module.exports = routers
