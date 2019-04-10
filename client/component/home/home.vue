<template>
  <div>
    <div class="wrap">
      <recommend></recommend>
      <week-list></week-list>
    </div>
    <div class="list-wrap">
      <div class="wrap">
        <post-list :posts="uqq?articles:posts"></post-list>
        <pagination @next="next" v-show="isShow"></pagination>
        <div class="login-more" v-show="!uqq"><span>登录后加载更多…</span></div>
      </div>
    </div>
  </div>

</template>

<script>
  import PostList from 'component/post-list/post-list.vue'
  import Pagination from 'widget/pagination/pagination.vue'
  import titleMixin from 'public/mixin/title-mixin'
  import {mapActions, mapState} from 'vuex'
  import {getPosts} from 'api/post'
  import Cookies from 'js-cookie'
  import Loading from 'widget/loading/loading.vue'
  import WeekList from 'component/week-list/week-list.vue'
  import Recommend from 'component/recommend/recommend.vue'

  export default {
    data() {
      return {
        page: 1,
        pageSize: 30,
        articles: [],
        uqq: Cookies.get('uqq'),
        isShow: false,
        isLoading: false
      }
    },
    mixins: [titleMixin],
    title() {
      return 'c站-clicli弹幕网_(⁄•⁄ω⁄•⁄) 社保~ clicli.us'
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
        getPosts('public', 'bgm', '', '', this.page, this.pageSize).then(res => {
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
      Loading,
      Recommend
    }
  }
</script>

<style lang="stylus">
  @import "~public/stylus/variable"
  .list-wrap
    margin-top: 20px
    background $t-color
    padding-top 30px
    .post-list
      background none
    .login-more
      font-size: 13px
      text-align center
      span
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