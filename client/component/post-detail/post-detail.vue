<template>
  <div class="post-detail">
    <div class="post-wrap">
      <router-link :to="'/u/'+post.uid">
        <div class="avatar">
          <img :src="getAvatar(post.uqq)">
          <p>{{post.uname}}</p>
          <div class="count"><i class="icon-font icon-comment"></i>{{commentCount}}</div>
        </div>
      </router-link>
      <div class="post">
        <loading v-show="isShow"></loading>
        <router-link :to="'/p/'+post.id">
          <h1 class="title">{{post.title}}</h1>
        </router-link>
        <div class="info">
          <span>{{post.time}}</span>
          <span>{{post.sort}}</span>
          <span>{{post.type}}</span>
        </div>
        <div class="content" v-html="marked(post.content)">
        </div>
      </div>
      <video-list></video-list>
    </div>
    <comment :count="commentCount"></comment>
  </div>
</template>

<script>
  import {getAvatar, mark} from "common/js/util"
  import {getCommentCount} from 'api/article'
  import {mapActions, mapGetters} from 'vuex'
  import titleMixin from 'common/mixin/title-mixin'
  import Loading from 'base/loading/loading.vue'
  import marked from 'marked'
  import Comment from 'component/comment/comment.vue'
  import VideoList from 'component/video-list/video-list.vue'

  export default {
    mixins: [titleMixin],
    data() {
      return {
        isShow: false,
        commentCount: 0
      }
    },
    title() {
      return this.$store.state.post.title + '- ★C哩C哩★'
    },
    computed: {
      ...mapGetters(['post'])
    },
    beforeMount() {
      this.getPost(this.$route.params.id)
      getCommentCount(this.$route.params.id).then(res => {
        if (res.data.code === 201) {
          this.commentCount = res.data.count.cv
        }
      })

    },
    asyncData({store, route}) {
      return store.dispatch('getPost', route.params.id)
    },
    methods: {
      ...mapActions(['getPost']),
      getAvatar(avatar) {
        return getAvatar(avatar)
      },
      marked(content) {
        let renderer = new marked.Renderer()

        marked.setOptions({breaks: true})

        renderer.link = function (href, title, text) {
          return '<a target="_blank" href="' + href + '" title="' + title + '">' + text + '</a>'
        }
        if (typeof (content) === 'undefined') {
          return '少年祈祷中……'
        } else {
          let str = marked(content, {renderer: renderer})
          let str2 = str.replace('></iframe', 'style="background:#fff;margin-top:20px;max-width:100%;border-radius:5px"></iframe')
          return str2.replace('> </iframe', 'style="width:100%;height:350px;margin:15px 0;"> </iframe')
        }
      }
    },
    components: {
      Loading,
      Comment,
      VideoList
    }
  }
</script>


<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .post-detail
    .post-wrap
      display flex
      align-items top
      margin-top 15px

  .user-name
    color: $color

  .avatar
    text-align center
    width 100px
    margin-right 20px
    img
      width: 80px
      height 80px
      border-radius 40px
    p
      padding: 15px 0

  .post
    width: 700px
    padding: 15px
    background #fff
    border-radius: 4px
    display inline-block
    border: 1px solid #ddd
    .title
      font-size: 20px
      padding: 10px
      color: $color
      text-align center
    .info
      text-align center
      padding: 10px 0 15px 0
      span
        padding: 3px 8px
        font-size: 11px
        background $color
        color: #fff
        border-radius 2px
        margin: 0 5px

    .suo img
      box-sizing border-box
      padding: 15px
      background $bg-color
      border-radius 5px
  .content
    p
      padding: 10px 0
      line-height: 1.5
      word-wrap: break-word
      img
        max-width 700px
        box-sizing border-box
        padding: 15px
        background $bg-color
        border-radius 5px
        margin: 5px 0
    ol
      display block
      li
        display inline-block
        padding: 5px 15px
        background #35355a
        margin: 5px 10px 10px 0
        box-sizing border-box
        border 1px solid #35355a
        a
          font-weight normal
      li:hover
        border: 1px solid $blue-color
        box-sizing border-box
    a
      color: #fff
      font-weight bold

  .count
    background $color
    color: #fff
    padding: 5px 15px
    border-radius 25px



</style>