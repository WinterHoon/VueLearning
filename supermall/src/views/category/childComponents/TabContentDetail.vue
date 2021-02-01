
<template>
  <grid-view :lineSpace="15" :v-margin="20" v-if="categoryDetail">
    <goods-item v-for="(item, index) in categoryDetail" :key="index" :goods-item="item"></goods-item>
  </grid-view>
</template>

<script>
  import GridView from 'components/common/gridview/GridView'
  import GoodsItem from 'components/content/goods/GoodsItem'
  export default {
    name: "TabContentDetail",
    components: {
      GridView,
      GoodsItem
    },
    props: {
      categoryDetail: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
</style>