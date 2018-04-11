<template>
  <div class="header">
    <topbar></topbar>
  </div>
</template>

<script>
  import Topbar from 'component/topbar/topbar.vue'
  export default {
    components:{
      Topbar
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .header
    background: url("./banner.png")
    background-size: 100% 200px
    height: 200px
</style>