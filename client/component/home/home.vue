<template>
  <div class="home">
    <slider></slider>
    <topic :news="news"></topic>
    <div class="main">
      <div class="anime">
        <h1><i class="icon-font icon-tv"></i>动画 <span>更多-></span></h1>
        <article-list :articles="anime" key="anime"></article-list>
      </div>
      <div class="comic">
        <h1><i class="icon-font icon-book"></i>漫画<span>更多-></span></h1>
        <article-list :articles="comic" key="comic"></article-list>
      </div>
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
      if (this.comic.length < 1) {
        this.getComic()
      }

    },
    asyncData({store}) {
      return (store.dispatch('getAnime'), store.dispatch('getComic'), store.dispatch('getAuthor'), store.dispatch('getNews'))

    },
    methods: {
      ...mapActions(['getAnime', 'getComic','getNews', 'getAuthor']),
    },
    components: {
      Slider,
      Topic,
      ArticleList,
      Author
    }
  }
</script>

<style lang="stylus">
  @import "~common/stylus/variable"
  .comic, .anime
    h1
      font-size: 22px
      padding-top: 30px
      span
        float right
        font-size: 13px
        margin-right: 30px
        background: $d-color
        padding: 5px 10px
        border-radius 10px
      .icon-font
        font-size: 24px
        padding-right 13px
      .icon-tv
        color: #55cdf0
      .icon-book
        color: #f0d055

  .main
    width 950px
    float: left

  .side
    float: right
    width 250px
    margin-top: 30px

  .comic
    .article-list .suo img
      height 200px !important
</style>