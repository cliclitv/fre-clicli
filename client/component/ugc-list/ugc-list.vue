<template>
  <div class="ugc-list">
    <ul class="masonry">
      <li v-for="item in posts" class="item">
        <router-link :to="'/play/gv'+item.id">
          <div class="post">
            <div class="user-info">
              <div class="avatar"><img :src="getAvatar(item.uqq)"></div>
              <div class="name">{{item.uname}}</div>
            </div>
            <h1 class="title">{{item.title}}</h1>
            <div class="content">
              <img :src="getSuo(item.content)">
            </div>
            <div class="info">
              <span v-text="'# ' + translate(item.sort)"></span>
              <span v-text="'# ' + item.tag"></span>
              <span>{{item.time}}</span>
            </div>
            <h1 class="count">{{item.count.cv + ' 评论'}}</h1>
          </div>
        </router-link>
      </li>
    </ul>
    <div class="clear"></div>
  </div>
</template>

<script>
  import {getAvatar, getSuo, translate} from "public/js/util"
  import marked from 'marked'

  export default {
    props: ['posts'],
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
  @import "~public/stylus/variable"
  .ugc-list
    width 1260px
    margin 0 auto
    .masonry
      column-count: 4
      column-gap: 0
      .item
        break-inside: avoid
        box-sizing: border-box
        background $write
        margin: 0 20px 20px 0
        border-radius 2px
        .title
          padding: 10px
    .post
      color: #333
    .user-info
      padding: 20px
      display flex
      align-items center
      border-bottom 1px solid #eee
      .avatar img
        height: 40px
        width 40px
        border-radius 50%
        margin-right 10px
      h1
        font-size: 18px
        font-weight bold
        float: right
    .content
      img
        width 100%
        box-sizing border-box
        min-height 200px
        margin: 5px 0
    .info
      padding: 10px 5px
      span
        padding: 4px
        color: #666
        font-size: 10px
    .count
      font-size 14px
      padding: 0 10px 10px
      font-weight bold
</style>