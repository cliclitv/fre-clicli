<template>
  <div class="header">
    <div class="wrap">
      <ul class="menu">
        <router-link to="/" class="tab-item">
          <li class="first-child"><i class="icon-font icon-home"></i>主站</li>
        </router-link>
        <router-link to="/sort/news" class="tab-item">
          <li>号外</li>
        </router-link>
      </ul>
      <ul class="page">

        <router-link to="/p/30">
          <li>投稿教程</li>
        </router-link>
        <router-link to="/p/31">
          <li>使用说明</li>
        </router-link>
        <router-link to="/p/276" class="cyan">
          <li>贴视频</li>
        </router-link>
        <router-link to="/p/123" class="yellow">
          <li>下载客户端</li>
        </router-link>
      </ul>

    </div>
  </div>

</template>

<script>
  export default {}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .header
    position fixed
    top: 0
    left: 0
    right: 0
    z-index 9
    background $black-color
    .list
      display none
    ul
      display inline-block
    .menu
      float left
    .page
      float right
    .icon-home
      margin-right 10px
    a
      padding: 10px 0
      display inline-block
      color: #fff
      li
        display inline-block
        border-right 1px solid #666
        padding: 0 10px
    .down
      color: $yellow-color
    .menu a:last-child li, .page a:last-child li
      border: 0

</style>