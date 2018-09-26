const Router = require('koa-router')
const path = require('path')
const fs = require('fs')
const axios = require('axios')

const parser = require('./parser')

const VueServerRenderer = require('vue-server-renderer')
const clientManifest = require('../dist/vue-ssr-client-manifest.json')

const bundle = require('../dist/server-build.js').default
const template = fs.readFileSync(
  path.join(__dirname, './template.html'),
  'utf-8'
)
const renderer = VueServerRenderer.createRenderer({
  template,
  clientManifest
})

const router = new Router()

// 解析嘀哩嘀哩和halihali
router.get('/jx/', async ctx => {
  let url = ctx.query.url
  let type = parser.urlType(url)
  switch (type) {
    case 'bilibili':
      url = url.replace('www.', 'm.')
      const ob = await axios.get(url).then(res => {
        let cid = res.data.match(/cid(\S*)cover/)
        let aid = res.data.match(/aid(\S*)cid/)
        if (cid) {
          return {
            a: aid[1].substring(2, 10),
            c: cid[1].substring(2, 10)
          }
        }
      })
      await axios.get(`https://www.kanbilibili.com/api/video/${ob.a}/download`, {
        params: {
          cid: ob.c,
          quality: 16,
          page: 1,
          bangumi: 1
        },
        headers: {
          Host: 'www.kanbilibili.com'
        }
      })
        .then(res => {
          ctx.body = {
            code: 0,
            aid: ob.a,
            cid: ob.c,
            url: res.data.data.durl[0].url.replace('http', 'https')
          }
        })
      break
    case 'dilidili':
      await axios.get(url).then(res => {
        let dili = res.data.match(/vd3.bdstatic.com(\S*)mp4/)
        if (dili) {
          let str = dili[0].replace(/\\\//g, '/')
          ctx.body = {
            code: 0,
            url: `https://${str}`
          }
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
        let url = params.replace(/\\x26/g, '&').replace(/\\\//g, '/')
        ctx.body = {
          code: 0,
          url
        }
      })
      break
    case 'silisili':
      const ret = await axios.get(url, {
        headers: {
          Host: 'www.silisili.co',
          Referer: url
        }
      }).then(res => {
        return res.data.match(/H6Id(\S*)mp4/)[0]
      })

      await axios.get(`http://47.100.0.249/kli/play.php?url=${encodeURI(ret)}`, {
        headers: {
          Host: '47.100.0.249'
        }
      }).then(res => {
        let params = res.data.match(/dl1(\S*)DOCTYPE/)[0]
        params = params.substring(0, params.length - 15).replace('\\/', '/')
        ctx.body = {
          code: 0,
          url: `https://${params}`
        }
      })
      break
    default:
      ctx.body = {
        code: 0,
        url
      }
  }
})

router.get('*', async ctx => {
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
