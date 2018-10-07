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
    url: ctx.path
  }
  const appString = await renderer.renderToString(context)

  ctx.body = appString
}

// 导出路由
const router = new Router()

router.get('/week/',async ctx=>{
  ctx.body={
    data:[
      {
        day: '周一', content: [
          {
            title: '进击的巨人第三季',
            suo: 'https://ws1.sinaimg.cn/large/0065Zy9egy1fvxpe4g8gfj30bt0b4wew.jpg',
            url: '/p/100',
            oid: '10'
          },
          {
            title: '夕照少女',
            suo: 'https://ws1.sinaimg.cn/large/0065Zy9egy1fvxpe4harcj30ka0dhmyc.jpg',
            url: '/p/334',
            oid: '01'
          },
        ]
      },
      {
        day: '周二', content: [
          {title: 'overlord第三季', suo: 'https://i.loli.net/2018/09/12/5b985c2fc9670.jpg', url: '/p/246', oid: '12'},
          {
            title: '关于我转生后成为史莱姆的那件事',
            suo: 'https://i.loli.net/2018/10/02/5bb3393eec0d3.jpg',
            url: '/p/328',
            oid: '1'
          }
        ]
      },
      {
        day: '周三', content: [
          {
            title: 'Free!第三季',
            suo: 'http://wx4.sinaimg.cn/mw690/0060lm7Tly1fue2ux88orj30go0nm77h.jpg',
            url: '/p/82',
            oid: '12'
          },
          {
            title: '嫁给非人类',
            suo: 'http://wx2.sinaimg.cn/mw690/0060lm7Tly1fvv86436kwj30wx0ib3zc.jpg',
            url: '/p/332',
            oid: '1'
          },
          {
            title: '强风吹拂',
            suo: 'https://i.loli.net/2018/10/04/5bb5344c52420.jpg',
            url: '/p/337',
            oid: '1'
          },
          {
            title: 'RErideD',
            suo: 'https://i.loli.net/2018/10/04/5bb5321807393.jpg',
            url: '/p/335',
            oid: '1'
          },
          {
            title: '宇宙战舰提拉米苏 第二季',
            suo: 'https://i.loli.net/2018/10/04/5bb5387a0c216.jpg',
            url: '/p/338',
            oid: '1'
          }
        ]
      },
      {
        day: '周四', content: [
          {
            title: '命运石之门0',
            suo: 'http://wx3.sinaimg.cn/mw690/0060lm7Tly1fuzw1gkogzj31kw0zktm5.jpg',
            url: '/p/104',
            oid: '23'
          },
          {
            title: '天狼',
            suo: 'http://wx3.sinaimg.cn/mw690/0060lm7Tly1fv34zwanxwj30zk0k0jsi.jpg',
            url: '/p/230',
            oid: '12'
          },
          {
            title: '青春猪头少年不会梦到兔女郎学姐',
            suo: 'https://ws1.sinaimg.cn/large/0065Zy9egy1fvxp6792vqj305k05kt8z.jpg',
            url: '/p/340',
            oid: '01'
          }
        ]
      },
      {
        day: '周五', content: [
          {
            title: '魔法禁书目录Ⅲ',
            suo: 'https://ws1.sinaimg.cn/large/0065Zy9egy1fvxp6790w5j30dw0dwwf7.jpg',
            url: '/p/353',
            oid: '01'
          },
          {
            title: '终将成为你',
            suo: 'https://i.loli.net/2018/10/06/5bb79feb90534.jpg',
            url: '/p/358',
            oid: '01'
          },
          {
            title: '邻家吸血鬼小妹',
            suo: 'https://ws1.sinaimg.cn/large/0065Zy9egy1fvxp678fqwj30ke0beaac.jpg',
            url: '/p/353',
            oid: '01'
          },
          {
            title: '我家的女仆太烦人了',
            suo: 'https://i.loli.net/2018/10/06/5bb7a98e1b339.jpg',
            url: '/p/359',
            oid: '01'
          },
          {
            title: '火之丸相扑',
            suo: 'https://i.loli.net/2018/10/06/5bb7957374a45.jpg',
            url: '/p/356',
            oid: '01'
          }
        ]
      },
      {
        day: '周六', content: [
          {title: '魔道祖师', suo: 'https://i.loli.net/2018/03/29/5abce56bd7312.jpg', url: '/p/213', oid: '15'},
          {
            title: '我让最想被拥抱的男人给威胁了',
            suo: 'https://ws1.sinaimg.cn/large/0065Zy9egy1fvxp67c9oqj305k05kglp.jpg',
            url: '/p/354',
            oid: '01'
          },
          {
            title: 'JOJO的奇妙冒险 黄金之风',
            suo: 'https://i.loli.net/2018/10/06/5bb805ac8c7e2.jpg',
            url: '/p/360',
            oid: '01'
          },
          {
            title: '来自多彩世界的明天',
            suo: 'https://ws1.sinaimg.cn/large/0065Zy9egy1fvycth1mlhj30fa0b475z.jpg',
            url: '/p/361',
            oid: '01'
          },
          {
            title: '寄宿学校的朱丽叶',
            suo: 'https://ws1.sinaimg.cn/large/0065Zy9egy1fvygyuwcqhj30f008fdg6.jpg',
            url: '/p/363',
            oid: '01'
          }
        ]
      },
      {
        day: '周日', content: [
          {title: '博人传', suo: 'https://i.loli.net/2018/07/29/5b5dbcc9a9d08.jpg', url: '/p/4', oid: '75'},
          {
            title: 'Island',
            suo: 'http://wx2.sinaimg.cn/mw690/0060lm7Tly1fuonnmv6tlj30z90jstve.jpg',
            url: '/p/200',
            oid: '12'
          },
          {
            title: '海贼王',
            suo: 'http://wx4.sinaimg.cn/mw690/0060lm7Tly1fv36qz2bf5j31jk0v9gvh.jpg',
            url: '/p/258',
            oid: '855'
          }
        ]
      }
    ]
  }
})



router.get('*', handleSSR)
module.exports = router


