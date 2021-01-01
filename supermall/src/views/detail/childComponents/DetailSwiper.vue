<template>
  <swiper :options="swiperOption" class="detail-swiper">
    <swiper-slide v-for="(item, index) in topImages" :key="index">
      <img :src="item" width="100%" @load="imageLoad" alt="">
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'DetailSwiper',
  components: {
    swiper,
    swiperSlide
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      swiperOption: {
        loop: true,
        autoplay: {
          delay: 2000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        // 显示分页
        pagination: {
          el: ".swiper-pagination",
          clickable: true //允许分页点击跳转
        },
        // 设置点击箭头
        // navigation: {
        //   nextEl: ".swiper-button-next",
        //   prevEl: ".swiper-button-prev",
        //   hideOnClick: true
        // }
      },
      imageIsLoad: false
    }
  },
  methods: {
    imageLoad() {
      if (!this.imageIsLoad) {
        this.$emit('swiperImageLoad');
        this.imageIsLoad = true;
      }
    }
  }
}
</script>

<style scoped>
  .detail-swiper {
    height: 300px;
    overflow: hidden;
  }
</style>