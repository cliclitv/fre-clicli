<template>
  <div class="comment-list">
    <h2>共有 <span>{{count}}</span> 条评论</h2>
    <ul>
      <li v-for="item in comments">
        <div class="comment-avatar">
          <img :src="getAvatar(item.uqq)">
        </div>

        <div class="text">
          <p class="name">{{item.uname}}</p>
          <p>{{item.content}}</p>
        </div>
        <time>{{item.ctime}}</time>
      </li>
    </ul>
  </div>
</template>

<script>
  import {getComments} from 'api/comment'

  export default {
    name: "comment-list",
    props: ['count'],
    data() {
      return {
        comments: []
      }
    },
    mounted() {
      this.getComment()
    },
    methods: {
      getComment() {
        getComments(this.$route.params.id, 1, 100).then(res => {
          if (res.data.code === 201) {
            this.comments = res.data.comments
            this.content = ''
          }
        })
      },
      getAvatar(avatar) {
        return `https://q2.qlogo.cn/headimg_dl?dst_uin=` + avatar + `&spec=100`
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable"
  .comment-list
    h2
      text-align center
      padding: 20px
      font-size: 16px
      span
        color: $pink-color
    li
      display: flex
      align-items center
      justify-content center
      padding: 20px
      position relative
      .comment-avatar
        display inline-block
        width 60px
        text-align center
        img
          height 50px
          width: 50px
          border-radius 50%
      .text, .add-text
        flex 1
        padding: 0 20px 0 30px
        position relative
        font-size: 13px
        font-weight: bold
        .name
          padding-bottom: 10px
          font-size: 12px
          color: $color
          span
            padding: 2px 15px
            margin-right 10px
            cursor: pointer
            color: #fff
            background $pink-color
            border-radius 10px
      time
        font-size: 11px

  .comment li:nth-child(even) {
    background #131629
    border-radius 5px
  }
</style>