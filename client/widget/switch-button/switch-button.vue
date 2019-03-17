<template>
  <div class="switch">
    <input class='switch-component' value="yes" type='radio' v-model="val" @click="switchDan">
    <span class="dan">弹</span>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        val: 'yes'
      }
    },
    methods: {
      switchDan() {
        this.val = this.val === 'yes' ? '' : 'yes'
        if(this.val==='yes'){
          this.$emit('openDm')
        }else {
          this.$emit('closeDm')
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "~public/stylus/variable"
  .switch
    position relative
    margin-left 20px
    .switch-component
      width: 70px
      height: 36px
      background-color: #000
      border-radius: 36px
      border: none
      outline: none
      -webkit-appearance: none
      transition: all .2s ease
      cursor pointer

    .dan
      position: absolute
      top: 0
      left: 0
      width: 50%
      height: 36px
      background: $b-color
      border-radius: 50%
      transition: all .2s ease
      display inline-block
      text-align: center
      line-height: 36px

    .switch-component:checked
      background-color: #8e2b4f

    .switch-component:checked + .dan
      left: 50%
      color: #fff
      background $pink-color


</style>