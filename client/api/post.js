import axios from 'axios'
import {isDev, API_LINK} from 'public/js/util'

export const request = axios.create({
  baseURL: API_LINK
})
export function getPosts(status, sort, tag, uid, page, pageSize) {
  return request.get('/posts', {
    params: {
      status,
      sort,
      tag,
      uid,
      page,
      pageSize
    }
  })
}

// 查找一篇文章
export function getPost(id) {
  return request.get(`/post/${id}`)
}

// 搜索
export function searchPosts(key) {
  return request.get('/search/posts', {
    params: {
      key
    }
  })
}

// 获取周播表
export function getWeekList() {
  return request.get('/posts?status=nowait&sort=新番&page=1&pageSize=100')
}