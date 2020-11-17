<template>
  <div id="app">
    <h2>-------APP中内容：modules中的内容-------</h2>
    <h2>{{ $store.state.a.name}}</h2>
    <button @click='updateName'>修改名字</button>
    <h2>{{ $store.getters.fullName}}</h2>
    <h2>{{ $store.getters.fullName2}}</h2>
    <h2>{{ $store.getters.fullName3}}</h2>
    <button @click="asyncUpdateName">异步修改名字</button>
    <h2>-------APP中内容：info对象的内容是否为响应式-------</h2>
    <h2>{{ $store.state.info }}</h2>
    <button @click="updateInfo">修改信息</button>

    <h2>-------APP中内容-------</h2>
    <h2>{{ message }}</h2>
    <h2>{{ $store.state.counter }}</h2>
    <button @click="add">+</button>
    <button @click="minus">-</button>
    <button @click="addCount(5)">+5</button>
    <button @click="addCount(10)">+10</button>
    <button @click="addStudent">添加学生</button>
    
    <h2>------APP内容：getters相关信息-------</h2>
    <h2>{{ $store.getters.powerCounter }}</h2>
    <h2>{{ $store.getters.more20stu }}</h2>
    <h2>{{ $store.getters.more20stuLength }}</h2>
    <h2>{{ $store.getters.moreAgeStu(12) }}</h2>
    <hello-vuex></hello-vuex>
  </div>
</template>

<script>
import HelloVuex from './components/HelloVuex.vue'
import { INCREMENT } from './store/mutations-types'

export default {
  name: 'App',
  data() {
    return {
      message: '我是app组件'
    }
  },
  methods: {
    add() {
      this.$store.commit(INCREMENT);
    },
    minus() {
      this.$store.commit('decrement');
    },
    addCount(count) {
      // 普通的提交封装
      // this.$store.commit('incrementCount',count);

      // 特殊的提交封装
      this.$store.commit({
        type: 'incrementCount',
        count
      })
    },
    addStudent() {
      const stu = {id: 114, name: 'andy', age: 35};
      this.$store.commit('addStudent',stu);
    },
    updateInfo() {
      // 使用mutations的方式
      // this.$store.commit('updateInfo');

      //使用actions的方式
      this.$store.dispatch('aUpdateInfo','我是payload').then((res) => {
        console.log('异步操作已完成',res);
      });
    },

    updateName() {
      this.$store.commit('updateName','lisi');
    },
    asyncUpdateName() {
      this.$store.dispatch('aUpdateName');
    }
  },
  components: {
    HelloVuex
  }
}
</script>

<style>

</style>
