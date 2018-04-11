/*整合所有子路由*/

const Router = require('koa-router')

const routers = new Router()

// const home = require('./home')
const article = require('../api/article')
const user = require('../api/user')

// 注册子路由
routers.use('/article', article.routes())
routers.use('/user', user.routes())
// routers.use('*', home.routes())

module.exports = routers
