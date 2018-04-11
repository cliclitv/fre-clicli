const axios = require('axios')
const fs = require('fs')
const Router = require('koa-router')
const path = require('path')
const MemoryFs = require('memory-fs')
const webpack = require('webpack')
const VueServerRenderer = require('vue-server-renderer')

const serverConfig = require('../../build/wp.server')
const ssrRender = require('./ssr-render')

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

async function handleSSR(ctx) {
  if (!bundle) {
    ctx.body = '等会儿……'
  }
  const clientManifestRes = axios.get('http://127.0.0.1:2333/vue-ssr-client-manifest.json')
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

const router = new Router()

router.get('*', handleSSR)
module.exports = router