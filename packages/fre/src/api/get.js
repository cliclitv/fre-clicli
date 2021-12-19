import { get } from '../public/js/fetch'

export function getPost(type, tag, page, pageSize, status, uid) {
  return get(`//api.clicli.cc/posts?status=${status || 'public'}&sort=${type}&tag=${tag}&uid=${uid || ''}&page=${page}&pageSize=${pageSize}`)
}

export function getRank() {
  return get('//api.clicli.cc/rank')
}

export function getPostDetail(pid) {
  return get(`//api.clicli.cc/post/${pid}`)
}

export function getVideoList(pid) {
  return get(`//api.clicli.cc/videos?pid=${pid}&page=1&pageSize=150`)
}

export function getPlayUrl(url) {
  return get(`//api.clicli.cc/jx?url=${url}`)
}

export function getPv(pid) {
  return get(`//api.clicli.cc/pv/${pid}`)
}

export function getSearch(key) {
  return get(`//api.clicli.cc/search/posts?key=${key}`)
}
