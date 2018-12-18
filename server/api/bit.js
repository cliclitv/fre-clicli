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
        'Cookie': 'Hm_lvt_8d02905a9d991c46155306095c479b2d=1544510716,1544511272,1544950714,1545118820; cloud_web_in=f6c5b4a144694dd28ebc7874168989e7; UM_distinctid=167c042d624435-04d64e195361e5-3a3a5d0c-384000-167c042d626687; CNZZDATA1273903500=168272615-1545117989-https%253A%252F%252Fpan.bitqiu.com%252F%7C1545117989; cloud_web_sid=3cd9de553c1c42c8a269f1d72a57bf92; cloud_web_uid=105034672; Hm_lpvt_8d02905a9d991c46155306095c479b2d=1545118976',
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
      m3u8Url: line
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

