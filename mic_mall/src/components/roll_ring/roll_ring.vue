<template>
  <div class="wrap" ref="wrap">
    <p>{{text}}</p>
  </div>
</template>

<script>
  export default {
    name: 'roll_ring',
    props: {
      repeat: {
        type: [Number,String],
        default: 3
      },
      itemType: {
        type: String,
        default: 'img'
      },
      text: String
    },
    data () {
      return {
        text: '朵彩秋衣秋裤男士多色薄款棉莱卡打底贴身套装DWP405 极光蓝 男士 XL/175'
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">

</style>
