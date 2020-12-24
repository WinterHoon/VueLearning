import { debounce } from './utils'
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

    console.log('我是mixin');
  }

}