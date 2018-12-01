<template>
  <div>
    <div class="gonggao">
      <span>clicli 弹幕网补番小分队招募(⊙o⊙)…欢迎加入交流群：607024802畅谈人生</span>
    </div>
    <search-box></search-box>
    <week-list></week-list>
    <div class="common-title"><span class="recommend">推荐</span></div>
    <recommend></recommend>
    <div class="common-title"><span>最近更新</span></div>
    <post-list :posts="uqq?articles:posts"></post-list>
    <pagination @next="next" v-show="isShow"></pagination>
    <div class="login-more" v-show="!uqq"><span>登录后加载更多…</span></div>
  </div>

</template>

<script>
  import PostList from 'component/post-list/post-list.vue'
  import SearchBox from 'base/search-box/search-box.vue'
  import Pagination from 'base/pagination/pagination.vue'
  import titleMixin from 'common/mixin/title-mixin'
  import {mapActions, mapState} from 'vuex'
  import {getPostsByStatus} from 'api/article'
  import Cookies from 'js-cookie'
  import Loading from 'base/loading/loading.vue'
  import WeekList from 'component/week-list/week-list.vue'
  import Recommend from 'component/recommend/recommend.vue'

  export default {
    data() {
      return {
        page: 1,
        pageSize: 20,
        articles: [],
        uqq: Cookies.get('uqq'),
        isShow: false,
        isLoading: false
      }
    },
    mixins: [titleMixin],
    title() {
      return 'C哩C哩弹幕网_(⁄•⁄ω⁄•⁄) 社保~ - clicli.top'
    },
    beforeMount() {
      if (this.uqq) {
        this.getArticleList()
      }
    },
    computed: {
      ...mapState(['posts'])
    },
    asyncData({store}) {
      return store.dispatch('getArticleList')
    },
    methods: {
      ...mapActions(['getArticleList']),
      getArticleList(flag) {
        this.isLoading = true
        getPostsByStatus(this.page, this.pageSize).then(res => {
          if (res.data.code === 201) {
            this.isShow = true
            this.isLoading = false
            if (flag) {
              this.articles = this.articles.concat(res.data.posts)
              if (!res.data.posts) {
                this.isShow = false
              }
            } else {
              this.articles = res.data.posts
            }
          }
        })
      },
      next() {
        this.page++
        this.getArticleList(true)
      }
    },
    components: {
      PostList,
      Pagination,
      WeekList,
      SearchBox,
      Loading,
      Recommend
    }
  }
</script>

<style lang="stylus">
  @import "~common/stylus/variable"

  .main
    .common-title
      font-size: 14px
      background $b-color
      padding: 10px 0
      span
        border-left $yellow 3px solid
        padding: 0 30px
      .recommend
        border-left $red 3px solid
        padding: 0 30px
    .login-more
      font-size: 13px
      text-align center
      span
        background $b-color
        padding: 10px 30px
        border-radius: 30px
        display inline-block
        margin: 30px
    .gonggao
      margin-bottom: 20px
      text-align center
      span
        background $pink-color
        color #fff
        padding: 5px
        a
          font-weight bold

    .ad
      transition .3s
      display none
      img
        border-radius: 5px
    .ad:hover
      opacity 1
</style>