const axios = require('axios')
const Router = require('koa-router')
const fs = require('fs')
const path = require('path')
const MemoryFs = require('memory-fs')
const webpack = require('webpack')
const VueServerRenderer = require('vue-server-renderer')

const serverConfig = require('../build/wp.server')

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

// 正式ssr逻辑
const handleSSR = async (ctx) => {
  if (bundle === 'undefined') {
    ctx.body = '刷新试试？'
  }
  const clientManifestRes = await axios.get('http://localhost:2333/vue-ssr-client-manifest.json')
  const clientManifest = clientManifestRes.data
  const template = fs.readFileSync(
    path.join(__dirname, './template.html'),
    'utf-8'
  )
  const renderer = VueServerRenderer.createBundleRenderer(bundle, {
    template,
    clientManifest
  })

  const context = {
    url: ctx.path,
    title: '开发开发'
  }
  const appString = await renderer.renderToString(context)

  ctx.body = appString
}

// 导出路由
const router = new Router()

router.get('*', handleSSR)
module.exports = router


