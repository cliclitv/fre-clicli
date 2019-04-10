import axios from 'axios'

const request = axios.create({
  baseURL: 'http://localhost:4000'
})

// 用户登录
export function login({name, pwd}) {
  return axios.post('/user/login', {
    name, pwd
  })
}


// 用户注册
export function register({name, pwd, qq}) {
  return request.post('/user/register', {name, pwd, qq, role: 'user', desc: ''})
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

// 根据ID查找用户信息

export function getUserById(id) {
  return request.get('/user', {
    params: {
      uid: id
    }
  })
}

// 根据用户名查找用户信息

export function getUserByName(name) {
  return request.get('/user', {
    params: {
      uname: name
    }
  })
}


// 用户退出
export function logout() {
  return request.post('/user/logout')
}

export function auth() {
  return axios.get('/auth')
}