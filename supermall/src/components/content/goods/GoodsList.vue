<template>
  <div class="goods-list">
    <goods-item class="goods-item" v-for="(item,index) in goods" :key="index" :goodsItem="item" />
  </div>
</template>

<script>
import GoodsItem from './GoodsItem.vue'
export default {
  components: { GoodsItem },
  name: 'GoodsList',
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style>
  .goods-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .goods-item {
    width: 48%;
  }

</style>