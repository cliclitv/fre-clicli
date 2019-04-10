<template>
  <div class="post-detail">
    <router-link :to="'/u/'+post.uid">
      <div class="avatar">
        <img :src="getAvatar(post.uqq)">
        <span>{{post.uname}}</span>
        <div class="count"><i class="icon-font icon-comment"></i>{{commentCount}}</div>
        <div class="count"><i class="icon-font icon-eye"></i>{{playCount}}</div>
      </div>
    </router-link>
    <div class="post">
      <loading v-show="!post.uname"></loading>
      <div v-show="post.uname">
        <router-link :to="'/play/av'+post.id">
          <h1 class="title">{{post.title}}</h1>
        </router-link>
        <div class="info">
          <span>{{post.time}}</span>
          <span v-text="translate(post.sort)"></span>
          <span v-text="translate(post.tag)"></span>
        </div>
        <div class="content" v-html="marked(post.content)">
        </div>
      </div>
    </div>
    <video-list v-if="post.status==='public'||post.status==='ugc'"></video-list>
    <comment-list :count="commentCount"></comment-list>
  </div>
</template>

<script>
  import {getAvatar, getAv, translate} from "public/js/util"
  import {getPv} from 'api/video'
  import {mapActions, mapGetters} from 'vuex'
  import titleMixin from 'public/mixin/title-mixin'
  import Loading from 'widget/loading/loading.vue'
  import marked from 'marked'
  import CommentList from 'component/comment-list/comment-list.vue'
  import VideoList from 'component/video-list/video-list.vue'

  export default {
    mixins: [titleMixin],
    data() {
      return {
        commentCount: 0,
        playCount: 0
      }
    },
    title() {
      return this.$store.state.post.title + '- clicli弹幕网'
    },
    computed: {
      ...mapGetters(['post'])
    },
    beforeMount() {
      this.getPost(getAv(this.$route.params.id))
      getPv(getAv(this.$route.params.id)).then(res => {
        this.playCount = res.data.pv
      })
    },
    asyncData({store, route}) {
      return store.dispatch('getPost', getAv(route.params.id))
    },
    methods: {
      ...mapActions(['getPost']),
      getAvatar(avatar) {
        return getAvatar(avatar)
      },
      translate(str) {
        return translate(str)
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
          return marked(content, {renderer: renderer})
        }
      }
    },
    components: {
      Loading,
      CommentList,
      VideoList
    }
  }
</script>


<style lang="stylus" rel="stylesheet/stylus">
  @import "~public/stylus/variable"
  .post-detail
    width: 700px
    margin: 30px auto
    a
      color: $color
    .avatar
      display flex
      position relative
      align-items center
      padding: 10px
      margin-bottom: 20px
      justify-content: center
      img
        width: 40px
        height 40px
        border-radius 30px
        border: 10px solid $t-color
      span
        padding: 0 15px

    .post
      padding: 15px
      background $t-color
      border-radius: 4px
      position relative
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
          background $l-color
          color: #fff
          border-radius 2px
          margin: 0 5px

      .content
        img
          max-width 100%
          box-sizing border-box
          padding: 15px
          background $bg-color
          border-radius 5px
          margin: 5px 0
        p
          padding: 10px 0
          line-height: 1.5
          word-wrap: break-word
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
            border: 1px solid $qing
            box-sizing border-box
        a
          color: #fff
          font-weight bold
    .count
      background $t-color
      padding: 5px 15px
      border-radius 25px
      float right
      margin-right: 10px
    .count:hover
      background $blue-color
</style>