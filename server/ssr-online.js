const Router = require('koa-router')
const path = require('path')
const fs = require('fs')
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: 'changhao2333',
    database: 'clicli'
  }
});
const VueServerRenderer = require('vue-server-renderer')
const clientManifest = require('../dist/vue-ssr-client-manifest.json')
const bundle = require('../dist/server-build.js').default
const template = fs.readFileSync(
  path.join(__dirname, './template.html'),
  'utf-8'
)
const renderer = VueServerRenderer.createRenderer({
  template,
  clientManifest
})


const weekList = require('./week-list')
const Jx = require('./jx')
const bit = require('./api/bit')
const hcy = require('./api/hcy')

const router = new Router()

router.get('/jx/', Jx.default)
router.get('/bit/down/:fid', bit.getUrl)
router.get('/bit/list', bit.getList)
router.get('/hcy/down/:fid', hcy.getUrl)
router.get('/hcy/list', hcy.getList)
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
router.get('/week/', weekList.getWeekList)

router.get('*', async ctx => {
  ctx.type = 'html'
  const cookie = ctx.cookies.get('uname')
  if (cookie) {
    let data = fs.readFileSync(path.join(__dirname, '../dist/spa/index.html'))
    ctx.body = data.toString()
  } else {
    const context = {
      url: ctx.path
    }
    const app = await bundle(context)
    ctx.body = await renderer.renderToString(app, context)
  }
})
module.exports = router
