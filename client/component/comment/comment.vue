<template>
  <div class="comment">

    <div class="wrap comment-box">
      <div class="comment-avatar" v-if="user">
        <img :src="getAvatar(user.qq)">
      </div>
      <div class="add-text">
        <textarea placeholder="回复一下下菊花又不会坏……" v-model="data.value" v-if="isShow" rows="1"></textarea>
        <div v-if="!isShow" class="need-login">
          <span @click="onLogin">登陆</span>
          <a href="https://admin.clicli.us/register">注册</a>
        </div>
      </div>
      <switch-button @closeDm="closeDm" @openDm="openDm"></switch-button>
      <div class="option">
        <div class="color">
          <i class="icon-font icon-color" :style="{color:data.color}"></i>
        </div>
        <div class="dm-opt">
          <p>设置弹幕颜色</p>
          <p>
            <i style="background:#FFFFFF" @click="color"></i>
            <i style="background:#E54256" @click="color"></i>
            <i style="background:#f9a100" @click="color"></i>
            <i style="background:#FFE133" @click="color"></i>
            <i style="background:#64DD17" @click="color"></i>
            <i style="background:#00f9d7" @click="color"></i>
            <i style="background:#39ccff" @click="color"></i>
            <i style="background:#D500F9" @click="color"></i>
          </p>
          <p>设置弹幕位置</p>
          <p><span>上</span><span class="active">中</span><span>下</span></p>
        </div>
      </div>
      <div class="submit">
        <button @click="onComment"><i class="icon-font icon-send"></i>发射！</button>
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
  import SwitchButton from 'base/switch-button/switch-button.vue'

  export default {
    data() {
      return {
        title: '',
        user: {},
        isShow: false,
        uqq: Cookies.get('uqq'),
        data: {
          color: '#fff',
          value: ''
        }
      }
    },
    mounted() {
      this.getUser()
    },
    computed: {
      ...mapGetters(['isLogin', 'vid', 'tuid'])
    },
    methods: {
      color(val) {
        this.data.color = val.target.style.background
      },
      openDm() {
        let ca = document.getElementById('ep-canvas')
        if (ca.style.display === 'none') {
          ca.style.display = 'block'
        } else {
          return
        }
      },
      closeDm() {
        document.getElementById('ep-canvas').style.display = 'none'
      },
      getAvatar(avatar) {
        return `https://q2.qlogo.cn/headimg_dl?dst_uin=` + avatar + `&spec=100`
      },
      onLogin() {
        this.isOnLogin(true)
      },
      onComment() {
        this.$emit('addDm', this.data)
        if (!this.data.value) {
          this.msg = '不能不填！'
          return
        }
        let time = Math.round(document.getElementById('ep-video').currentTime)
        this.$emit('add', {
          value: this.data.value,
          time: time,
          color: this.data.color
        })
        addComment({
          pid: this.$route.params.id,
          uid: this.user.id,
          content: this.data.value,
          vid: this.vid,
          time: time,
          color: this.data.color
        }).then(res => {
          this.data.value = ''
          console.log(res.data.code)
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
    },
    components: {
      SwitchButton
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
    .option
      position relative
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
      .icon-send
        font-size: 24px
        margin-right: 20px
    .dm-opt
      padding: 10px
      background #090c13
      position absolute
      bottom: 60px
      right -125px
      width 260px
      p
        padding: 10px
        i
          display inline-block
          height 25px
          width 25px
          margin: 5px
          border-radius 50%
          cursor pointer
        span
          background $b-color
          padding: 5px 30px
          cursor pointer
          display inline-block
        .active
          background #fff
          color: #333
    .icon-color
      font-size: 40px
      margin-left: 20px
    .need-login
      span
        background $pink-color
        padding: 2px 8px
        border-radius 4px
        margin-right 20px
        cursor pointer

  textarea::-webkit-input-placeholder
    color: #fff

  .dm-opt span:nth-child(1) {
    border-radius 5px 0 0 5px
  }

  .dm-opt span:nth-child(3) {
    border-radius 0 5px 5px 0
    border-left none
  }


</style>