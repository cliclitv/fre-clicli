/*
* restful api 用户接口汇总
*/

const option = require('../controller/option')
const Router = require('koa-router')


const router = new Router()

router.get('/option', option.getOption)
router.post('/update',option.update)

module.exports = router