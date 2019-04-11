<template>
  <div class="user-wrap">
    <div class="user-info wrap">
      <div class="avatar">
        <img :src="getAvatar(user.qq)">
        <li>{{user.name}}</li>
        <p v-html="user.desc"></p>
      </div>
      <h2 v-show="!userBgms">{{user.name}} 还没有投递过稿件(＞﹏＜)</h2>
      <post-list :posts="userBgms" key="this.$route.params.id"></post-list>
    </div>

    <ugc-list :post="userUgcs"></ugc-list>

  </div>

</template>

<script>
  import {getUserById} from "api/user"
  import {getPosts} from "api/post"
  import {getAvatar} from "public/js/util"
  import PostList from 'component/post-list/post-list.vue'
  import UgcList from 'component/ugc-list/ugc-list.vue'
  import titleMixin from 'public/mixin/title-mixin'

  export default {
    mixins: [titleMixin],
    title() {
      return this.user ? (this.user.name + 'の主页 - clicli弹幕网') : '少年祈祷中……'
    },
    data() {
      return {
        user: {},
        userBgms: [],
        useUgcs: []
      }
    },
    beforeMount() {
      getUserById(this.$route.params.id).then(res => {
        if (res.data.code === 201) {
          this.user = res.data.user
          getPosts('public', 'bgm', '', res.data.user.id, 1, 12).then(res => {
            this.userBgms = res.data.posts
          })
          getPosts('public', 'ugc', '', res.data.user.id, 1, 12).then(res => {
            this.userUgcs = res.data.posts
          })
        }
      })
    },
    methods: {
      getAvatar(avatar) {
        return getAvatar(avatar)
      }
    },
    components: {
      PostList,
      UgcList
    }
  }
</script>

<style lang="stylus">
  @import "~public/stylus/variable"
  .user-info
    margin-top: 20px
    h2
      text-align center
      font-weight lighter
      padding: 20px

  .post-list
    background $t-color
    padding: 10px
    li
      width 157px

  .avatar
    position relative
    text-align center
    img
      border-radius 50px
      width 100px
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
    background $t-color
    position absolute
    display block
    bottom: 0
    z-index -1


</style>