<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from '@better-scroll/core'
  import Pullup from '@better-scroll/pull-up'
  export default {
    name: 'Scroll',
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        bsScroll: null
      }
    },
    methods: {
      scrollTo(x, y, ms = 300) {
        this.bsScroll && this.bsScroll.scrollTo(x, y, ms);
      },
      finishPullUp() {
        this.bsScroll && this.bsScroll.finishPullUp();
      },
      refresh() {
        // console.log('我是refresh');
        this.bsScroll && this.bsScroll.refresh();
      },
      getScrollY() {
        return this.bsScroll ? this.bsScroll.y : 0;
      }
    },
    mounted() {
      //创建BScroll对象
      BScroll.use(Pullup);
      this.bsScroll = new BScroll(this.$refs.wrapper, {
         click: true,
         probeType: this.probeType,
         pullUpLoad: this.pullUpLoad
      })
      // console.log(this.bsScroll);
      //监听滚动的位置
      if (this.probeType === 2 || this.probeType === 3) {
        this.bsScroll.on('scroll', position => {
          this.$emit('scroll', position);
        })
      }

      //监听滚动到底部
      if (this.pullUpLoad) {
        this.bsScroll.on('pullingUp',() => {
          this.$emit('pullingUp');
        })
      }
    }
  }
</script>

<style>

</style>