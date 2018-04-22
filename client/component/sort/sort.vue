<template>
  <div class="sort">
    <article-list :articles="sortArticle" key="this.$route.params.sort"></article-list>
  </div>

</template>

<script>
  import {mapActions, mapState} from 'vuex'
  import moment from 'moment'
  import titleMixin from 'common/mixin/title-mixin'
  import ArticleList from 'component/article-list/article-list.vue'

  export default {
    mixins: [titleMixin],
    title() {
      return '后庭花'
    },
    beforeMount() {
      this.getSortArticle(this.$route.params.sort)
    },

    computed: {
      ...mapState(['sortArticle'])
    },
    asyncData({store, route}) {
      return store.dispatch('getSortArticle', route.params.sort)

    },
    methods: {
      ...mapActions(['getSortArticle']),
      getAvatar(avatar) {
        return `http://q2.qlogo.cn/headimg_dl?dst_uin=` + avatar + `&spec=100`
      },
      momentTime(time) {
        return moment(time).format('MM-DD')
      }
    },
    components: {
      ArticleList
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

  .sort .article-list li:nth-child(6), .sort .article-list li:nth-child(12), .sort .article-list li:nth-child(18), .sort .article-list li:nth-child(24)
    padding 20px 0 20px 0

</style>