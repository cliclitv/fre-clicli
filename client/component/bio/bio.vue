<template>
  <div class="bio">
    <ul class="biu">
      <router-link :to="'/u/'+user.id">
        <li class="avatar" v-show="isShow"><img :src="getAvatar(user.qq)"></li>
        <li v-show="isShow">{{user.name}}</li>
      </router-link>

      <li v-show="isShow" @click="onLogout">退出</li>
      <li @click="onLogin" v-show="!isShow">登陆</li>
      <a href="http://admin.clicli.us/register">
        <li v-show="!isShow">注册</li>
      </a>
      <a :href="adminroute" target="_blank">
        <li class="pr">
          <span>{{pr}}</span>
        </li>
      </a>
    </ul>

    <login v-show="isLogin" @close="close"></login>
  </div>

</template>

<script>
  import Login from 'component/login/login.vue'
  import Cookies from 'js-cookie'
  import {Base64} from 'js-base64'
  import {mapGetters, mapMutations} from 'vuex'
  import {logout, auth, getUserByName} from "api/user"
  import {getStorage, removeStorage, setStorage} from "common/js/localstorage"

  export default {

    data() {
      return {
        banner: '',
        user: {},
        isShow: false,
        msg: '',
        pr: '投稿',
        adminroute: 'http://admin.clicli.us/login'
      }
    },
    computed: {
      ...mapGetters(['isLogin'])

    },
    mounted() {
      this.auth()
    },

    methods: {
      onLogin() {
        this.isOnLogin(true)
      },
      close() {
        this.isOnLogin(false)
      },
      showTab() {
        this.$emit('showTab')
      },
      getAvatar(qq) {
        return `https://q2.qlogo.cn/headimg_dl?dst_uin=` + qq + `&spec=100`
      },
      auth() {
        auth().then(res => {
          if (res.data.code === 201) {
            const user = getStorage('user-info')
            if (user) {
              this.isShow = true
              this.pr = '后台'
              this.adminroute = 'http://admin.clicli.us'
              this.user = user
            } else {
              const name = Base64.decode(Cookies.get('uname'))
              getUserByName(name).then(res => {
                setStorage('user-info', res.data.user)
                this.user = res.data.user
              })
            }

          } else {
            this.isShow = false
            removeStorage('user-info')
          }
        })
      },
      onLogout() {
        Cookies.remove('uname', {
          path: '/',
          domain: 'clicli.us'
        })
        Cookies.remove('uqq', {
          path: '/',
          domain: 'clicli.us'
        })
        removeStorage('user-info')
        this.isShow = false

      },
      ...mapMutations(['isOnLogin'])
    },

    components: {
      Login
    }
  }
</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable"
  .bio
    float right

  a
    display: flex
    align-items: center
    .avatar
      line-height 0
      img
        height: 30px
        width: 30px
        border-radius 15px

  .biu
    display flex
    align-items center
    li
      display inline-block
      padding: 0 10px
      line-height 40px
      cursor pointer

</style>
