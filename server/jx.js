const axios = require('axios')
const util = require('./util/util')
const Hcy = require('./hcy')
const San = require('./san')

axios.interceptors.response.use({}, err => {
  if (err.response.status === 302) return err.response
})

exports.default = async ctx => {
  let url = decodeURIComponent(ctx.query.url)
  let [content, type] = url.split('@')
  switch (type) {
    case 'hcy':
      return Hcy.getUrl(ctx, content)
    case 'san':
      return San.getUrl(ctx, content)
    case 'weibo':
      await axios
        .get(`https://m.weibo.cn/statuses/show?id=${content}`, {
          headers: {}
        })
        .then(res => {
          ctx.body = {
            code: 0,
            url: res.data.data.page_info.urls.mp4_720p_mp4.replace('http', 'https'),
            type: 'mp4'
          }
        })
      break
    case 'ksyun':
      await axios
        .get(`http://www.zzzfun.com/static/danmu/ksyun.php?${content}`, {
          headers: {
            Referer: 'http://www.zzzfun.com'
          }
        })
        .then(res => {
          let ret = res.data.match(/source src="(\S*)"/)[1]
          ctx.body = {
            code: 0,
            url: ret,
            type: 'mp4'
          }
        })
      break
    case 'onedrive':
      ctx.body = {
        code: 0,
        url: `${url}&download=1`,
        type: 'mp4'
      }
      break
    case 'tieba':
      content = `${content}?fr=share`
      await axios.get(content).then(res => {
        let src = res.data.match(/6LZ0ej3k1Qd3ote6lo7D0j9wehsv([\s\S]+?)mp4/)[0]
        ctx.body = `<h3>https://gss3.baidu.com/${src.replace(/\\/g, '')}</h3>`
      })
      break
    case 'dogecloud':
      const userIp = ctx.req.connection.remoteAddress
      let param = `/video/streams.json?platform=pch5&vid=${content}&ip=${userIp}`
      let accessToken = util.getAccessToken(param)
      await axios
        .get(`https://api.dogecloud.com${param}`, {
          headers: {
            Host: 'api.dogecloud.com',
            Authorization: `TOKEN ${accessToken}`
          }
        })
        .then(res => {
          ctx.body = {
            code: 0,
            url: res.data.data.stream[0].url,
            type: 'hls'
          }
        })
      break
    case '1096':
      const vid = await axios
        .get(`https://www.wegame.com.cn/api/forum/lua/wegame_feeds/get_feed_item_data?p={"iid":"${content}","uid":211762212}`)
        .then(res => {
          let obj = JSON.parse(res.data.data.data.data)
          return obj.video.vid
        })
      let link = `https://qt.qq.com/php_cgi/cod_video/php/get_video_url.php?json=1&multirate=1&filetype=40&game_id=123456&vid=${vid}`
      const ip = ctx.request.ip
      const ua = ctx.request['user-agent']
      console.log(ip)
      await axios
        .get(link, {
          headers: {
            'User-Agent': ua,
            'X-Forwarded-For': ip
          }
        })
        .then(res => {
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
        type: content.toLowerCase().indexOf('m3u8') > -1 ? 'hls' : 'mp4'
      }
  }
}
