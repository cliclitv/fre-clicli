import axios from 'axios'
import {isDev, API_LINK} from 'common/js/util'
import Cookies from "js-cookie"

const request = axios.create({
  baseURL: 'http://api.clicli.cc'
})

// 用户登录
export function login(user) {
  return axios.post('//api.clicli.cc/user/login', {
    name: user.name,
    pwd: user.pwd
  })
}


// 用户注册
export function register(user) {
  return axios.post('//api.clicli.cc/user/register', {
    name: user.name,
    pwd: user.pwd,
    qq: user.qq,
    level: 1,
    desc: '人懒，竟然没有签名~'
  })
}

// 更新用户信息
export function update(user) {
  return axios.post(`//api.clicli.cc/user/update/${user.id}`, {
    name: user.name,
    pwd: user.pwd,
    qq: user.qq,
    level: parseInt(user.level),
    desc: user.desc
  }, {
    headers: {
      'token': Cookies.get('token')
    }
  })
}

// 获取用户列表
export function userList(level) {
  return request.get('//api.clicli.cc/users', {
    params: {
      level,
      page: 1,
      pageSize: 100
    }
  })
}


// 用户退出
export function logout() {
  return axios.post('//api.clicli.cc/user/logout')
}

// 获取用户cookie
export function getCookie(uid) {
  return request.get(`//api.clicli.cc/cookie/${uid}`)
}

export function getUser(uname, uid, uqq) {
  return request.get('//api.clicli.cc/user', {
    params: {
      uname,
      uid,
      uqq
    }
  })
}

// 替换用户cookie
export function replaceCookie(data) {
  return axios.post('//api.clicli.cc/cookie/replace', {
    uid: parseInt(data.uid),
    hcy: data.hcy,
    quqi: data.quqi
  })

}

export function auth() {
  return axios.get('//api.clicli.cc/auth')
}