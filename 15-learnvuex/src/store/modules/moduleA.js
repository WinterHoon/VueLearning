export default {
  state: {
    name: 'zhangsan'
  },
  mutations: {
    updateName(state,payload) {
      state.name = payload;
    }
  },
  actions: {
    aUpdateName(context) {
      setTimeout(() => {
        console.log(context);
        context.commit('updateName','wangwu')
      }, 1000);
    }
  },
  getters: {
    fullName(state) {
      return state.name + ' Hoon';
    },
    fullName2(state, getters) {
      return getters.fullName + ' 2222 ';
    },
    fullName3(state, getters, rootState) {
      return getters.fullName2 + rootState.counter;
    }
  }
}