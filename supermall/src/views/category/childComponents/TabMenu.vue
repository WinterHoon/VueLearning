<template>
  <scroll id="tab-menu" ref="scroll">
    <div class="menu-list">
      <div class="menu-list-item"
      :class="{active: index === currentIndex }"
      @click="itemClick(index)"
      v-for="(item,index) in categories" :key="index">
        {{ item.title }}
      </div>
    </div>
  </scroll>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
export default {
  components: { Scroll },
  name: "TabMenu",
  props: {
    categories: Array
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit('selectItem', index);
    }
  },
  updated() {
    this.$refs.scroll.refresh();
  }
}
</script>

<style scoped>
  #tab-menu {
    background-color: #f6f6f6;
    height: 100%;
    width: 20%;
    box-sizing: border-box;
  }

  .menu-list-item {
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 14px;
  }
  .menu-list-item.active {
    background-color: #fff;
    color: var(--color-high-text);
    font-weight: 700;
    border-left: 3px solid var(--color-high-text);
  }
</style>