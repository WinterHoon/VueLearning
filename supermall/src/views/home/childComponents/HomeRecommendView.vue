<template>
  <div class="recommends">
    <div v-for="(item,index) in recommends" :key="index" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeRecommendView',
  props: {
    recommends: Array
  }
}
</script>

<style scoped>
  .recommends {
    display: flex;
    text-align: center;
    font-size: 14px;
    padding: 10px 0 20px 0;
    border-bottom: 8px solid #eee;
  }
  .recommend-item {
    flex: 1;
  }
  .recommend-item img {
    width: 80%;
    margin-bottom: 10px;
  }
</style>