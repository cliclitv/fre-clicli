<template>
  <div class="comment-list">
    <div class="add-comment">
      <div class="add-avatar">
        <img :src="getAvatar(uqq)">
      </div>
      <div class="add-content" v-if="uqq">
        <input type="text" placeholder="回复一下下菊花又不会坏(⊙o⊙)…" v-model="content">
      </div>
      <div class="need-login" v-if="!uqq">
        <span @click="onLogin">登陆</span>
        <a href="https://admin.clicli.top/register">注册</a>
      </div>
      <button @click="onComment" @keyup.enter="onComment"><i class="icon-font icon-send"></i>发射！</button>
    </div>
    <h2>共有 <span>{{count}}</span> 条弹幕&回复</h2>
    <ul>
      <li v-for="item in comments">
        <div class="comment-avatar">
          <img :src="getAvatar(item.uqq)">
        </div>

        <div class="text">
          <p class="name">{{item.uname}}</p>
          <p>{{item.content}}</p>
        </div>
        <time>{{item.ctime}}</time>
      </li>
    </ul>
  </div>
</template>

<script>
  import {getComments, addComment} from 'api/comment'
  import {getAv} from 'common/js/util'
  import Cookies from 'js-cookie'
  import {getStorage} from "common/js/localstorage"
  import {mapMutations} from 'vuex'

  export default {
    name: "comment-list",
    props: ['count'],
    data() {
      return {
        comments: [],
        uqq: Cookies.get('uqq'),
        content: '',

      }
    },
    mounted() {
      this.getComment()
    },
    methods: {
      onComment() {
        addComment({
          pid: getAv(this.$route.params.id),
          uid: getStorage('user-info').id,
          content: this.content,
          vid: 1
        }).then(res => {
          this.content = ''
          this.getComment()
          console.log(res.data.code)
        })
      },
      getComment() {
        getComments(getAv(this.$route.params.id), 1, 100).then(res => {
          if (res.data.code === 201) {
            this.comments = res.data.comments
            this.content = ''
          }
        })
      },
      onLogin() {
        this.isOnLogin(true)
      },
      getAvatar(avatar) {
        return `https://q2.qlogo.cn/headimg_dl?dst_uin=` + avatar + `&spec=100`
      },
      ...mapMutations(['isOnLogin'])
    }
  }
</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable"
  .comment-list
    .add-comment
      margin: 30px 0
      display flex
      align-items center
      .add-avatar
        margin-right 15px
        img
          height 40px
          width 40px
          border-radius 50%
    .add-content
      flex: 1
      input
        width 100%
        background $b-color
        border-radius 20px
        padding: 10px 20px
        box-sizing border-box
        color: #fff
    .need-login
      flex: 1
      text-align center
      span
        padding 2px 10px
        background $pink-color
        color: #fff
        margin-right 10px
        border-radius 4px
        cursor pointer
    button
      padding: 10px 20px
      color: #fff
      margin-left: 10px
      background $pink-color
      border-radius 20px
      cursor pointer
      outline none
      i
        padding-right 10px
    h2
      text-align center
      padding: 20px
      font-size: 16px
      span
        color: $pink-color
    li
      display: flex
      align-items center
      justify-content center
      padding: 20px
      position relative
      .comment-avatar
        display inline-block
        width 60px
        text-align center
        img
          height 50px
          width: 50px
          border-radius 50%
      .text, .add-text
        flex 1
        padding: 0 20px 0 30px
        position relative
        font-size: 13px
        font-weight: bold
        .name
          padding-bottom: 10px
          font-size: 12px
          color: $color
          span
            padding: 2px 15px
            margin-right 10px
            cursor: pointer
            color: #fff
            background $pink-color
            border-radius 10px
      time
        font-size: 11px

  .comment-list li:nth-child(even) {
    background #131629
    border-radius 5px
  }
</style>