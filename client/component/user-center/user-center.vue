<template>
    <div class="user-info">
        <div class="avatar">
            <img :src="getAvatar(user.qq)">
            <li>{{user.name}} sama~</li>
            <p>{{user.desc}}</p>
        </div>
        <!--<h1 v-show="userPosts">{{user.name}} の 文章</h1>-->
        <h1 v-show="!userPosts">{{user.name}} 还没有发布过文章(＞﹏＜)</h1>
        <post-list :posts="userPosts" key="this.$route.params.id"></post-list>

    </div>
</template>

<script>
  import {getUserInfo} from "api/user"
  import {userArticle} from "api/article"
  import {getAvatar} from "common/js/util"
  import PostList from 'component/post-list/post-list.vue'
  import titleMixin from 'common/mixin/title-mixin'

  export default {
    mixins: [titleMixin],
    title() {
      return this.$route.params.id + '- ★ACG和谐区★'
    },
    data() {
      return {
        user: {},
        userPosts: []
      }
    },
    beforeMount() {
      getUserInfo(this.$route.params.id).then(res => {
        if (res.data.code === 201) {
          this.user = res.data.user
          userArticle(res.data.user.id).then(res => {
            this.userPosts = res.data.posts
          })
          {

          }
        }
      })
    },
    methods: {
      getAvatar(avatar) {
        return getAvatar(avatar)
      }
    },
    components: {
      PostList
    }
  }
</script>

<style scoped lang="stylus">
    @import "~common/stylus/variable"
    .avatar
        position relative
        text-align center
        img
            border-radius 50px
        li
            font-size: 16px
            padding: 10px
            height 20px
        p
            display inline-block
            font-size: 12px
            padding: 5px 15px
            height 16px
            background $bg-color
            border-radius 20px
            margin-bottom: 15px

    .avatar:before
        content ''
        width 100%
        height: 135px
        background $b-color
        position absolute
        display block
        bottom: 0
        z-index -1

    h1
        text-align center
        font-weight lighter
        padding: 20px

</style>