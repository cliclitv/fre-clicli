<template>
    <div class="post-list">
        <router-link :to="'/u/'+post.uid">
            <div class="avatar">
                <img :src="getAvatar(post.uqq)">
                <span>{{post.uname}}</span>
                <div class="count"><i class="icon-font icon-comment"></i>{{counts}}</div>
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
            </div>
            <div class="content" v-html="marked(post.content)">
            </div>
        </div>
        <comment @count="count"></comment>
    </div>
</template>

<script>
  import {getAvatar, mark} from "common/js/util"
  import {mapActions, mapGetters} from 'vuex'
  import titleMixin from 'common/mixin/title-mixin'
  import Loading from 'base/loading/loading.vue'
  import marked from 'marked'
  import Comment from 'component/comment/comment.vue'

  export default {
    mixins: [titleMixin],
    data() {
      return {
        isShow: false,
        counts: 0
      }
    },
    title() {
      return this.$store.state.post.title + '- ★ACG和谐区★'
    },
    computed: {
      ...mapGetters(['post'])
    },
    beforeMount() {
      this.getPost(this.$route.params.id)

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
        if (typeof (content) === 'undefined') {
          return '少年祈祷中……'
        } else {
          return marked(content, {breaks: true})
        }
      },
      count(count) {
        this.counts = count
      }
    },
    components: {
      Loading,
      Comment
    }
  }
</script>


<style lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    .post-list
        width: 650px
        a
            color: $color
        .avatar
            display flex
            position relative
            align-items center
            padding: 10px
            margin-bottom: 20px
            img
                width: 40px
                height 40px
                border-radius 30px
                border: 10px solid $b-color
            span
                padding: 0 15px

        .post
            padding: 15px
            background $b-color
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
                    background #35355a
                    color: #fff
                    border-radius 2px
                    margin: 0 5px

            .content
                img
                    width 100%
                    box-sizing border-box
                    padding: 15px
                    background $bg-color
                    border-radius 5px
                    margin: 5px 0
                p
                    padding: 10px 0
                    line-height: 1.5
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
        .post:before
            content ''
            display block
            width: 10px
            border-bottom: 20px solid transparent
            border-right: 20px solid $b-color
            border-top-right-radius: 100%
            position: absolute
            top: -20px
            left: 50px
        .count
            background $b-color
            padding: 5px 15px
            border-radius 25px
            float right
        .count:hover
            background $blue-color
</style>