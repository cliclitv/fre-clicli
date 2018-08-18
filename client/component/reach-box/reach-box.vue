<template>
    <div class="reach-box">
        <router-link to="/bg" class="bg">
            <li><i class="icon-font icon-bg"></i>正常向</li>
        </router-link>
        <router-link to="/bl" v-show="uqq">
            <li><i class="icon-font icon-boy" ></i>耽美向</li>
        </router-link>
        <router-link to="/gl" v-show="uqq">
            <li><i class="icon-font icon-girl" ></i>百合向</li>
        </router-link>
        <router-link to="/18x" v-show="uqq">
            <li><i class="icon-font icon-18x"></i>和谐区</li>
        </router-link>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Cookies from 'js-cookie'

  export default {
    data(){
      return{
        uqq: Cookies.get('uqq'),
      }
    },
    computed: {
      ...mapGetters(['isLogin'])
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