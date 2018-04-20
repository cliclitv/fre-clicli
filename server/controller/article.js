const Article = require('../model/article')

module.exports = {
  // 查询所有文章并分页

  async getArticle(ctx) {
    let page = parseInt(ctx.query.page)
    let pageSize = parseInt(ctx.query.pageSize)
    const result = await Article.find({}).sort({'time': -1}).populate({path: 'author', select: 'name qq'})
      .skip((page - 1) * pageSize)
      .limit(pageSize)
    const count = result.length
    ctx.body = {
      code: 0,
      count,
      result
    }
  },

  // 查找单一文章

  async getOneArticle(ctx) {
    let id = ctx.query.id
    const result = await Article.findOne({_id: id}).populate({path: 'author', select: 'name qq'})
    ctx.body = {
      code: 0,
      result
    }
  },

  // 查找作者文章并分页

  async authorArticle(ctx) {
    let authorId = ctx.query.id
    const result = await Article.find({author: authorId})
    const count = result.length
    ctx.body = {
      code: 0,
      count,
      result
    }
  },


  // 查找分类文章并分页
  async sortArticle(ctx) {
    let sort = ctx.query.sort
    let page = parseInt(ctx.query.page)
    let pageSize = parseInt(ctx.query.pageSize)
    const result = await Article.find({sort: sort}).sort({'time': -1}).populate({
      path: 'author',
      select: 'name qq'
    }).skip((page - 1) * pageSize)
      .limit(pageSize)
    const count = result.length
    ctx.body = {
      code: 0,
      count,
      result
    }
  },
  // 撰写添加文章
  async writeArticle(ctx) {
    let data = ctx.request.body
    const id = ctx.cookies.get('id')
    const result = await Article.create({
      author: id,
      title: data.title,
      content: data.content,
      sort: data.sort,
      status: data.status
    })
    ctx.body = {
      code: 0,
      msg: '发表成功啦！',
      result
    }
  },


  // 更新文章
  async updateArticle(ctx) {
    let data = ctx.request.body
    await Article.update({_id: data._id}, {
      $set: {
        title: data.title,
        content: data.content,
        status: data.status,
        sort: data.sort,
        time: new Date()
      }
    })
    ctx.body = {
      code: 0,
      msg: '更新成功啦！'
    }
  },

  // 删除文章
  async deleteOneArticle(ctx) {
    let id = ctx.query.id

    await Article.remove({_id: id})
    ctx.body = {
      code: 0,
      id
    }
  }
}
