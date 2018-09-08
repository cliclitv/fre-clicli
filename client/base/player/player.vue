<template>
  <div class="player">
    <iframe :src="'https://jx.618g.com/?url='+url" frameborder="0" width="800px" height="600px">
    </iframe>
  </div>
</template>

<script>
  export default {
    props:['url']
  }
</script>

<style scoped lang="stylus">
  .player
    width: 800px
    height: 600px
    padding: 20px
    background: #000
    position fixed
    z-index: 999999
    top: 50%
    left: 50%
    transform translate(-50%, -50%)
    box-shadow: 1px 1px 5px #090c13

</style>