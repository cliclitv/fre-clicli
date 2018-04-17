<template>
  <div class="tap"><ul>
    <a href="/"><li><i class="icon-font icon-home"></i>首页</li></a>
    <li><i class="icon-font icon-tv"></i>动画</li>
    <li><i class="icon-font icon-book"></i>漫画</li>
    <li><i class="icon-font icon-game"></i>游戏</li>
    <li><i class="icon-font icon-img"></i>图包</li>
    <li><i class="icon-font icon-music"></i>音乐</li>
    <li><i class="icon-font icon-novel"></i>小说</li>
    <li><i class="icon-font icon-news"></i>号外</li>
    <li><i class="icon-font icon-other"></i>其他</li>
  </ul>

  </div>
</template>

<script>
  export default {}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"
  .tap
    border-bottom: 1px solid #2b2e37
    a
      color: $color
    li
      display inline-block
      padding: 20px 25px
      width 40px
      text-align center
      i
        width 40px
        display inline-block
        font-size: 18px
        text-align center
        color rgba(253, 133, 150, 0.9)
    li:first-child
      padding-left 0

</style>