import axios from 'axios'

// 用户登录
export function login(user) {
  return axios.post('/user/login', user)
}


// 用户注册
export function register(user) {
  return axios.post('/user/register', user)
}

// 更新用户信息
export function update(user) {
  return axios.post('/user/update', user)
}

// 获取用户列表
export function userList() {
  return axios.get('/user/user')
}

// 查找单一用户信息

export function getUserInfo(id) {
  return axios.get('/user/info', {
    params: {
      id: id
    }
  })
}

// 用户退出
export function logout() {
  return axios.post('/user/logout')
}