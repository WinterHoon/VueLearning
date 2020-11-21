<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'BackTop'
}
</script>

<style scoped>
  .back-top {
    z-index: 9;
    position: fixed;
    bottom: 60px;
    right: 10px;
  }
  .back-top img {
    width: 43px;
  }
</style>