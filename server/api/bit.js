const axios = require('axios')
const Base64 = require('js-base64').Base64

axios.defaults.withCredentials = true

module.exports = {
  async getUrl(ctx) {
    let fid = Base64.decode(ctx.params.fid).split(',')
    const cookie = await axios.get(`https://api.chinko.cc/cookie/${fid[1]}`).then(res => {
      return res.data.result.bit
    })
    await axios.post(`https://pan.bitqiu.com/download/getUrl?fileIds=${fid[0]}`, {}, {
      headers: {
        'Cookie': cookie,
        'Host': 'pan.bitqiu.com',
        'Origin': 'https://pan.bitqiu.com',
        'Referer': 'https://pan.bitqiu.com/index',
        'User-Agent': ctx.header['user-agent'],
      }
    }).then(res => {
      ctx.body = {
        code: 0,
        url: res.data.data.url,
        type: 'mp4'
      }
    })
  },

  async getList(ctx) {
    const uid = ctx.cookie.get('uid')
    const cookie = await axios.get(`https://api.chinko.cc/cookie/${uid}`).then(res => {
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

// 废弃参数
// 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
// 'Accept-Encoding': 'gzip, deflate, br',
// 'Cache-Control': 'no-cache',
// 'Content-Length': 40,
// 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
// 'Accept-Language': ' zh-CN,zh;q=0.9',
// 'Connection': 'keep-alive',
// 'X-Requested-With': 'XMLHttpRequest',
// 'Upgrade-Insecure-Requests': 1,
// 'Pragma': 'no-cache',


// url 地址示例
// http://localhost:3000/bit/down?fid=11b135045a6140d69d26c8d1af828ce2 获得指定fid的文件的真实下载地址
// http://localhost:3000/bit/list?fid=11b135045a6140d69d26c8d1af828ce2 获得指定fid的列表数据

