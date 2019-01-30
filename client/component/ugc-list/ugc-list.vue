<template>
  <div class="ugc-list">
    <ul class="masonry">
      <li v-for="item in ugcs" class="item">
        <router-link :to="'/play/av'+item.id">
          <div class="post">
            <div class="user-info">
              <div class="avatar"><img :src="getAvatar(item.uqq)"></div>
              <div class="name">{{item.uname}}</div>
            </div>
            <h1 class="title">{{item.title}}</h1>
            <div class="content"><img :src="getSuo(item.content)"></div>
            <div class="info">
              <span v-text="translate(item.sort)"></span>
              <span>{{item.time}}</span>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
    <div class="clear"></div>
  </div>
</template>

<script>
  import {getAvatar, getSuo, translate} from "common/js/util"
  import marked from 'marked'

  export default {
    props: ['ugcs'],
    methods: {
      getAvatar(avatar) {
        return getAvatar(avatar)
      },
      getSuo(content) {
        return getSuo(content)
      },
      translate(name) {
        return translate(name)
      },
      marked(content) {
        if (typeof (content) === 'undefined') {
          return '少年祈祷中……'
        } else {
          return marked(content)
        }
      }
    }
  }
</script>


<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .ugc-list
    width 960px
    float left
    .masonry
      column-count: 2
      column-gap: 0
      .item
        break-inside: avoid
        box-sizing: border-box
        padding: 20px
        background $d-color
        margin: 0 20px 20px 0
        border-radius 5px
        box-shadow 0 1px 3px 0 rgba(0, 0, 0, .8)
    .post
      color: $color
    .user-info
      display flex
      align-items center
      padding-bottom: 20px
      .avatar img
        height: 40px
        width 40px
        border-radius 5px
        margin-right 10px
      h1
        font-size: 18px
        font-weight bold
        float: right
    .content
      img
        width 100%
        border-radius: 5px
        padding: 5px
        background $bg-color
        box-sizing border-box
        margin: 5px 0
    .info span
      padding: 3px 8px
      color: #fff
      background $b-color
      border-radius: 10px 0 10px 0
      margin: 0 5px
      font-size: 10px


</style>