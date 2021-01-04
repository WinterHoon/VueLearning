<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.link) !== -1;
    },
    activeStyle() {
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  props: {
    link: String,
    activeColor: {
      type: String,
      default: '#d81e06'
    }
  },
  methods: {
    itemClick() {
      this.$router.push(this.link).catch(err => {})
    }
  }
}
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
  .tab-bar-item img {
    width: 24px;
    height: 24px;
  }
</style>