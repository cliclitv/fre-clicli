<template>
  <div class="header">
    <div class="wrap">
      <span class="list" @click="showTab"><i class="icon-font icon-list"></i></span>
      <ul class="menu">
        <router-link to="/" class="tab-item">
          <li class="first-child"><i class="icon-font icon-home"></i>主站</li>
        </router-link>
        <router-link to="/sort/news" class="tab-item">
          <li>号外</li>
        </router-link>
      </ul>
      <!--<search-box></search-box>-->
      <ul class="page">

        <router-link to="/p/30">
          <li>投稿教程</li>
        </router-link>
        <router-link to="/p/31">
          <li>使用说明</li>
        </router-link>
        <router-link to="/p/276" class="cyan">
          <li>贴视频</li>
        </router-link>
        <router-link to="/p/123" class="yellow">
          <li>下载客户端</li>
        </router-link>
      </ul>

    </div>
    <login v-show="isLogin" @close="close"></login>
  </div>

</template>

<script>
  import SearchBox from 'base/search-box/search-box.vue'
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
      SearchBox,
      Login
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .header
    position fixed
    top: 0
    left: 0
    right: 0
    z-index 9
    background $black-color
    .list
      display none
    ul
      display inline-block
    .menu
      float left
    .page
      float right
    .icon-home
      margin-right 10px
    a
      padding: 10px 0
      display inline-block
      color: #fff
      li
        display inline-block
        border-right 1px solid #666
        padding: 0 10px
    .down
      color: $yellow-color
    .menu a:last-child li, .page a:last-child li
      border: 0

</style>