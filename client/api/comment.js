import axios from 'axios'

const request = axios.create({
  baseURL: process.env.VUE_ENV === 'server' ? 'https://www.idanmu.cc' : '/'
})

// 根据pid查找评论
export function getComment(pid) {
  return request.get('/comment/comment',{
    params: {
      pid: pid
    }
  })
}

// 添加评论
export function addComment(comment) {
  return request.post('/comment/add',comment)
}

// 删除评论
export function deleteComment() {
  return request.delete('/comment/delete')
}