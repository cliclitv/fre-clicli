<template>
  <div class="article-list">
    <ul>
      <li v-for="item in articles">
        <router-link :to="'/post/'+item._id">
          <div class="suo">
            <i class="icon-font icon-eye"></i>
            <img :src="getSuo(item.content)" alt="">
          </div>

          <p class="title">{{item.title}}</p>
        </router-link>
        <div class="avatar">
          <img :src="getAvatar(item.author.qq)" alt="">
          <span>{{item.author.name}}</span>
          <time>{{momentTime(item.time)}}</time>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import moment from 'moment'

  export default {
    props: ['articles'],
    methods: {
      getSuo(content) {
        const str = content.replace(/www.uraban.me/g, 'pic.51xiaoxin.com/www.uraban.me');
        return str.match(/suo(.+?)(gif|png|jpg|jpeg)/i)[0].slice(5)
      },
      getAvatar(qq) {
        return `http://q2.qlogo.cn/headimg_dl?dst_uin=` + qq + `&spec=100`
      },
      momentTime(time) {
        return moment(time).format('MM-DD')
      }
    },

  }
</script>


<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .article-list
    li
      display inline-block
      padding: 20px 30px 20px 0
      transition 1s
      width 160px
      color: $color
      .suo
        position relative
        font-size: 0
        .icon-eye
          display none
          font-size: 40px
          color: #fff
          position absolute
          left: 50%
          top: 50%
          transform translate(-50%, -50%)
          transition 1s
        img
          height 144px
          width 160px
          object-fit: cover
          border-radius 4px
          transition 1s
      a
        color: $color
      .avatar
        display flex
        align-items center
        font-size: 13px
        color: rgba(253, 133, 150, .9)
        position relative
        time
          position: absolute
          right 0
          color: #696969
      .avatar img
        height 24px
        width 24px
        border-radius 12px
        margin 10px 10px 10px 0

      .title
        font-size: 13px
        padding-top: 5px
        transition 1s
        height 35px
        overflow hidden

    li:hover a .title
      color: $a-color
    li:hover a .suo img
      background $a-color
      opacity .4
    li:hover a .suo .icon-eye
      display block
    .suo:before
      content: ''
      border-radius 4px
      position: absolute
      z-index: -1
      width: 160px
      height: 64px
      background linear-gradient(to bottom, #090909, transparent)
      transform: skewX(-20deg)
      transform-origin: top
      top: 0
</style>