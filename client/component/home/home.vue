<template>
    <div>
        <slider></slider>
        <h1 class="common-title">推荐文章</h1>
        <post-list :posts="posts"></post-list>
    </div>

</template>

<script>
  import Slider from 'base/slider/slider.vue'
  import PostList from 'component/post-list/post-list.vue'
  import titleMixin from 'common/mixin/title-mixin'
  import {mapActions, mapState} from 'vuex'


  export default {
    mixins: [titleMixin],
    title() {
      return '★ACG和谐区★ - 绅士的和谐社区(acgzone.cn)'
    },
    name: "home",
    beforeMount() {
      this.getArticleList()
    },
    computed: {
      ...mapState(['posts'])
    },
    asyncData({store}) {
      return store.dispatch('getArticleList')
    },
    methods: {
      ...mapActions(['getArticleList']),
    },
    components: {
      Slider,
      PostList
    }
  }
</script>

<style scoped lang="stylus">


    .main
        margin-top: 10px
        width 650px
        float: left
        padding: 10px
        .common-title
            font-size: 13px
            padding: 30px 0 10px 0
            font-weight: lighter


</style>