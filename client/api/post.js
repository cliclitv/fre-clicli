import axios from 'axios'
import {getStorage} from "public/js/localstorage"

export const request = axios.create({
  baseURL: '/api'
})

export function getPosts(status, sort, tag, uid, page, pageSize) {
  return request.get('/posts/both', {
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

// 更新文章
export function update(post) {
  return request.post(`/post/update/${post.id}`, {
    title: post.title,
    content: post.content,
    status: post.status,
    sort: post.sort,
    uid: getStorage('user-info').id
  })
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
  return axios.get('https://api.clicli.top/posts/both?status=public&sort=xinfan&page=1&pageSize=100')
}