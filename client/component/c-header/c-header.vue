<template>
  <div class="header">
    <topbar></topbar>
    <li v-for="item in articles">{{item.title}}</li>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import Topbar from 'component/topbar/topbar.vue'

  export default {
    computed: {
      ...mapState(['text', 'articles'])
    },
    created() {
      if (this.articles.length < 1) {
        this.getArticleList()
      }

    },
    asyncData({store}) {
      return store.dispatch('getArticleList')
    },
    methods: {
      ...mapActions(['getArticleList'])
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