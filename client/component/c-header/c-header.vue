<template>
  <div class="header">
    <div class="bio">
      <ul class="biu">
        <router-link :to="'/u/'+user.id">
          <li class="avatar" v-show="isShow"><img :src="getAvatar(user.qq)"></li>
          <li v-show="isShow">{{user.name}}</li>
        </router-link>

        <li v-show="isShow" @click="onLogout">退出</li>
        <li @click="onLogin" v-show="!isShow">登录</li>
        <a href="https://admin.clicli.us/register">
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
        <router-link to="/" class="pc-logo">
          <img src="https://i.loli.net/2018/10/01/5bb1c251c2415.png" alt="clicli">
        </router-link>
      </div>
      <ul class="menu">
        <router-link to="/" class="tab-item">
          <li class="first-child"><i class="icon-font icon-tv"></i>主站</li>
        </router-link>
        <router-link to="/sort/news" class="tab-item">
          <li>号外</li>
        </router-link>
        <router-link to="/play/av31" class="tab-item">
          <li>使用说明</li>
        </router-link>
        <router-link to="/play/av30" class="tab-item">
          <li>投稿教程</li>
        </router-link>
        <router-link to="/play/av276" class="tab-item">
          <li>贴视频</li>
        </router-link>
        <a href="http://www.cilicili.cc/" target="_blank">导航</a>
      </ul>
    </div>
    <bottom-tip :msg="msg" :bg="bg" v-show="this.msg"></bottom-tip>
  </div>

</template>

<script>
  import Cookies from 'js-cookie'
  import {Base64} from 'js-base64'
  import BottomTip from 'base/bottom-tip/bottom-tip.vue'
  import {mapMutations} from 'vuex'
  import {logout, auth, getUserByName} from "api/user"
  import {getStorage, removeStorage, setStorage} from "common/js/localstorage"
  import axios from 'axios'

  export default {

    data() {
      return {
        banner: '',
        user: {},
        isShow: false,
        msg: '',
        pr: '投稿',
        adminroute: 'https://admin.clicli.us/login',
        bg: '#000'
      }
    },
    mounted() {
      this.auth()
    },

    methods: {
      onLogin() {
        this.isOnLogin(true)
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
        this.msg = '退出成功啦'
        this.bg = '#b0fa66'

      },
      ...mapMutations(['isOnLogin'])
    },

    components: {
      BottomTip
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
        height: 40px
        position: relative
        top: -8px
    .list
      display none
    .menu
      display inline-block
      margin-left 120px
      a
        color: $color
    li
      display inline-block
      padding: 10px
      color: $color
      box-sizing: border-box
    .router-link-active li
      color: $blue-color
    .icon-tv
      margin-right: 10px

  .bio
    width 1120px
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
      z-index 9
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

</style>