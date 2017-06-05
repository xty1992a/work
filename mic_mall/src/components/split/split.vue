<template>
  <div class="split" :style="{height: (splitH/58.6)+'rem', backgroundColor: splitC}"></div>
</template>

<script>
  export default {
    name: 'split',
    props: {
      splitH: {
        type: Number,
        default: 10
      },
      splitC: {
        type: String,
        default: '#f5f5f5'
      },
    },
    data () {
      return {
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
  @r: 58.6rem;
  .split{
    height: 10/@r;
    background-color: #f5f5f5;
  }
</style>
