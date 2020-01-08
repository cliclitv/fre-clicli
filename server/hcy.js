const Base64 = require('js-base64').Base64
const axios = require('axios')
// axios.interceptors.response.use({}, err => {
//   console.log(err)
//   if (err.response.status === 302) return err.response
// })

module.exports = {
  async getList(ctx) {
    const uid = ctx.cookies.get('uid')
    const cookie = await axios.get(`https://api.clicli.us/cookie/${uid}`).then(res => {
      return res.data.result.hcy
    })

    const uuid = await axios.get('https://caiyun.feixin.10086.cn/portal/index.jsp', {
      headers: {
        Cookie: cookie,
        Host: 'caiyun.feixin.10086.cn'
      }
    }).then(res => {
      return res.data.match(/wdUserId = '(\S*)'/)[1]
    })
    let fid = ctx.query.fid ? ctx.query.fid : `${uuid}00019700101000000001`
    await axios.post(`http://caiyun.feixin.10086.cn/portal/webdisk2/queryContentAndCatalog!disk.action?startNumber=1&endNumber=40&catalogSortType=0&contentSortType=0&sortDirection=1&contentID=${fid}&isTimerShaft=0&isQueryLast=0`, {}, {
      headers: {
        Cookie: cookie,
        Host: 'caiyun.feixin.10086.cn',
        Origin: 'http://caiyun.feixin.10086.cn',
        Referer: 'http://caiyun.feixin.10086.cn/portal/index.jsp'
      }
    }).then(res => {
      ctx.body = res.data
    })
  },
  async getUrl(ctx, base) {
    let pa = Base64.decode(base).split(',')
    let url = `https://caiyun.feixin.10086.cn/webdisk2/downLoadAction!downloadToPC.action?contentID=${pa[1]}&shareContentIDs=${pa[1]}&catalogList=&downloadSize=214446914`
    const cookie = await axios.get(`https://api.clicli.us/cookie/${pa[0]}`).then(res => {
      return res.data.result.hcy
    })
    const res = await axios.get(url, {
      headers: {
        Cookie: cookie,
        Host: 'caiyun.feixin.10086.cn'
      }
    }).then(res => {
      return res.data.downloadUrl
    })
    ctx.body = {
      code: 0,
      url: res,
      type: 'mp4'
    }
  }
}