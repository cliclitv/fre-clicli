<template>
  <div class="week-list">
    <div class="mask" ref="mask"></div>
    <ul class="day">
      <li v-for="(_, key) in items" @click="handleClick(key)" :class="{active: activeIndex == key}"
          class="item" v-html="getDay(key)" :key="key">
      </li>
    </ul>
    <ul class="content">
      <li v-for="item in items[activeIndex]" :key="item.id">
        <router-link :to="'/play/gv'+item.id">
          <img :src="getSuo(item.content)" :alt="item.title">
          <div class="text">
            <div class="title">{{item.title}}</div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>

</template>

<script>
  import {getWeekList} from 'api/post'
  import {getSuo} from "public/js/util"

  export default {
    data() {
      return {
        activeIndex: 0,
        items: []
      }
    },
    mounted() {
      getWeekList().then(res => {
        if (res.data.code === 200) {
          let ret = {
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: [],
            0: [],
          }
          res.data.posts.forEach(item => {
            let day = new Date(item.time).getDay()
            ret[day].push(item)
          })
          this.items = ret
          window.ret = ret
          let bg = getSuo(window.ret[this.activeIndex][0].content)
          this.$refs.mask.style.backgroundImage = `url(${bg})`
        }
      })
      this.activeIndex = new Date().getDay()
    },
    methods: {
      getSuo(content) {
        return getSuo(content)
      },
      getDay(day) {
        if (day == 1) return '周一'
        if (day == 2) return '周二'
        if (day == 3) return '周三'
        if (day == 4) return '周四'
        if (day == 5) return '周五'
        if (day == 6) return '周六'
        if (day == 0) return '周日'
      },
      handleClick(index) {
        this.activeIndex = parseInt(index)
        let bg = getSuo(window.ret[this.activeIndex][0].content)
        this.$refs.mask.style.backgroundImage = `url(${bg})`
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "~public/stylus/variable"
  .week-list
    height: 290px
    overflow hidden
    position: relative
    margin: 30px 0
    background: rgba(24, 77, 107, 0.7)
    border-radius 4px
    .mask
      position absolute
      top: 0
      bottom: 0
      left: 0
      right 0
      opacity 0.5
      z-index -1
      background-size cover
      filter blur(3px)
    .day
      text-align: center
      li
        position relative
        display: inline-block
        font-weight bold
        padding: 5px 25px
        margin: 15px
        cursor pointer
        border-bottom 2px solid $color
    .content
      padding: 10px
      margin: 10px 0
      display block
      li
        padding: 10px
        width 20%
        box-sizing border-box
        display inline-block
        a
          display flex
          align-items center
          color: $color
        img
          height 80px
          width 80px
          object-fit: cover
          border-radius 50%
        .text
          flex: 1
          .oid
            font-size: 12px
            color rgba(255, 255, 255, .6)
          .title
            font-size 13px
          .title, .oid
            padding: 0 10px

  .active
    border-bottom 2px solid $qing!important
    color: $qing
</style>