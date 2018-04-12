const axios = require('axios')
const Router = require('koa-router')
const fs = require('fs')
const path = require('path')
const MemoryFs = require('memory-fs')
const webpack = require('webpack')
const VueServerRenderer = require('vue-server-renderer')
const ejs = require('ejs')

const serverConfig = require('../../build/wp.server')

const serverCompiler = webpack(serverConfig)

const mfs = new MemoryFs()
serverCompiler.outputFileSystem = mfs

let bundle
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err
  stats = stats.toJson()
  stats.errors.forEach(err => console.log(err))
  stats.warnings.forEach(warn => console.log(warn))

  const bundlePath = path.join(serverConfig.output.path, 'vue-ssr-server-bundle.json')
  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
})

// 渲染到模板上
async function ssrRender(ctx, renderer, template) {
  ctx.headers['Content-Type'] = 'text/html'

  const context = {url: ctx.path}

  try {
    const appString = await renderer.renderToString(context)

    const {title} = context.meta.inject()

    let html = ejs.render(template, {
      appString,
      title: title.text(),
      style: context.renderStyles(),
      scripts: context.renderScripts(),
      initalState: context.renderState()
    })

    ctx.body = html

  } catch (e) {
    console.log(e)
    throw e
  }
}

// 正式ssr逻辑
const handleSSR = async (ctx) => {
  if (!bundle) {
    ctx.body = '等会儿……'
  }
  const clientManifestRes = await axios.get('http://localhost:2333/vue-ssr-client-manifest.json')
  const clientManifest = clientManifestRes.data
  const template = fs.readFileSync(
    path.join(__dirname, '../server.template.ejs'),
    'utf-8'
  )
  const renderer = VueServerRenderer.createBundleRenderer(bundle, {
    inject: false,
    clientManifest
  })

  await ssrRender(ctx, renderer, template)
}

// 导出路由
const router = new Router()

router.get('*', handleSSR)
module.exports = router


