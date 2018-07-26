import axios from 'axios'
import {getStorage} from "common/js/localstorage"
const request = axios.create({
  baseURL: 'http://api.chinko.cc'
})

// 获取所有文章
export function articleList() {
  return request.get('/posts', {
    params: {
      status: 'public',
      page: 1,
      pageSize: 20
    }
  })
}

// 根据作者获取文章
export function authorArticle(id) {
  return request.get('/posts', {
    params: {
      uid: id,
      page: 1,
      pageSize: 20
    }
  })
}

// 查找一篇文章
export function getOneArticle(id) {
  return request.get(`/post/${id}`)
}

// 撰写增加文章

export function writeArticle(post) {

  return request.post('/post/add', {
    title: post.title,
    content: post.content,
    status: post.status,
    sort: post.sort,
    uid: getStorage('user-info').id
  })
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

// 删除一篇文章
export function deleteArticle(id) {
  return request.delete(`/post/delete/${id}`)
}

