<template>
  <div id="app">
    <h2>我是APP组件</h2>
    <router-link to="/home" tag="button">首页</router-link>
    <router-link to="/about" tag="button">关于</router-link>
    <!-- <router-link :to="'/user/'+userId" tag="button">用户</router-link> -->
    <!-- <router-link :to="{path:'/profile', query: {name: 'Winter', age: 25, height: 1.75}}" tag="button">档案</router-link> -->
    <button @click="userClick">用户</button>
    <button @click="profileClick">档案</button>
    <h2>我是Hello World</h2>
    <keep-alive exclude="Profile,User">
      <router-view></router-view>
    </keep-alive>
    
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      userId: 'zhangsan'
    }
  },
  methods: {
    homeClick() {
      this.$router.push('/home')
    },
    aboutClick() {
      this.$router.push('/about')
    },
    userClick() {
      this.$router.push('/user/'+this.userId)
    },
    profileClick() {
      this.$router.push({
        path: '/profile',
        query: {
          name: 'Winter',
          age: 25,
          height: 1.75
        }
      })
    }
  }
}
</script>

<style>
  .active {
    color: #f00;
  }
</style>
