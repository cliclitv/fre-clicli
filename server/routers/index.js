/*整合所有子路由*/

const Router = require('koa-router')

const routers = new Router()
const ssr = require('../controllers/ssr')

const article = require('./article')
const user = require('./user')

// 注册子路由
routers.use('/article', article.routes())
routers.use('/user', user.routes())
routers.use('*', ssr.routes())

module.exports = routers
