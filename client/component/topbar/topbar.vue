<template>
  <div class="topbar">
    <div class="wrap">
      <ul class="menu">
        <router-link to="/wp" class="tab-item">
          <li><i class="icon-font icon-home"></i>首页</li>
        </router-link>
        <router-link to="/anime" class="tab-item">
          <li>动画</li>
        </router-link>
        <router-link to="/comic" class="tab-item">
          <li>漫画</li>
        </router-link>
        <li>游戏</li>
        <li>音乐</li>
        <li>其他</li>
        <li class="bio">
          <span>登陆</span><span>注册</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .topbar
    background rgba(36, 33, 46, 0.5)
    li
      display inline-block
      padding: 15px 25px
      color: #fff
    .router-link-active li
      color: $a-color
    .icon-home
      margin-right: 10px
    .bio
      float: right
      font-size: 13px
      span
        padding: 8px 20px
      span:first-child
        border-radius 18px 0 0 18px
        background: rgba(253, 133, 150, .9)
      span:last-child
        border-radius 0 18px 18px 0
        background: rgba(36, 33, 46, 0.8)
</style>