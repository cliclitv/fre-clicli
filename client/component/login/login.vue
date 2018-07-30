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
  import {getStorage,setStorage} from "common/js/localstorage"

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
          if (res.data.code === 201) {
            this.user = res.data.user
            setStorage('user-info', res.data.user)
            this.close()
            this.$router.go(0)
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
        width: 300px
        padding: 20px
        background: $d-color
        position fixed
        z-index: 999999
        top: 50%
        left: 50%
        transform translate(-50%, -50%)
        box-shadow: 1px 1px 5px #090c13
        li
            width 100%
            padding: 20px 15px
            input
                width: 100%
                border-bottom: 1px dashed $blue-color
                padding: 5px
                color: #fff
                background $d-color
                letter-spacing: 3px
                box-sizing border-box
            input:focus
                border-bottom: 2px dashed $blue-color
            button
                background: $blue-color
                width: 100%
                padding: 10px
                border-radius 20px
                color: #fff
                outline none
                cursor pointer


</style>