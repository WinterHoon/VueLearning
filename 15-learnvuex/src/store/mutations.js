import { INCREMENT } from './mutations-types';
import Vue from 'vue'
export default {
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
}