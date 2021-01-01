<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control class="tab-control" :titles="['流行','新款','精选']" 
    @tabClick="tabClick" ref="tabControl1" v-show="isTabFixed"/>
    <scroll class="scroll-wrapper" 
            ref="scroll" 
            :probe-type="3" 
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <feature-view/>
      <tab-control 
      :titles="['流行','新款','精选']" 
      @tabClick="tabClick"
      ref="tabControl2"/>
      <goods-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backTopClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl.vue'
import Scroll from 'components/common/scroll/Scroll.vue'

import { getHomeMultidata, getHomeGoodsData } from 'network/home'

import GoodsList from 'components/content/goods/GoodsList.vue'
import HomeSwiper from './childComponents/HomeSwiper'
import HomeRecommendView from './childComponents/HomeRecommendView.vue'
import FeatureView from './childComponents/FeatureView.vue'

import { debounce } from 'common/utils'
import { itemListenerMixin, backTopMixin} from 'common/mixin'

export default {
  name: 'Home',
  components: {
    NavBar,
    TabControl,
    Scroll,
    HomeSwiper,
    HomeRecommendView,
    FeatureView,
    GoodsList,

  },
  mixins: [itemListenerMixin, backTopMixin],
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
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
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
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    contentScroll(position) {
      //1.判断backTop是否显示
      this.isShowBackTop = -position.y > 1000;

      //2.决定tabControl是否吸顶
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    loadMore() {
      // console.log('加载更多');
      this.getHomeGoodsData(this.currentType);
    },
    swiperImageLoad() {
      //获取tabControl的offsetTop
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
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
        //完成上拉加载更多
        this.$refs.scroll.finishPullUp();
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

    // //监听item中图片加载完成
    // this.$bus.$on('itemImageLoad', () => {
    //   this.$refs.scroll && this.$refs.scroll.refresh();
    // })
  },
  mounted() {
  },
  destroyed() {
    console.log('home destroyed');
  },
  activated() {
    this.$refs.scroll.scrollTo(0,this.saveY,0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    //保存滚动到的Y值
    this.saveY = this.$refs.scroll.getScrollY();

    //取消全局事件的监听
    this.$bus.$off('itemImgLoad', this.itemImgListener);
  }
}
</script>

<style scoped>
  #home {
    /* padding-top: 44px; */
    position: relative;
    height: 100vh;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }

  .tab-control {
    position: relative;
    z-index: 9px;
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