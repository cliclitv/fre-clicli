export default {
  login(state, data) {
    state.msg = data.msg
    state.isAuth = true
    state.bg = '#b4d896'
  },
  errMsg(state, msg) {
    state.msg = msg
    state.bg = '#ef736e'
  },
  logout(state) {
    state.isAuth = false
    state.msg = '退出成功啦'
    state.bg = '#b4d896'
  }
}