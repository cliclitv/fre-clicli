import md5 from 'blueimp-md5'
import Cookies from 'js-cookie'

export function getAvatar(avatar) {
  if (!avatar) return ''
  if (/^[0-9]+$/.test(avatar)) {
    return `http://q1.qlogo.cn/g?b=qq&nk=${avatar}&s=5`
  } else {
    let hash = md5(avatar)
    return `https://sdn.geekzu.org/avatar/${hash}`
  }
}

export function replaceContent(content) {
  content = content.replace('piaoquantv', 'yishihui')
  return content
}

export let isDev = process.env.NODE_ENV === 'development'
export const HOME_LINK = '//www.clicli.cc'
export const API_LINK = '//api.clicli.cc'
