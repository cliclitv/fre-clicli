<template>
  <div class="search-box">
    <div @click="onSearch" class="search-button">
      <i class="icon-font icon-search"></i>
    </div>
    <input type="text" placeholder="搜索一下下菊花又不会坏……" v-model="key" @keyup.enter="onSearch">
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
  @import "~public/stylus/variable"
  .search-box
    display inline-block
    .search-button
      position: relative
    input
      color: $color
      padding: 8px 8px 8px 40px
      border-radius 4px
      background $b-color
      width 600px
      box-sizing: border-box
    .icon-search
      color: $grey
      position: absolute
      left: 10px
      top: 6px
      font-size 20px
</style>