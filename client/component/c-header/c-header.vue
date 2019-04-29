<template>
  <div class="header">
    <router-link to="/">
      <div class="logo">
        <i class="icon-font icon-logo"></i>
      </div>
    </router-link>
    <search-box></search-box>
    <ul class="menu">
      <li>
        <router-link to="/" title="首页"><i class="icon-font icon-home"></i></router-link>
      </li>
      <li>
        <router-link to="/explore" title="发现"><i class="icon-font icon-explore"></i></router-link>
      </li>
      <li @click="showOpt" v-if="!isShow">
        <a title="注册"><i class="icon-font icon-user"></i></a>
      </li>
      <ul v-show="isOpt">
        <li @click="onLogin">登陆</li>
        <a :href="adminLink+'/register/'" target="_blank">
          <li>注册</li>
        </a>
        <router-link :to="userLink"><li>登陆</li></router-link>
      </ul>
      <a :href="adminLink" target="_blank">
        <li class="write">
          <i class="icon-font icon-write"></i>
        </li>
      </a>
    </ul>
  </div>

</template>

<script>
  import Cookies from 'js-cookie'
  import BottomTip from 'widget/bottom-tip/bottom-tip.vue'
  import {mapMutations} from 'vuex'
  import {logout, auth, getUser} from "api/user"
  import {getStorage, removeStorage, setStorage} from "public/js/localstorage"
  import {getAvatar, ADMIN_LINK} from "public/js/util"
  import SearchBox from 'widget/search-box/search-box.vue'

  export default {
    data() {
      return {
        banner: '',
        user: {},
        isShow: false,
        msg: '',
        adminLink: ADMIN_LINK,
        userLink: '',
        isOpt: false
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
        return getAvatar(qq)
      },
      showOpt() {
        this.isOpt = !this.isOpt
      },
      auth() {
        auth().then(res => {
          if (res.data.code === 201) {
            this.isShow = true
            this.userLink = `/u/${Cookies.get('uid')}`
            getStorage('user-info') ? this.user = getStorage('user-info')
              : getUser('', Cookies.get('uid')).then(res => {
                setStorage('user-info', res.data.user)
                this.user = res.data.user
              })
          } else {
            this.isShow = false
            removeStorage('user-info')
          }
        })
      },
      onLogout() {
        logout().then(() => {
          removeStorage('user-info')
          this.isShow = false
        })
      },
      ...mapMutations(['isOnLogin'])
    },

    components: {
      BottomTip,
      SearchBox
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~public/stylus/variable"
  .header
    position fixed
    top: 0
    left: 0
    right: 0
    z-index 9
    background $bg-color
    padding: 10px
    border-bottom: 1px solid $b-color
    display flex
    align-items center
    .logo
      color: #fff
      display inline-block
      height 32px
      margin-right 15px
      .icon-logo
        font-size: 30px
    .menu
      display inline-block
      position absolute
      right: 15px
      .write
        background $qing
        padding: 4px 20px
        margin 0 15px
        .icon-write
          color: $bg-color
      li
        display inline-block
        padding: 0 15px
        a
          color: $color
          .icon-font
            font-size 24px
        .router-link-active
          color: #fff
        a:hover:before
          position: absolute
          top: 20px
          content: attr(title)
          left: 0
          color: #fff
          background: $pink
          width 50px
          padding: 4px
          text-align center
          border-radius 4px
      ul
        position absolute
        right: 65px
        background #fff
        color: #666
        top: 45px
        li
          display block
          text-align center
          padding: 10px 40px
          cursor pointer
        li:hover
          background $qing
          color: $bg-color

</style>