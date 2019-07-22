<template>
    <div class="search">
        <ugc-list :posts="posts" key="this.$route.params.sort" :isShow="false"></ugc-list>
    </div>

</template>

<script>
  import {searchPosts} from 'api/post'
  import UgcList from 'component/ugc-list/ugc-list.vue'
  import titleMixin from 'public/mixin/title-mixin'

  export default {
    mixins: [titleMixin],
    data() {
      return {
        posts: []
      }
    },
    beforeMount() {
      searchPosts(this.$route.params.key).then(res => {
        if (res.data.code === 200) {
          this.posts = res.data.posts
        }
      })
    },
    title() {
      return this.$route.params.key + '- clicli弹幕网'
    },
    components: {
      UgcList
    }
  }
</script>

<style scoped lang="stylus">
    .search
       margin-top: 20px
</style>