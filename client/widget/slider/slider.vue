<template>
    <div class="slider">
        <ul class="list" style="left:-650px">
            <li>
                <router-link to="/p/31"><img
                        src="http://wx3.sinaimg.cn/mw690/0060lm7Tly1ftxwllgc6fj30i205kwfm.jpg"></router-link>
                <p>和最简陋的使用说明~</p>
            </li>
            <li>
                <router-link to="/p/30"><img
                        src="http://wx2.sinaimg.cn/mw690/0060lm7Tly1ftxwllgevej30i205kt9v.jpg"></router-link>
                <p>据说是地上最佛投稿教程~</p>
            </li>
            <li>
                <router-link to="/p/31"><img
                        src="http://wx3.sinaimg.cn/mw690/0060lm7Tly1ftxwllgc6fj30i205kwfm.jpg"></router-link>
                <p>和最简陋的使用说明~</p>
            </li>
            <li>
            <li>
                <router-link to="/p/30"><img
                        src="http://wx2.sinaimg.cn/mw690/0060lm7Tly1ftxwllgevej30i205kt9v.jpg"></router-link>
                <p>据说是地上最佛投稿教程~</p>
            </li>
        </ul>
        <div class="dots">
            <span class="active"></span>
            <span></span>
        </div>
    </div>
</template>

<script>
  import slider from 'common/js/slider'

  export default {
    mounted() {
      slider(650, 2, 5000)
    }
  }
</script>

<style lang="stylus" scoped>
    @import "~common/stylus/variable"
    .slider
        display inline-block
        overflow: hidden
        width: 650px
        height: 200px
        position: relative
        border-radius 4px
        img
            width: 650px
            height: 200px

    .list
        width: 3250px
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
            bottom: 2px
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
        background: $blue-color
        border: 2px solid #fff

</style>