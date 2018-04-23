<template>
  <div class="cart-control">
    <div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0"></div>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click="addCart()"></div>
  </div>
</template>
<script type="text/ecmascript-6">
  /**
   * 购物车加减按钮
   */
  export default {
    name: 'CartControl',
    props: {
      food: {type: Object}
    },
    data() {
      return {};
    },
    methods: {
      addCart() {
        console.log(this.food.count);
        if (!this.food.count) {
          this.$set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
      }
    },
    created() {
    },
    mounted() {
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .cart-control
    font-size: 0
    .cart-decrease, .cart-add
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)
    .cart-count
      display: inline-block
</style>
