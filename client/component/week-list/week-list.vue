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
          <div>
            <div class="title">{{item.title}}</div>
            <div class="oid">更新至{{item.oid}}集</div>
          </div>
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
              {title: '进击的巨人第三季', suo: 'https://i.loli.net/2018/08/11/5b6eae408cf7b.jpg', url: '/p/100', oid: '10'},
            ]
          },
          {
            day: '周二', content: [
              {title: 'overlord第三季', suo: 'https://i.loli.net/2018/09/12/5b985c2fc9670.jpg', url: '/p/246', oid: '10'},
              {title: '关于我转生后成为史莱姆的那件事', suo: 'https://i.loli.net/2018/10/02/5bb3393eec0d3.jpg', url: '/p/328', oid: '1'}
            ]
          },
          {
            day: '周三', content: [
              {
                title: 'Free!第三季',
                suo: 'http://wx4.sinaimg.cn/mw690/0060lm7Tly1fue2ux88orj30go0nm77h.jpg',
                url: '/p/82',
                oid: '12'
              }
            ]
          },
          {
            day: '周四', content: [
              {title: '博人传', suo: 'https://i.loli.net/2018/07/29/5b5dbcc9a9d08.jpg', url: '/p/4', oid: '75'},
              {
                title: '天狼',
                suo: 'http://wx3.sinaimg.cn/mw690/0060lm7Tly1fv34zwanxwj30zk0k0jsi.jpg',
                url: '/p/230',
                oid: '12'
              }
            ]
          },
          {
            day: '周五', content: [
              {
                title: 'Free!第三季',
                suo: 'http://wx4.sinaimg.cn/mw690/0060lm7Tly1fue2ux88orj30go0nm77h.jpg',
                url: '/p/82',
                oid: '12'
              }
            ]
          },
          {
            day: '周六', content: [
              {
                title: 'Free!第三季',
                suo: 'http://wx4.sinaimg.cn/mw690/0060lm7Tly1fue2ux88orj30go0nm77h.jpg',
                url: '/p/82',
                oid: '12'
              }
            ]
          },
          {
            day: '周日', content: [
              {
                title: 'Island',
                suo: 'http://wx2.sinaimg.cn/mw690/0060lm7Tly1fuonnmv6tlj30z90jstve.jpg',
                url: '/p/200',
                oid: '12'
              },
              {title: '魔道祖师', suo: 'https://i.loli.net/2018/03/29/5abce56bd7312.jpg', url: '/p/213', oid: '14'},
              {
                title: '海贼王',
                suo: 'http://wx4.sinaimg.cn/mw690/0060lm7Tly1fv36qz2bf5j31jk0v9gvh.jpg',
                url: '/p/258',
                oid: '855'
              }
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
      display flex
      li
        padding: 10px
        width 20%
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
        .oid
          font-size: 12px
          color rgba(255,255,255,.6)
        .title
          font-size 13px
        .title,.oid
          padding: 10px 0 0 10px

</style>