const Router = require('koa-router')
const path = require('path')
const fs = require('fs')
const axios = require('axios')
const Base64 = require('js-base64').Base64

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
  let av = ctx.query.av
  let type = parser.avType(av)
  switch (type) {
    case 'bilibili':
      let ob
      if (av.indexOf('av') < 0) {
        av = av.replace('www.', 'm.')

        ob = await axios.get(av).then(res => {
          let cid, aid

          cid = res.data.match(/cid(\S*)cover/)
          aid = res.data.match(/aid(\S*)cid/)

          if (cid) {
            return {
              a: aid[1].substring(2, aid[1].length - 2),
              c: cid[1].substring(2, cid[1].length - 2)
            }
          }
        })
      } else {
        av = av + '/'
        let aid = av.match(/av(\S+?)\//)[1].replace('/', '')
        ob = await axios.get('https://api.bilibili.com/x/web-interface/view', {
          params: {
            aid
          }
        }).then(res => {
          let p2 = res.data.data.pages
          if (p2.length > 1) {
            p2 = res.data.data.pages[1].cid
          }
          return {
            a: aid,
            c: res.data.data.cid,
            p2
          }
        })
      }
      let ep, av
      if (av.indexOf('av') < 0) {
        ep = await axios.get(`https://www.kanbilibili.com/api/video/${ob.a}/download`, {
          params: {
            cid: ob.c,
            quality: 16,
            page: 1,
            bangumi: 1
          },
          headers: {
            Host: 'www.kanbilibili.com'
          }
        }).then(res => {
          return res.data.data.dav[0].av.replace('http', 'https')
        })
      } else {
        if (av.indexOf('p=') < 0) {
          av = await axios.get('https://api.bilibili.com/x/player/playav', {
            params: {
              cid: ob.c,
              avid: ob.a,
              platform: 'html5',
              otype: 'json',
              qn: 16,
              type: 'mp4'
            },
            headers: {
              Host: 'api.bilibili.com',
            }
          }).then(res => {
            return res.data.data.dav[0].av.replace('http', 'https')
          })
        } else {
          let p = av.match(/p=(\S*)/)[1]
          av = await axios.get(`https://www.kanbilibili.com/api/video/${ob.a}/download`, {
            params: {
              cid: ob.p2 ? ob.p2 : ob.c,
              quality: 16,
              page: p ? p : 1
            },
            headers: {
              Host: 'www.kanbilibili.com'
            }
          }).then(res => {
            return res.data.data.dav[0].av
          })
        }

      }

      ctx.body = {
        code: 0,
        aid: ob.a,
        cid: ob.c,
        av: av.indexOf('av') < 0 ? ep : av,
        type: 'mp4'
      }
      break
    case 'qq':
      av = av.substring(av.length - 16, av.length - 5)
      const qqv = await axios.get(`http://vv.video.qq.com/getinfo`, {
        headers: {
          'X-Forwarded-For': '183.3.226.35'
        },
        params: {
          vids: av,
          platform: 101001,
          charge: 0,
          otype: 'json'
        }
      }).then(res => {
        let data = res.data.substring(13, res.data.length - 1)
        data = JSON.parse(data)
        return {
          pre: data.vl.vi[0].ul,
          vid: data.vl.vi[0].vid
        }

      })

      await axios.get('http://vv.video.qq.com/getkey', {
        headers: {
          'X-Forwarded-For': '183.3.226.35'
        },
        params: {
          format: 2,
          otype: 'json',
          vt: 150,
          vid: qqv.vid,
          filename: qqv.vid + '.mp4',
          change: 0,
          platform: '11'
        }
      }).then(res => {
        let data = res.data.substring(13, res.data.length - 1)
        data = JSON.parse(data)
        let fn = data.filename
        let key = data.key

        ctx.body = {
          code: 0,
          av: `http://221.7.255.177/cache.p4p.com/${fn}?vkey=${key}`,
          type: 'mp4'
        }
      })
      break
    case 'qinmei':
      let link = Base64.decode(av.match(/l=(\S*)/)[1])
      let pa = link.split(';')
      const out = await axios.post(`https://qinmei.org/wp-json/wp/v2/animeinfo/play?animateweb=19414`, {
        animate: pa[0],
        sort: pa[2]
      }, {
        headers: {
          Referer: av
        }
      }).then(res => {
        return res.data.link
      })
      ctx.body = {
        code: 0,
        av: out,
        type: 'mp4'
      }
      break
    case 'hcy':
      await axios.get(av).then(res => {
        let out = res.data.match(/download(\S*);/)
        let u = out[0].substring(0, out[0].length - 2)

        ctx.body = {
          code: 0,
          av: `http://${u}`,
          type: 'mp4'
        }
      })
      break
    case 'bit':
      await axios.get(av, {
        headers: {
          Host: '193.112.131.234:8081',
          Referer: 'http://193.112.131.234:8081/dir/bit?id=b4b3dada475f49589530096c2ec66a90',
          Cookies: 'ci_session=307fd488702adf3d21e0fbcea88c486134fe1cfc'
        }
      }).then(res => {
        let src = res.data.match(/av([\s\S]+?);/)[1]
        ctx.body = {
          code: 0,
          av: src.substring(4, src.length - 1),
          type: 'mp4'
        }
        ctx.body = res.data
      })
      break
    default:
      ctx.body = {
        code: 0,
        av,
        type: av.indexOf('m3u8') < 0 ? 'mp4' : 'hls'
      }
  }
})

