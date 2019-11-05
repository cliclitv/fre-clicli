<template>
  <div class="footer">
    <div class="wrap">
      <p>
        <span class="mail">
          版权、合作：admin@clicli.us
        </span>
      </p>
      <p> clicli © 2018 Powered by
        <span style="color:#5599f0">Go</span> +
        <span style="color:#f0d055">Koa</span> +
        <span style="color:#66b26c">Vue</span> +
        <span style="color:#59cfdc">React</span> +
        <span style="color:#FF005E">Fre</span> .
      </p>
      <p>
        本站 ugc 服务器由 <a href="https://www.dogecloud.com/" target="_blank">DogeCloud</a> 赞助
      </p>
    </div>
  </div>
</template>

<script>
  export default {}
</script>

<style scoped lang="stylus">
  @import "~public/stylus/variable"
  .footer
    padding: 20px 0
    margin-bottom: 30px
    p
      text-align center
      padding: 10px
    a
      color: rgba(255, 255, 255, .6)
      font-size: 12px
    a:hover
      color: #fff
    .mail
      background $pink
      color: #fff
      padding: 2px 10px
      display inline-block
      border-radius 10px 0 10px 0
      font-size: 12px
</style>