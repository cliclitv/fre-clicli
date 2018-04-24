<template>
  <div class="header" ref="header">
    <div class="before" ref="hBefore"></div>
    <div class="bio">
      <ul class="biu">
        <li class="avatar" v-show="isShow"><img :src="getAvatar(user.qq)"></li>
        <li v-show="isShow">{{user.name}}</li>
        <li v-show="isShow" @click="onLogout">退出</li>
        <li @click="onLogin" v-show="!isShow">登陆</li>
      </ul>

      <a href="http://admin.idanmu.cc">
        <li class="pr">
          投稿
        </li>
      </a>
    </div>
    <div class="topbar">
      <div class="wrap">
        <ul class="menu">
          <router-link to="/" class="tab-item">
            <li class="first-child"><i class="icon-font icon-home"></i>主站</li>
          </router-link>
          <router-link to="/game" class="tab-item">
            <li>游戏中心</li>
          </router-link>
        </ul>
      </div>
    </div>
    <div class="wrap">
      <search-box></search-box>
    </div>
    <transition name="fade">
      <login v-show="isLogin" @close="close" @loadInfo="loadInfo"></login>
    </transition>

  </div>

</template>

<script>
  import SearchBox from 'base/search-box/search-box.vue'
  import Login from 'component/login/login.vue'
  import {getOption} from 'api/option'
  import {logout} from "api/user"
  import {getStorage, removeStorage} from "common/js/localstorage"

  export default {

    data() {
      return {
        banner: '',
        isLogin: false,
        user: {},
        isShow: false,
        msg: ''
      }
    },

    beforeMount() {
      getOption().then((res) => {
        this.banner = res.data.result[0].banner
        this.$refs.header.style.background = 'url(' + this.banner + ') center'
        this.$refs.hBefore.style.background = 'url(' + this.banner + ') center'
      }).catch(e => {
        console.log(e)
      })
    },
    mounted() {
      this.loadInfo()
    },

    methods: {
      onLogin() {
        this.isLogin = true
      },
      close() {
        this.isLogin = false
      },
      getAvatar(qq) {
        return `http://q2.qlogo.cn/headimg_dl?dst_uin=` + qq + `&spec=100`
      },
      loadInfo() {
        const user = getStorage('user-info')
        if (user) {
          this.isShow = true
          this.user = user
        } else {
          this.isShow = false
        }
      },
      onLogout() {
        logout().then((res) => {
          if (res.data.code === 0) {
            removeStorage('user-info')
            this.loadInfo()
          }
        })
      }
    },

    components: {
      SearchBox,
      Login
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .header-wrap
    position relative
    a
      color: #fff

  .header .before
    content: ""
    width 100%
    height 40px
    position absolute
    top: 0
    bottom: 0
    background $d-color
    filter: blur(10px)
    z-index 0

  .header
    background $d-color
    height: 200px
    position: relative
    .topbar
      position absolute
      top: 0
      overflow hidden
      z-index 1000
      width 100%
      background rgba(22, 25, 33, 0.6)
      box-shadow 0 1px 3px #080808
      .menu
        position: relative
    li
      display inline-block
      padding: 10px 25px
      color: #fff
      box-sizing: border-box
    .router-link-active li
      color: $a-color
    .icon-home
      margin-right: 10px

  .bio
    width 1200px
    margin: 0 auto
    position relative
    .avatar
      line-height 0
      img
        margin-top: 5px
        height: 30px
        width: 30px
        border-radius 15px
    .pr
      position absolute
      right 0
      background linear-gradient(#ff7d90, #f84861)
      font-size: 16px
      border-radius 0 0 4px 4px
      z-index: 99999
      padding: 15px 20px

  .biu
    position absolute
    top: 0
    right: 90px
    z-index: 9999999
    color #fff
    display flex
    align-items center
    li
      display inline-block
      padding: 0 10px
      line-height 40px
      cursor pointer

  .fade-enter-active, .fade-leave-active
    transition: opacity 1s

  .fade-enter, .fade-leave-to
    opacity: 0
</style>