<template>
  <div class="home">
    <slider></slider>
    <topic :news="news"></topic>
    <div class="main">
      <h1><i class="icon-font icon-tv"></i>动画</h1>
      <article-list :articles="anime"></article-list>
      <h1><i class="icon-font icon-book"></i>漫画</h1>
      <article-list :articles="anime"></article-list>
    </div>
    <div class="side">
      <author :author="author"></author>
    </div>
    <div class="clear"></div>
  </div>
</template>

<script>
  import {mapActions, mapState} from 'vuex'

  import Slider from 'base/slider/slider.vue'
  import Topic from 'component/topic/topic.vue'
  import ArticleList from 'component/article-list/article-list.vue'
  import Author from 'component/author/author.vue'

  export default {
    computed: {
      ...mapState(['anime', 'comic', 'news', 'author'])
    },
    mounted() {
      if (this.anime.length < 1) {
        this.getAnime()
      }
      if (this.news.length < 1) {
        this.getNews()
      }
      if (this.author.length < 1) {
        this.getAuthor()
      }

    },
    asyncData({store}) {
      return (store.dispatch('getAnime'), store.dispatch('getAuthor'), store.dispatch('getNews'))

    },
    methods: {
      ...mapActions(['getAnime', 'getNews', 'getAuthor']),
    },
    components: {
      Slider,
      Topic,
      ArticleList,
      Author
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  h1
    font-size: 22px
    padding-top: 30px
    .icon-font
      font-size: 24px
      padding-right 10px
    .icon-tv
      color: #55cdf0
    .icon-book
      color: #f0d055

  .main
    width 940px
    float: left

  .side
    float: right
    width 260px
    margin-top: 30px


</style>