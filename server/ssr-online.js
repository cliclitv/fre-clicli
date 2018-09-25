const Router = require('koa-router')
const path = require('path')
const fs = require('fs')
const axios = require('axios')

const parser = require('./parser')

const VueServerRenderer = require('vue-server-renderer')
const clientManifest = require('../dist/vue-ssr-client-manifest.json')

const bundle = require('../dist/server-build.js').default
const template = fs.readFileSync(path.join(__dirname, './template.html'), 'utf-8')
const renderer = VueServerRenderer.createRenderer({
    template,
    clientManifest
  }
)


const router = new Router()

// 解析嘀哩嘀哩和halihali
router.get('/v/', async ctx => {
  let url = ctx.query.url
  let type = parser.urlType(url)
  switch (type) {
    case 'bilibili':
      ctx.body = `https://player.baodai.org/ipsign/extend/parse_url.php?version=static&vid=${url}&type=bilibili&hd=2&ran=1537867558&access=b785fc781e933b548851be96ea8efe99&ctype=phone`
      break
    case 'dilidili':
      await axios.get(url).then(res => {
        let dili = res.data.match(/vd3.bdstatic.com(\S*)mp4/)
        if (dili) {
          let str = dili[0].replace(/\\\//g, '/')
          ctx.body = `https://${str}`
        }
      })
      break
    case 'halihali':
      const player = await axios.get(url).then(res => {
        let hali = res.data.match(/player.qinmoe.com(\S*)copyright/)
        if (hali) {
          hali = hali[1].substring(8, 36)
          return `https://player.qinmoe.com/play/${hali}`
        }
      })

      await axios.get(player, {
        headers: {
          Host: 'player.qinmoe.com',
          Referer: url
        }
      }).then(res => {
        let params = res.data.match(/<video src="(\S*)" controls/)[1]
        ctx.body = params.replace(/\\x26/g, '&').replace(/\\\//g, '/')
      })
      break
    default:
      return '未能匹配到'
  }

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



