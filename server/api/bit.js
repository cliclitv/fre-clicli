const axios = require('axios')
const Base64 = require('js-base64').Base64

axios.defaults.withCredentials = true

module.exports = {
  async getUrl(ctx) {
    let fid = Base64.decode(ctx.params.fid).split(',')
    const cookie = await axios.get(`https://api.clicli.top/cookie/${fid[1]}`).then(res => {
      return res.data.result.bit
    })
    const down = await axios.post(`https://pan.bitqiu.com/download/getUrl?fileIds=${fid[0]}`, {}, {
      headers: {
        'Cookie': cookie,
        'Host': 'pan.bitqiu.com',
        'Origin': 'https://pan.bitqiu.com',
        'Referer': 'https://pan.bitqiu.com/index',
        'User-Agent': ctx.header['user-agent'],
      }
    }).then(res => {
      return res.data.data.url
    })

    const line = await axios.post(`https://pan.bitqiu.com/videoTranscode/getVideo?fileIds=${fid[0]}8c&org_channel=default|default|stpan&fileUid=${fid[2]}&userId=${cookie.match(/cloud_web_uid=(\S*);/)[1]}`, {}, {
      headers: {
        'Cookie': cookie,
        'Host': 'pan.bitqiu.com',
        'Origin': 'https://pan.bitqiu.com',
        'Referer': 'https://pan.bitqiu.com/index',
        'User-Agent': ctx.header['user-agent'],
      }
    }).then(res => {
      try {
        return res.data.data.m3u8Url
      } catch (e) {
        return null
      }
    })

    ctx.body = {
      code: 0,
      url: down,
      m3u8Url: line,
      type: line ? 'hls' : 'mp4'
    }
  },

  async getList(ctx) {
    const uid = ctx.cookies.get('uid')
    const cookie = await axios.get(`https://api.clicli.top/cookie/${uid}`).then(res => {
      return res.data.result.bit
    })

    const info = await axios.get('https://pan.bitqiu.com/user/getInfo', {
      headers: {
        'Cookie': cookie,
        'Host': 'pan.bitqiu.com',
        'Origin': 'https://pan.bitqiu.com',
        'Referer': 'https://pan.bitqiu.com/index',
        'User-Agent': ctx.header['user-agent']
      }
    }).then(res => {

      return res.data.data
    })

    let fid = ctx.query.fid ? ctx.query.fid : info.rootDirId

    await axios.post(`https://pan.bitqiu.com/resource/list?parentId=${fid}&currentPage=1&limit=40&orderType=updateTime&desc=1&model=0&userId=${info.userId}&name=`, {}, {
      headers: {
        'Cookie': cookie,
        'Host': 'pan.bitqiu.com',
        'Origin': 'https://pan.bitqiu.com',
        'Referer': 'https://pan.bitqiu.com/index',
        'User-Agent': ctx.header['user-agent']
      }
    }).then(res => {
      ctx.body = res.data
    })
  }
}

