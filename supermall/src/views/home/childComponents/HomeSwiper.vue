<!-- 用最新的swiper不知道为什么总是出错，
结合着https://github.com/surmon-china/vue-awesome-swiper/tree/v3.1.3
和https://cnblogs.com/wangyihong/p/13393469.html才实现成功 -->

<!-- The ref attr used to find the swiper instance -->
<template>
  <swiper :options="swiperOption" ref="mySwiper">
    <!-- slides -->
    <swiper-slide v-for="(item,index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" width="100%" @load="imageLoad">
      </a>
    </swiper-slide>
    <!-- Optional controls -->
    <div class="swiper-pagination"  slot="pagination"></div>
  </swiper>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'HomeSwiper',
  components: {
    swiper,
    swiperSlide
  },
  props: {
    banners: Array
  },
  data() {
    return {
      swiperOption: {
        loop: true,
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        // 显示分页
        pagination: {
          el: ".swiper-pagination",
          clickable: true //允许分页点击跳转
        },
        // 设置点击箭头
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
          hideOnClick: true
        }
      },
      imageIsLoad: false
    }
  },
  // computed: {
  //   swiper() {
  //     return this.$refs.mySwiper.swiper
  //   }
  // },
  methods: {
    imageLoad() {
      if (!this.imageIsLoad) {
        this.$emit('swiperImageLoad');
        this.imageIsLoad = true;
      }
    }
  },
  mounted() {
    // current swiper instance
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    // console.log('this is current swiper instance object', this.swiper)
    // this.swiper.slideTo(3, 1000, false)
  }
}
</script>
  
<style scoped>
</style>