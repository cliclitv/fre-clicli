<template>
  <div class="bottom-tip">
    <div class="text" :style="{background:bg}">{{msg}}</div>
  </div>
</template>

<script>
  export default {
    name: "bottom-tip",
    props: ['bg', 'msg'],
  }
</script>

<style lang="stylus">
  .bottom-tip
    .text
      width 800px
      position fixed
      bottom: 0
      left: 50%
      transform translate(-50%, 0)
      padding: 10px
      text-align center
      color: #fff
      border-radius 4px 4px 0 0
  /*#f24848*/
</style>