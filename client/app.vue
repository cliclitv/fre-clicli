<template>
  <div id="app">
    <progress-bar></progress-bar>
    <c-header></c-header>
    <div class="notice">
      <ul>
        <a href="https://app.clicli.me" target="_blank" class="active">
          <li>APP下载</li>
        </a>
        <router-link to="/play/gv905">
          <li>投稿·视频教程</li>
        </router-link>
        <router-link to="/play/gv31">
          <li>使用说明</li>
        </router-link>
        <router-link to="/play/gv99">
          <li>补档</li>
        </router-link>
        <span>{{gonggao}}</span>
      </ul>

    </div>
    <login v-show="isLogin" @close="close"></login>
    <div class="home">
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
  import titleMixin from 'public/mixin/title-mixin'
  import Login from 'component/login/login.vue'
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    mixins: [titleMixin],
    title() {
      return 'c站-clicli弹幕网_(⁄•⁄ω⁄•⁄) 社保~ clicli.us'
    },
    data(){
      return {
        gonggao:''
      }
    },
    mounted(){
      this.gonggao=window.gonggao
    },
    computed: {
      ...mapGetters(['isLogin'])
    },
    methods: {
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
  @import "~public/stylus/variable"
  .home
    margin 30px auto !important

  .notice
    margin-top: 56px
    border-bottom: 1px solid $b-color
    padding: 10px
    span
      padding: 1px 10px
      background $l-color
      font-size 12px
      border-radius 8px
      margin-left 10px
    ul a
      color: $color
      li
        display inline-block
        padding: 0 10px
    .active li
      color: #fff
      font-weight: bold

</style>
