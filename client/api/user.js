import axios from 'axios'

// 用户登录
export function login(user) {
  return axios.post('/login', user)
}

export function auth() {
  return axios.get('http://localhost:4000/auth')
}

// 用户注册
export function register(user) {
  return axios.post('/register', {name: user.name, pwd: user.pwd, qq: parseInt(user.qq), role: 'user', desc: ''})
}

// 更新用户信息
export function update(user) {
  return axios.post(`/user/update/${user.id}`, user)
}

// 获取用户列表
export function userList() {
  return axios.get('/users?role=user')
}

// 查找单一用户信息

export function getUserInfo(id) {
  return axios.get(`/user/${id}`)
}

// 用户退出
export function logout() {
  return axios.post('/user/logout')
}