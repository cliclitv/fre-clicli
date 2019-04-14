<template>
  <div class="video-list">
    <div class="wrapper" v-show="addShow" @click="hide"></div>
    <player :url="url" :type="type" :playerShow="playerShow" @hide="hide"></player>
    <div class="list">
      <ul>
        <li v-for="item in videos">
          <div class="item" @click="selectItem(item,$event)">
            <div class="avatar">
              <img :src="getAvatar(item.uqq)">
            </div>
            <div class="oid">第{{item.oid}}话</div>
            <div class="title">{{item.title}}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
  import {addVideo, updateVideo, getVideos, getRealUrl, getPv} from 'api/video'
  import {getStorage} from 'public/js/localstorage'
  import {getAvatar} from "public/js/util"
  import Player from 'widget/player/player.vue'
  import {mapState, mapMutations} from 'vuex'
  import {getDanmuku} from 'api/comment'
  import {getAv} from "public/js/util"

  export default {
    data() {
      return {
        videos: [],
        addShow: false,
        isShow: false,
        playerShow: false,
        title: '',
        content: '',
        pid: getAv(this.$route.params.id),
        uid: 0,
        url: '',
        type: ''
      }
    },
    mounted() {
      const role = getStorage('user-info').role
      this.uid = getStorage('user-info').id
      if (role === 'admin' || role === 'editor' || role === 'author') {
        this.isShow = true
      }
      getVideos(this.pid, 1, 150).then(res => {
        if (res.data.code === 201) {
          this.videos = res.data.videos
        }
      })

    },
    computed: {
      ...mapState(['vid'])
    },
    methods: {
      hide() {
        this.addShow = false
        this.playerShow = false
        document.body.style.overflow = 'auto'
      },
      selectItem({id, content}, e) {
        this.playerShow = true
        document.body.style.overflow = 'hidden'
        this.setVid(id)
        getPv(this.pid).then(res => {
          console.log(res.data.pv + '+1')
        })
        getDanmuku(id, 1, 100).then(res => {
          this.getDanmuku(res.data.comments)
        })
        getRealUrl(content).then(res => {
          this.url = res.data.url
          this.type = res.data.type
        })
        e.currentTarget.style.background = '#21374f'
      },
      getAvatar(qq) {
        return getAvatar(qq)
      },
      ...mapMutations(['setVid', 'getDanmuku'])
    },
    components: {
      Player
    }

  }
</script>

<style scoped lang="stylus">
  @import "~public/stylus/variable"
  .video-list
    padding-top: 20px
    .addBtn
      text-align center
      padding: 20px
      span
        padding: 5px 40px
        background $blue
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
      background: $t-color
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
          background: $blue
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
          box-sizing border-box
          display: inline-block
          .item
            cursor pointer
            margin: 10px
            background $t-color
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
            margin: 0 10px
    .list li:nth-child(even) .item
      margin-right 0
    .list li:nth-child(odd) .item
      margin-left 0

</style>