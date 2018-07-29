<template>
    <div class="sort">
        <post-list :posts="sort" key="this.$route.params.sort"></post-list>
        <pagination @next="next" v-show="isShow"></pagination>
    </div>

</template>

<script>
  import PostList from 'component/post-list/post-list.vue'
  import {mapActions, mapState} from 'vuex'
  import titleMixin from 'common/mixin/title-mixin'
  import Pagination from 'base/pagination/pagination.vue'
  import {translate} from "common/js/util"

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
      return translate(this.$route.params.sort) + '- ACG和谐区'
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