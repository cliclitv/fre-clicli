import axios from 'axios'
import {isDev, API_LINK} from 'common/js/util'


// 根据pid查找评论
export function getCommentByPid(pid, page, pageSize) {
  return request.get('/comments', {
    params: {pid, page, pageSize}
  })
}

// 根据 uid 查找评论
export function getCommentByUid(uid, page, pageSize) {
  return request.get('/comments', {
    params: {uid, page, pageSize}
  })
}


// 根据pid删除评论
export function deleteCommentByPid(pid) {
  return axios.post(`/comment/delete?pid=${pid}`)
}