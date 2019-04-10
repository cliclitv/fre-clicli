<template>
  <div class="ugc">
    <ugc-list :posts="ugcs"></ugc-list>
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
      getPosts('public', 'ugc', '', '', 1, 30).then(res => {
        this.ugcs = res.data.posts
      })
    },

    components: {
      UgcList
    }
  }
</script>