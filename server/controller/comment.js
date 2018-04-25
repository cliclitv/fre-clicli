const Comment = require('../model/comment')

module.exports = {
  // 查询所有评论

  async getAll(ctx) {
    let pid = ctx.query.pid
    const result = await Comment.find({pid: pid}).populate({path: 'user', select: 'name qq'})
    const count = result.length
    ctx.body = {
      code: 0,
      count,
      result
    }
  },
// 发表评论

  async add(ctx) {
    let data = ctx.request.body
    const id = ctx.cookies.get('id')
    await Comment.create({
      user: id,
      content: data.content,
      pid: data.pid
    })
    ctx.body = {
      code: 0,
      msg: '发表回复成功！'
    }
  },
  // 删除评论

  async deleteComment(ctx) {
    let id = ctx.query.id
    await Comment.remove({_id: id})
    ctx.body = {
      code: 0,
      id
    }
  }
}