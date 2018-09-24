const Router = require('koa-router')
const path = require('path')
const fs = require('fs')
const axios = require('axios')
const VueServerRenderer = require('vue-server-renderer')
const clientManifest = require('../dist/vue-ssr-client-manifest.json')

const bundle = require('../dist/server-build.js').default
const template = fs.readFileSync(path.join(__dirname, './template.html'), 'utf-8')
const renderer = VueServerRenderer.createRenderer({
    template,
    clientManifest
  }
)


// 导出路由
const router = new Router()
let out
router.get('/v/', async ctx => {
  const start = ctx.query.url

  await axios.get(start).then(res => {
    let dili = res.data.match(/vd3.bdstatic.com(\S*)mp4/)
    if (dili) {
      let str = dili[0].replace(/\\\//g, '/')
      out = `https://${str}`
    } else {
      let hali = res.data.match(/player.qinmoe.com(\S*)copyright/)
      if (hali) {
        hali = hali[1].substring(8, 36)
        let url = `https://player.qinmoe.com/play/${hali}`
        axios
          .get(url, {
            headers: {
              Host: 'player.qinmoe.com',
              Referer: start
            }
          })
          .then(res => {
            let params = res.data.match(/<video src="(\S*)" controls/)[1]
            let arr = params.replace(/\\x26/g, '&').replace(/\\\//g, '/')
            out = arr
          })
      } else {
        out = '未能匹配到，请换源'
      }
    }
  })
  ctx.body = out

})

router.get('*', async (ctx) => {
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