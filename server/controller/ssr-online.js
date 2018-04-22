const Router = require('koa-router')
const path = require('path')
const fs = require('fs')
const VueServerRenderer = require('vue-server-renderer')
const clientManifest = require('../../dist/vue-ssr-client-manifest.json')

const bundle = require('../../dist/vue-ssr-server-bundle.json')
const template = fs.readFileSync(path.join(__dirname, '../template.html'), 'utf-8')
const renderer = VueServerRenderer.createBundleRenderer(bundle, {
    template,
    clientManifest
  }
)


// 导出路由
const router = new Router()

router.get('*', async (ctx) => {
  ctx.type = 'html'
  const context = {
    url: ctx.path
  }

  const appString = await renderer.renderToString(context)

  ctx.body = appString

})
module.exports = router