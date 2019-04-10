<template>
  <div id="app">
    <progress-bar></progress-bar>
    <c-header></c-header>
    <div class="cell">
      <span>c站强势改版(⊙o⊙)…报错、补档、反馈要加群：607024802</span>
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

  .cell
    text-align center
    margin-top: 56px
    border-bottom: 1px solid $b-color
    padding: 10px

</style>
