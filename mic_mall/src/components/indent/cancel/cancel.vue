<template>
  <div class="topay">
    <goods-card :is-cancel="true" :indent-status="'已取消'"></goods-card>
  </div>
</template>

<script>
  import goodsCard from '../sub_components/indent_card/indent_card.vue'
  export default {
    name: 'cancel',
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
