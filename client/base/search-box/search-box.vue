<template>
  <div class="search-box">
    <div class="search">
      <input type="text" placeholder="搜索一下下菊花又不会坏……" v-model="key" @keyup.enter="onSearch">
      <div @click="onSearch" class="search-button">
        <i class="icon-font icon-search"></i>
      </div>
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
    width 100%
    height 100px
    position relative
    .search
      position absolute
      top: 50%
      left: 50%
      transform translate(-50%, -50%)
    .search-button
      display inline-block
    input
      color: $color
      padding: 10px 30px 10px 15px
      border-radius 20px
      background $b-color
      width 400px
      border: 1px solid $b-color
      box-sizing: border-box
    input:focus
      border: 1px solid $blue-color
    .icon-search
      background $blue-color
      border-radius 50%
      color: #fff
      padding: 5px
      position: relative
      right: 38px
      top: 1px

</style>