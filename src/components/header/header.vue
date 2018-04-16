<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" width="64" height="64">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div class="support" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
    </div>
    <div class="bulletin-wrapper"></div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'Header',
    props: {
      seller: {type: Object}
    },
    data () {
      return {
        classMap: ['decrease', 'discount', 'guarantee', 'invoice', 'special']
      };
    },
    methods: {},
    created () {
    },
    mounted () {
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin";

  .header
    color: #fff
    background-color: #000
    .content-wrapper
      padding: 20px 12px 18px 24px
      font-size: 0
      .avatar
        display: inline-block
        vertical-align: top
        img
          border-radius: 2px
      .content
        display: inline-block
        margin-left: 16px
        font-size: 14px
        .title
          margin: 2px 0px 8px 0
          .brand
            display: inline-block
            vertical-align: top
            width: 30px
            height: 18px
            bg-image('images/brand')
            background-size: 30px 18px
            background-repeat no-repeat
          .name
            margin-left: 6px
            font-size: 16px
            line-height 18px
            font-weight bold
        .description
          margin-bottom: 10px
          line-height: 12px
          font-size: 12px
        .support
          .icon
            display: inline-block
            vertical-align: top
            width: 12px
            height: 12px
            margin-right: 4px
            background-size: 12px 12px
            background-repeat: no-repeat
            &.decrease
              bg-image('images/decrease_1')
            &.discount
              bg-image('images/discount_1')
            &.guarantee
              bg-image('images/guarantee_1')
            &.invoice
              bg-image('images/invoice_1')
            &.special
              bg-image('images/special_1')
          .text
            line-height: 12px
            font-size: 10px
</style>
