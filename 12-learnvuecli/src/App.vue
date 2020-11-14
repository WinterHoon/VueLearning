<template>
  <div id="app">
    <h2>我是APP组件</h2>
    <!-- <router-link to="/home" tag="button" replace>首页</router-link> -->
    <!-- <router-link to="/about" tag="button" replace>关于</router-link> -->
    <button @click="homeClick">首页</button>
    <button @click="aboutClick">关于</button>
    <h2>我是Hello World</h2>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    homeClick() {
      this.$router.push('/home')
    },
    aboutClick() {
      this.$router.push('/about')
    }
  }
}
</script>

<style>
  .active {
    color: #f00;
  }
</style>
