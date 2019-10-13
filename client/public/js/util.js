import md5 from 'blueimp-md5'

export function getAvatar(avatar) {
  if (/^[0-9]+$/.test(avatar)) {
    return `https://q1.qlogo.cn/g?b=qq&nk=${avatar}&s=640`
  } else {
    let hash = md5(avatar)
    return `https://cdn.v2ex.com/gravatar/${hash}?s=100&d=retro`
  }
}

export function getSuo(content) {
  let m = content.match(/suo(.+?)\)/i)
  return m ? m[1].slice(2) : 'https://wx4.sinaimg.cn/mw690/0060lm7Tly1fvmtrka9p5j30b40b43yo.jpg'
}


export let isDev = process.env.NODE_ENV === 'development'
export const HOME_LINK = 'https://www.clicli.us'
export const API_LINK = 'https://api.clicli.us'
export const ADMIN_LINK = 'https://admin.clicli.us'

export function getAv(id) {
  return id.substring(2, id.length)
}
