<template>
  <div class="recommend-wrap">
    <div class="left-btn" @click="left" v-show="!showBtn"><i class="icon-font icon-left"></i></div>
    <div class="recommend">
      <div class="list" ref="list">
        <post-list :posts="recommend" noInfo></post-list>
      </div>
    </div>
    <div class="right-btn" @click="right" v-show="showBtn"><i class="icon-font icon-right"></i></div>
  </div>

</template>

<script>
  import PostList from 'component/post-list/post-list.vue'
  import {getPosts} from 'api/post'

  export default {
    data() {
      return {
        recommend: [],
        showBtn: true
      }
    },
    mounted() {
      this.getRecommend()
    },
    methods: {
      right() {
        this.$refs.list.style.transform = 'translate3D(-1100px,0,0)'
        this.showBtn = false
      },
      left() {
        this.$refs.list.style.transform = 'translate3D(0,0,0)'
        this.showBtn = true
      },
      getRecommend() {
        getPosts('public', 'bgm', '推荐', '', 1, 10).then(res => {
          console.log(res.data)
          if (res.data.code === 201) this.recommend = res.data.posts
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
  .recommend-wrap
    position relative
    .recommend
      overflow hidden
      width 100%
      .list
        width 100%
        position relative
        left 0
        transition .5s ease-out
      .post-list
        width 2200px
        padding: 0
        display inline-block
        .post
          margin 0
        .suo, .suo img
          height 200px
          opacity .9
        .suo img:hover
          opacity 1
        li
          float left
          width 275px
    .left-btn, .right-btn
      background $qing
      padding: 0 5px
      position absolute
      text-align center
      height 200px
      top: 0
      cursor pointer
      display flex
      align-items: center
      i
        font-size 24px
    .left-btn
      left: -35px
    .right-btn
      right -35px

</style>