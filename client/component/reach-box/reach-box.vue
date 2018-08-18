<template>
    <div class="reach-box">
        <router-link to="/bg" class="bg">
            <li :style="{background:bgColor}"><i class="icon-font icon-bg"></i>正常向</li>
        </router-link>
        <router-link to="/bl" v-show="uqq">
            <li :style="{background:blColor}"><i class="icon-font icon-boy"></i>耽美向</li>
        </router-link>
        <router-link to="/gl" v-show="uqq">
            <li :style="{background:glColor}"><i class="icon-font icon-girl"></i>百合向</li>
        </router-link>
        <router-link to="/18x" v-show="uqq">
            <li :style="{background:hColor}"><i class="icon-font icon-18x"></i>和谐区</li>
        </router-link>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Cookies from 'js-cookie'

  export default {
    data() {
      return {
        bgColor: '',
        blColor: '',
        glColor: '',
        hColor: '',
        uqq: Cookies.get('uqq')
      }
    },
    computed: {
      ...mapGetters(['isLogin'])
    },
    mounted() {
      console.log(this.$route.fullPath)
      if (this.$route.fullPath === '/') {
        this.bgColor = '#009cff'
      }
      if (this.$route.fullPath === '/bl') {
        this.blColor = '#8b1beb'
      }
      if (this.$route.fullPath === '/gl') {
        this.glColor = '#FF005E'
      }
      if (this.$route.fullPath === '/18x') {
        this.hColor = '#F9C64B'
      }
    }
  }
</script>

<style scoped lang="stylus">
    @import "~common/stylus/variable"
    .reach-box
        li
            padding: 8px 10px
            color: $color
            border-radius 5px
            margin: 10px 0
            i
                margin-right 10px

    .router-link-exact-active li
        background $pink-color


</style>