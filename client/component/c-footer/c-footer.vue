<template>
  <div class="footer">
    <div class="wrap foot">
      <div class="friend">
        <h1><span>友情链接</span></h1>
        <ul>
          <a href="http://www.cilicili.cc/" target="_blank">
            <li>呲哩呲哩</li>
          </a>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        message: `有关催更、报错、举报、APP
                请加交流群反馈：607024802`
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable"
  .footer
    .foot
      padding: 10px
      background $b-color
      span
        border-top: 2px solid #fff
        margin -10px 0 10px 10px
        padding-top 10px
      li
        color: rgba(255, 255, 255, .6)
        font-size 12px
        padding: 10px

</style>