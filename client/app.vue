<template>
  <div id="app">
    <c-header></c-header>
      <tap></tap>
    <c-footer></c-footer>
  </div>
</template>

<script>
  import CHeader from 'component/c-header/c-header.vue'
  import CFooter from 'component/c-footer/c-footer.vue'

  export default {
    components: {
      CHeader,
      CFooter
    }
  }
</script>
