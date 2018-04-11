const fs = require('fs')

const serverBundle = require('../dist/vue-ssr-server-bundle.json')
const clientManifest = require('../dist/vue-ssr-client-manifest.json')

const renderer = require('vue-server-renderer').createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template: fs.readFileSync('./index.template.html', 'utf-8'),
  clientManifest
})


module.exports = {


  async home(ctx) {
    const context = {
      title: 'vue ssr',
      url: ctx.url
    }

    renderer.renderToString(context, (err, html) => {
      if (err) {
        ctx.body = {
          code: 1
        }
        console.log(err)
      }
      ctx.body = html

    })
  }


}