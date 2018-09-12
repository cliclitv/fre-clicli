<template>
  <div>
    <div class="ad">
      <a href="https://item.taobao.com/item.htm?id=574522485062" target="_blank"><img
        src="http://wx3.sinaimg.cn/mw690/0060lm7Tly1fv6n4tpostj30go02s0u6.jpg" alt=""></a>
    </div>
    <week-list></week-list>
    <h1 class="common-title">推荐文章</h1>
    <post-list :posts="uqq?articles:posts" :key="this.$route.params.type"></post-list>
    <pagination @next="next" v-show="isShow"></pagination>
    <div class="login-more" v-show="!uqq"><span>登录后加载更多…</span></div>
  </div>

</template>

<script>
  import PostList from 'component/post-list/post-list.vue'
  import Pagination from 'base/pagination/pagination.vue'
  import titleMixin from 'common/mixin/title-mixin'
  import {mapActions, mapState} from 'vuex'
  import {getPostsByStatus} from 'api/article'
  import Cookies from 'js-cookie'
  import Loading from 'base/loading/loading.vue'
  import WeekList from 'component/week-list/week-list.vue'

  export default {
    data() {
      return {
        page: 1,
        pageSize: 10,
        articles: [],
        uqq: Cookies.get('uqq'),
        isShow: false,
        isLoading: false
      }
    },
    mixins: [titleMixin],
    title() {
      return 'C哩C哩_(゜-゜)つロ 喝茶~ - clicli.us(C站)'
    },
    beforeMount() {
      if (this.uqq) {
        this.getArticleList()
      }
      // let isMobile = navigator.userAgent.toLowerCase().match(/(ipod|iphone|android|coolpad|mmp|smartphone|midp|wap|xoom|symbian|j2me|blackberry|wince)/i) != null;
      // if (isMobile) {
      //   window.location.href = "https://m.chinko.cc"
      // }
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
        getPostsByStatus(this.page, this.pageSize, this.$route.params.type).then(res => {
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
      Loading
    }
  }
</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable"

  .main
    width 650px
    float: left
    padding: 10px
    .common-title
      font-size: 13px
      padding: 30px 0 10px 0
      font-weight: lighter
    .login-more
      font-size: 13px
      text-align center
      span
        background $b-color
        padding: 10px 30px
        border-radius: 30px
        display inline-block
        margin: 30px
    .ad
      transition .3s
      display none
      img
        border-radius: 5px
    .ad:hover
      opacity 1
</style>