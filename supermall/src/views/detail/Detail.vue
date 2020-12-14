<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <scroll class="scroll-wrapper" ref="scroll">
      <detail-swiper :top-images="topImages" @swiperImageLoad="swiperImageLoad"/>
      <detail-base-info :goods-info="goodsInfo"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo"/>
      <detail-comment-info :comment-info="commentInfo"/>
      <goods-list :goods="recommends" />
    </scroll>
  </div>
</template>

<script>
import { getDetail, GoodsInfo, Shop, GoodsParam, getRecommends } from 'network/detail';
import DetailNavBar from './childComponents/DetailNavBar.vue';
import DetailSwiper from './childComponents/DetailSwiper.vue';
import DetailBaseInfo from './childComponents/DetailBaseInfo.vue';
import DetailShopInfo from './childComponents/DetailShopInfo.vue';
import Scroll from '../../components/common/scroll/Scroll.vue';
import DetailGoodsInfo from './childComponents/DetailGoodsInfo.vue';
import DetailParamInfo from './childComponents/DetailParamInfo.vue';
import DetailCommentInfo from './childComponents/DetailCommentInfo.vue';
import GoodsList from '../../components/content/goods/GoodsList.vue';


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
    GoodsList 
  },
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goodsInfo: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: []
    }
  },
  methods: {
    swiperImageLoad() {
      this.$refs.scroll.refresh();
    },
    imageLoad() {
      this.$refs.scroll.refresh();
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
    })

    // 3.请求推荐数据
    getRecommends().then(res => {
      this.recommends = res.data.list;
    })
  },
  activated() {
    console.log('activated');
  },
  deactivated() {
    console.log('deactivated');
  },
  destroyed() {
    console.log('destroyed');
  }
}
</script>

<style>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .scroll-wrapper {
    height: calc(100% - 44px);

    overflow: hidden;
    /* position: absolute;
    top: 44px;
    bottom: 0;
    left: 0;
    right: 0; */
  }
</style>