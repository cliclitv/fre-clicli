<template>
  <div class="recommend-wrap">
    <div class="left-btn" @click="left"><i class="icon-font icon-left"></i></div>
    <div class="recommend">
      <div class="list" ref="list">
        <post-list :posts="recommend"></post-list>
      </div>
    </div>
    <div class="right-btn" @click="right"><i class="icon-font icon-right"></i></div>
  </div>

</template>

<script>
  import PostList from 'component/post-list/post-list.vue'
  import {getPostsByType} from 'api/article'

  export default {
    data() {
      return {
        recommend: []
      }
    },
    mounted() {
      this.getRecommend()
    },
    methods: {
      right() {
        this.$refs.list.style.transform = 'translate3D(-1100px,0,0)'
      },
      left() {
        this.$refs.list.style.transform = 'translate3D(0,0,0)'
      },
      getRecommend() {
        getPostsByType('tuijian', 1, 10).then(res => {
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
  @import "~common/stylus/variable"
  .recommend-wrap
    position relative
    .recommend
      margin-bottom 10px
      overflow hidden
      width 100%
      .list
        width 100%
        position relative
        left 0
        transition .5s ease-out
      .post-list
        width 2200px
        display inline-block
        li
          float left
          width 216px
        .post .info
          border-left 2px solid $red
    .left-btn, .right-btn
      background #131629
      position absolute
      text-align center
      padding: 15px
      top: 30%
      cursor pointer
      transition .3s
      i
        font-size 24px
    .left-btn:hover, .right-btn:hover
      background $red
    .left-btn
      left: -55px
      border-radius 36px 0 0 36px
    .right-btn
      right -55px
      border-radius 0 36px 36px 0

    li:nth-child(5)
      margin-right 20px

</style>