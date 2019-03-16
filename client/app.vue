<template>
  <div id="app">
    <progress-bar></progress-bar>
    <c-header></c-header>
    <login v-show="isLogin" @close="close" @error="error"></login>
    <div class="home wrap">
      <div class="main">
        <keep-alive>
          <router-view :key="$route.fullPath" v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view :key="$route.fullPath" v-if="!$route.meta.keepAlive"></router-view>
      </div>
      <div class="clear"></div>
    </div>
    <c-footer></c-footer>
  </div>
</template>

<script>
  import ProgressBar from 'widget/progress-bar/progress-bar.vue'
  import CHeader from 'component/c-header/c-header.vue'
  import CFooter from 'component/c-footer/c-footer.vue'
  import titleMixin from 'common/mixin/title-mixin'
  import Login from 'component/login/login.vue'
  import {mapGetters,mapMutations} from 'vuex'

  export default {
    mixins: [titleMixin],
    title() {
      return 'c站-clicli弹幕网_(⁄•⁄ω⁄•⁄) 社保~ clicli.us'
    },
    computed: {
      ...mapGetters(['isLogin'])
    },
    methods: {
      error({msg}) {
        this.msg = msg
        this.bg = '#f24848'
      },
      close() {
        this.isOnLogin(false)
      },
      ...mapMutations(['isOnLogin'])
    },
    components: {
      CHeader,
      CFooter,
      ProgressBar,
      Login
    }
  }
</script>

<style lang="stylus">
  @import "~common/stylus/variable"
  .home
    margin 60px auto !important
  .main
    width 100%
    float: left
    .common-title
      font-size: 13px
      padding: 30px 0 10px 0
      font-weight: lighter

  .left
    width 140px
    padding: 10px 10px 0 0
    float: left
    vertical-align: top

  .right
    float: right
    width 250px
    vertical-align: top
    padding: 10px 0 10px 10px
    margin-top: 10px

  .gao
    float left
    margin-left: 30px
    text-align center
    background #fff
    color: #000
    padding: 5px 20px
    border-radius 20px
    margin-top: 20px

</style>
