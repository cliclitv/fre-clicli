<template>
    <div class="tab">
        <li class="sort-title">分类</li>
        <ul>
            <router-link to="/sort/anime">
                <li><i class="icon-font icon-tv"></i>动画</li>
            </router-link>
            <router-link to="/sort/comic">
                <li><i class="icon-font icon-book"></i>漫画</li>
            </router-link>
            <router-link to="/sort/game">
                <li><i class="icon-font icon-game"></i>游戏</li>
            </router-link>
            <router-link to="/sort/imgpack">
                <li><i class="icon-font icon-img"></i>图包</li>
            </router-link>
            <router-link to="/sort/music">
                <li><i class="icon-font icon-music"></i>音乐</li>
            </router-link>
            <router-link to="/sort/novel">
                <li><i class="icon-font icon-novel"></i>小说</li>
            </router-link>
            <router-link to="/sort/topic">
                <li><i class="icon-font icon-news"></i>号外</li>
            </router-link>
            <router-link to="/sort/other">
                <li><i class="icon-font icon-other"></i>其他</li>
            </router-link>
        </ul>

    </div>
</template>


<script>
  export default {}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "~common/stylus/variable"
    .tab
        padding-top 20px
        ul
            padding-top 20px
            li
                padding 10px
                color: $color
                font-size: 14px

    .sort-title:before
        position: absolute;
        content: '';
        border-bottom: 1px solid $b-color;
        width: 95px;
        margin-left: 40px;
        margin-top: 8px;

    .icon-font
        margin-right: 10px

    .icon-home
        color: #11EBCC

    .icon-tv
        color: #eb9611

    .icon-book
        color: #7b11eb

    .icon-img
        color: #dceb11

    .icon-game
        color: #01c2ff

    .icon-music
        color: #eb1111

    .icon-novel
        color: #eb1192

    .icon-news
        color: #31e5eb

    .icon-other
        color: #eb295e

</style>