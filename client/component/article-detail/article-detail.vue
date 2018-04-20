<template>
  <div :key="post._id">
    <div class="post" v-if="post.author">
      <h1>{{post.title}}</h1>
      <li>Posted by
        <span class="name">{{post.author.name}}</span> on
        <time>{{momentTime(post.time)}}</time>
      </li>
      <div class="content" v-html="marked(post.content)" v-if="post.author"></div>
    </div>
    <div class="user-info" v-if="post.author">
      <div class="avatar">
        <img :src="getAvatar(post.author.qq)">
      </div>
      <div class="info" v-if="post.author">
        <div class="name">{{post.author.name}}</div>
        <div class="text">{{post.author.desc}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapState} from 'vuex'
  import moment from 'moment'
  import marked from 'marked'
  import titleMixin from 'common/mixin/title-mixin'

  export default {
    mixins: [titleMixin],
    title() {
      return this.post.title + '-后庭花'
    },

    computed: {
      ...mapState(['post'])
    },
    asyncData({store, route}) {
      return store.dispatch('getPost', route.params.id)

    },
    methods: {
      ...mapActions(['getPost']),
      getAvatar(avatar) {
        return `http://q2.qlogo.cn/headimg_dl?dst_uin=` + avatar + `&spec=100`
      },
      momentTime(time) {
        return moment(time).format('YYYY-MM-DD')
      },
      marked(content) {
        return marked(content, {breaks: true})
      },
    },
  }
</script>

<style lang="stylus">
  @import "~common/stylus/variable"
  .post
    width 870px
    display inline-block
    .content
      padding: 30px 0
    h1
      font-size: 20px
      text-align: center
      padding: 40px 40px 0 40px
    .name
      color: #ff7589
      font-weight: bold
    li
      width: 100%
      text-align: center
      padding: 30px 0
      color: #666
    p
      padding: 20px 0
      letter-spacing: 2px
      img
        padding: 20px
        box-shadow: 1px 1px 1px #000
        max-width: 830px
        background: $d-color
        margin: 20px 0
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
      padding: 80px 0 20px 0
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
      transform: skewX(20deg)
      transform-origin: bottom
      bottom: 0
      left 0
</style>