import { debounce } from './utils'
import BackTop from 'components/content/backtop/BackTop.vue'
import {BACK_POSITION} from 'common/const';
import {POP, SELL, NEW} from "common/const";

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    //监听item中图片加载完成
    const refresh = debounce(this.$refs.scroll.refresh, 50);
    this.itemImgListener = () =>  { refresh() };
    this.$bus.$on('itemImageLoad', this.itemImgListener);

    // console.log('我是mixin');
  }

}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backTopClick() {
      this.$refs.scroll.scrollTo(0,0,500);
    }
  }
}

export const tabControlMixin = {
  data() {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
      // console.log(this.currentType);
    }
  }
}