<template>
  <div class="header" ref="header">
    <div class="before" ref="hBefore"></div>
    <div class="bio">
      <a href="http://admin.idanmu.cc">
        <li class="login">
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
  </div>

</template>

<script>
  import SearchBox from 'base/search-box/search-box.vue'
  import {getOption} from 'api/option'

  export default {

    data() {
      return {
        banner: ''
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

    components: {
      SearchBox
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
    .login
      position absolute
      right 0
      background linear-gradient(#ff7d90, #f84861)
      font-size: 16px
      border-radius 0 0 4px 4px
      z-index: 99999
      padding: 15px 20px

</style>