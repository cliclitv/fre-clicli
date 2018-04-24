import axios from 'axios'

const request = axios.create({
  baseURL: process.env.VUE_ENV === 'server' ? 'http://www.idanmu.cc' : '/'
})

// 用户登录
export function login(user) {
  return request.post('/user/login', user)
}


// 用户注册
export function register(user) {
  return request.post('/user/register', user)
}

// 更新用户信息
export function update(user) {
  return request.post('/user/update', user)
}

// 删除用户

export function deleteUser(id) {
  return request.post('/user/delete', id)
}

// 获取用户列表
export function userList(page, pageSize) {
  return request.get('/user/user', {
    params: {
      page: page,
      pageSize: pageSize
    }
  })
}

// 查找单一用户信息

export function getUserInfo(id) {
  return request.get('/user/info', {
    params: {
      id: id
    }
  })
}

// 用户退出
export function logout() {
  return request.post('/user/logout')
}