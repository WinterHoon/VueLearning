<template>
  <div v-if="Object.keys(goodsInfo).length !== 0" class="base-info">
    <div class="info-title">{{ goodsInfo.title }}</div>
    <div class="info-price">
      <span class="new-price">{{ goodsInfo.newPrice }}</span>
      <span class="old-price">{{ goodsInfo.oldPrice }}</span>
      <span v-if="goodsInfo.discount" class="discount">{{ goodsInfo.discount }}</span>
    </div>
    <div class="info-other">
      <span>{{ goodsInfo.columns[0] }}</span>
      <span>{{ goodsInfo.columns[1] }}</span>
      <span>{{ goodsInfo.services[goodsInfo.services.length - 1].name}}</span>
    </div>
    <div class="info-service">
      <span class="info-service-item" v-for="index in goodsInfo.services.length - 1" :key="index">
        <img :src="goodsInfo.services[index - 1].icon" alt="">
        <span>{{ goodsInfo.services[index - 1].name }}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailBaseInfo',
  props: {
    goodsInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
  .base-info {
    margin-top: 15px;
    padding: 0 8px;
    color: #999;
    border-bottom: 5px solid #f2f5f8;
  }
  .info-title {
    color: #222;
  }
  .info-price {
    margin-top: 10px;
  }
  .info-price .new-price {
    font-size: 24px;
    color: var(--color-high-text);
  }
  .info-price .old-price {
    font-size: 13px;
    margin-left: 5px;
    text-decoration: line-through;
  }
  .info-price .discount {
    font-size: 12px;
    padding: 2px 5px;
    color: #fff;
    background-color: var(--color-high-text);
    border-radius: 8px;
    margin-left: 5px;
    
    /* 使元素上浮一点，用相对定位就可以 */
    position: relative;
    top: -8px;
  }
  .info-other {
    margin-top: 15px;
    line-height: 30px;
    display: flex;
    font-size: 13px;
    border-bottom: 1px solid rgba(100,100,100,0.1);
    justify-content: space-between;
  }
  .info-service {
    display: flex;
    justify-content: space-between;
    line-height: 60px;
  }
  .info-service-item img {
    width: 14px;
    height: 14px;
    position: relative;
    top: 2px;
  }
  .info-service-item span {
    font-size: 13px;
    color: #333;
  }
  .shop-bottom {
    text-align: center;
    margin-top: 10px;
  }
  .enter-shop {
    display: inline-block;
    font-size: 14px;
    background-color: #f2f5f8;
    width: 150px;
    height: 30px;
    line-height: 30px;
    border-radius: 10px;
  }
</style>