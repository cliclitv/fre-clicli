<template>
  <div class="ugc">
    <div class="reach">
      <ul>
        <router-link to="/ugc" class="tab-item">
          <li><i class="icon-font icon-smile"></i>原创</li>
        </router-link>
      </ul>
    </div>
    <ugc-list :ugcs="ugcs"></ugc-list>
  </div>
</template>

<script>
  import UgcList from 'component/ugc-list/ugc-list.vue'
  import {getPosts} from 'api/post'

  export default {
    name: 'ugc',
    data() {
      return {
        ugcs: []
      }
    },

    mounted() {
      getPosts('public', 'ugc', '', '', 1, 20).then(res => {
        this.ugcs = res.data.posts
      })
    },

    components: {
      UgcList
    }
  }
</script>

<style scoped lang="stylus">
  @import "~public/stylus/variable"
  .ugc
    margin: 40px 0
    .reach
      width 160px
      float right
      a
        background $pink-color
        color: #fff
        padding: 10px
        border-radius: 5px
        display: block
    .icon-smile
      margin-right 10px

</style>