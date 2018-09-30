<template>
  <div class="comment">
    <ul>
      <li class="add">
        <div class="comment-avatar" v-if="user">
          <img :src="getAvatar(user.qq)">
        </div>
        <div class="add-text">
          <textarea placeholder="回复一下下菊花又不会坏……" v-model="content" v-if="isShow"></textarea>
          <div v-if="!isShow" class="need-login">
            <span @click="onLogin">登陆</span>
            <a href="http://admin.clicli.us/register">注册</a>
          </div>
        </div>
        <div class="submit">
          <button @click="onComment">射</button>
        </div>
      </li>
      <h2>共有 <span>{{count}}</span> 条评论</h2>
      <li v-for="item in comments">
        <div class="comment-avatar">
          <img :src="getAvatar(item.uqq)">
        </div>

        <div class="text">
          <p class="name">{{item.uname}}</p>
          <p>{{item.content}}</p>
        </div>
        <time>{{item.time}}</time>
      </li>
    </ul>
  </div>
</template>

<script>
  import {getComments, addComment} from 'api/comment'
  import Cookies from 'js-cookie'
  import {getStorage} from "common/js/localstorage"
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    data() {
      return {
        title: '',
        content: '',
        user: {},
        comments: [],
        isShow: false,
        uqq: Cookies.get('uqq')
      }
    },
    props: ['count'],
    mounted() {
      this.getUser()
      this.getComment()
    },
    computed: {
      ...mapGetters(['isLogin'])
    },
    methods: {
      getComment() {
        getComments(this.$route.params.id, 1, 100).then(res => {
          if (res.data.code === 201) {
            this.comments = res.data.comments
            this.content = ''
          }
        })
      },
      getAvatar(avatar) {
        return `https://q2.qlogo.cn/headimg_dl?dst_uin=` + avatar + `&spec=100`
      },
      onLogin() {
        this.isOnLogin(true)
      },
      onComment() {
        if (!this.content) {
          this.msg = '不能不填！'
          return
        }
        addComment({
          pid: this.$route.params.id,
          uid: this.user.id,
          content: this.content
        }).then(res => {
          this.getComment()
        })
      },
      getUser() {
        const user = getStorage('user-info')
        if (user) {
          this.user = user
          this.isShow = true
        }
      },
      ...mapMutations(['isOnLogin'])
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"
  .comment
    ul
      width 700px
      margin-left: 130px
      margin-top: 20px
    h2
      text-align center
      padding: 20px
      font-size: 16px
      span
        color: $yellow-color
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
        textarea
          padding: 10px
          background: #eae8eb
          border: 1px solid #272727
          width 100%
          box-sizing border-box
          height 60px
          border-radius 4px
          outline none
          color #fff
          resize: none
        textarea:diabled
          background $b-color
        .need-login
          background: #eae8eb
          padding: 10px
          width 100%
          box-sizing border-box
          height 60px
          border-radius 4px
          justify-content center
          align-items center
          display flex
          font-size: 12px
          span
            padding: 2px 15px
            margin-right 10px
            cursor: pointer
            color: #fff
            background $yellow-color
            border-radius 10px
      time
        font-size: 11px

      .submit
        display inline-block
        width 60px
        button
          font-size: 24px
          height 60px
          width: 60px
          border-radius 50%
          background $yellow-color
          color: #fff
          cursor pointer
          outline none
          transition .3s
        button:hover
          background $yellow-color

  .comment li:nth-child(even) {
    background #fff
    border-radius 5px
  }
</style>