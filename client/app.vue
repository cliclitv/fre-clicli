<template>
  <div id="app">
    <c-header></c-header>
    <div class="wrap">
      <tap></tap>
        <router-view :key="$route.path"></router-view>
    </div>
    <c-footer></c-footer>
  </div>
</template>

<script>
  import CHeader from 'component/c-header/c-header.vue'
  import Tap from 'component/tab/tab.vue'
  import CFooter from 'component/c-footer/c-footer.vue'

  export default {
    components: {
      CHeader,
      Tap,
      CFooter
    }
  }
</script>
