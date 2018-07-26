<template>
    <div class="slider">
        <ul class="list" style="left:-650px">
            <li>
                <a href="https://item.taobao.com/item.htm?id=568316315061"><img
                        src="http://wx3.sinaimg.cn/mw690/0060lm7Tly1ftnm6qbkhuj311s0bs4ac.jpg"></a>
                <p>广告~</p>
            </li>
            <li>
                <a href="http://www.idanmu.cc/post/5ad6f9df168a654b4441189c"><img
                        src="http://wx3.sinaimg.cn/mw690/0060lm7Tly1ftnm5ih419j311s0bs7gy.jpg"></a>
                <p>投稿投稿啦~</p>
            </li>
            <li>
                <a href="https://item.taobao.com/item.htm?id=568316315061"><img
                        src="http://wx3.sinaimg.cn/mw690/0060lm7Tly1ftnm6qbkhuj311s0bs4ac.jpg"></a>
                <p>广告~</p>
            </li>
            <li>
            <li>
                <a href="http://www.idanmu.cc/post/5ad6f9df168a654b4441189c"><img
                        src="http://wx3.sinaimg.cn/mw690/0060lm7Tly1ftnm5ih419j311s0bs7gy.jpg"></a>
                <p>投稿投稿啦~</p>
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