<template>
  <div class="post-list">
    <ul>
      <li v-for="item in posts">
        <router-link :to="'/video/av'+item.id">
          <div class="post">
            <div class="suo">
              <img :src="getSuo(item.content)">
            </div>

            <div class="info">
              <div>{{item.time}}</div>
              <h1 class="title">{{item.title.substring(0,10)}}</h1>
            </div>
          </div>
        </router-link>
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
    background $b-color
    padding: 20px
    li
      width 20%
      display inline-block
    .post
      margin: 15px
      border-radius: 4px
      .title
        font-size: 14px
        padding-top: 10px
        color: $color
      .info
        padding: 10px
        font-size: 10px
        color: rgba(255, 255, 255, .6)
        border-left 2px solid $yellow
        background $bg-color
        margin: 10px 0

      .suo, .suo img
        width 100%
        height 250px
        box-sizing border-box
        object-fit: cover
        background $bg-color
        transition  .3s
      .suo img:hover
        transform scale(1.05)


</style>