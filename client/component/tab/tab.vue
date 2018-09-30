<template>
  <div class="tab" :style="dsStyle" ref="tab">

    <div class="logo">
      <router-link to="/"><img :src="logoUrl" alt=""></router-link>
    </div>
    <ul>
      <router-link to="/sort/xinfan">
        <li class="active">新番</li>
      </router-link>
      <router-link to="/sort/lianzai">
        <li>连载</li>
      </router-link>
      <router-link to="/sort/wanjie">
        <li>完结</li>
      </router-link>
      <router-link to="/sort/wenzi">
        <li>资源</li>
      </router-link>
    </ul>
    <search-box></search-box>
    <div class="close" @click="showTab"><i class="icon-font icon-close"></i></div>

  </div>
</template>


<script>
  import SearchBox from 'base/search-box/search-box.vue'

  export default {
    data() {
      return {
        logoUrl: 'https://i.loli.net/2018/09/30/5bb058de99ff6.png'
      }
    },
    props: ['ds'],
    computed: {
      dsStyle() {
        return `display:${this.ds}`
      }
    },
    methods: {
      showTab() {
        this.$emit('close')
      }
    },
    components: {
      SearchBox
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"
  .tab
    padding-top 20px
    ul
      margin-top: 10px
      display inline-block
      border 1px solid #ddd
      background #f0f0f0
      padding: 5px
      border-radius 5px 0 0 5px
      li
        display inline-block
        color: $color
        padding: 0 15px
        font-size: 14px
        border-radius 4px
    .close
      display none
    .logo img
      height 40px
    .active
      background $color
      color: #fff

  .sort-title:before
    position: absolute;
    content: '';
    border-bottom: 1px solid $b-color;
    width: 95px;
    margin-left: 40px;
    margin-top: 8px;

  .icon-close
    margin: 0

</style>