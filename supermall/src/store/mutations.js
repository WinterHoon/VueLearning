  import {
    ADD_COUNTER,
    ADD_TO_CART
  } from './mutation-types'
  
  // 1.mutations的唯一目的就是修改state中的状态
  // 2.mutations中的每个方法尽可能完成的事情比较单一
  export default {
    [ADD_COUNTER](state, payload) {
      payload.count++;
    },
    [ADD_TO_CART](state, payload) {
      payload.checked = true;
      state.cartList.push(payload);
    }
  }