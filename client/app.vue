<template>
  <div id="app">
    <progress-bar></progress-bar>
    <c-header @showTab="showTab"></c-header>
    <div class="home wrap">
      <div class="left">
        <reach-box></reach-box>
        <tab :ds="ds" @close="close"></tab>
      </div>
      <div class="gao">
        <p>里番请止步，这儿没有，这里同步更新动画番剧，视频报错、催更、app相关请加交流群：607024802。</p>
      </div>
      <div class="main">

        <keep-alive>
          <router-view :key="$route.fullPath" v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view :key="$route.fullPath" v-if="!$route.meta.keepAlive"></router-view>
      </div>
      <div class="right">
        <notice></notice>
      </div>
      <div class="clear"></div>
    </div>
    <c-footer></c-footer>
  </div>
</template>

<script>
  import ProgressBar from 'base/progress-bar/progress-bar.vue'
  import CHeader from 'component/c-header/c-header.vue'
  import CFooter from 'component/c-footer/c-footer.vue'
  import Notice from 'component/notice/notice.vue'
  import Tab from 'component/tab/tab.vue'
  import ReachBox from 'component/reach-box/reach-box.vue'
  import titleMixin from 'common/mixin/title-mixin'

  export default {
    mixins: [titleMixin],
    title() {
      return 'C哩C哩_(゜-゜)つロ 喝茶~ - clicli.us(C站)'
    },
    data() {
      return {
        ds: 'none'
      }
    },
    methods: {
      showTab() {
        this.ds === 'none' ? this.ds = 'block' : this.ds = 'none'
      },
      close() {
        this.ds = 'none'
      }
    },
    components: {
      CHeader,
      CFooter,
      Notice,
      Tab,
      ReachBox,
      ProgressBar
    }
  }
</script>

<style lang="stylus">
  @import "~common/stylus/variable"
  .home
    padding: 10px 0
    margin 60px auto !important

  .main
    margin-top: 10px
    width 650px
    float: left
    padding: 10px
    .common-title
      font-size: 13px
      padding: 30px 0 10px 0
      font-weight: lighter

  .left
    width 160px
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
