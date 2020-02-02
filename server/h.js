const Base64 = require('js-base64').Base64
const axios = require('axios')

axios.get('https://api.clicli.us/videos?pid=1636&page=1&pageSize=150').then(res => {
  let videos = res.data.videos
  videos.forEach(item => {
    const content = item.content
    let pa = Base64.decode(content).split(',')
    const uid = '520'
    let newPa = Base64.encode(uid + ',' + pa[1]) + '@hcy'
    console.log(newPa)
  })
})
