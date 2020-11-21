<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll class="scroll-wrapper" 
            ref="scroll" 
            :probe-type="3" 
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners"></home-swiper>
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <feature-view/>
      <tab-control class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick"/>
      <goods-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backTopClick" v-show="showBackTop"/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabControl from '../../components/content/tabControl/TabControl.vue'
import Scroll from 'components/common/scroll/Scroll.vue'
import BackTop from '../../components/content/backtop/BackTop.vue'

import { getHomeMultidata, getHomeGoodsData } from 'network/home'

import GoodsList from 'components/content/goods/GoodsList.vue'
import HomeSwiper from './childCoponents/HomeSwiper'
import HomeRecommendView from './childCoponents/HomeRecommendView.vue'
import FeatureView from './childCoponents/FeatureView.vue'



export default {
  name: 'Home',
  components: {
    NavBar,
    TabControl,
    Scroll,
    BackTop,
    HomeSwiper,
    HomeRecommendView,
    FeatureView,
    GoodsList,

  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',
      showBackTop: false
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  methods: {
    // 事件监听相关的方法
    tabClick(index) {
      if (index === 0) {
        this.currentType = 'pop';
      } else if (index === 1) {
        this.currentType = 'new';
      } else if (index === 2) {
        this.currentType = 'sell';
      }
    },
    backTopClick() {
      console.log('backtop');
      this.$refs.scroll.scrollTo(0,0,500);
    },
    contentScroll(position) {
      this.showBackTop = -position.y > 1000;
    },
    loadMore() {
      console.log('加载更多');
      this.getHomeGoodsData(this.currentType);
    },

    // 网络请求相关的方法
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoodsData(type) {
      const goods = this.goods[type];
      goods.page += 1;
      getHomeGoodsData(type, goods.page).then(res => {
        goods.list.push(...res.data.list);
        this.$refs.scroll.finishPullUp();
        this.$refs.scroll.bsScroll.refresh();
      })
    }
  },
  created() {
    //请求轮播图等数据
    this.getHomeMultidata();

    //请求商品数据
    this.getHomeGoodsData('pop');
    this.getHomeGoodsData('new');
    this.getHomeGoodsData('sell');
  }
}
</script>

<style>
  #home {
    padding-top: 44px;
    position: relative;
    height: 100vh;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .tab-control {
    position: sticky;
    top: 44px;
  }
  .scroll-wrapper {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 54px;
    left: 0;
    right: 0;
  }
    /* .scroll-wrapper {
      height: calc(100vh - 44px - 54px);
      overflow: hidden;
    } */
</style>