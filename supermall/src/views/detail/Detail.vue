<template>
  <div id="detail">
    <detail-nav-bar @titleClick="titleClick" ref="detailNav"/>
    <scroll class="scroll-wrapper" ref="scroll" :probe-type="3" @scroll="contentScroll" >
      <detail-swiper :top-images="topImages" @swiperImageLoad="swiperImageLoad"/>
      <detail-base-info :goods-info="goodsInfo"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo" ref="params"/>
      <detail-comment-info :comment-info="commentInfo" ref="comments"/>
      <goods-list :goods="recommends" ref="recommends"/>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"/>
    <back-top @click.native="backTopClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import DetailNavBar from './childComponents/DetailNavBar.vue';
import DetailSwiper from './childComponents/DetailSwiper.vue';
import DetailBaseInfo from './childComponents/DetailBaseInfo.vue';
import DetailShopInfo from './childComponents/DetailShopInfo.vue';
import Scroll from '../../components/common/scroll/Scroll.vue';
import DetailGoodsInfo from './childComponents/DetailGoodsInfo.vue';
import DetailParamInfo from './childComponents/DetailParamInfo.vue';
import DetailCommentInfo from './childComponents/DetailCommentInfo.vue';
import DetailBottomBar from './childComponents/DetailBottomBar.vue';
import GoodsList from '../../components/content/goods/GoodsList.vue';

import { getDetail, GoodsInfo, Shop, GoodsParam, getRecommends } from 'network/detail';
import { debounce } from 'common/utils';
import { itemListenerMixin, backTopMixin } from 'common/mixin'

import { mapActions } from 'vuex'

export default {
  components: { 
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar
  },
  name: "Detail",
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goodsInfo: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [0, 1000, 2000, 3000],
      scrollIndex: 0,
    }
  },
  methods: {
    ...mapActions(['addCart']),
    swiperImageLoad() {
      this.$refs.scroll.refresh();
    },
    imageLoad() {
      this.$refs.scroll.refresh();
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comments.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);
      // console.log(this.$refs.params.$el.offsetParent);
      // console.log(this.themeTopYs);
    },
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index]);
    },
    contentScroll(position) {
      // console.log(-position.y);
      let y = -position.y;
      const border1 = this.themeTopYs[0];
      const border2 = this.themeTopYs[1];
      const border3 = this.themeTopYs[2];
      const border4 = this.themeTopYs[3];
      if (y >= border1 && y < border2) {
        this.scrollIndex = 0;
      } else if (y >= border2 && y < border3) {
        this.scrollIndex = 1;
      } else if (y >= border3 && y < border4) {
        this.scrollIndex = 2;
      } else {
        this.scrollIndex = 3;
      }
      this.$refs.detailNav.currentIndex = this.scrollIndex;

      //2.判断backTop是否显示
      this.isShowBackTop = y > 1000;
    },
    addToCart() {
      //1.获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goodsInfo.title;
      product.desc = this.goodsInfo.desc;
      product.price = this.goodsInfo.realPrice;
      product.iid = this.iid;

      //2.将商品添加到购物车里
      this.addCart(product).then(res => {
        this.$toast.show(res);
      });
    }
  },
  created() {
    //1.保存传入的iid
    this.iid = this.$route.params.iid;

    //2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // console.log(res);
      const data = res.result;
      // 1.获取顶部轮播图数据
      this.topImages = data.itemInfo.topImages;

      // 2.获取当前商品信息
      this.goodsInfo = new GoodsInfo(data.itemInfo, data.columns, data.shopInfo.services);

      // 3.获取当前店铺信息
      this.shop = new Shop(data.shopInfo);

      // 4.保存商品的详情数据
      this.detailInfo = data.detailInfo;

      // 5.获取参数的信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

      // 6.获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }

      this.$nextTick(() => {

      })
    })

    // 3.请求推荐数据
    getRecommends().then(res => {
      this.recommends = res.data.list;
    })
    
  },
  updated() {

  },
  mounted() {

  },
  activated() {
    console.log('activated');
  },
  deactivated() {
    console.log('deactivated');
  },
  destroyed() {
    this.$bus.$off('itemImageLoad', this.itemImgListener);
  }
}
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .scroll-wrapper {
    /* height: calc(100% - 44px); */

    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>