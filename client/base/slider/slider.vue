<template>
  <div class="slider">
    <ul class="list" style="left:-440px">
      <li>
        <a href="http://www.idanmu.cc/post/5ad6f9df168a654b4441189c"><img src="https://i.loli.net/2018/04/21/5adb210293da8.jpg" alt="3"></a>
        <p>投稿投稿啦~</p>
      </li>
      <li>
        <a href="http://www.idanmu.cc/post/5ad6f9df168a654b4441189c"><img src="https://i.loli.net/2018/04/21/5adb210293da8.jpg" alt="3"></a>
        <p>投稿投稿啦~</p>
      </li>
      <li>
        <a href="http://www.idanmu.cc/post/5ad6f9df168a654b4441189c"><img src="https://i.loli.net/2018/04/21/5adb210293da8.jpg" alt="3"></a>
        <p>投稿投稿啦~</p>
      </li>
    </ul>
    <div class="dots">
      <span class="active"></span>
    </div>
  </div>
</template>

<script>
  import slider from 'common/js/slider'

  export default {
    mounted() {
      slider(440, 1, 5000)
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  .slider
    display inline-block
    overflow: hidden
    width: 440px
    height: 220px
    position: relative
    margin: 30px 30px 0 0
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