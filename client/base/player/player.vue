<template>
  <div class="player" v-show="playerShow">
    <div class="wrapper"></div>
    <div class="play">
      <iframe :src="'https://jx.618g.com/?url='+url" frameborder="0" width="800px" height="500px" allowfullscreen="true">
      </iframe>
      <div class="close" @click="hide">
        <i class="icon-font icon-close1"></i>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['url','playerShow'],
    methods: {
      hide() {
        this.$emit('hide')
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable"
  .player
    .play
      width: 800px
      height: 500px
      padding: 20px
      background: #000
      position fixed
      z-index: 999999
      top: 50%
      left: 50%
      transform translate(-50%, -50%)
      box-shadow: 1px 1px 5px #090c13

    .wrapper
      background: rgba(0, 0, 0, .8)
      position: fixed
      top: 0
      bottom: 0
      right: 0
      left: 0
      z-index: 99999
    .close
      z-index: 999999
      position: absolute
      top: -15px
      right: -27px
      cursor pointer
      .icon-close1
        font-size: 30px
        background: $pink-color
        border-radius: 50%
        border: 2px solid #fff
        padding: 10px
        color: #fff

</style>