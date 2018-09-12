<template>
  <div class="week-list">
    <ul class="day">
      <li v-for="(item, index) in items" @click="handleClick(index)" :class="{active: activeIndex === index}"
          class="item">
        {{item.day}}
      </li>
    </ul>

    <ul class="content">
      <li v-for="item in items[activeIndex].content">
        <router-link :to="item.url">
          <img :src="item.suo" :alt="item.title">
          <div class="title">{{item.title}}</div>
        </router-link>
      </li>
    </ul>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        activeIndex: 0,
        items: [
          {
            day: '周一', content: [
              {title: '进击的巨人第三季', suo: 'https://i.loli.net/2018/08/11/5b6eae408cf7b.jpg', url: '/p/100'},
              {
                title: '邪神酱与厨二病少女',
                suo: 'http://wx2.sinaimg.cn/mw690/0060lm7Tly1fv5i2eoeoij30dw0b2t9w.jpg',
                url: '/p/238'
              }
            ]
          },
          {
            day: '周二', content: [
              {title: 'overlord第三季', suo: 'https://i.loli.net/2018/09/12/5b985c2fc9670.jpg', url: '/p/246'}
            ]
          },
          {
            day: '周三', content: [
              {title: 'Free!第三季', suo: 'http://wx4.sinaimg.cn/mw690/0060lm7Tly1fue2ux88orj30go0nm77h.jpg', url: '/p/82'}
            ]
          },
          {
            day: '周四', content: [
              {title: '博人传', suo: 'https://i.loli.net/2018/07/29/5b5dbcc9a9d08.jpg', url: '/p/4'},
              {title: '天狼', suo: 'http://wx3.sinaimg.cn/mw690/0060lm7Tly1fv34zwanxwj30zk0k0jsi.jpg', url: '/p/230'},
              {title: '异世界魔王与召唤少女', suo: 'http://wx4.sinaimg.cn/mw690/0060lm7Tly1fv6yoymifxj30hs0a03yu.jpg', url: '/p/248'}
            ]
          },
          {
            day: '周日', content: [
              {title: '魔道祖师', suo: 'https://i.loli.net/2018/03/29/5abce56bd7312.jpg', url: '/p/213'},
              {title: '海贼王', suo: 'http://wx4.sinaimg.cn/mw690/0060lm7Tly1fv36qz2bf5j31jk0v9gvh.jpg', url: '/p/231'}
            ]
          }
        ]
      }
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
      li
        display inline-block
        text-align center
        padding: 10px
        a
          color: #fff
        img
          height 80px
          width 80px
          object-fit: cover
          border-radius 50%
          border: 10px solid $bg-color
        .title
          padding: 10px

</style>