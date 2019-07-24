<template>
  <div class="recommend-wrap">
    <div class="recommend">
      <h3>我们为你推荐了：</h3>
      <post-list :posts="recommend" noInfo="true"></post-list>
    </div>
    <div class="uper">
      <h2>推荐的 up 主</h2>
      <ul>
        <li v-for="item in authors">
          <router-link :to="'/u/'+item.id">
            <div class="avatar"><img :src="getAvatar(item.qq)"></div>
            <div>
              <div class="name">{{item.name}}</div>
              <div class="desc">{{item.desc.substring(0,20) + ' ...'}}</div>
            </div>
          </router-link>

        </li>
      </ul>
    </div>
    <div class="clear"></div>
  </div>

</template>

<script>
  import PostList from 'component/post-list/post-list.vue'
  import {getPosts} from 'api/post'
  import {getUsers} from 'api/user'
  import {getAvatar} from 'public/js/util'

  export default {
    data() {
      return {
        recommend: [],
        showBtn: true,
        authors: []
      }
    },
    mounted() {
      this.getRecommend()
      this.getAuthors()
    },
    methods: {
      getAvatar(content) {
        return getAvatar(content)
      },
      getRecommend() {
        getPosts('public', '', '推荐', '', 1, 8).then(res => {
          if (res.data.code === 200) this.recommend = res.data.posts
        })
      },
      getAuthors() {
        let page = Math.ceil(Math.random() * 3)
        getUsers(5, page, 5).then(res => {
          this.authors = res.data.users
        })
      }
    },
    components: {
      PostList
    }
  }
</script>

<style lang="stylus">
  @import "~public/stylus/variable"
  .recommend
    background: #fbfeff
    border-radius 4px
    width 740px
    padding: 10px
    float left
    h3
      color: #888
      padding 0 15px
    .suo, .suo img
      height 150px !important

  .uper
    width 330px
    float right
    h2
      font-size: 16px
      color: #fff
      font-weight bold
      padding-bottom 10px
      margin-bottom 10px
      border-bottom: 1px solid $b-color
    ul
      li a
        border-bottom: 1px solid $b-color
        display flex
        padding 10px 0
        .avatar img
          height 40px
          width 40px
          border-radius 4px
          margin-right 10px
</style>