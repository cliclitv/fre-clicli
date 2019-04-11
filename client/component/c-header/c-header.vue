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
        <router-link to="/"><i class="icon-font icon-home"></i></router-link>
      </li>
      <li>
        <router-link to="/explore"><i class="icon-font icon-explore"></i></router-link>
      </li>
      <li @click="onLogin()">
        <a><i class="icon-font icon-user"></i></a>
      </li>
      <li class="write">
        <router-link :to="adminLink"><i class="icon-font icon-write"></i></router-link>
      </li>
    </ul>
    <bottom-tip :msg="msg" :bg="bg" v-show="this.msg"></bottom-tip>
  </div>

</template>

<script>
  import Cookies from 'js-cookie'
  import {Base64} from 'js-base64'
  import BottomTip from 'widget/bottom-tip/bottom-tip.vue'
  import {mapMutations} from 'vuex'
  import {logout, auth, getUser} from "api/user"
  import {getStorage, removeStorage, setStorage} from "public/js/localstorage"
  import {getAvatar,ADMIN_LINK} from "public/js/util"
  import SearchBox from 'widget/search-box/search-box.vue'

  export default {
    data() {
      return {
        banner: '',
        user: {},
        isShow: false,
        msg: '',
        pr: '投稿',
        adminLink: ADMIN_LINK,
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
        return getAvatar(qq)
      },
      auth() {
        auth().then(res => {
          if (res.data.code === 201) {
            const user = getStorage('user-info')
            if (user) {
              this.user = user
            } else {
              const name = Base64.decode(Cookies.get('uname'))
              getUser(name).then(res => {
                setStorage('user-info', res.data.user)
                this.user = res.data.user
              })
            }
          } else {
            removeStorage('user-info')
          }
        })
      },
      onLogout() {
        logout().then(() => {
          removeStorage('user-info')
          this.isShow = false
          this.msg = '退出成功啦'
          this.bg = '#3f659a'
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
      li
        display inline-block
        padding: 0 15px
        a
          color: $color
          .icon-font
            font-size 24px
          .icon-write
            color: $bg-color
        .router-link-active
          color: #fff

</style>