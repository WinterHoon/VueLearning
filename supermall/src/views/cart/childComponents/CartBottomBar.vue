<template>
  <div class="bottom-bar">
    <div class="check-area">
      <check-button 
      :is-checked="isSelectAll" 
      class="check-button"
      @click.native="selectAllClick"/>
      <span>全选</span>
    </div>
    <div class="price">合计：{{ totalPrice }}</div>
    <div class="calculate" @click="calcClick"> 去计算({{ checkedLength }})</div>
  </div>
</template>

<script>
import CheckButton from "../../../components/content/checkButton/CheckButton.vue"
import { mapGetters } from 'vuex'
export default {
  components: { CheckButton },
  name: "CartBottomBar",
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return '￥' + this.cartList.filter( item => item.checked).reduce((prev, item) => {
        return prev + item.price * item.count;
      }, 0).toFixed(2);
    },
    checkedLength() {
      return this.cartList.filter( item => item.checked ).length;
    },
    isSelectAll() {
      // 方法一：非零数字取反是false
      // if (this.cartList.length === 0) return false;
      // return !(this.cartList.filter( item => !item.checked).length);
      
      // 方法二：非空对象取反为false
      if (this.cartList.length === 0) return false;
      return !this.cartList.find( item => !item.checked);
    }
  },
  methods: {
    selectAllClick() {
      if (this.isSelectAll) {
        this.cartList.forEach(item => item.checked = false);
      } else {
        this.cartList.forEach(item => item.checked = true);
      }
    },
    calcClick() {
      if (this.checkedLength === 0) {
        this.$toast.show('请选择购买的商品');
      }
    }
  }
}
</script>

<style scoped>
  .bottom-bar {
    background-color: #eee;
    display: flex;
    height: 40px;
    font-size: 14px;
    text-align: center;
    line-height: 40px;
  }
  .check-area {
    margin-left: 10px;
    display: flex;
    align-items: center;
    /* justify-content: center; */
    width: 70 px;

  }
  .price {
    flex: 1;
  }
  .calculate {
    width: 100px;
    background-color: orangered;
    color: #fff;
  }
  .check-button {
    margin-right: 5px;
    height: 20px;
    width: 20px;
    line-height: 20px;
  }
</style>