router.get('/week/', async ctx => {
  ctx.body = {
    data: [
      {
        day: '周一', content: [
          {
            title: '进击的巨人第三季',
            suo: 'https://ws1.sinaimg.cn/large/0065Zy9egy1fvxpe4g8gfj30bt0b4wew.jpg',
            av: 'av100',
            oid: '12'
          },
          {
            title: '夕照少女',
            suo: 'https://ws1.sinaimg.cn/large/0065Zy9egy1fvxpe4harcj30ka0dhmyc.jpg',
            av: 'av334',
            oid: '02'
          },
        ]
      },
      {
        day: '周二', content: [
          {title: 'overlord第三季', suo: 'https://i.loli.net/2018/09/12/5b985c2fc9670.jpg', av: 'av246', oid: '12'},
          {
            title: '关于我转生后成为史莱姆的那件事',
            suo: 'https://i.loli.net/2018/10/02/5bb3393eec0d3.jpg',
            av: 'av328',
            oid: '02'
          },
          {
            title: '东京食尸鬼：re 第二季',
            suo: 'http://wx4.sinaimg.cn/mw690/0060lm7Tly1fvkh2n40ofj30hs0a0q43.jpg',
            av: 'av350',
            oid: '01'
          },
          {
            title: '欢迎光临，千岁酱',
            suo: 'https://i.loli.net/2018/10/09/5bbbf8bc45ecc.jpg',
            av: 'av371',
            oid: '01'
          },
        ]
      },
      {
        day: '周三', content: [
          {
            title: 'Free!第三季',
            suo: 'http://wx4.sinaimg.cn/mw690/0060lm7Tly1fue2ux88orj30go0nm77h.jpg',
            av: 'av82',
            oid: '12'
          },
          {
            title: '嫁给非人类',
            suo: 'http://wx2.sinaimg.cn/mw690/0060lm7Tly1fvv86436kwj30wx0ib3zc.jpg',
            av: 'play/av332',
            oid: '02'
          },
          {
            title: '强风吹拂',
            suo: 'https://i.loli.net/2018/10/04/5bb5344c52420.jpg',
            av: 'av337',
            oid: '02'
          },
          {
            title: 'RErideD',
            suo: 'https://i.loli.net/2018/10/04/5bb5321807393.jpg',
            av: 'av335',
            oid: '06'
          },
          {
            title: '宇宙战舰提拉米苏 第二季',
            suo: 'https://i.loli.net/2018/10/04/5bb5387a0c216.jpg',
            av: 'av338',
            oid: '02'
          },
          {
            title: '受孕！请为我生孩子吧',
            suo: 'https://ws1.sinaimg.cn/large/0065Zy9egy1fw2zwcw6v9j30cl0hsgn6.jpg',
            av: 'av374',
            oid: '02'
          },
          {
            title: '轩辕剑·苍之曜',
            suo: 'https://ws1.sinaimg.cn/large/0065Zy9egy1fw3cqzpr8dj30z80ju76c.jpg',
            av: 'av377',
            oid: '02'
          },
          {
            title: '我喜欢的妹妹但不是妹妹',
            suo: 'https://ws1.sinaimg.cn/large/0065Zy9egy1fw3i3d8gasj317a1p4qcz.jpg',
            av: 'av378',
            oid: '01'
          }
        ]
      },
      {
        day: '周四', content: [
          {
            title: '命运石之门0',
            suo: 'http://wx3.sinaimg.cn/mw690/0060lm7Tly1fuzw1gkogzj31kw0zktm5.jpg',
            av: 'av104',
            oid: '23'
          },
          {
            title: '天狼',
            suo: 'http://wx3.sinaimg.cn/mw690/0060lm7Tly1fv34zwanxwj30zk0k0jsi.jpg',
            av: 'av230',
            oid: '12'
          },
          {
            title: '青春猪头少年不会梦到兔女郎学姐',
            suo: 'https://ws1.sinaimg.cn/large/0065Zy9egy1fvxp6792vqj305k05kt8z.jpg',
            av: 'av340',
            oid: '02'
          },
          {
            title: '天空与海洋之间',
            suo: 'http://wx4.sinaimg.cn/mw690/0060lm7Tly1fw44ofxkh8j30co0hsta1.jpg',
            av: 'av382',
            oid: '02'
          },
          {
            title: '魔偶马戏团',
            suo: 'http://wx3.sinaimg.cn/mw690/0060lm7Tly1fw44ln9ulvj30hs0ozwhk.jpg',
            av: 'av381',
            oid: '01'
          },
          {
            title: '只要别西卜大小姐喜欢就好',
            suo: 'http://wx2.sinaimg.cn/mw690/0060lm7Tly1fw44imp357j30e80lcq55.jpg',
            av: 'av380',
            oid: '01'
          },
          {
            title: '永不止步真好',
            suo: 'https://ws1.sinaimg.cn/large/0065Zy9egy1fw45vd5yc9j30go0l3tcq.jpg',
            av: 'av383',
            oid: '01'
          }
        ]
      },
      {
        day: '周五', content: [
          {
            title: '魔法禁书目录Ⅲ',
            suo: 'https://ws1.sinaimg.cn/large/0065Zy9egy1fvxp6790w5j30dw0dwwf7.jpg',
            av: 'av353',
            oid: '02'
          },
          {
            title: '佐贺偶像是传奇',
            suo: 'https://i.loli.net/2018/10/06/5bb7928b6d4c2.jpg',
            av: 'av355',
            oid: '02'
          },
          {
            title: '终将成为你',
            suo: 'https://i.loli.net/2018/10/06/5bb79feb90534.jpg',
            av: 'av358',
            oid: '02'
          },
          {
            title: '邻家吸血鬼小妹',
            suo: 'https://ws1.sinaimg.cn/large/0065Zy9egy1fvxp678fqwj30ke0beaac.jpg',
            av: 'av352',
            oid: '02'
          },
          {
            title: '我家的女仆太烦人了',
            suo: 'https://i.loli.net/2018/10/06/5bb7a98e1b339.jpg',
            av: 'av359',
            oid: '02'
          },

          {
            title: '火之丸相扑',
            suo: 'https://i.loli.net/2018/10/06/5bb7957374a45.jpg',
            av: 'av356',
            oid: '02'
          },
          {
            title: '梅露可物语',
            suo: 'http://wx1.sinaimg.cn/mw690/0060lm7Tly1fw547qm6xej30xc0wntdv.jpg',
            av: 'av397',
            oid: '02'
          }
        ]
      },
      {
        day: '周六', content: [
          {title: '魔道祖师', suo: 'https://i.loli.net/2018/03/29/5abce56bd7312.jpg', av: 'av213', oid: '15'},
          {
            title: '我让最想被拥抱的男人给威胁了',
            suo: 'https://ws1.sinaimg.cn/large/0065Zy9egy1fvxp67c9oqj305k05kglp.jpg',
            av: 'av354',
            oid: '01'
          },
          {
            title: 'JOJO的奇妙冒险 黄金之风',
            suo: 'https://i.loli.net/2018/10/06/5bb805ac8c7e2.jpg',
            av: 'av360',
            oid: '01'
          },
          {
            title: '来自多彩世界的明天',
            suo: 'https://ws1.sinaimg.cn/large/0065Zy9egy1fvycth1mlhj30fa0b475z.jpg',
            av: 'av361',
            oid: '02'
          },
          {
            title: '寄宿学校的朱丽叶',
            suo: 'https://ws1.sinaimg.cn/large/0065Zy9egy1fvygyuwcqhj30f008fdg6.jpg',
            av: 'av363',
            oid: '02'
          },
          {
            title: '学园BASARA',
            suo: 'https://i.loli.net/2018/10/06/5bb79b7c4d735.jpg',
            av: 'av357',
            oid: '02'
          },
          {
            title: '闪乱神乐 SHINOVI MASTER 东京妖魔篇',
            suo: 'https://ws1.sinaimg.cn/large/0065Zy9egy1fw6ewyqkj3j312w0qagwf.jpg',
            av: 'av402',
            oid: '01'
          },
        ]
      },
      {
        day: '周日', content: [
          {title: '博人传', suo: 'https://i.loli.net/2018/07/29/5b5dbcc9a9d08.jpg', av: 'av4', oid: '77'},
          {
            title: 'Island',
            suo: 'http://wx2.sinaimg.cn/mw690/0060lm7Tly1fuonnmv6tlj30z90jstve.jpg',
            av: 'av200',
            oid: '13'
          },

          {
            title: '海贼王',
            suo: 'http://wx4.sinaimg.cn/mw690/0060lm7Tly1fv36qz2bf5j31jk0v9gvh.jpg',
            av: 'av258',
            oid: '856'
          },
          {
            title: '刀剑神域 第三季',
            suo: 'https://i.loli.net/2018/10/07/5bb8f60026cea.jpg',
            av: 'av366',
            oid: '02'
          },
          {
            title: '妖精的尾巴 终章',
            suo: 'http://wx1.sinaimg.cn/mw690/0060lm7Tly1fvjb33fmkjj31hc0u0n4s.jpg',
            av: 'av264',
            oid: '279'
          },
          {
            title: '哥布林杀手',
            suo: 'https://i.loli.net/2018/10/07/5bb8f35ec4744.jpg',
            av: 'av365',
            oid: '02'
          }
        ]
      }
    ]
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
      av: ctx.path
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
