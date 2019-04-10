<template>
  <div class="post-list">
    <ul>
      <li v-for="item in posts">
        <router-link :to="'/play/gv'+item.id">
          <div class="post">
            <div class="suo">
              <img :src="getSuo(item.content)">
            </div>

            <div class="info" v-if="!noInfo">
              <div>{{item.time}}</div>
              <h1 class="title">{{item.title.substring(0,10)}}</h1>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
    <div class="clear"></div>
  </div>
</template>

<script>
  import {getAvatar, getSuo} from "public/js/util"

  export default {
    props: ['posts', 'noInfo'],
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
  @import "~public/stylus/variable"
  .post-list
    li
      width 161px
      padding: 12px
      display inline-block
    .post
      border-radius: 4px
      .title
        font-size: 14px
        padding-top: 10px
        color: $color
      .info
        font-size: 12px
        color: rgba(255, 255, 255, .6)
        margin: 20px 0

      .suo, .suo img
        width 100%
        height 220px
        box-sizing border-box
        object-fit: cover
        background $bg-color
        transition .3s
        border-radius 4px
</style>