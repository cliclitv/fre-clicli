<template>
  <div class="login">
    <div class="wrapper" @click="close">
    </div>
    <div class="on-login">
      <ul>
        <li><input type="text" placeholder="用户名" v-model="name"></li>
        <li><input type="password" placeholder="密码" v-model="pwd" @keyup.enter="onLogin"></li>
        <li>
          <button @click="onLogin">登陆</button>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
  import {login} from "api/user"
  import {setStorage} from "common/js/localstorage"

  export default {
    data() {
      return {
        name: '',
        pwd: '',
        user: {}
      }
    },
    methods: {
      close() {
        this.$emit('close')
      },
      onLogin() {
        login(this.$data).then((res) => {
          if (res.data.code === 0) {
            this.close()
            this.user = res.data.result
            setStorage('user-info', res.data.result)
            this.$emit('loadInfo')
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable"
  .login
    position fixed
    z-index: 999999

  .wrapper
    background: rgba(18, 19, 22, .6)
    position: fixed
    top: 0
    bottom: 0
    right: 0
    left: 0
    z-index: 99999

  .on-login
    width: 360px
    padding: 20px
    background: $d-color
    position fixed
    z-index: 999999
    top: 50%
    left: 50%
    transform translate(-50%, -50%)
    box-shadow: 5px 5px 50px #000
    border-radius: 4px
    li
      width 100%
      padding: 20px 15px
      input
        width: 100%
        border-bottom: 1px dashed #ff7d90
        padding: 5px
        color: #fff
        background $d-color
        letter-spacing: 3px
      input:focus
        border-bottom: 2px dashed #ff7d90
      button
        background: $a-color
        width: 100%
        padding: 10px
        border-radius 20px
        box-shadow 0 3px 4px 0 rgba(237, 68, 92, 0.45)
        color: #fff


</style>