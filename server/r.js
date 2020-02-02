const Base64 = require('js-base64').Base64
const axios = require('axios')
const gv = '1747'
const uid = '520'
const token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImV4cCI6MTU4MDY1NDYyMiwiaWF0IjpudWxsLCJpc3MiOm51bGwsImp0aSI6bnVsbCwibGV2ZWwiOjQsIm5iZiI6bnVsbCwic3ViIjpudWxsfQ.ppfN0MFFmqHKdC5rfkBQC0MDlvOWieHFR8bVl5xwK7w'

axios.get(`https://api.clicli.us/videos?pid=${gv}&page=1&pageSize=150`).then(res => {
  let videos = res.data.videos
  videos.forEach(item => {
    let pa = Base64.decode(item.content).split(',')
    let content = Base64.encode(uid + ',' + pa[1]) + '@hcy'
    axios
      .post(
        `https://api.clicli.us/video/update/${item.id}`,
        {
          oid: parseInt(item.oid),
          title: item.title,
          content,
          pid: parseInt(gv),
          uid: parseInt(uid)
        },
        {
          headers: {
            token
          }
        }
      )
      .then(res => {
        console.log(res.data.result.oid)
      })
      .catch(e => {
        console.log(e.config.url)
      })
  })
})
