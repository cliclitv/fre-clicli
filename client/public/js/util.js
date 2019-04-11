export function getAvatar(avatar) {
  if (/^[0-9]+$/.test(avatar)) {
    return `https://qlogo.store.qq.com/qzone/${avatar}/${avatar}/100`
  } else {
    let hash = md5(avatar)
    return `https://cdn.v2ex.com/gravatar/${hash}`
  }
}

export function getSuo(content) {
  let m = content.match(/suo(.+?)\)/i)
  return m ? m[1].slice(2) : 'https://wx4.sinaimg.cn/mw690/0060lm7Tly1fvmtrka9p5j30b40b43yo.jpg'
}

export const HOME_LINK = 'https://www.clicli.us'
export const API_LINK = 'http://139.159.198.218:4000'
export const I_LINK = 'https://i.clicli.us'

export function getAv(id) {
  return id.substring(2, id.length)
}