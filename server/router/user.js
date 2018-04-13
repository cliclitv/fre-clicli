/*
* restful api 用户接口汇总
*/

const user = require('../controller/user')
const Router = require('koa-router')


const router = new Router()

router.get('/user', user.getUser)
router.get('/info', user.userInfo)
router.post('/register',user.userRegister)
router.post('/login',user.userLogin)
router.post('/update',user.update)
router.post('/logout',user.logout)

module.exports = router