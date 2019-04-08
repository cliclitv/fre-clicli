<template>
  <div class="week-list">
    <ul class="day">
      <li v-for="(_, key) in items" @click="handleClick(key)" :class="{active: activeIndex == key}"
          class="item" v-html="getDay(key)">
      </li>
    </ul>

    <ul class="content">
      <li v-for="item in items[activeIndex]">
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
  import {getWeekList} from 'api/article'
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
        if (res.data.code === 201) {
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
        }
      })
      let date = new Date().getDay()
      if (date === 0) {
        this.activeIndex = 6
      } else {
        this.activeIndex = date
      }
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
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "~public/stylus/variable"
  .week-list
    .day
      text-align: center
      li
        position relative
        display: inline-block
        color: #fff
        font-weight bold
        padding: 5px 25px
        margin: 15px
        border-radius 5px
        cursor pointer
        background $b-color
        &.active
          background $blue-color
        &.active:before
          content ''
          position: absolute
          bottom: -10px
          left: 35px
          display: inline-block
          width: 0
          height: 0
          border-left: 5px solid transparent
          border-top: 10px solid $blue-color
          border-right: 5px solid transparent
    .content
      background $b-color
      padding: 10px
      margin: 10px 0
      display block
      li
        padding: 10px
        width 20%
        box-sizing border-box
        display inline-block
        a
          color: #fff
          display flex
          align-items center
        img
          height 80px
          width 80px
          object-fit: cover
          border-radius 50%
          border: 10px solid $bg-color
        .text
          flex: 1
          .oid
            font-size: 12px
            color rgba(255, 255, 255, .6)
          .title
            font-size 13px
          .title, .oid
            padding: 0 10px

</style>