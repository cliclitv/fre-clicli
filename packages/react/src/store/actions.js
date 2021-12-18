import {login, logout} from "api/user"

export default {
  onLogin({commit}, user) {
    if (!user.name || !user.pwd) {
      commit('errMsg', '都要填都要填！')
      setTimeout(() => {
        commit('errMsg', '')
      }, 4500)
    }
    return login(user).then(res => {
      commit('errMsg', '')
      if (res.status === 200) {
        commit('login', res.data)
      } else {
        commit('errMsg', res.data.msg)
        setTimeout(() => {
          commit('errMsg', '')
        }, 4500)
      }
    })
  },
  onLogout({commit}) {
    return logout().then(res => {
      if (res.data.code === 200) {
        commit('logout', res.data)
        setTimeout(() => {
          commit('errMsg', '')
        }, 4500)
      }
    })
  }

}