<template>
  <div class="pagination">
    <div class="next" @click="nextTo">
      <span>想要更多…</span>
    </div>
  </div>
</template>

<script>

  export default {
    methods: {
      nextTo() {
        this.$emit('next')
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .pagination
    .next
      text-align center
      padding-bottom: 30px
    .next span
      background #f4fbff
      color: #0088cc
      padding: 10px 40px
      border: 1px solid #0088cc
      border-radius: 30px
      display inline-block
      margin: 30px
      transition .5s
      cursor pointer
    .next span:hover
      background #0088cc
      color: #fff

</style>
