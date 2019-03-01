<template>
  <div class="player-wrap" v-if="playerShow">
    <div class="wrapper"></div>
    <div class="play">
      <e-player :src="url" v-if="!isMobile"></e-player>
      <canvas class="danmu" v-if="!isMobile"></canvas>

      <div class="mobile" v-if="isMobile">
        <video style="width: 100%" controls>
          <source :type="getType()" :src="url">
        </video>
      </div>
      <div class="close" @click="hide">
        <i class="icon-font icon-close1"></i>
      </div>
    </div>
    <comment @add="add"></comment>
  </div>
</template>

<script>
  import {CanvasBarrage} from 'common/js/CanvasBarrage'
  import {mapGetters} from 'vuex'
  import Comment from 'component/danmu/danmu.vue'

  export default {
    props: ['url','type', 'playerShow'],
    computed: {
      ...mapGetters(['danmuku'])
    },
    data() {
      return {
        isMobile: false
      }
    },
    mounted() {
      if ("ontouchend" in document.body) {
        this.isMobile = true
      }
    },
    watch: {
      url() {
        setTimeout(() => {
          if(!this.isMobile){
            const video = document.querySelector('e-player').shadowRoot.querySelector('video')
            const canvas = document.querySelector('.danmu')
            let data = this.forDanmu(this.danmuku)
            this.dm = new CanvasBarrage(canvas, video, {
              data: data
            })
          }else {
            const video = document.querySelector('video')
            this.stream(video)
            video.load()
          }
        }, 20)
      }
    },
    methods: {
      stream(video) {
        switch (this.type) {
          case 'hls':
            if (Hls.isSupported()) {
              let hls = new Hls()
              hls.loadSource(this.url)
              hls.attachMedia(video)
            }
            break
        }
      },
      add(data) {
        this.dm.add(data)
      },
      getType(){
        return `video/${this.type}`
      },
      forDanmu(arr) {
        let out = []
        for (let i in arr) {
          let res = {}
          res['value'] = arr[i]['content']
          res['time'] = arr[i]['time']
          res['color'] = arr[i]['color']
          out[i] = res
        }
        return out
      },
      hide() {
        this.$emit('hide')
      }
    },
    components: {
      Comment
    }
  }
</script>

<style lang="stylus">
  @import "~common/stylus/variable"
  .player-wrap
    position absolute
    width: 800px
    height: 450px
    background #000
    .play
      width: 800px
      height: 450px
      background: #000
      position fixed
      z-index: 9
      top: 50%
      left: 50%
      transform translate(-50%, -60%)
      box-shadow: 1px 1px 5px #090c13
      .danmu
        position absolute
        top: 0

    .wrapper
      background: rgba(0, 0, 0, .8)
      position: fixed
      top: 0
      bottom: 0
      right: 0
      left: 0
      z-index: 9
    .close
      z-index: 9
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


</style>