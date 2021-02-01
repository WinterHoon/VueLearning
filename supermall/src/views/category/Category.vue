<template>
  <div class="category">
    <nav-bar class="nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <div class="content">
        <tab-menu :categories="categories" @selectItem="selectItem"></tab-menu>
        <scroll class="tab-content" ref="scroll">
          <div>
            <tab-content-category :subcategories="categoriesProduct"></tab-content-category>
            <tab-control :titles="['综合','新品','销量']" @tabClick="tabClick"></tab-control>
            <tab-content-detail :category-detail="showCategoryDetail"></tab-content-detail>
          </div>
        </scroll>
    </div>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll';
import TabControl from 'components/content/tabControl/TabControl';

import TabMenu from './childComponents/TabMenu'
import TabContentCategory from './childComponents/TabContentCategory';
import TabContentDetail from './childComponents/TabContentDetail';

import {getCategory, getSubcategory, getCategoryDetail } from 'network/category';
import { POP, SELL, NEW } from "common/const";
import { itemListenerMixin,tabControlMixin } from "common/mixin";



export default {
  components: { NavBar, TabMenu, Scroll, TabContentCategory, TabControl, TabContentDetail },
  name: 'Category',
  data() {
    return {
      scroll: null,
      categories: [],
      categoriesProduct: [],
      categoryData: {},
      currentIndex: -1
    }
  },
  mixins: [itemListenerMixin, tabControlMixin],
  computed: {
    showSubcategories() {
      if (this.currentIndex === -1) return {};
      return this.categoryData[this.currentIndex].subcategories;
    },
    showCategoryDetail() {
		  if (this.currentIndex === -1) return []
		  return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
      }
  },
  methods: {
    _getCategory() {
      getCategory().then(res => {
        // 1.获取分类数据
        this.categories = res.data.category.list;
        // 2.初始化每个类别的子数据
        for (let i=0; i<this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              'pop': [],
              'new': [],
              'sell': []
            }
          }
        }
        // 3.请求第一个分类的数据
        this._getSubcategories(0);
      })
    },
    _getSubcategories(index) {
      this.currentIndex = index;
      const maitKey = this.categories[index].maitKey;
      getSubcategory(maitKey).then( res => {
        this.categoriesProduct = res.data.list;
        this.categoryData[index].subcategories =res.data;
        this.categoryData = {...this.categoryData};
        this._getCategoryDetail(POP);
        this._getCategoryDetail(SELL);
        this._getCategoryDetail(NEW);
      })
    },
    _getCategoryDetail(type) {
      // 1.获取请求的miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;
      // 2.发送请求,传入miniWallkey和type
      getCategoryDetail(miniWallkey, type).then( res => {
        // 3.将获取的数据保存下来
        this.categoryData[this.currentIndex].categoryDetail[type] = res;
        this.categoryData = { ...this.categoryData };
      })
    },
    selectItem(index) {
      this._getSubcategories(index);
    }
  },
  created() {
    //1.请求分类数据
    this._getCategory();
  },
  destroyed() {
    this.$bus.$off('itemImageLoad',this.itemImgListener);
  }
}
</script>

<style scoped>
  .category {
    height: 100vh;
  }
  .nav-bar {
    background-color: var(--color-tint);
    /* font-weight: 700; */
    color: #fff;
  }
  .content {
    overflow: hidden;
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 54px;

    display: flex;
  }
  .tab-content {
    height: 100%;
    flex: 1;
  }
</style>