<template>
  <div class="post-list">
    <ul>
      <li v-for="item in posts">
        <router-link :to="'/u/'+item.uid" class="user-name">
          <div class="avatar">
            <img :src="getAvatar(item.uqq)">
            <p>{{item.uname}}</p>
            <div class="count"><i class="icon-font icon-comment"></i>
              {{item.count.cv}}
            </div>
          </div>
        </router-link>
        <div class="post">
          <router-link :to="'/p/'+item.id">
            <h1 class="title">{{item.title}}</h1>
          </router-link>
          <div class="info">
            <span>{{item.time}}</span>
            <span>{{item.sort}}</span>
          </div>
          <div class="suo">
            <img :src="getSuo(item.content)">
          </div>
        </div>

      </li>
    </ul>
  </div>
</template>

<script>
  import {momentTime, getAvatar, getSuo} from "common/js/util"
  import {getCommentCount} from 'api/article'

  export default {
    props: ['posts'],
    methods: {
      getAvatar(avatar) {
        return getAvatar(avatar)
      },
      getSuo(content) {
        return getSuo(content)
      }
    }
  }
</script>


<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .post-list
    li
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
      width 700px
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
        width 100%
        box-sizing border-box
        padding: 15px
        background $bg-color
        border-radius 5px
    .count
      background $color
      color: #fff
      padding: 5px 15px
      border-radius 25px

</style>