<template>
  <div class="header">
    <topbar></topbar>
  </div>
</template>

<script>
  import {mapState, mapActions, mapMutations} from 'vuex'
  import Topbar from 'component/topbar/topbar.vue'

  export default {
    computed: {
      ...mapState(['text'])
    },
    mounted() {
      console.log(this.$store)
    },
    methods: {
      ...mapMutations(['getArticleList']),
      ...mapActions(['articleList'])
    },
    components: {
      Topbar
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .header
    background: url("./banner.png")
    background-size: 100% 200px
    height: 200px
</style>