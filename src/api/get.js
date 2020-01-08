import {get} from "../public/js/fetch"

export function getPost(type, tag, page, pageSize, status, uid) {
  return get(`https://api.clicli.us/posts?status=${status || 'public'}&sort=${type}&tag=${tag}&uid=${uid || ''}&page=${page}&pageSize=${pageSize}`)
}

export function getRank() {
  return get('https://api.clicli.us/rank')
}

export function getPostDetail(pid) {
  return get(`https://api.clicli.us/post/${pid}`)
}

export function getVideoList(pid) {
  return get(`https://api.clicli.us/videos?pid=${pid}&page=1&pageSize=150`)
}

export function getPlayUrl(url) {
  return get(`https://jx.clicli.us/jx?url=${url}`)
}