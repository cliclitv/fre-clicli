<template>
    <div class="post-list">
        <ul>
            <li v-for="item in posts">
                <router-link :to="'/u/'+item.uname" class="user-name">
                    <div class="avatar">
                        <img :src="getAvatar(item.uqq)">
                        <span>{{item.uname}}</span>
                    </div>
                </router-link>
                <div class="post">
                    <router-link :to="'/p/'+item.id">
                        <h1 class="title">{{item.title}}</h1>
                    </router-link>
                    <div class="info">
                        <span>{{item.time}}</span>
                        <span>{{item.sort}}</span>
                    </div>
                    <div class="suo">
                        <img :src="getSuo(item.content)">
                    </div>
                </div>

            </li>
        </ul>
    </div>
</template>

<script>
  import {momentTime, getAvatar, getSuo} from "common/js/util"

  export default {
    props: ['posts'],
    methods: {
      getAvatar(avatar) {
        return getAvatar(avatar)
      },
      getSuo(content) {
        return getSuo(content)
      }
    }
  }
</script>


<style lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    .post-list
        width: 650px
        .user-name
            color: $color
        .avatar
            display flex
            align-items center
            padding: 10px
            margin-bottom: 20px
            img
                width: 40px
                height 40px
                border-radius 30px
                border: 10px solid $b-color
            span
                padding: 0 15px

        .post
            padding: 15px
            background $b-color
            border-radius: 4px
            position relative
            .title
                font-size: 20px
                padding: 10px
                color: $color
                text-align center
            .info
                text-align center
                padding: 10px 0 15px 0
                span
                    padding: 3px 8px
                    font-size: 11px
                    background #35355a
                    color: #fff
                    border-radius 2px
                    margin: 0 5px

            .suo img
                width 100%
                box-sizing border-box
                padding: 15px
                background $bg-color
                border-radius 5px
        .post:before
            content ''
            display block
            width: 10px
            border-bottom: 20px solid transparent
            border-right: 20px solid $b-color
            border-top-right-radius: 100%
            position: absolute
            top: -20px
            left: 50px

</style>