import axios from 'axios'

const request = axios.create({
  baseURL: 'http://api.chinko.cc'
})

// 根据pid查找评论
export function getComments(pid,page,pageSize) {
  return request.get('/comments', {
    params: {
      pid: pid,
      page,
      pageSize
    }
  })
}

// 添加评论
export function addComment({content,pid,uid}) {
  return request.post('/comment/add', {
    content,
    pid: parseInt(pid),
    uid
  })
}

// 删除评论
export function deleteComment() {
  return request.delete('/comment/delete')
}