/*
* restful api 评论接口汇总
*/

const comment = require('../controller/comment')
const Router = require('koa-router')


const router = new Router()

router.get('/comment', comment.getAll)
router.post('/add',comment.add)
router.delete('/delete',comment.deleteComment)

module.exports = router