<template>
  <div class="category">
  </div>
</template>

<script>
  import split from '../split/split.vue'
  import dateTime from '../date_time/date_time1.0.vue'
  import modal from '../modal/modal.vue'
  export default {
    name: 'category',
    data () {
      return {
        address: '',
        dateShow: false,
        addressShow: false,
        date: '2017-05-22'
      }
    },
    methods: {
      selected (date) {
        this.dateShow = false
        this.date = date
        console.log('get msg ', date)
      },
      selectAddress () {
        this.addressShow = true
      },
      selectDate () {
        this.dateShow = true
      },
      hideModal () {
        this.dateShow = false
      }
    },
    components: {
      dateTime,
      modal,
      split
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @r: 58.6rem;
  .category{
  }
</style>
