<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ cartLength }})</div>
    </nav-bar>
    <!-- 商品列表 -->
      <cart-list />
    <!-- 底部汇总 -->
    <cart-bottom-bar/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComponents/CartList.vue'
import CartBottomBar from './childComponents/CartBottomBar.vue'
export default {
  name: 'Cart',
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    ...mapGetters([
      'cartLength'
    ])
    // cartLength() {
    //   return this.$store.getters.cartLength;
    // }
  }
}
</script>

<style scoped>
  .cart {
    height: 100vh;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>