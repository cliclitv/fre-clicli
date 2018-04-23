<template>
  <div class="loading">
    <div class="spinner">
      <div class="double-bounce1"></div>
      <div class="double-bounce2"></div>
    </div>
  </div>

</template>

<script>
</script>

<!--<style lang="stylus" rel="stylesheet/stylus">-->
<!--@import "~common/stylus/variable"-->
<!--.loading-->
<!--color: #08c-->
<!--background: #fffffc-->
<!--top: 0-->
<!--bottom: 0-->
<!--left: 0-->
<!--right: 0-->
<!--z-index: 99999-->
<!--position fixed-->
<!--img-->
<!--position absolute-->
<!--top: 50%-->
<!--left 50%-->
<!--transform translate(-50%, -50%)-->

<!--</style>-->

<style scoped>
  .loading {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #171a21;
    z-index: 999999;
  }

  .spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60px;
    height: 60px;
  }

  .double-bounce1, .double-bounce2 {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #FF677D;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;

    -webkit-animation: bounce 2.0s infinite ease-in-out;
    animation: bounce 2.0s infinite ease-in-out;
  }

  .double-bounce2 {
    -webkit-animation-delay: -1.0s;
    animation-delay: -1.0s;
  }

  @-webkit-keyframes bounce {
    0%, 100% {
      -webkit-transform: scale(0.0)
    }
    50% {
      -webkit-transform: scale(1.0)
    }
  }

  @keyframes bounce {
    0%, 100% {
      transform: scale(0.0);
      -webkit-transform: scale(0.0);
    }
    50% {
      transform: scale(1.0);
      -webkit-transform: scale(1.0);
    }
  }
</style>
