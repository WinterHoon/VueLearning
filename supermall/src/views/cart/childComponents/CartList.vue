<template>
  <div class="cart-list">
    <scroll class="scroll-wrapper" ref="scroll">
      <cart-list-item v-for="(item,index) in cartList" :key="index" :product="item"/>
    </scroll> 
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Scroll from 'components/common/scroll/Scroll'
import CartListItem from './CartListItem'
export default {
  name: 'CartList',
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters([
      'cartList'
    ])
  },
  activated() {
    this.$refs.scroll.refresh();
  }
}
</script>

<style scoped>
  .cart-list {
    height: calc(100% - 44px - 40px - 54PX); /*大写PX在浏览器中生效但不会被px2viewport转换*/
  }
  .scroll-wrapper {
    height: 100%;
    overflow: hidden;
  }
</style>