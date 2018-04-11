export function setStorage(name, data) {
  if (typeof data === 'object') {
    window.localStorage.setItem(name, JSON.stringify(data))
  } else if (typeof data === 'number' || typeof data === 'string' || typeof data === 'boolean') {
    window.localStorage.setItem(name, data)
  } else {
    alert('该类型不能用于本地存储~')
  }
}

export function getStorage(name) {
  let data = window.localStorage.getItem(name)
  if (data) {
    return JSON.parse(data)
  } else {
    return ''
  }
}


export function removeStorage(name) {
  window.localStorage.removeItem(name)
}