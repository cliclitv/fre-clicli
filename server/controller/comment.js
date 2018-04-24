const Comment = require('../model/comment')

module.exports = {
  // 查询所有评论

  async getAll(ctx) {
    const result = await Comment.find({})
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
      title: data.title,
      content: data.content
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