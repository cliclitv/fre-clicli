<template>
  <div class="home wrap">
    <slider></slider>
    <topic :news="news"></topic>
    <div class="main">
      <div class="anime">
        <h1><i class="icon-font icon-tv"></i>动画
          <router-link to="/sort/anime">more-></router-link>
        </h1>
        <article-list :articles="anime" key="anime"></article-list>
      </div>
      <div class="comic">
        <h1><i class="icon-font icon-book"></i>漫画
          <router-link to="/sort/comic">more-></router-link>
        </h1>
        <article-list :articles="comic" key="comic"></article-list>
      </div>
      <div class="imgpack">
        <h1><i class="icon-font icon-img"></i>图包
          <router-link to="/sort/imgpack">more-></router-link>
        </h1>
        <article-list :articles="imgpack" key="imgpack"></article-list>
      </div>
      <div class="game">
        <h1><i class="icon-font icon-game"></i>游戏
          <router-link to="/sort/game">more-></router-link>
        </h1>
        <article-list :articles="game" key="game"></article-list>
      </div>
      <div class="music">
        <h1><i class="icon-font icon-music"></i>音乐
          <router-link to="/sort/music">more-></router-link>
        </h1>
        <article-list :articles="music" key="music"></article-list>
      </div>
      <div class="other">
        <h1><i class="icon-font icon-other"></i>杂物
          <router-link to="/sort/other">more-></router-link>
        </h1>
        <article-list :articles="other" key="other"></article-list>
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
  import titleMixin from 'common/mixin/title-mixin'

  export default {
    mixins: [titleMixin],
    title() {
      return '★爱弹幕★-idanmu.cc'
    },
    computed: {
      ...mapState(['anime', 'comic', 'game', 'news', 'author', 'imgpack', 'other', 'music'])
    },
    beforeMount() {
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
      if (this.game.length < 1) {
        this.getGame()
      }
      if (this.other.length < 1) {
        this.getOther()
      }
      if (this.imgpack.length < 1) {
        this.getImgPack()
      }
      if (this.music.length < 1) {
        this.getMusic()
      }

    },
    asyncData({store}) {
      return Promise.all([
        store.dispatch('getAnime'),
        store.dispatch('getComic'),
        store.dispatch('getGame'),
        store.dispatch('getAuthor'),
        store.dispatch('getOther'),
        store.dispatch('getImgPack'),
        store.dispatch('getMusic'),
        store.dispatch('getNews')])
    },
    methods: {
      ...mapActions(['getAnime', 'getComic', 'getGame', 'getNews', 'getAuthor', 'getOther', 'getImgPack', 'getMusic']),
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
  .comic, .anime, .game, .other, .imgpack, .music
    h1
      font-size: 22px
      padding-top: 30px
      a
        float right
        font-size: 13px
        margin-right: 30px
        background: $d-color
        padding: 2px 10px
        border-radius 10px
        color: $color
        transition .3s
      a:hover
        background $bg-color
      .icon-font
        font-size: 24px
        padding-right 13px
      .icon-tv
        color: #55cdf0
      .icon-book
        color: #f0d055
      .icon-game
        color #77ee77
      .icon-other
        color #c177ee
      .icon-img
        color #eeb163
      .icon-music
        color #38ecee

  .main
    width 950px
    float: left

  .side
    float: right
    width 250px
    margin-top: 30px

  .comic, .imgpack, .other
    .article-list .suo img
      height 200px !important
</style>