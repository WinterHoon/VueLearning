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
        this.bsScroll.scrollTo(x, y, ms);
      },
      finishPullUp() {
        this.bsScroll.finishPullUp();
      }
    },
    mounted() {
      BScroll.use(Pullup);
      this.bsScroll = new BScroll(this.$refs.wrapper, {
         click: true,
         probeType: this.probeType,
         pullUpLoad: this.pullUpLoad
      })
      this.bsScroll.on('scroll', position => {
        this.$emit('scroll', position);
      })
      this.bsScroll.on('pullingUp',() => {
        this.$emit('pullingUp');
      })
    }
  }
</script>

<style>

</style>