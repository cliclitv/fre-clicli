<template>
  <div class="tap wrap">
    <ul>
      <router-link to="/">
        <li><i class="icon-font icon-home"></i>首页</li>
      </router-link>
      <router-link to="/sort/anime">
        <li><i class="icon-font icon-tv"></i>动画</li>
      </router-link>
      <router-link to="/sort/comic">
        <li><i class="icon-font icon-book"></i>漫画</li>
      </router-link>
      <router-link to="/sort/game">
        <li><i class="icon-font icon-game"></i>游戏</li>
      </router-link>
      <router-link to="/sort/imgpack">
        <li><i class="icon-font icon-img"></i>图包</li>
      </router-link>
      <router-link to="/sort/music">
        <li><i class="icon-font icon-music"></i>音乐</li>
      </router-link>
      <router-link to="/sort/novel">
        <li><i class="icon-font icon-novel"></i>小说</li>
      </router-link>
      <router-link to="/sort/topic">
        <li><i class="icon-font icon-news"></i>号外</li>
      </router-link>
      <router-link to="/sort/other">
        <li><i class="icon-font icon-other"></i>其他</li>
      </router-link>
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
      padding: 10px 10px
      display inline-block
    li
      display inline-block
      text-align center
      width 40px
      padding: 5px
      border-radius 4px
      transition .5s
      i
        width 40px
        display inline-block
        font-size: 18px
        text-align center
        color rgba(253, 133, 150, 0.9)
    a:first-child
      padding-left 0
    li:hover
      background $d-color
    li:hover i
      color: $a-color
    ul
      margin: 5px 0

</style>