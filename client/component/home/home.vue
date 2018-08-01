<template>
    <div>
        <slider></slider>
        <h1 class="common-title">推荐文章</h1>
        <post-list :posts="uqq?articles:posts"></post-list>
        <pagination @next="next" v-show="isShow"></pagination>
        <div class="login-more"><span>登录后加载更多…</span></div>
    </div>

</template>

<script>
  import Slider from 'base/slider/slider.vue'
  import PostList from 'component/post-list/post-list.vue'
  import Pagination from 'base/pagination/pagination.vue'
  import titleMixin from 'common/mixin/title-mixin'
  import {mapActions, mapState} from 'vuex'
  import {getPostsByStatus} from 'api/article'
  import Cookies from 'js-cookie'

  export default {
    data() {
      return {
        page: 1,
        pageSize: 10,
        articles: [],
        uqq: Cookies.get('uqq'),
        isShow: false
      }
    },
    mixins: [titleMixin],
    title() {
      return '★ACG和谐区★ - 绅士的和谐社区(acgzone.cn)'
    },
    name: "home",
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
        getPostsByStatus(this.page, this.pageSize).then(res => {
          if (res.data.code === 201) {
            this.isShow = true
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
      Slider,
      PostList,
      Pagination
    }
  }
</script>

<style scoped lang="stylus">
    @import "~common/stylus/variable"

    .main
        margin-top: 10px
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


</style>