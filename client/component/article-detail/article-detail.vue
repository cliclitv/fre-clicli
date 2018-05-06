<template>
  <div>

    <div :key="post._id" class="wrap">
      <transition name="fade">
        <loading v-show="isShow"></loading>
      </transition>
      <div class="left">
        <ul>

          <li>点赞<i class="icon-font icon-zan"></i></li>
          <li>评论<i class="icon-font icon-comment"></i></li>
        </ul>
      </div>
      <div class="post" v-if="post.author">
        <h1>{{post.title}}</h1>
        <li>Posted by
          <span class="name" v-if="post.author">{{post.author.name}}</span> on
          <time>{{momentTime(post.time)}}</time>
        </li>
        <div class="content" v-html="marked(post.content)" v-if="post.author"></div>
      </div>
      <div class="user-info" v-if="post.author">
        <div class="avatar">
          <img :src="getAvatar(post.author.qq)">
        </div>
        <div class="info">
          <div class="name" v-if="post.author">{{post.author.name}}</div>
          <div class="text">{{post.author.desc}}</div>
        </div>
      </div>
    </div>
    <comment @onLongin="onLogin"></comment>
  </div>


</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import moment from 'moment'
  import marked from 'marked'
  import titleMixin from 'common/mixin/title-mixin'
  import Loading from 'base/loading/loading.vue'
  import Comment from 'component/comment/comment.vue'

  export default {
    mixins: [titleMixin],
    title() {
      return this.$store.state.post.title + '-后庭花'
    },
    data() {
      return {
        isShow: false
      }
    },

    beforeMount() {
      this.isShow = true
      this.getPost(this.$route.params.id).then(() => {
        this.isShow = false
      })

    },

    computed: {
      ...mapGetters(['post'])
    },
    asyncData({store, route}) {
      return store.dispatch('getPost', route.params.id)
    },
    methods: {
      ...mapActions(['getPost']),
      onLogin() {
        this.$emit('onLogin')
      },
      getAvatar(avatar) {
        return `http://q2.qlogo.cn/headimg_dl?dst_uin=` + avatar + `&spec=100`
      },
      momentTime(time) {
        return moment(time).format('YYYY-MM-DD')
      },
      marked(content) {
        const str = content.replace(/www.uraban.me/g, 'pic.51xiaoxin.com/www.uraban.me');
        return marked(str, {breaks: true})
      },
    },
    components: {
      Loading,
      Comment
    }
  }
</script>

<style lang="stylus">
  @import "~common/stylus/variable"
  .fade-enter-active, .fade-leave-active
    transition: opacity 1s

  .fade-enter, .fade-leave-to
    opacity: 0

  .left
    width: 130px
    display inline-block
    float left
    margin-top: 30px
    li
      font-size: 16px
      line-height 24px
      padding: 10px 0
      display flex
      justify-content: center
      align-items center
      .icon-font
        font-size: 24px
        color: $a-color
        padding-left 10px

  .post
    width 700px
    display inline-block
    background #1f2128
    padding: 20px
    .content
      padding: 30px 0
    h1
      font-size: 20px
      text-align: center
      padding: 20px
    .name
      color: #ff7589
      font-weight: bold
    li
      width: 100%
      text-align: center
      padding: 10px 0
      color: #666
    p
      padding: 20px 0
      letter-spacing: 2px
      img
        max-width 100%
        padding: 10px 0
    blockquote p
      padding: 0
    details
      background #000
      padding: 10px
      outline none
      summary
        background: #2b2e37
        padding: 5px 10px
        margin: 10px
        border-radius: 10px
        outline none
        cursor pointer
        text-align center
        transition .5s
      summary:hover
        background #000

  .user-info
    position relative
    width 300px
    float right
    .avatar
      position absolute
      width: 100%
      text-align: center
      padding: 20px 0
      img
        padding: 5px
        border: 2px solid #ffaab1
        border-radius: 50%
        height 100px
        width 100px
        box-shadow 0 10px 20px rgba(0, 0, 0, .5)
    .info
      background #1f2128
      border-radius: 4px
      padding: 80px 0 30px 0
      text-align: center
      margin-top: 74px
      .name
        font-size: 16px
        font-weight: bold
        color: $a-color
    .info:before
      content: ''
      border-radius 4px
      position: absolute
      z-index: -1
      width: 300px
      height: 100px
      background linear-gradient(to bottom, transparent, #090909)
      transform: skewX(-20deg)
      transform-origin: bottom
      bottom: 0
      left 0
</style>