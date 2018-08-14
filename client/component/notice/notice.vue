<template>
    <div>
        <div class="notice">
            <p>和谐区qq群②：573646415，欢迎来玩耍~</p>
        </div>
        <div class="headline">
            <ul>
                <router-link to="/p/30">
                    <li><span>投稿</span><span>佛性投稿教程</span></li>
                </router-link>
                <router-link to="/p/31">
                    <li><span>使用</span><span>简陋使用说明</span></li>
                </router-link>
                <router-link to="/p/123">
                    <li><span>APP</span><span>APP下载戳这里</span></li>
                </router-link>
            </ul>
        </div>
    </div>

</template>

<script>
  export default {
    name: "notice"
  }
</script>

<style scoped lang="stylus">
    @import "~common/stylus/variable"
    .notice
        padding: 10px
        background $b-color
        border-radius: 4px
        a
            color: $color
            font-size: 12px

    .headline li
        margin-top 30px
        span:nth-child(odd)
            display: inline-block
            padding: 4px 12px
            border-radius: 28px 0 0 28px
            color: #fff
            background-color: $blue-color
        span:nth-child(even)
            display: inline-block
            padding: 4px 24px
            border-radius: 0 28px 28px 0
            color: #fff
            background-color: $b-color

</style>