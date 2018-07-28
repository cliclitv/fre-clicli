const Router = require('koa-router')
const path = require('path')
const fs = require('fs')
const VueServerRenderer = require('vue-server-renderer')
const clientManifest = require('../dist/vue-ssr-client-manifest.json')

const bundle = require('../dist/js/server-build.js').default
const template = fs.readFileSync(path.join(__dirname, './template.html'), 'utf-8')
const renderer = VueServerRenderer.createRenderer({
    template,
    clientManifest
  }
)


// 导出路由
const router = new Router()

router.get('*', async (ctx) => {
  ctx.type = 'html'
  const context = {
    url: ctx.path,
    title: '线上环境'
  }
  try {
    const app = await bundle(context)

    const appString = await renderer.renderToString(app, context)

    ctx.body = appString
  } catch (err) {
    console.log('render error', err)
    throw err
  }


})
module.exports = router