import axios from 'axios'
import {isDev, API_LINK} from 'public/js/util'

const request = axios.create({
  baseURL: isDev ? 'http://localhost:4000' : API_LINK
})

// 根据pid查找评论
export function getComments(pid, page, pageSize) {
  return request.get('/comments', {
    params: {
      pid,
      page,
      pageSize
    }
  })
}

// 根据vid查找评论
export function getDanmuku(vid, page, pageSize) {
  return request.get('/comments', {
    params: {
      vid,
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