import moment from 'moment'
import marked from 'marked'

export function getAvatar(avatar) {
  return `https://q2.qlogo.cn/headimg_dl?dst_uin=` + avatar + `&spec=100`
}
export function momentTime(time) {
  return moment(time).format('MM-DD')
}

export function mark(content) {
  return marked(content, {breaks: true})
}

export function getSuo(content) {
  return content.match(/suo(.+?)\)/i)[1].slice(2)
}