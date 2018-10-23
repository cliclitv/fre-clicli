const axios = require('axios')

axios.defaults.withCredentials = true

exports.default = async ctx => {
  console.log(ctx)
  await axios.post('https://pan.bitqiu.com/download/getUrl?fileIds=11b135045a6140d69d26c8d1af828ce2', {}, {
    headers: {
      'Cookie': 'cloud_web_in=3bd693e6615e460186767f58ae7a7428; Hm_lvt_8d02905a9d991c46155306095c479b2d=1540205515,1540205564,1540205833,1540205852; UM_distinctid=1669b6c34f6ec3-0a6fcf90c4ffb2-551f3c12-384000-1669b6c34f73ad; CNZZDATA1273903500=309172558-1540205852-https%253A%252F%252Fpan.bitqiu.com%252F%7C1540205852; cloud_web_sid=1e3be43dbff84814a5106d54349ed6e6; cloud_web_uid=104778599; Hm_lpvt_8d02905a9d991c46155306095c479b2d=1540205877',
      'Host': 'pan.bitqiu.com',
      'Origin': 'https://pan.bitqiu.com',
      'Referer': 'https://pan.bitqiu.com/index',
      'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.81 Safari/537.36',
    }
  }).then(res => {
    ctx.body = res.data
  })
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