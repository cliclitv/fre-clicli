const axios = require('axios')
const Base64 = require('js-base64').Base64
axios.interceptors.response.use({}, err => {
  if (err.response.status === 302) return err.response
  if (err.response.status === 301) return err.response
})

function urlType(url) {
  if (url.indexOf('hcy') > -1) return 'hcy'
  if (url.indexOf('typt') > -1) return 'typt'
  if (url.indexOf('yylep') > -1) return 'yylep'
  if (url.indexOf('vbit') > -1) return 'vbit'
  if (url.indexOf('qinmei') > -1) return 'qinmei'
  if (url.indexOf('bilibili') > -1) return 'bilibili'
  if (url.indexOf('va360') > -1) return '360'
  if (url.indexOf('le.com') > -1) return 'letv'
  if (url.indexOf('qinmoe') > -1) return 'qinmoe'
  if (url.indexOf('1006_') > -1) return 'qzone'
  if (url.indexOf('52088cj') > -1) return '52088cj'
  if (url.indexOf('sharepoint') > -1) return 'onedrive'
}


exports.default = async ctx => {
  let url = decodeURIComponent(ctx.query.url)
  let type = urlType(url)
  switch (type) {
    case 'bilibili':
      let ob
      if (url.indexOf('av') < 0) {
        url = url.replace('www.', 'm.')

        ob = await axios.get(url).then(res => {
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
        url = url + '/'
        let aid = url.match(/av(\S+?)\//)[1].replace('/', '')
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
      if (url.indexOf('av') < 0) {
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
          return res.data.data.durl[0].url.replace('http', 'https')
        })
      } else {
        if (url.indexOf('p=') < 0) {
          av = await axios.get('https://api.bilibili.com/x/player/playurl', {
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
            return res.data.data.durl[0].url.replace('http', 'https')
          })
        } else {
          let p = url.match(/p=(\S*)/)[1]
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
            return res.data.data.durl[0].url
          })
        }

      }

      let r = url.indexOf('av') < 0 ? ep : av

      ctx.body = {
        code: 0,
        aid: ob.a,
        cid: ob.c,
        url: r,
        type: r.indexOf('mp4') < 0 ? 'flv' : 'mp4'
      }
      break
    case 'qq':
      url = url.substring(url.length - 16, url.length - 5)
      const qqv = await axios.get(`http://vv.video.qq.com/getinfo`, {
        headers: {
          'X-Forwarded-For': '183.3.226.35'
        },
        params: {
          vids: url,
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
          url: `http://221.7.255.177/cache.p4p.com/${fn}?vkey=${key}`,
          type: 'mp4'
        }
      })
      break
    case 'qinmei':
      let link = Base64.decode(url.match(/l=(\S*)/)[1])
      let pa = link.split(';')
      const out = await axios.post(`https://qinmei.org/wp-json/wp/v2/animeinfo/play?animateweb=19414`, {
        animate: pa[0],
        sort: pa[2]
      }, {
        headers: {
          'referer': url,
          'origin': 'https://qinmei.video'
        }
      }).then(res => {
        return res.data.link
      })
      ctx.body = {
        code: 0,
        url: out,
        type: 'mp4'
      }
      break
    case 'hcy':
      await axios.get(url).then(res => {
        let out = res.data.match(/download(\S*);/)
        let u = out[0].substring(0, out[0].length - 2)

        ctx.body = {
          code: 0,
          url: `http://${u}`,
          type: 'mp4'
        }
      })
      break
    case 'vbit':
      await axios.get(url, {
        headers: {
          'Host': '193.112.131.234:8081',
          'Referer': 'http://193.112.131.234:8081/dir/bit?id=b4b3dada475f49589530096c2ec66a90',
          'Cookie': 'ci_session=b4fac7eb08062cf0d923752e3af8c0b39ea80f23',
          'User-Agent': ctx.header['user-agent'],
        }
      }).then(res => {
        ctx.body = {
          code: 0,
          url: res.data,
          type: url.indexOf('vbithls') > -1 ? 'hls' : 'mp4'
        }
      })
      break
    case 'typt':
      await axios.get(url).then(res => {
        let src = res.data.match(/url = "https:([\s\S]+?);/)[1]
        ctx.body = {
          code: 0,
          url: `https:${src}`,
          type: 'mp4'
        }
      })
      break
    case '360':
      let src
      await axios.get(url).then(res => {
        if (url.indexOf('va360') > -1) {
          src = res.data
        } else {
          src = res.data.match(/url = "https:([\s\S]+?)"/)[0].replace('"', '')
        }
        ctx.body = {
          code: 0,
          url: src,
          type: 'mp4'
        }
      })
      break
    case 'yylep':
      await axios.get(url).then(res => {
        let src = res.data.match(/url='https:([\s\S]+?)'/)[1]
        ctx.body = {
          code: 0,
          url: `https:${src}`,
          type: 'mp4'
        }
      })
      break
    case 'letv':
      await axios.get(`http://193.112.131.234:8081/play/le`, {
        params: {
          v: url
        },
        headers: {
          Cookie: 'ci_session=6ffad7666a410375c8e64acd0227f832c1277b27',
          Host: '193.112.131.234:8081',
          'User-Agent': ctx.header['user-agent']
        }
      }).then(res => {
        let src = res.data.match(/url = "http:([\s\S]+?)"/)[1]
        ctx.body = {
          code: 0,
          url: `http:${src}`,
          type: 'mp4'
        }
      })
      break
    case 'qinmoe':
      await axios.get(url, {
        headers: {
          Host: 'player.qinmoe.com',
          Referer: 'https://www.halihali.tv'
        }
      }).then(res => {
        let src = res.data.match(/<video src="(\S*)" controls/)[1]
        let out = src.replace(/\\x26/g, '&').replace(/\\\//g, '/')
        ctx.body = {
          code: 0,
          url: out,
          type: 'mp4'
        }
      })
      break
    case 'qzone':
      let id = url.match(/1006_(\S*)/)[0]
      ctx.body = {
        code: 0,
        url: `http://video.qzone.qq.com/${id}.f20.mp4`,
        type: 'mp4'
      }
      break
    case '52088cj':
      await axios.get(`http://www.bimibimi.cc/static/danmu/yy.php?${encodeURI(url)}`, {
        headers: {
          'Host': 'www.bimibimi.cc'
        }
      }).then(res => {
        let src = res.data.match(/source  src="([\s\S]+?)"/)[1]
        ctx.body = {
          code: 0,
          url: src,
          type: 'mp4'
        }
      })
      break
    case 'onedrive':
      // const share = await axios.get(url, {
      //   maxRedirects: 0
      // }).then(res => {
      //   return res.headers.location
      // })
      // console.log(share)
      //
      // const res = await axios.get(share, {
      //   maxRedirects: 0
      // }).then(res => {
      //   return res.headers.location
      // })
      // let pre = res.match(/id=(\S*)&parent/)[1]
      // let slrid = res.match(/slrid(\S*)/)[0]
      ctx.body = {
        code: 0,
        url: `${url}&download=1`,
        type: 'mp4'
      }

      break
    case 'other':
      const hash = 'fd028243fcc46c38523cf86bd2f1c5e6'
      await axios.post(`https://www.parsevideo.com/api.php?url=${url}&hash=${hash}`, {}, {
        headers: {
          'origin': 'https://www.parsevideo.com',
          'X-Forwarded-For': '183.3.226.35'
        }
      }).then(res => {
        let out = res.data.video[0].url
        ctx.body = {
          code: 0,
          url: out,
          type: out.indexOf('m3u8') < 0 ? 'mp4' : 'hls'
        }
      })
      break
    default:
      ctx.body = {
        code: 0,
        url,
        type: url.indexOf('m3u8') < 0 ? 'mp4' : 'hls'
      }
  }
}

