import axios from 'axios'

const request = axios.create({
  baseURL: process.env.VUE_ENV === 'server' ? 'https://www.idanmu.cc' : '/'
})

// 查找设置项
export function getOption() {
  return request.get('/option/option')
}