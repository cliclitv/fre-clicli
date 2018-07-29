<template>
    <div id="app">
        <progress-bar></progress-bar>
        <c-header></c-header>
        <div class="home wrap">
            <div class="left">
                <reach-box></reach-box>
                <tab></tab>
            </div>
            <div class="main">
                <router-view></router-view>
            </div>

            <div class="right">
                <notice></notice>
            </div>
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
      return '★ACG和谐区★ - 绅士的和谐社区(acgzone.cn)'
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
    .home
        padding: 10px 0
        height 1000px
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

</style>
