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

            <a href="http://admin.chinko.cc">
                <li class="pr">
                    <span>投稿</span>
                </li>
            </a>
        </div>
        <div class="wrap">
            <div class="logo">
                <img src="https://i.loli.net/2018/07/29/5b5d1f36237b6.png" alt="">
            </div>
            <ul class="menu">
                <router-link to="/" class="tab-item">
                    <li class="first-child"><i class="icon-font icon-home"></i>主站</li>
                </router-link>
                <router-link to="/authors" class="tab-item">
                    <li>作者墙</li>
                </router-link>
                <router-link to="/sort/news" class="tab-item">
                    <li>号外</li>
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
  import {mapGetters, mapMutations} from 'vuex'
  import {logout, auth} from "api/user"
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
        auth().then(res => {
            if (res.data.code === 401) {
              this.isShow = true
              this.user = getStorage('user-info')
            }else {
              this.isShow = true
              this.user = getStorage('user-info')
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
        position fixed
        top: 0
        left: 0
        right: 0
        z-index 9
        background $b-color
        padding: 10px
        box-shadow 0 2px 10px 0 rgba(4,21,39,0.2), 0 1px rgba(4,21,39,0.2)
        .logo
            position absolute
            top: 16px
            img
                height 25px
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

    .bio
        width 1100px
        margin: 0 auto
        position relative
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

    .fade-enter-active, .fade-leave-active
        transition: opacity 1s

    .fade-enter, .fade-leave-to
        opacity: 0
</style>