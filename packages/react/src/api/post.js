import axios from 'axios'
import {isDev, API_LINK} from 'common/js/util'
import Cookies from 'js-cookie'

const request = axios.create({
  baseURL: API_LINK
})

export function getPosts(status, sort, tag, uid, page, pageSize) {
  return request.get(`/posts`, {
    params: {
      status, sort, tag, uid, page, pageSize
    }
  })
}

export function getPost(id) {
  return request.get(`/post/${id}`)
}

export function add({title, content, status, sort, tag, uid}) {
  return axios.post('/post/add', {
    title,
    content,
    status,
    sort,
    tag,
    uid
  }, {
    headers: {
      'token': Cookies.get('token')
    }
  })
}

// 更新文章
export function update({id, title, content, status, sort, tag, uid, time}) {
  return axios.post(`/post/update/${id}`, {
    title,
    content,
    status,
    sort,
    tag,
    uid,
    time
  }, {
    headers: {
      'token': Cookies.get('token')
    }
  })
}

// 删除一篇文章
export function deletePost(id) {
  return axios.post(`/post/delete/${id}`, {}, {
    headers: {
      'token': Cookies.get('token')
    }
  })
}

