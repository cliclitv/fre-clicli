<template>
  <div class="sort wrap">
    <article-list :articles="articles" key="this.$route.params.sort"></article-list>
    <pagination @next="next" v-show="isShow"></pagination>
  </div>

</template>

<script>
  import {mapActions, mapState} from 'vuex'
  import moment from 'moment'
  import titleMixin from 'common/mixin/title-mixin'
  import ArticleList from 'component/article-list/article-list.vue'
  import Pagination from 'base/pagination/pagination.vue'
  import {articleList} from 'api/article'

  export default {
    mixins: [titleMixin],
    data() {
      return {
        articles: [],
        page: 1,
        pageSize: 24,
        isShow: false
      }
    },
    title() {
      return '后庭花'
    },
    beforeMount() {
      this.sortArticle()
    },
    computed: {
      ...mapState(['sort'])
    },
    asyncData({store, route}) {
      return store.dispatch('getSortArticle', route.params.sort)

    },
    methods: {
      ...mapActions(['getSortArticle']),
      getAvatar(avatar) {
        return `https://q2.qlogo.cn/headimg_dl?dst_uin=` + avatar + `&spec=100`
      },
      momentTime(time) {
        return moment(time).format('MM-DD')
      },
      sortArticle(flag) {
        articleList(this.$route.params.sort, this.page, this.pageSize).then(res => {
          if (res.data.code === 0) {
            this.isShow = true
            if (flag) {
              this.articles = this.articles.concat(res.data.result)
              if (res.data.count === 0) {
                this.isShow = false
              }
            } else {
              this.articles = res.data.result
            }
          }
        })
      },
      next() {
        this.page++
        this.sortArticle(true)
      }
    },
    components: {
      ArticleList,
      Pagination
    }
  }
</script>

<style lang="stylus">
  .sort
    padding 20px 0
    .article-list li
      width 175px
      .suo
        width 175px
      .suo:before
        width 175px
      .suo img
        width 175px

  .sort .article-list li:nth-child(6n)
    padding 20px 0 20px 0

</style>