<template>
  <div class="slider">
    <ul class="list" style="left:-440px">
      <li>
        <img src="./3.jpg" alt="3">
        <p>啦啦啦啦</p>
      </li>
      <li>
        <img src="./1.png" alt="1">
        <p>啦啦啦啦</p>

      </li>
      <li>
        <img src="./2.jpg" alt="2">
        <p>啦啦啦啦</p>
      </li>
      <li>
        <img src="./3.jpg" alt="3">
        <p>啦啦啦啦</p>
      </li>
      <li>
        <img src="./1.png" alt="1">
        <p>啦啦啦啦</p>
      </li>
    </ul>
    <div class="dots">
      <span class="active"></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<script>
  import slider from 'common/js/slider'

  export default {
    mounted() {
      slider(440, 3, 5000)
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  .slider
    overflow: hidden
    width: 440px
    height: 220px
    position: relative
    margin: 30px 30px 30px 0
    border: 2px solid $a-color
    border-radius 4px

  .list
    width: 2200px
    position: absolute
    list-style: none

  li
    float: left
    position relative
    top: 0
    p
      padding: 10px 20px
      color: #fff
      background rgba(29, 36, 52, .8)
      position absolute
      bottom: 4px
      width 100%
      box-sizing border-box

  .dots
    display: flex
    align-items: center
    position: absolute
    bottom: 10px
    right: 10px

  .dots span
    margin-left: 10px
    display: inline-block
    height: 10px
    width: 10px
    background: #fff
    border-radius: 50%

  .dots span:hover
    cursor pointer

  .dots span.active
    background: $a-color
    border: 2px solid #fff

</style>