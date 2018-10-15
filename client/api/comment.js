import axios from 'axios'

const request = axios.create({
  baseURL: 'https://api.chinko.cc'
})

// 根据pid查找评论
export function getComments(pid, page, pageSize) {
  return request.get('/comments', {
    params: {
      pid: pid,
      page,
      pageSize
    }
  })
}

// 根据vid查找评论
export function getDanmuku(vid, page, pageSize) {
  return request.get('/comments', {
    params: {
      vid: vid,
      page,
      pageSize
    }
  })
}

// 添加评论
export function addComment({content, pid, uid, vid, tuid, time, color}) {
  return request.post('/comment/add', {
    content,
    pid: parseInt(pid),
    uid,
    vid: vid ? vid : 1,
    color: color ? color : '#fff',
    tuid: tuid ? tuid : 0,
    time: time ? time : 0
  })
}

// 删除评论
export function deleteComment() {
  return request.delete('/comment/delete')
}