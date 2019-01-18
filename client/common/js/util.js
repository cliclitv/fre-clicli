import md5 from 'blueimp-md5'

export function getAvatar(avatar) {
  if (avatar.indexOf('@')) {
    let hash = md5(avatar)
    return `http://avatar.tietuku.com/avatar/${hash}`
  } else if (/^[0-9]+$/.test(avatar)) {
    return `https://q2.qlogo.cn/headimg_dl?dst_uin=${avatar}&spec=100`
  }else {
    return avatar
  }
}

export function getSuo(content) {
  let m = content.match(/suo(.+?)\)/i)
  return m ? m[1].slice(2) : 'http://wx4.sinaimg.cn/mw690/0060lm7Tly1fvmtrka9p5j30b40b43yo.jpg'
}

export function translate(sortName) {
  if (sortName === 'xinfan') return '新番'
  if (sortName === 'wanjie') return '完结'
  if (sortName === 'tuijian') return '推荐'
  if (sortName === 'danmei') return '耽美'
  if (sortName === 'moren') return '默认'
  if (sortName === 'lianzai') return '连载'
  if (sortName === 'wenzhang') return '文章'
}

export function getAv(id) {
  return id.substring(2, id.length)
}