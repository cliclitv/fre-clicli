<template>
  <div class="home">
    <slider></slider>
    <topic></topic>
  </div>
</template>

<script>
  import Slider from 'base/slider/slider.vue'
  import Topic from 'component/topic/topic.vue'

  export default {
    components: {
      Slider,
      Topic
    }
  }
</script>

<style scoped>

</style>