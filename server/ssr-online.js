const Router = require('koa-router')
const path = require('path')
const fs = require('fs')
const VueServerRenderer = require('vue-server-renderer')
const clientManifest = require('../dist/vue-ssr-client-manifest.json')
const bundle = require('../dist/server-build.js').default
const template = fs.readFileSync(
  path.join(__dirname, './index.html'),
  'utf-8'
)
const renderer = VueServerRenderer.createRenderer({
  template,
  clientManifest
})

const router = new Router()

router.get('*', async ctx => {
  ctx.type = 'html'
  const cookie = ctx.cookies.get('uqq')
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
