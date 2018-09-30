<template>
  <div class="header">
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
      </ul>

      <a :href="adminroute" target="_blank">
        <li class="pr">
          <span>{{pr}}</span>
        </li>
      </a>
    </div>
    <div class="wrap">
      <div class="logo">
        <router-link to="/" class="pc-logo" v-show="isShow">
          <img src="https://i.loli.net/2018/07/29/5b5d1f36237b6.png" alt="acg和谐区">
        </router-link>
        <a href="/" class="mobile-logo" v-show="!isShow">
          <img src="https://i.loli.net/2018/07/29/5b5d1f36237b6.png" alt="acg和谐区">
        </a>
      </div>
      <span class="list" @click="showTab"><i class="icon-font icon-list"></i></span>
      <ul class="menu">
        <router-link to="/" class="tab-item">
          <li class="first-child"><i class="icon-font icon-home"></i>主站</li>
        </router-link>
        <router-link to="/sort/news" class="tab-item">
          <li>号外</li>
        </router-link>
      </ul>
      <search-box></search-box>
      <router-link to="/p/123" class="down">下载客户端</router-link>
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
    background $b-color
    padding: 10px
    box-shadow 0 2px 10px 0 rgba(4, 21, 39, 0.2), 0 1px rgba(4, 21, 39, 0.2)
    border-bottom: 1px solid $b-color
    .logo
      position absolute
      top: 18px
      img
        height 25px
    .list
      display none
    .menu
      display inline-block
      margin-left 140px
    li
      display inline-block
      padding: 10px
      color: $color
      box-sizing: border-box
    .router-link-active li
      color: $blue-color
    .icon-home
      margin-right: 10px

  /*.header:hover*/
  /*background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAoCAYAAAD+MdrbAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDE0IDc5LjE1Njc5NywgMjAxNC8wOC8yMC0wOTo1MzowMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkUzNjNEMTc2OTBGRjExRTQ4RTYyQjkxRkYyODQ3MUM5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkUzNjNEMTc3OTBGRjExRTQ4RTYyQjkxRkYyODQ3MUM5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RTM2M0QxNzQ5MEZGMTFFNDhFNjJCOTFGRjI4NDcxQzkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RTM2M0QxNzU5MEZGMTFFNDhFNjJCOTFGRjI4NDcxQzkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4FLjP5AAAAgElEQVR42uyWsQ7AIAhEOcPS///dJnbp0DRKOUtTTWBShudBAEGtVSKtSLAlMIGrA9E4QwcBXej8OXwbcipcRaGerz99LrsXCCYkb8hXKBo+Cgir2VlouUFg3IXNYa88MJpDGDD8plCjyuWzTgGxfW05vlLhBEDPSKN2Gxf0EGAALCsIm7TfDqIAAAAASUVORK5CYII=")*/
  /*background-size auto 58px*/
  /*background-color: #1e2e46*/
  /*border-bottom:1px solid #30587b*/
  /*transition all .8s ease-out 0s*/
  .bio
    width 1100px
    margin: 0 auto
    position relative
    a
      display: flex
      align-items: center
      .avatar
        line-height 0
        img
          height: 30px
          width: 30px
          border-radius 15px
    .pr
      position absolute
      right 0
      background $blue-color
      font-size: 16px
      padding: 5px 15px
      top: -10px
      span
        position relative
        top: 15px

  .pr:before
    content: ''
    height 40px
    width 64px
    background $blue-color
    position absolute
    top: 30px
    left: 0
    border-radius 0 0 40px 40px

  .biu
    position absolute
    top: 0
    right: 80px
    z-index: 9999999
    color #fff
    display flex
    align-items center
    li
      display inline-block
      padding: 0 10px
      line-height 40px
      cursor pointer

  .down
    display none

  .fade-enter-active, .fade-leave-active
    transition: opacity 1s

  .fade-enter, .fade-leave-to
    opacity: 0
</style>