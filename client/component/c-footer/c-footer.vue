<template>
  <div class="footer">
    <div class="wrap">
      <p>
        <span class="mail">
          版权、合作：admin@cli.moe
        </span>
      </p>
      <p> clicli © 2018 Powered by
        <span style="color:#5599f0">Go</span> +
        <span style="color:#f0d055">Koa</span> +
        <span style="color:#66b26c">Vue</span> +
        <span style="color:#59cfdc">React</span> +
        <span style="color:#FF005E">Fre</span> .
      </p>
    </div>
  </div>
</template>

<script>
  export default {}
</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable"
  .footer
    padding: 20px 0
    margin-bottom: 60px
    p
      text-align center
    a
      color: rgba(255, 255, 255, .6)
      font-size: 12px
    a:hover
      color: #fff
    .mail
      background $pink-color
      font-size: 14px
      color: #fff
      padding: 2px 10px
      display inline-block
      margin-bottom: 10px
</style>