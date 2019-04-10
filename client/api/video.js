import axios from 'axios'

const request = axios.create({
  baseURL: 'https://api.clicli.top'
})

// 根据pid查找评论
export function getVideos(pid, page, pageSize) {
  return request.get('/videos', {
    params: {
      pid: pid,
      page,
      pageSize
    }
  })
}

// 添加视频
export function addVideo(oid, title, content, pid, uid) {
  return request.post('/video/add', {
    oid: parseInt(oid),
    title,
    content,
    pid: parseInt(pid),
    uid
  })
}

// 修改视频
export function updateVideo(oid, title, content, pid, uid) {
  return request.post('/video/update', {
    oid: parseInt(oid),
    title,
    content,
    pid: parseInt(pid),
    uid
  })
}

// 根据地址获取真实链接
export function getRealUrl(url) {
  if (url.indexOf('www.clicli') > -1) {
    return axios.get(url)
  } else {
    return axios.get('https://www.clicli.top/jx', {
      params: {
        url
      }
    })
  }
}

export function getPv(pid) {
  return axios.get(`https://www.clicli.top/get/pv?pid=${pid}`)
}