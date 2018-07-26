<template>
    <div class="wrap home">
        <div class="left">
            <reach-box></reach-box>
            <tab></tab>

        </div>
        <div class="main">
            <slider></slider>
            <router-view></router-view>
        </div>
        <div class="right">
            <notice></notice>
        </div>
    </div>

</template>

<script>
  import ReachBox from 'component/reach-box/reach-box.vue'
  import Slider from 'base/slider/slider.vue'
  import Notice from 'component/notice/notice.vue'
  import Tab from 'component/tab/tab.vue'

  export default {
    name: "home",
    components: {
      ReachBox,
      Slider,
      Notice,
      Tab
    }
  }
</script>

<style scoped lang="stylus">
    .home
        padding: 10px 0
        height 1000px

    .left
        width 160px
        padding: 10px 10px 0 0
        float: left
        vertical-align: top

    .main
        margin-top: 10px
        width 650px
        float: left
        padding: 10px

    .right
        float: right
        width 250px
        vertical-align: top
        padding: 10px 0 10px 10px
        margin-top: 10px


</style>