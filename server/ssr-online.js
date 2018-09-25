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

// 解析嘀哩嘀哩和halihali
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
let cid
// 解析哔哩哔哩
router.get('/bili/', async ctx => {
  let start = ctx.query.url


  start = start.replace('www.', 'm.')
  await axios.get(start).then(res => {
    let avid = res.data.match(/aid(\S*)cid/)
    cid = res.data.match(/cid(\S*)cover/)
    if (avid && cid) {
      avid = avid[1].substring(2, 10)
      cid = cid[1].substring(2, 10)
    }
    axios.get('https://bangumi.bilibili.com/player/web_api/v2/playurl/html5', {
      params: {
        cid,
        season_type: 1,
        bsource: ''
      },
      headers: {
        Host: 'bangumi.bilibili.com',
        Referer: start
      }
    }).then(res => {
      out = res.data.src
    })
  })
  if (out) {
    ctx.body = `
<style>
*{
  margin: 0;
  padding: 0;
}
</style>
<div class="ep" style="height: 100%;width: 100%"></div>
<script src="https://alicdn.imh3.cn/eplayer.js"></script>
<script>
new Eplayer(document.querySelector('.ep'),{
  themeColor:'linear-gradient(to right,#0072ff ,#00e7ff)',
  src:'${out}'
})
</script>
`
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