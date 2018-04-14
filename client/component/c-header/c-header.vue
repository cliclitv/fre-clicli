<template>
  <div class="header">
    <div class="topbar">
      <div class="wrap">
        <ul class="menu">
          <router-link to="/" class="tab-item">
            <li class="first-child"><i class="icon-font icon-home"></i>首页</li>
          </router-link>
          <router-link to="/game" class="tab-item">
            <li>游戏中心</li>
          </router-link>
          <li class="bio">
            <span>登陆</span><span>注册</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import Topbar from 'component/tap/tap.vue'

  export default {
    computed: {
      ...mapState(['text', 'articles'])
    },
    created() {
      if (this.articles.length < 1) {
        this.getArticleList()
      }

    },
    asyncData({store}) {
      return store.dispatch('getArticleList')
    },
    methods: {
      ...mapActions(['getArticleList'])
    },
    components: {
      Topbar
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .header:before
    content: ""
    width 100%
    height 50px
    position absolute
    top: 0
    bottom: 0
    background url("./banner.png")
    background-size: 100% 200px
    background-attachment: fixed
    filter: blur(10px)
    z-index 0
  .header
    background: url("./banner.png")
    background-size: 100% 200px
    height: 200px
    .topbar
      position absolute
      top: 0
      overflow hidden
      z-index 1000
      width 100%
      background rgba(22, 25, 33, 0.6)
      box-shadow 0 2px 5px #080808
    li
      display inline-block
      padding: 12px 25px
      color: #fff
    li:hover
    .router-link-active li
      color: $a-color

    .icon-home
      margin-right: 10px
    .bio
      float: right
      font-size: 13px
      span
        padding: 8px 20px
      span:first-child
        border-radius 18px 0 0 18px
        background: rgba(253, 133, 150, .9)
      span:last-child
        border-radius 0 18px 18px 0
        background: rgba(36, 33, 46, 0.8)
</style>