<template>
  <div class="unpaid">
    <goods-card :unpaid="true" :indent-status="'待付款'"></goods-card>
  </div>
</template>

<script>
  import goodsCard from '../sub_components/indent_card/indent_card.vue'
  export default {
    name: 'unpaid',
    data () {
      return {
      }
    },
    components: {
      goodsCard
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
  @r: 58.6rem;
</style>
