<template>
    <div class="footer">
        <div class="wrap">
            <p> ACGzone © 2017 - 2018 Powered by
                <span style="color:#5599f0">Go</span> +
                <span style="color:#f0d055">Koa</span> +
                <span style="color:#66b26c">Vue</span> +
                <span style="color:#59cfdc">React</span>.</p>
        </div>
        <div class="message">
            <h3>
                {{message}}
            </h3>

        </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        message: `本站默认解压密码：acgzone
                欢迎加入交流群②：573646415`
      }
    }
  }
</script>

<style scoped lang="stylus">
    @import "~common/stylus/variable"
    .footer
        padding: 20px 0
        p
            display inline-block
            padding-top: 10px
            padding-left: 260px

    .message
        background: linear-gradient(#ffe2eb, #fffffb)
        border: 2px solid #f74687
        border-radius 10px
        position fixed
        right 200px
        bottom: 80px
        width 180px
        color: #f55791
        padding: 5px
        font-size 12px

    .message:before, .message:after
        z-index: 10
        bottom: -12px
        height: 10px
        border-style: solid
        border-width: 0 2px 2px 0
        border-color: #f74687
        display: block
        content: ""
        position: absolute
        transform: scaleX(-1)

    .message:before
        right: 18px
        width: 20px
        border-bottom-right-radius: 80px 50px
        background linear-gradient(108deg, transparent 8px, #fffffb 0)

    .message:after
        right: 17px
        width: 8px
        border-bottom-right-radius: 40px 50px


</style>