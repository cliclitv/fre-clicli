const Router = require('koa-router')
const path = require('path')
const fs = require('fs')
const serverRender = require('../util/no-bundle')
const VueServerRenderer = require('vue-server-renderer')
const clientManifest = require('../../dist/vue-ssr-client-manifest.json')

const bundle = require('../../dist/js/server-build').default

const renderer = VueServerRenderer.createRenderer(
  {
    inject: false,
    clientManifest
  }
)

const template = fs.readFileSync(path.join(__dirname, '../server.template.ejs'), 'utf-8')


// 导出路由
const router = new Router()

router.get('*', async (ctx) => {
  await serverRender(ctx, renderer, template, bundle)
})
module.exports = router