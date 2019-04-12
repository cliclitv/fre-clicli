import axios from 'axios'
import {isDev, API_LINK} from 'public/js/util'

const request = axios.create({
  baseURL: API_LINK
})

// 用户登录
export function login({name, pwd}) {
  return axios.post('/user/login', {name, pwd})
}


// 用户注册
export function register({name, pwd, qq}) {
  return axios.post('/user/register', {name, pwd, qq, role: 'user', desc: '木有签名'})
}

// 更新用户信息
export function update({id, name, pwd, qq, role, desc}) {
  return request.post(`/user/update/${id}`, {
    name,
    pwd,
    qq,
    role,
    desc
  })
}

// 获取用户列表
export function getUsers(role, page, pageSize) {
  return request.get(`/users?role=${role}&page=${page}&pageSize=${pageSize}`)
}


export function getUser(uname, id) {
  return request.get('/user', {
    params: {
      uname,
      id
    }
  })
}


// 用户退出
export function logout() {
  return axios.post('/user/logout')
}

export function auth() {
  return request.get('/auth')
}