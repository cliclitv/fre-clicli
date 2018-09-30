<template>
  <div class="search-box">
    <input type="text" placeholder="搜索一下下菊花又不会坏……" v-model="key">
    <div @click="onSearch" class="searcher">
      <i class="icon-font icon-search"></i>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        key: ''
      }
    },
    methods: {
      onSearch() {
        this.$router.push({
          path: `/search/${this.key}`
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable"
  .search-box
    display: inline-block
    margin-left: -5px
    .searcher
      display inline-block
    input
      color: $color
      padding: 8px
      width 280px
      box-sizing: border-box
      height: 32x
      position: relative
      top: -1px
      background #fff
      box-shadow: inset 0 0 0 1px #ddd
      border-radius 0 4px 4px 0
    .icon-search
      background #999
      color: #fff
      padding: 8px
      position: relative
      right: 38px
      border-radius 0 4px 4px 0
      cursor pointer
    .icon-search:hover
      background $color

    input:focus .icon-search
      background $color
</style>