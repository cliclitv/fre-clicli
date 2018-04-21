const Option = require('../model/option')

module.exports = {
  // 查询所有设置项

  async getOption(ctx) {
    const result = await Option.find({})
    const count = result.length
    ctx.body = {
      code: 0,
      count,
      result
    }
  },
// 更新某一个设置项

  async update(ctx) {
    let data = ctx.request.body
    await Option.create({
      banner: data.banner
    })
    await Option.update({
      $set: {
        banner: data.banner
      }
    })
    ctx.body = {
      code: 0,
      msg: '更新成功啦！'
    }
  }
}