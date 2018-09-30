<template>
  <div>
    <!--<week-list></week-list>-->
    <div class="login-more" v-show="!uqq"><span>登录后加载更多…</span></div>
  </div>

</template>

<script>

  import titleMixin from 'common/mixin/title-mixin'
  import {mapActions, mapState} from 'vuex'
  import Loading from 'base/loading/loading.vue'
  import WeekList from 'component/week-list/week-list.vue'

  export default {
    data() {
      return {
        page: 1,
        pageSize: 10,
        articles: [],
        isShow: false,
        isLoading: false
      }
    },
    mixins: [titleMixin],
    title() {
      return 'C哩C哩_(゜-゜)つロ 喝茶~ - clicli.us(C站)'
    },
    computed: {
      ...mapState(['posts'])
    },
    asyncData({store}) {
      return store.dispatch('getArticleList')
    },
    methods: {
    },
    components: {
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