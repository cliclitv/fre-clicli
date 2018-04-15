<template>
  <div class="topic">
    <h1><i class="icon-font icon-news"></i>后庭花号外
      <span>欢迎关注微博啦~</span>
      <span class="weibo"><i class="icon-font icon-weibo"></i>关注</span>
    </h1>
    <ul>
      <li v-for="item in news" :key="item._id"><img :src='getSuo(item.content)'>
        <p>{{item.title}}</p></li>
    </ul>

  </div>
</template>

<script>

  export default {
    props: ['news'],
    methods: {
      getSuo(content) {
        return content.match(/suo(.+?)(gif|png|jpg)/i)[0].slice(5)
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .topic
    width 690px
    height 180px
    float right
    background $d-color
    padding: 20px
    margin-top: 30px
    border-radius 4px
    h1
      font-size: 18px
      font-weight lighter
      padding-bottom 15px
      border-bottom: 1px solid #3d404c
      span
        font-size: 13px
      .weibo
        color: #fff
        background #bd4c28
        border-radius 13px
        padding: 4px 15px
        float: right
      .icon-news
        font-size 22px
        color: $a-color
        padding-right: 10px
    ul
      margin: 20px 0
      li
        display inline-block
        padding: 5px 25px 0 0
        text-align center
        font-size: 13px
        img
          height 84px
          width 94px
          object-fit: cover
      :last-child
        padding: 0


</style>