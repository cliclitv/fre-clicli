<template>
  <div class="author">
    <h1>作者们……</h1>
    <ul>
      <li v-for="item in author">
        <img :src="getAvatar(item.qq)">
        <p>{{item.name}}</p>
      </li>
    </ul>
  </div>
</template>

<script>

  export default {
    props: ['author'],
    methods: {
      getAvatar(qq) {
        return `https://q2.qlogo.cn/headimg_dl?dst_uin=` + qq + `&spec=100`
      },
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"
  .author
    h1
      font-size: 18px
    li
      display inline-block
      margin: 23px 23px 0 0
      padding-bottom: 5px
      text-align center
      background #000
      border-radius 4px
      border: 4px solid #000
      color: #fff
      font-size 13px
      p
        width: 60px
        overflow: hidden
        height: 16px
      img
        height 60px
        width 60px

  li:nth-child(3), li:nth-child(6), li:nth-child(9), li:nth-child(12)
    margin: 0

</style>