<template>
  <div class="bio">
    <ul class="biu">
      <router-link :to="'/u/'+user.id">
        <li class="avatar" v-show="isShow"><img :src="getAvatar(user.qq)"></li>
        <li v-show="isShow">{{user.name}}</li>
      </router-link>

      <li v-show="isShow" @click="onLogout">退出</li>
      <li @click="onLogin" v-show="!isShow">登陆</li>
      <a href="http://admin.clicli.us/register">
        <li v-show="!isShow">注册</li>
      </a>
    </ul>

    <a :href="adminroute" target="_blank">
      <li class="pr">
        <span>{{pr}}</span>
      </li>
    </a>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        pr: '投稿',
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable"
  .bio
  width 1100px
  margin: 0 auto
  position relative
  a
    display: flex
    align-items: center
    .avatar
      line-height 0
      img
        height: 30px
        width: 30px
        border-radius 15px
  .pr
    position absolute
    right 0
    background $blue-color
    font-size: 16px
    padding: 5px 15px
    top: -10px
    span
      position relative
      top: 15px

  .pr:before
    content: ''
    height 40px
    width 64px
    background $blue-color
    position absolute
    top: 30px
    left: 0
    border-radius 0 0 40px 40px

  .biu
    position absolute
    top: 0
    right: 80px
    z-index: 9999999
    color #fff
    display flex
    align-items center
    li
      display inline-block
      padding: 0 10px
      line-height 40px
      cursor pointer

</style>
