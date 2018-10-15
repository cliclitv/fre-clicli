<template>
  <div class="player-wrap" v-show="playerShow">
    <div class="wrapper"></div>
    <div class="play">
      <div class="ep" ref="player"></div>
      <div class="close" @click="hide">
        <i class="icon-font icon-close1"></i>
      </div>
    </div>
  </div>
</template>

<script>
  import Eplayer from 'eplayer'
  import {CanvasBarrage} from 'common/js/CanvasBarrage'
  import {mapGetters} from 'vuex'

  export default {
    props: ['url', 'type', 'playerShow'],
    computed: {
      ...mapGetters(['danmuku'])
    },
    watch: {
      url() {
        setTimeout(() => {
          new Eplayer(this.$refs.player, {
            src: this.url,
            themeColor: 'linear-gradient(to right,#0072ff ,#00e7ff)',
            type: this.type
          })

          const canvas = document.getElementById('ep-canvas')
          const video = document.getElementById('ep-video')
          let data = this.forDanmu(this.danmuku)
          new CanvasBarrage(canvas, video, {
            data: data
          })
        }, 20)
      }
    },
    methods: {
      forDanmu(arr) {
        let out = []

        for (let i in arr) {
          let res = {}
          res['value'] = arr[i]['content']
          res['time'] = arr[i]['time']
          out[i] = res
        }
        console.log(out)
        return out
      },
      hide() {
        this.$emit('hide')
      }
    }
  }
</script>

<style lang="stylus">
  @import "~common/stylus/variable"
  .player-wrap
    position absolute
    width: 800px
    height: 450px
    .play
      width: 800px
      height: 450px
      background: #000
      position fixed
      z-index: 999999
      top: 50%
      left: 50%
      transform translate(-50%, -50%)
      box-shadow: 1px 1px 5px #090c13
      .ep
        width: 800px
        height: 450px

    .wrapper
      background: rgba(0, 0, 0, .8)
      position: fixed
      top: 0
      bottom: 0
      right: 0
      left: 0
      z-index: 99999
    .close
      z-index: 999999
      position: absolute
      top: -15px
      right: -27px
      cursor pointer
      .icon-close1
        font-size: 30px
        background: $pink-color
        border-radius: 50%
        border: 2px solid #fff
        padding: 10px
        color: #fff
    .line
      padding: 10px 30px
      background $yellow
      color: #fff
      position fixed
      top: 50%
      left: 50%
      transform translate(400px, 200px)
      z-index: 111111
      cursor pointer
      transition .3s
    .line:hover
      transform translate(420px, 200px)
    #ep-canvas
      position absolute
      height 100%
      width: 100%


</style>