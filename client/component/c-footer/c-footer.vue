<template>
    <div class="footer">
        <p> ACGzone © 2017 - 2018
        </p>
        <p>
            Powered by
            <span style="color:#5599f0">Go</span> +
            <span style="color:#f0d055">Koa</span> +
            <span style="color:#66b26c">Vue</span> +
            <span style="color:#59cfdc">React</span>.
        </p>
    </div>

</template>

<script>
  export default {}
</script>

<style scoped lang="stylus">
    @import "~common/stylus/variable"
    .footer
        padding: 20px 0
        background: $b-color
        width 100%
        text-align center
        position absolute
        bottom 0
        p
            padding-top: 10px

</style>