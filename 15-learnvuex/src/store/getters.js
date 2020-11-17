export default {
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
}