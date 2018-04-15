import axios from 'axios'

const request = axios.create({
  baseURL: process.env.VUE_ENV === 'server' ? 'http://localhost:4000' : '/'
})

// 获取所有文章
export function articleList() {
  return request.get('/article/article')
}

// 根据作者获取文章
export function authorArticle(id) {
  return request.get('/article/author', {
    params: {
      id: id
    }
  })
}

// 根据分类查找文章

export function sortArticle(sort) {
  return request.get('/article/sort', {
    params: {
      sort: sort
    }
  })
}

// 查找一篇文章
export function getOneArticle(id) {
  return request.get('/article/one', {
    params: {
      id: id
    }
  })
}

// 撰写增加文章

export function writeArticle(article) {
  return request.post('/article/write', article)
}

// 更新文章
export function update(article) {
  return request.post('/article/update', article)
}

// 删除一篇文章
export function deleteArticle(id) {
  return request.delete('/article/delete', {
    params: {
      id: id
    }
  })
}