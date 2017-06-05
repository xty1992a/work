<template>
  <div class="cartcontrol" touchstart.stop>
    <transition name="move">
      <div class="cart-decrease" v-show="food.count">
        <i class="inner iconfont icon-tianjia-xianxing" @touchstart.self.stop="updateItemCount(false, $event)"></i>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count">
      <i>{{food.count}}</i>
    </div>
    <div class="cart-add">
      <i class="iconfont icon-tianjia-tianchong" @touchstart.self.stop="updateItemCount(true, $event)"></i>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    props: ['food'],

    methods: {
      updateItemCount (isAdd, ev) {
        if (isAdd) {
          if (!this.food.count) {
            //给对象添加属性, 更新界面
            Vue.set(this.food, 'count', 1)
          } else {
            this.food.count++
          }

          // 触发小球动画
          let touch = ev.changedTouches[0]
          this.pub.$emit('drop', touch)
        } else {
          if (this.food.count) {
            this.food.count--
          }
        }
        //发消息
//        this.pub.$emit('cartitem_update', {isAdd, food})
      },
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @r: 37.5rem;
  .cartcontrol{
    font-size: 0;
    >div{
      display: inline-block;
      text-align: center;
      &.cart-count{
        width: 30/@r;
        i{
          font-size: 34px;
          color: #3a3a3a;
          font-weight: bold;
          vertical-align: bottom;
        }
      }
    }
    &:after{
      content: '';
      height: 24/@r;
      width: 1px;
      display: inline-block;
      vertical-align: middle;
    }
    .iconfont{
      color: #4080E8;
      font-size: 48px;
      line-height: 48px;
    }
    .move-enter-active, .move-leave-active{
      opacity: 1;
      transition: all .4s linear;
      transform: translate3d(0, 0, 0);
      .inner{
        transition: all .4s linear;
        transform: rotate(0);
      }
    }
    .move-enter, .move-leave-active{
      opacity: 0;
      transform: translate3d(30/@r, 0, 0);
      transition: all .4s linear;
      .inner{
        transition: all .4s linear;
        transform: rotate(180deg);
      }
    }
  }
</style>
