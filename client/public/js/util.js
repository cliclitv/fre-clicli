import md5 from 'blueimp-md5'

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

export function translate(sortName) {
  switch (sortName) {
    case 'xinfan':
      return '新番'
    case 'tuijian':
      return '推荐'
    case 'moren':
      return '默认'
    case 'wenzhang':
      return '文章'
    case 'yuanchuang':
      return '原创'
    case 'wanjie':
      return '完结'
    case 'juchangban':
      return '剧场版'
    case 'under':
      return '已下架'
    case 'public':
      return '上线'
    default:
      return '其他'
  }

}

export function getAv(id) {
  return id.substring(2, id.length)
}