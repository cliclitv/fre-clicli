<template>
  <div class="bottom-tip" v-show="isShow">
    <div class="text" :style="{background:bg}">{{msg}}</div>
  </div>
</template>

<script>
  export default {
    name: "bottom-tip",
    props: ['bg', 'msg'],
    data() {
      return {
        isShow: true
      }
    },
    watch: {
      msg() {
        if (this.isShow) {
          setTimeout(() => {
            this.isShow = false
          }, 2000)
        }
      }
    }
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
</style>