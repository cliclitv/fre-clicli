import axios from 'axios'
import {replaceContent, isDev, API_LINK} from 'common/js/util'
import Cookies from "js-cookie"

const request = axios.create({
  baseURL: API_LINK
})

// 根据pid查找视频
export function getVideos(pid, page, pageSize) {
  return request.get('/videos', {
    params: {
      pid: pid,
      page,
      pageSize
    }
  })
}

// 根据vid查找单一视频

export function getVideo(vid) {
  return request.get(`/video/${vid}`)

}

// 添加视频
export function addVideo({oid, title, content, pid, uid}) {
  content = replaceContent(content)
  return axios.post('/video/add', {
    oid: parseInt(oid),
    title,
    content,
    pid: parseInt(pid),
    uid
  }, {
    headers: {
      'token': Cookies.get('token')
    }
  })
}

// 修改视频
export function updateVideo({id, oid, title, content, pid, uid}) {
  content = replaceContent(content)
  return axios.post(`/video/update/${id}`, {
    oid: parseInt(oid),
    title,
    content,
    pid: parseInt(pid),
    uid
  }, {
    headers: {
      'token': Cookies.get('token')
    }
  })
}

// 根据id删除视频
export function deleteVideoById(id) {
  return axios.post(`/video/delete?id=${id}`, {}, {
    headers: {
      'token': Cookies.get('token')
    }
  })
}

// 根据pid删除视频
export function deleteVideoByPid(pid) {
  return axios.post(`/video/delete?pid=${pid}`, {}, {
    headers: {
      'token': Cookies.get('token')
    }
  })
}


//上传

export function getUploadToken(fname, rname) {
  return axios.get('https://jx.clicli.us/upload/auth', {
    params: {
      fname,
      rname
    }
  })
}