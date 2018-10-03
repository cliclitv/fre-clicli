<template>
  <div class="video-list">
    <div class="wrapper" v-show="addShow" @click="hide"></div>
    <player :url="url" :type="type" :playerShow="playerShow" @hide="hide"></player>
    <div class="list">
      <ul>
        <li v-for="item in videos">
          <div class="item" @click="selectItem(item.content)">
            <div class="avatar">
              <img :src="getAvatar(item.uqq)">
            </div>
            <div class="oid">第{{item.oid}}话</div>
            <div class="title">{{item.title}}</div>
          </div>
        </li>
      </ul>
    </div>
    <div class="addBtn">
      <span @click="show" v-show="isShow">贴视频</span>
    </div>
    <div class="addVideo" v-show="addShow">
      <ul>
        <li><input type="text" placeholder="序号：只填数字，最终展示为[第x话]" v-model="oid"></li>
        <li><input type="text" placeholder="标题：每一话的名字，可不填" v-model="title"></li>
        <li><input type="text" placeholder="播放地址：mp4 或 m3u8 直链" v-model="content"></li>
        <li>
          <button @click="addVideo">张贴</button>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
  import {addVideo, updateVideo, getVideos, getRealUrl} from 'api/video'
  import {getStorage} from 'common/js/localstorage'
  import {getAvatar} from "common/js/util"
  import Player from 'base/player/player.vue'

  export default {
    data() {
      return {
        videos: [],
        addShow: false,
        isShow: false,
        playerShow: false,
        oid: '',
        url: '',
        type: '',
        title: '',
        content: '',
        pid: this.$route.params.id,
        uid: 0
      }
    },
    mounted() {
      const role = getStorage('user-info').role
      this.uid = getStorage('user-info').id
      if (role === 'admin' || role === 'editor') {
        this.isShow = true
      }
      getVideos(this.pid, 1, 100).then(res => {
        if (res.data.code === 201) {
          this.videos = res.data.videos
        }
      })

    },
    methods: {
      show() {
        this.addShow = true
      },
      hide() {
        this.addShow = false
        this.playerShow = false
      },
      addVideo() {
        addVideo(this.oid, this.title, this.content, this.pid, this.uid).then(res => {
          if (res.data.code === 201) {
            this.addShow = false
          }
        })
      },
      selectItem(url) {
        this.playerShow = true
        getRealUrl(url).then(res => {
          this.url = res.data.url
          this.type = res.data.type
        })

      },
      getAvatar(qq) {
        return getAvatar(qq)
      }
    },
    components: {
      Player
    }

  }
</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable"
  .video-list
    padding-top: 20px
    .addBtn
      text-align center
      padding: 20px
      span
        padding: 5px 40px
        background $blue-color
        color: #fff
        border-radius 20px
        font-size: 16px
        font-weight bold
        cursor pointer
    .wrapper
      background: rgba(18, 19, 22, .6)
      position: fixed
      top: 0
      bottom: 0
      right: 0
      left: 0
      z-index: 99999

    .addVideo
      width: 500px
      padding: 20px
      background: $b-color
      position fixed
      z-index: 999999
      top: 50%
      left: 50%
      transform translate(-50%, -50%)
      box-shadow: 1px 1px 5px #090c13
      li
        width 100%
        padding: 8px 15px
        box-sizing border-box
        input
          width: 100%
          padding: 5px
          color: #fff
          background $bg-color
          letter-spacing: 3px
          box-sizing: border-box

        button
          background: $blue-color
          width: 100%
          padding: 5px
          color: #fff
          outline none
          cursor pointer
          margin-top 10px

    .list
      ul
        li
          width 50%
          display inline-block
          box-sizing border-box
          .item
            cursor pointer
            margin: 10px
            background $b-color
            padding: 5px
            border-radius 5px
            display flex
            align-items center
          .avatar img
            border: none
            height 30px
            width 30px
          .avatar
            margin: 0
            padding: 0
          .oid
            font-weight bold
          .avatar, .oid, .title, .content
            display inline-block
            margin: 0 10px
    .list li:nth-child(even) .item
      margin-right 0
    .list li:nth-child(odd) .item
      margin-left 0

</style>