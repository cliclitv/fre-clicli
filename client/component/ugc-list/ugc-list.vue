<template>
  <div class="ugc-list">
    <ul class="masonry">
      <div class="option" v-if="is0ption">
        <ul class="sort">
          <h1>分类</h1>
          <li v-for="item in sorts" :class="isActive(item)" @click="selectSort(item)">{{item}}</li>
        </ul>
        <ul class="tag">
          <h1>标签</h1>
          <li v-for="item in tags" :class="isActive(item)" @click="selectTag(item)">{{item}}</li>
        </ul>
      </div>
      <li v-for="item in posts" class="item" v-if="posts">
        <router-link :to="'/play/gv'+item.id">
          <div class="post">
            <div class="user-info">
              <div class="avatar"><img :src="getAvatar(item.uqq)"></div>
              <div class="name">{{item.uname}}</div>
            </div>
            <h1 class="title">{{item.title}}</h1>
            <div class="content">
              <img :src="getSuo(item.content)">
            </div>
            <div class="info">
              <span v-text="'# ' + item.sort"></span>
              <span v-text="'# ' + item.tag"></span>
              <span>{{item.time}}</span>
            </div>
            <h1 class="count">{{item.count.cv + ' 评论'}}</h1>
          </div>
        </router-link>
      </li>
      <p v-if="!posts">该索引下没有稿件\(^o^)/~</p>
    </ul>
    <div class="clear"></div>
  </div>
</template>

<script>
  import {getAvatar, getSuo} from "public/js/util"
  import marked from 'marked'

  export default {
    props: ['posts', 'is0ption'],
    data() {
      return {
        tags: ['推荐', '转载', '耽美', '乙女', '后宫', '热血', '神魔', '日常', '古风', '恋爱', 'r15', '泡面番', '治愈', '鬼畜', 'AMV/MAD', '音乐·PV', '游戏·GMV', 'VOCALOID', '其它'],
        sorts: ['原创', '新番', '完结', '剧场版'],
        sort: '原创',
        tag: '推荐'
      }
    },
    methods: {
      getAvatar(avatar) {
        return getAvatar(avatar)
      },
      getSuo(content) {
        return getSuo(content)
      },
      translate(name) {
        return translate(name)
      },
      marked(content) {
        if (typeof (content) === 'undefined') {
          return '少年祈祷中……'
        } else {
          return marked(content)
        }
      },
      isActive(item) {
        return this.tag.indexOf(item) > -1 || this.sort === item ? 'active'
          : ''
      },
      selectSort(item) {
        this.sort = item
      },
      selectTag(item) {
        this.tag.indexOf(item) > -1 ? this.tag = this.tag.replace(`${item}`, '').replace(/\s+/g, '')
          : this.tag += ` ${item}`
      }
    },
    watch: {
      tag() {
        this.$emit('refresh', this.sort, this.tag)
      },
      sort() {
        this.$emit('refresh', this.sort, this.tag)
      }
    }
  }
</script>


<style lang="stylus" rel="stylesheet/stylus">
  @import "~public/stylus/variable"
  .ugc-list
    width 1260px
    margin 0 auto
    .masonry
      column-count: 4
      column-gap: 0
      .item
        break-inside: avoid
        box-sizing: border-box
        background $write
        margin: 0 20px 20px 0
        border-radius 2px
        .title
          padding: 10px
    .option
      padding: 0 20px 20px
      .sort
        margin-bottom 10px
      li
        display inline-block
        background $t-color
        color: #fff
        border-radius 4px
        padding: 2px 10px
        margin: 10px 5px
        cursor pointer
      h1
        font-weight bold
        color: #fff
        padding: 10px
        border-bottom 1px solid $b-color
        margin-bottom 10px
      .active
        background $qing
        color: $bg-color
    .post
      color: #333
    .user-info
      padding: 20px
      display flex
      align-items center
      border-bottom 1px solid #eee
      .avatar img
        height: 40px
        width 40px
        border-radius 50%
        margin-right 10px
      h1
        font-size: 18px
        font-weight bold
        float: right
    .content
      img
        width 100%
        box-sizing border-box
        min-height 200px
        margin: 5px 0
    .info
      padding: 10px 5px
      span
        padding: 4px
        color: #666
        font-size: 10px
    .count
      font-size 14px
      padding: 0 10px 10px
      font-weight bold
</style>