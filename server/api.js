const Router = require('koa-router')
const Koa = require('koa')
const axios = require('axios')
const app = new Koa()
const Jx = require('./jx')
const util = require('./util/util')
const Hcy = require('./hcy')
const config = require('./config')
const koaStatic = require('koa-static')
const path = require('path')

const router = new Router()
app.use(koaStatic(path.join(__dirname, '../dist')))
const knex = require('knex')(config.db)

router.get('/upload/auth', async ctx => {
  let filename = ctx.query.fname
  let vn = ctx.query.rname
  let params = `/auth/upload.json?filename=${encodeURIComponent(
    filename
  )}&vn=${encodeURIComponent(vn)}`
  let accessToken = util.getAccessToken(params)
  await axios
    .get(`https://api.dogecloud.com${params}`, {
      headers: {
        Host: 'api.dogecloud.com',
        Authorization: `TOKEN ${accessToken}`
      }
    })
    .then(res => {
      if (res.data.code === 200) {
        ctx.body = {
          code: 0,
          uploadToken: res.data.data.uploadToken
        }
      }
    })
})

router.get('/get/pv', async ctx =>{
  const pid = parseInt(ctx.query.pid)
  let pvNumber = await knex.transaction(async trx => {
    let pvs = await knex('pv')
      .transacting(trx)
      .forUpdate()
      .where('pid', pid)
      .select('pv')
      .limit(1)
    if (!pvs.length) {
      let initialValue = 1
      await trx('pv').insert({ pid, pv: initialValue })
      return initialValue
    } else {
      await trx('pv')
        .where('pid', pid)
        .update({ pv: pvs[0].pv + 1 })
      return pvs[0].pv
    }
  })

  ctx.body = {
    code: 0,
    pid,
    pv: pvNumber
  }
})

router.get('/jx/', Jx.default)
router.get('/hcy/list', Hcy.getList)

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  await next()
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(8082, '0.0.0.0', () => {
  console.log('api started on 5000')
})
