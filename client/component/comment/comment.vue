<template>
  <div class="comment">

    <div class="wrap comment-box">
      <div class="comment-avatar" v-if="user">
        <img :src="getAvatar(user.qq)">
      </div>
      <div class="add-text">
        <textarea placeholder="回复一下下菊花又不会坏……" v-model="content" v-if="isShow" rows="1"></textarea>
        <div v-if="!isShow" class="need-login">
          <span @click="onLogin">登陆</span>
          <a href="https://admin.clicli.us/register">注册</a>
        </div>
      </div>
      <div class="submit">
        <button @click="onComment">发射！</button>
      </div>
    </div>
  </div>
</template>

<script>
  import {addComment} from 'api/comment'
  import Cookies from 'js-cookie'
  import {getStorage} from "common/js/localstorage"
  import {mapGetters, mapMutations} from 'vuex'
  import {CanvasBarrage} from 'common/js/CanvasBarrage'

  export default {
    data() {
      return {
        title: '',
        content: '',
        user: {},
        isShow: true,
        uqq: Cookies.get('uqq')
      }
    },
    mounted() {
      this.getUser()
    },
    computed: {
      ...mapGetters(['isLogin', 'vid', 'tuid'])
    },
    methods: {
      getAvatar(avatar) {
        return `https://q2.qlogo.cn/headimg_dl?dst_uin=` + avatar + `&spec=100`
      },
      onLogin() {
        this.isOnLogin(true)
      },
      onComment() {
        if (!this.content) {
          this.msg = '不能不填！'
          return
        }
        addComment({
          pid: this.$route.params.id,
          uid: this.user.id,
          content: this.content,
          vid: this.vid,
          time: Math.round(document.getElementById('ep-video').currentTime)
        }).then(res => {
          console.log(res.data)
        })
      },
      getUser() {
        const user = getStorage('user-info')
        if (user) {
          this.user = user
          this.isShow = true
        }
      },
      ...mapMutations(['isOnLogin', 'setCurrentTime'])
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"
  .comment
    color: #fff !important
    position fixed
    bottom: 0
    left: 0
    right: 0
    width 100%
    background rgba(9, 13, 24, .8)
    padding: 10px
    z-index 9999999
    .comment-box
      display flex
      align-items center
    .comment-avatar
      margin-right 20px
      height 40px
      width 40px
      img
        width 100%
        height 100%
        border-radius 50%
    .add-text
      flex 1
      text-align center
      textarea
        border-radius 5px
        width 100%
        background rgba(9, 13, 24, .8)
        padding: 8px
        resize: none
        box-sizing border-box
        color: #fff
        font-size: 20px
        outline: none
        border: 2px solid #152e4d
    .submit
      display inline-block
      margin-left: 20px
      button
        background $blue-color
        color: #fff
        padding 5px 15px
        cursor pointer
        outline none
        transition .3s
        font-size: 22px
        border-radius 5px
      button:hover
        background $blue-color
    .need-login
      span
        background $pink-color
        padding: 2px 8px
        border-radius 4px
        margin-right 20px
        cursor pointer

  textarea::-webkit-input-placeholder
    color: #fff


</style>