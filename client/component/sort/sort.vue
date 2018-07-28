<template>
    <div class="sort wrap">
        <post-list :posts="sort" key="this.$route.params.sort"></post-list>
        <pagination @next="next" v-show="isShow"></pagination>
    </div>

</template>

<script>
  import PostList from 'component/post-list/post-list.vue'
  import {mapActions, mapState} from 'vuex'
  import titleMixin from 'common/mixin/title-mixin'
  import Pagination from 'base/pagination/pagination.vue'
  import {articleList} from 'api/article'

  export default {
    mixins: [titleMixin],
    data() {
      return {
        posts: [],
        page: 1,
        pageSize: 24,
        isShow: false
      }
    },
    title() {
      return '后庭花'
    },
    beforeMount() {
      this.getSortArticle(this.$route.params.sort)
    },
    computed: {
      ...mapState(['sort'])
    },
    asyncData({store, route}) {
      return store.dispatch('getSortArticle', route.params.sort)
    },
    methods: {
      ...mapActions(['getSortArticle']),
      // sortArticle() {
      //   articleList(this.$route.params.sort, this.page, this.pageSize).then(res => {
      //     if (res.data.code === 201) {
      //       this.posts = res.data.posts
      //     }
      //   })
      // },
      next() {
        this.page++
        this.sortArticle(true)
      }
    },
    components: {
      Pagination,
      PostList
    }
  }
</script>

<style lang="stylus">
</style>