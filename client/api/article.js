import axios from 'axios'
import {getStorage} from "common/js/localstorage"

// 获取所有文章
export function articleList(sort) {
  return axios.get('/posts', {
    params: {
      status: 'public',
      sort: sort,
      page: 1,
      pageSize: 20
    }
  })
}

// 根据作者获取文章
export function authorArticle(id) {
  return axios.get('/posts', {
    params: {
      uid: id,
      page: 1,
      pageSize: 20
    }
  })
}

// 查找一篇文章
export function getOneArticle(id) {
  return axios.get(`/post/${id}`)
}

// 撰写增加文章

export function writeArticle(post) {

  return axios.post('/post/add', {
    title: post.title,
    content: post.content,
    status: post.status,
    sort: post.sort,
    uid: getStorage('user-info').id
  })
}

// 更新文章
export function update(post) {
  return axios.post(`/post/update/${post.id}`, {
    title: post.title,
    content: post.content,
    status: post.status,
    sort: post.sort,
    uid: getStorage('user-info').id
  })
}

// 删除一篇文章
export function deleteArticle(id) {
  return axios.delete(`/post/delete/${id}`)
}

