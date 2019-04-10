<template>
    <div class="progress-bar">
        <div class="progress" :style="{width:width+'%'}"></div>
        <div class="progress-pink" :style="{width:width+'%'}" v-show="isShow"></div>
    </div>
</template>

<script>
  import {request} from 'api/post'

  export default {
    data() {
      return {
        width: 5,
        isShow: false
      }
    },
    created() {
      this.loadStart(100)
    },
    mounted(){
      request.interceptors.request.use((config) => {
        this.isShow = true
        this.loadStart(80)
        return config
      })
      request.interceptors.response.use((config) => {
        this.width = 100
        this.isShow = false
        return config
      })
    },
    methods: {
      loadStart(num) {
        let timer = setInterval(() => {
          this.width = this.width + 5
          if (this.width >= num) {
            clearInterval(timer)
            return
          }
        }, 10)
      }
    }
  }
</script>

<style scoped lang="stylus">
    @import "~public/stylus/variable"
    .progress
        height: 3px
        background $blue-color
        z-index: 999
        position: fixed
        top: 0

    .progress-pink
        height: 3px
        background $pink-color
        z-index: 9999
        position: fixed
        top: 0

</style>