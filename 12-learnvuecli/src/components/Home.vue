<template>
  <div>
    <h2>我是首页</h2>
    <p>我是首页内容，哈哈哈</p>
    <router-link to="/home/news">新闻</router-link>
    <router-link to="/home/message">消息</router-link>
      <router-view/>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      path: '/home/news'
    }
  },
  created() {
    console.log('home created');
  },
  destroyed() {
    console.log('home destoryed');
  },
  activated() {
    this.$router.push(this.path);
  },
  beforeRouteLeave(to,from,next) {
    this.path = this.$route.path;
    console.log(this.path);
    next();
  }
}
</script>

<style>

</style>