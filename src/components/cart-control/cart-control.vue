<template>
  <div class="cart-control">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click="decreaseCart()">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
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
      decreaseCart() {
        if (this.food.count) {
          this.food.count--;
        }
      },
      addCart() {
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
    .cart-decrease
      display: inline-block
      padding: 6px
      .inner
        line-height: 24px
        font-size: 24px
        color: rgb(0, 160, 220)
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
    .cart-add
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)

  .move-enter-active
    transition: all .4s linear;

  .move-transition
    opacity: 1
    transform: translate3D(0, 0, 0)

  .move-enter, .fade-leave-to
    opacity: 0
    transform: translate3D(24px, 0, 0)
</style>
