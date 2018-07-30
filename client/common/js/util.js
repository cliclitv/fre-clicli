import moment from 'moment'

export function getAvatar(avatar) {
  return `https://q2.qlogo.cn/headimg_dl?dst_uin=` + avatar + `&spec=100`
}

export function momentTime(time) {
  return moment(time).format('MM-DD')
}

export function getSuo(content) {
  return content.match(/suo(.+?)\)/i)[1].slice(2)
}

export function translate(sortName) {
  if (sortName === 'anime') return '动画'
  if (sortName === 'comic') return '漫画'
  if (sortName === 'game') return '游戏'
  if (sortName === 'music') return '音乐'
  if (sortName === 'imgpack') return '图包'
  if (sortName === 'novel') return '小说'
  if (sortName === 'news') return '号外'
}