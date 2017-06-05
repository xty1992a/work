<template>
  <div class="mask" @touchstart="cancel" @touchmove.stop>

    <transition name="bottom">
      <div class="bottom" @touchstart.stop>
        <slot name="timer"></slot>
        <slot name="express"></slot>
        <slot name="coupons"></slot>
        <slot name="address"></slot>
        <slot name="buynow"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'modal',
    data () {
      return {
        date: '2017-05-22'
      }
    },
    methods: {
      cancel () {
        console.log('cancel in modal')
        this.$emit('cancel')
      }
    },
    components: {
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .mask{
    background-color: rgba(0,0,0,.5);
    position: fixed;
    z-index: 10;
    bottom: 0;
    right: 0;
    left: 0;
    top: 0;
    .bottom{
      background-color: #fff;
      position: absolute;
      width: 100%;
      bottom: 0;
      left: 0;
    }
  }
</style>
