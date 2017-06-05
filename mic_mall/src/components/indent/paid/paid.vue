<template>
  <div class="paid">
    <goods-card :indent-status="'已付款'"></goods-card>
  </div>
</template>

<script>
  import goodsCard from '../sub_components/indent_card/indent_card.vue'
  export default {
    name: 'paid',
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
