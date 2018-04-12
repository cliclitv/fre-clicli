import axios from 'axios'

// 获取所有文章
export function articleList() {
  return axios.get('http://localhost:4000/article/article')
}

// 根据作者获取文章
export function authorArticle(id) {
  return axios.get('/article/author', {
    params: {
      id: id
    }
  })
}

// 查找一篇文章
export function getOneArticle(id) {
  return axios.get('/article/one', {
    params: {
      id: id
    }
  })
}

// 撰写增加文章

export function writeArticle(article) {
  return axios.post('/article/write', article)
}

// 更新文章
export function update(article) {
  return axios.post('/article/update', article)
}

// 删除一篇文章
export function deleteArticle(id) {
  return axios.delete('/article/delete', {
    params: {
      id: id
    }
  })
}