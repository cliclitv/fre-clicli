const axios = require("axios")
const util = require('./util/util')
const Hcy = require('./hcy')

axios.interceptors.response.use({}, err => {
  if (err.response.status === 302) return err.response
})

exports.default = async ctx => {
  let url = decodeURIComponent(ctx.query.url)
  let [content, type] = url.split('@')
  switch (type) {
    case 'hcy':
      return Hcy.getUrl(ctx, content)
    case 'ksyun':
      await axios.get(`http://www.zzzfun.com/static/danmu/ksyun.php?${content}`, {
        headers: {
          Referer: "http://www.zzzfun.com"
        }
      }).then(res => {
        let ret = res.data.match(/source src="(\S*)"/)[1]
        ctx.body = {
          code: 0,
          url: ret,
          type: 'mp4'
        }
      })
      break
    case 's_360':
      await axios.get(`http://www.zzzfun.com/static/danmu/san.php?v360?v=${content}`, {
        headers: {
          Referer: "http://www.zzzfun.com"
        }
      }).then(res => {
        console.log(res.data)
        let ret = res.data.match(/source src="(\S*)"/)[1]
        ctx.body = {
          code: 0,
          url: ret,
          type: 'mp4'
        }
      })
      break
    case "onedrive":
      ctx.body = {
        code: 0,
        url: `${url}&download=1`,
        type: "mp4"
      }
      break
    case "tieba":
      content = `${content}?fr=share`
      await axios.get(content).then(res => {
        let src = res.data.match(/6LZ0ej3k1Qd3ote6lo7D0j9wehsv([\s\S]+?)mp4/)[0]
        ctx.body = `<h3>https://gss3.baidu.com/${src.replace(/\\/g, "")}</h3>`
      })
      break

    case "c_360":
      await axios
        .get(`https://play.aikcq.cn/static/danmu/zhilian2.php?http://jx.2xuexi.top:8081/play/${content}`, {
          headers: {
            Referer: "https://www.bimibimi.cc"
          }
        })
        .then(res => {
          ctx.body = {
            code: 0,
            url: res.data.match(/<source  src="(\S*)" onerror/)[1],
            type: "mp4"
          }
        })
      break
    case 'qqmail':
      await axios.get(`http://119.23.209.33/static/danmu/niux.php?id=${content}.mp4`,{
        headers: {
          Referer: "https://www.bimibimi.tv"
        }
      }).then(res=>{
        ctx.body={
          code:0,
          url: res.data.match(/<source  src="(\S*)" onerror/)[1],
          type: "mp4"
        }
      })
      break
    case 'dogecloud':
      const userIp = ctx.req.connection.remoteAddress
      let param = `/video/streams.json?platform=pch5&vid=${content}&ip=${userIp}`
      let accessToken = util.getAccessToken(param)
      await axios.get(`https://api.dogecloud.com${param}`, {
        headers: {
          Host: 'api.dogecloud.com',
          Authorization: `TOKEN ${accessToken}`
        }
      }).then(res => {
        ctx.body = {
          code: 0,
          url: res.data.data.stream[0].url,
          type: 'hls'
        }
      })
      break
    case '1096':
      const vid = await axios.get(`https://www.wegame.com.cn/api/forum/lua/wegame_feeds/get_feed_item_data?p={"iid":"${content}","uid":211762212}`).then(res => {
        let obj = JSON.parse(res.data.data.data.data)
        return obj.video.vid
      })
      let link = `https://qt.qq.com/php_cgi/cod_video/php/get_video_url.php?json=1&multirate=1&filetype=40&game_id=123456&vid=${vid}`
      await axios.get(link).then(res => {
        ctx.body = {
          code: res.data.code,
          url: res.data.data[0].data[0]
        }
      })
      break
    default:
      ctx.body = {
        code: 0,
        url: content,
        type: content.toLowerCase().indexOf("m3u8") > -1 ? 'hls' : 'mp4'
      }
  }
}