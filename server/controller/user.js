const User = require('../model/user')
const utils = require('../util/utils')
const _ignore = {pwd: 0, __v: 0}
module.exports = {
  // 查找所有用户并分页
  async getUser(ctx) {
    let page = parseInt(ctx.query.page)
    let pageSize = parseInt(ctx.query.pageSize)
    const result = await User.find({}, _ignore).skip((page - 1) * pageSize)
      .limit(pageSize)
    ctx.body = {
      code: 0,
      count: result.length,
      result
    }
  },
  // 查询单一用户信息
  async userInfo(ctx) {
    const id = await ctx.query.id || await ctx.cookies.get('id')
    if (!id) {
      return ctx.body = {
        code: 1
      }
    }
    const result = await User.findOne({_id: id}, _ignore)
    ctx.body = {
      code: 0,
      result
    }
  },

  // 用户注册

  async userRegister(ctx) {
    let data = ctx.request.body
    const isexit = await User.findOne({name: data.name})
    if (isexit) {
      return ctx.body = {
        code: 1,
        msg: '用户名已存在'
      }
    }
    const result = await User.create({
      name: data.name,
      pwd: utils.md5Pwd(data.pwd),
      qq: data.qq,
      role: 'user',
      desc: '这家伙很懒，什么也没写……'
    })
    ctx.body = {
      code: 0,
      msg: '注册成功，马上跳转！',
      result
    }

  },

  // 更新用户信息
  async update(ctx) {
    let data = ctx.request.body
    if (data.pwd) {
      await User.update({_id: data._id}, {
        $set: {
          pwd: utils.md5Pwd(data.pwd)
        }
      })
    }
    await User.update({_id: data._id}, {
      $set: {
        name: data.name,
        qq: data.qq,
        role: data.role,
        desc: data.desc
      }
    })
    ctx.body = {
      code: 0,
      msg: '更新成功啦！'
    }
  },
// 删除用户
  async deleteUser(ctx) {

    let id = ctx.query.id
    await User.remove({_id: id})
    ctx.body = {
      code: 0,
      id
    }

  },
// 用户登陆

  async userLogin(ctx) {
    let data = ctx.request.body
    const isexit = await User.findOne({name: data.name, pwd: utils.md5Pwd(data.pwd)})
    if (!isexit) {
      return ctx.body = {
        code: 1,
        msg: '用户名或密码错误'
      }
    }
    const result = await User.findOne({name: data.name}, _ignore)
    const id = result._id

    // 设置cookie

    ctx.cookies.set(
      'id', id, {
        domain: 'idanmu.cc'
      }
    )
    ctx.body = {
      code: 0,
      msg: '登录成功，马上跳转！',
      result
    }
  },

  // 用户退出
  async logout(ctx) {
    const id = ctx.cookies.get('id')
    console.log(id)
    if (id) {
      ctx.cookies.set('id', '', {
        domain: 'idanmu.cc'
      })
      ctx.body = {
        code: 0,
        msg: '退出成功！'
      }
    }
  }
}





