<template>
  <div class="article-list">
    <ul>
      <li v-for="item in articles">
        <div class="suo">
          <img :src="getSuo(item.content)" alt="">
        </div>

        <p class="title">{{item.title}}</p>
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
        return content.match(/suo(.+?)(gif|png|jpg)/i)[0].slice(5)
      },
      getAvatar(qq) {
        return `http://q2.qlogo.cn/headimg_dl?dst_uin=` + qq + `&spec=100`
      },
      momentTime(time) {
        return moment(time).format('MM-DD')
      }
    }
  }
</script>


<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .article-list
    li
      display inline-block
      padding: 20px 30px 20px 0
      transition 3s
      .suo img
        height 144px
        width 158px
        object-fit: cover
        border-radius 4px
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
        padding-top: 5px
        transition 1s

  li:hover .title
    color: $a-color

</style>