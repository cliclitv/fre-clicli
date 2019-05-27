const Router = require('koa-router')
const Koa = require('koa')
const app = new Koa()
const Jx = require('./jx')
const axios = require('axios')
const util = require('./util/util')
const Hcy = require('./api/hcy')

const router = new Router()

const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: 'changhao2333',
    database: 'clicli'
  }
})

router.get('/upload/auth', async ctx => {
  let filename = ctx.query.fname
  let vn = ctx.query.rname
  let params = `/auth/upload.json?filename=${encodeURIComponent(filename)}&vn=${encodeURIComponent(vn)}`
  let accessToken = util.getAccessToken(params)
  await axios.get(`https://api.dogecloud.com${params}`, {
    headers: {
      Host: 'api.dogecloud.com',
      Authorization: `TOKEN ${accessToken}`
    }
  }).then(res => {
    if (res.data.code === 200) {
      ctx.body = {
        code: 0,
        uploadToken: res.data.data.uploadToken
      }
    }
  })
})

router.get('/get/pv', async function addPv(ctx) {
  const pid = parseInt(ctx.query.pid)
  let ran = Math.floor(Math.random() * 100)
  let pv = await knex.select('pv').where('pid', pid).from('pv')
  if (!pv.length) {
    await knex('pv').insert({pid, pv: ran})
  } else {
    await knex('pv').where('pid', pid).update({pv: pv[0].pv + 1})
  }
  ctx.body = {
    code: 0,
    pid,
    pv: pv.length ? pv[0].pv : ran
  }
})

router.get('/jx/', Jx.default)
router.get('/hcy/list', Hcy.getList)
router.get('/hcy/down/:fid', Hcy.getUrl)


app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  await next()
})

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(5000, '0.0.0.0', () => {
  console.log('api started on 5000')
})

