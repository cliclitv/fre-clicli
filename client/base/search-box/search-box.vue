<template>
  <div class="search-box">
    <input type="text" placeholder="搜索一下下菊花又不会坏……">
    <i class="icon-font icon-search"></i>
  </div>
</template>

<script>
  export default {}
</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable"
  .search-box
    float right
    margin-top: 140px
    input
      padding: 6px 30px 6px 15px
      border-radius 14px
      background rgba(255, 255, 255, .8)
      width 200px
      box-shadow 0 1px 2px rgba(29,36,52,.8)
    .icon-search
      color: $d-color
      position: relative
      right: 32px
      top: 2px
</style>