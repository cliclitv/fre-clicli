import axios from 'axios'
const request = axios.create({
  baseURL: 'http://api.chinko.cc/'
})
// 用户登录
export function login(user) {
  return request.post('/api/login', user)
}


// 用户注册
export function register(user) {
  return request.post('/register', {name: user.name, pwd: user.pwd, qq: parseInt(user.qq), role: 'user', desc: ''})
}

// 更新用户信息
export function update(user) {
  return request.post(`/user/update/${user.id}`, {name: user.name, pwd: user.pwd, qq: parseInt(user.qq), role: user.role, desc: user.desc})
}

// 获取用户列表
export function userList() {
  return request.get('/users?role=user&page=1&pageSize=100')
}

// 查找单一用户信息

export function getUserInfo(id) {
  return request.get(`/user/${id}`)
}

// 用户退出
export function logout() {
  return request.post('/user/logout')
}

export function auth() {
  return request.get('/auth')
}