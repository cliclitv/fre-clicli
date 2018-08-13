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
                        <a href="http://admin.chinko.cc/register">注册</a>
                    </div>
                </div>
                <div class="submit">
                    <button @click="onComment">射</button>
                </div>
            </li>
            <h2>共有 <span v-text="comments.length"></span> 条评论</h2>
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
    mounted() {
      this.getUser()
      this.getComment()
    },
    updated() {
      this.getCount()
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
      getCount() {
        this.$emit('count', this.comments.length)
      },
      ...mapMutations(['isOnLogin'])
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "~common/stylus/variable"
    .comment
        ul
            width 650px
            margin: 30px auto
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
                textarea
                    background $b-color
                    padding: 10px
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
                    background $b-color
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
                        background $pink-color
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
                    background $pink-color
                    color: #fff
                    cursor pointer
                    outline none
                    transition .3s
                button:hover
                    background $pink-color
        .add-text:before
            content ''
            display block
            height: 10px
            border-right: 20px solid transparent
            border-bottom: 15px solid $b-color
            border-bottom-left-radius: 100%
            position: absolute
            top: 10px
            left: 15px

    .comment li:nth-child(even) {
        background #131629
        border-radius 5px
    }
</style>