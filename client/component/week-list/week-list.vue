<template>
  <div class="week-list">
    <ul class="day">
      <li v-for="(item, index) in items" @click="handleClick(index)" :class="{active: activeIndex === index}"
          class="item">
        {{item.day}}
      </li>
    </ul>

    <ul class="content" v-if="items.length">
      <li v-for="item in items[activeIndex].content" v-if="items.length">
        <router-link :to="'/play/av'+item.av">
          <img :src="item.suo" :alt="item.title">
          <div class="text">
            <div class="title">{{item.title}}</div>
            <div class="oid">更新至{{item.oid}}集</div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>

</template>

<script>
  import {getWeekList} from 'api/article'

  export default {
    data() {
      return {
        activeIndex: 0,
        items: []
      }
    },
    created() {
      let week = new Date().getDay()
      if (week === 0) {
        this.activeIndex = 6
      } else {
        this.activeIndex = week - 1
      }

    },
    mounted() {
      getWeekList().then(res => {
        this.items = res.data.data
      })
    },
    methods: {
      handleClick(index) {
        this.activeIndex = index
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable"
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
            padding: 10px 0 0 10px

</style>