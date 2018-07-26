<template>
    <div class="reach-box">
        <router-link to="/sort/anime">
            <li><i class="icon-font icon-new"></i>最新发布</li>
        </router-link>
        <router-link to="/sort/comic">
            <li><i class="icon-font icon-hot"></i>热门内容</li>
        </router-link>
    </div>
</template>

<script>
  export default {
    name: "reach-box"
  }
</script>

<style scoped lang="stylus">
    @import "~common/stylus/variable"
    .reach-box
        li
            padding: 8px 10px
            color: $color
            border-radius 5px
            margin: 10px 0

    .router-link-active li
        background $pink-color


</style>