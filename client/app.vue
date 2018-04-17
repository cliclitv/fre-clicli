<template>
  <div>
    <c-header></c-header>
    <div class="wrap">
      <tap></tap>
      <router-view></router-view>
    </div>
    <c-footer></c-footer>
  </div>
</template>

<script>
  import CHeader from 'component/c-header/c-header.vue'
  import Tap from 'component/tab/tab.vue'
  import CFooter from 'component/c-footer/c-footer.vue'

  export default {
    metaInfo: {
      title: '★后庭花★-少年不知黄瓜坏，隔夜犹上后庭花'
    },
    components: {
      CHeader,
      Tap,
      CFooter
    }
  }
</script>
