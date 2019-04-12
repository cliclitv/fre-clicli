<template>
  <div class="ugc">
    <ugc-list :posts="ugcs" @refresh="refresh" isShow></ugc-list>
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
      getPosts('public', '原创', '', '', 1, 30).then(res => {
        this.ugcs = res.data.posts
      })
    },
    methods: {
      refresh(sort, tag) {
        getPosts('public', sort, tag, '', 1, 30).then(res => {
          this.ugcs = res.data.posts
        })
      }
    },

    components: {
      UgcList
    }
  }
</script>