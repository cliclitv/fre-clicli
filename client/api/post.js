import {getStorage} from "public/js/localstorage"

export function getPosts(status, sort, tag, uid, page, pageSize) {
  return fetch.get('/posts', {
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
  return axios.get('https://api.clicli.top/posts/both?status=public&sort=xinfan&page=1&pageSize=100')
}