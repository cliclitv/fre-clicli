<template>
  <div>
    <c-header></c-header>
    <div class="wrap">
      <tap></tap>
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
  import CHeader from 'component/c-header/c-header.vue'
  import Tap from 'component/tap/tap.vue'

  export default {
    metaInfo: {
      title: '★后庭花★-少年不知黄瓜坏，隔夜犹上后庭花'
    },
    components: {
      CHeader,
      Tap
    }
  }
</script>
