<template>
    <div class="search">
        <post-list :posts="posts" key="this.$route.params.sort"></post-list>
    </div>

</template>

<script>
  import {searchPosts} from 'api/article'
  import PostList from 'component/post-list/post-list.vue'
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
        if (res.data.code === 201) {
          this.posts = res.data.posts
        }
      })
    },
    title() {
      return this.$route.params.key + '- clicli弹幕网'
    },
    components: {
      PostList
    }
  }
</script>

<style scoped lang="stylus">
    .search
       margin-top: 20px
</style>