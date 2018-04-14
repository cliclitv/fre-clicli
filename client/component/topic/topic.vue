<template>
  <div class="topic">
    <li v-for="item in articles" :key="item._id">{{item.title}}</li>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'

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
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

</style>