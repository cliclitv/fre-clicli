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

const router = new Router()

router.get('/jx/', Jx.default)
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
  ctx.request.headers['user-agent'] = ctx.request.headers['user-agent'] + ' 115Browser/9.0.0'
  ctx.type = 'html'
  const cookie = ctx.cookies.get('uname')
  if (cookie) {
    let data = fs.readFileSync(path.join(__dirname, '../dist/spa/index.html'))
    ctx.body = data.toString()
  } else {
    const context = {
      url: ctx.path
    }
    try {
      const app = await bundle(context)

      const appString = await renderer.renderToString(app, context)

      ctx.body = appString
    } catch (err) {
      console.log('render error', err)
      throw err
    }
  }
})
module.exports = router
