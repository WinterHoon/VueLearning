import Vue from 'vue'
import Vuex from 'vuex'
import { INCREMENT } from './mutations-types'
Vue.use(Vuex)

const moduleA = {
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
export default new Vuex.Store({
  state: {
    counter: 1000,
    students: [
      {id: 110, name: 'why', age: 18},
      {id: 111, name: 'kobe', age: 24},
      {id: 112, name: 'james', age: 30},
      {id: 113, name: 'curry', age: 10}
    ],
    info: {id: 111, name: 'kobe', age: 24}
  },
  getters: {
    powerCounter(state) {
      return state.counter * state.counter;
    },
    more20stu(state) {
      return state.students.filter( s => s.age > 20);
    },
    more20stuLength(state,getters) {
      return getters.more20stu.length;
    },
    moreAgeStu(state) {
      return age => {
        return state.students.filter(s => s.age > age);
      }
    }
  },
  mutations: {
    [INCREMENT](state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    incrementCount(state,payload) {
      state.counter+=payload.count;
    },
    addStudent(state,stu) {
      state.students.push(stu);
    },
    updateInfo(state) {
      // state.info.message = 'winter';
      // delete state.info.age;
      //用这两种方法，不能实现响应式，所以是用下面的Vue.set和Vue.delete方法吧
      

      //cli2中是要通过这种方式实现响应式的
      Vue.set(state.info, 'message', 'Hoon');
      // Vue.delete(state.info, 'age');

      //异步的情况
      // setTimeout(() => {
      //   Vue.set(state.info, 'message', 'Hoon');
      // }, 1000);
      //dom上更新了，devtools却没更新，因为没跟踪到异步操作，
      //所以mutations里的方法不要写异步操作，容易跟踪不到,如果
      //vuex中实在要实现异步操作，要用vuex-actions
    }
  },
  actions: {
    //context上下文，在这里就是指store
    aUpdateInfo(context,payload) {
      // setTimeout(() => {
      //   context.commit('updateInfo');
      //   console.log(payload);
      // }, 1000);
      return new Promise(resolve => {
        setTimeout(() => {
          context.commit('updateInfo');
          console.log(payload);
          resolve('1111111');
        }, 1000);
      })
    }
  },
  modules: {
    a: moduleA
  }
})
