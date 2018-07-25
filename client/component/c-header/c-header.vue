<template>
    <div class="header">
        <div class="bio">
            <ul class="biu">
                <li class="avatar" v-show="isShow"><img :src="getAvatar(user.qq)"></li>
                <li v-show="isShow">{{user.name}}</li>
                <li v-show="isShow" @click="onLogout">退出</li>
                <li @click="onLogin" v-show="!isShow">登陆</li>
                <a href="http://admin.idanmu.cc/register">
                    <li v-show="!isShow">注册</li>
                </a>
            </ul>

            <a href="http://admin.idanmu.cc">
                <li class="pr">
                    <span>投稿</span>
                </li>
            </a>
        </div>
        <div class="wrap">
            <div class="logo">
                <img src="../../common/img/logo.png" alt="">
            </div>
            <ul class="menu">
                <router-link to="/" class="tab-item">
                    <li class="first-child"><i class="icon-font icon-home"></i>主站</li>
                </router-link>
                <router-link to="/game" class="tab-item">
                    <li>游戏中心</li>
                </router-link>
            </ul>
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
  import {mapGetters, mapMutations} from 'vuex'
  import {logout, getUserInfo} from "api/user"
  import {getStorage, removeStorage} from "common/js/localstorage"

  export default {

    data() {
      return {
        banner: '',
        user: {},
        isShow: false,
        msg: ''
      }
    },
    computed: {
      ...mapGetters(['isLogin'])

    },
    mounted() {
      this.loadInfo()
    },

    methods: {
      onLogin() {
        this.isOnLogin(true)
      },
      close() {
        this.isOnLogin(false)
      },
      getAvatar(qq) {
        return `https://q2.qlogo.cn/headimg_dl?dst_uin=` + qq + `&spec=100`
      },
      loadInfo() {
        getUserInfo().then(res => {
          if (res.data.code === 0) {
            this.isShow = true
            this.user = res.data.result
          } else {
            removeStorage('user-info')
            this.isShow = false
          }
        })
      },
      onLogout() {
        logout().then((res) => {
          if (res.data.code === 0) {
            removeStorage('user-info')
            this.loadInfo()
          }
        })
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
        background $b-color
        position: relative
        padding: 10px
        .logo
            position absolute
            top: 5px
            img
                height 50px
                width: 50px
        .menu
            display inline-block
            margin-left 60px
        li
            display inline-block
            padding: 10px
            color: $color
            box-sizing: border-box
        .router-link-active li
            color: $blue-color
        .icon-home
            margin-right: 10px

    .bio
        width 1100px
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
            background $blue-color
            font-size: 16px
            z-index: 99999
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

    .fade-enter-active, .fade-leave-active
        transition: opacity 1s

    .fade-enter, .fade-leave-to
        opacity: 0
</style>