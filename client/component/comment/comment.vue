<template>
  <div class="comment">
    <ul>
      <li class="add">
        <div class="avatar" v-if="user">
          <img :src="getAvatar(user.qq)">
        </div>
        <div class="text">
          <textarea placeholder="回复一下下菊花又不会坏……" v-model="content" v-if="isShow"></textarea>
          <div v-if="!isShow" class="need-login">
            <span @click="onLogin">登陆</span>
            <a href="http://admin.idanmu.cc/register">注册</a>
          </div>
        </div>
        <div class="submit">
          <button @click="onComment">发表评论</button>
        </div>
      </li>
      <h2>共有 <span>{{count}}</span>条评论</h2>
      <li v-for="item in comments">
        <div class="avatar" v-if="item.user">
          <img :src="getAvatar(item.user.qq)">
          <p class="name">{{item.user.name}}</p>
        </div>

        <div class="text">
          <p>{{item.content}}</p>
        </div>
        <time>{{momentTime(item.time)}}</time>
      </li>
    </ul>
  </div>
</template>

<script>
  import {getComment, addComment} from 'api/comment'
  import {getStorage} from "common/js/localstorage"
  import {mapGetters, mapMutations} from 'vuex'
  import moment from 'moment'

  export default {
    data() {
      return {
        title: '',
        content: '',
        user: {},
        comments: [],
        count: 0,
        isShow: false
      }
    },
    mounted() {
      this.getUser()
      this.getComment()
    },
    computed: {
      ...mapGetters(['isLogin'])
    },
    methods: {
      getComment() {
        getComment(this.$route.params.id).then(res => {
          if (res.data.code === 0) {
            this.comments = res.data.result
            this.count = res.data.count
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
          content: this.content
        }).then(res => {
          console.log(res.data)
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
      momentTime(time) {
        return moment(time).format('YYYY-MM-DD')
      },
      ...mapMutations(['isOnLogin'])
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"
  .comment
    background #0e1216
    padding: 20px
    ul
      width 700px
      margin: 30px auto
    h2
      text-align center
      padding: 20px
      font-size: 16px
      span
        color: $a-color
    li
      display: flex
      align-items center
      justify-content center
      padding: 20px 0
      .avatar
        display inline-block
        width 60px
        text-align center
        img
          height 50px
          width: 50px
          border-radius 25px
        .name
          padding: 5px
      .text
        flex 1
        padding: 0 20px
        textarea
          background #1f2128
          padding: 10px
          width 100%
          box-sizing border-box
          height 60px
          border-radius 4px
          outline none
          color #fff
          resize: none
        textarea:diabled
          background $d-color
        .need-login
          background #000
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
            background #ff8294
            border-radius 10px
      time
        font-size: 11px

      .submit
        display inline-block
        width 60px
        button
          font-size: 13px
          height 60px
          width: 60px
          padding: 11px
          border-radius 4px
          background $a-color
          color: #fff
          cursor pointer
          outline none
          transition .3s
        button:hover
          background #fd8596

</style>