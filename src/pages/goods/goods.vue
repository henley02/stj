<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex==index}"
              @click="selectMenu(index)">
          <span class="text border-1px"><span v-show="item.type>0" class="icon"
                                              :class="classMap[item.type]"></span>{{item.name}}</span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li v-for="item in goods" class="food-list foot-list-hook">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li @click="changeFood(food,$event)" v-for="food in item.foods" class="food-item border-1px">
                <div class="icon">
                  <img width="57px" height="57px" :src="food.icon"/>
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                  </div>
                  <food-price :food="food"></food-price>
                  <div class="cart-control-wrapper">
                    <cart-control :food="food" @add="addFood"></cart-control>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shop-cart ref="shopcart" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"
                 :selectFood="selectFood"></shop-cart>
    </div>
    <foot-detail :food="selectedFood" :visible.sync="isShowFootDetail"  @add="addFood"></foot-detail>
  </div>
</template>
<script type="text/ecmascript-6">
  import shopCart from './../../components/shopCart/shopCart.vue';
  import CartControl from './../../components/cartControl/cartControl.vue';
  import footDetail from './../../components/footDetail/footDetail.vue';
  import FoodPrice from './../../components/foodPrice/foodPrice.vue';
  import BScroll from 'better-scroll';

  export default {
    name: 'goods',
    components: {
      shopCart,
      CartControl,
      footDetail,
      FoodPrice
    },
    props: {
      seller: {type: Object}
    },
    data() {
      return {
        goods: [],
        classMap: ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
        listHeight: [],
        scrollY: 0,
        selectedFood: {},
        isShowFootDetail: false
      };
    },
    computed: {
      /**
       *当前滚动的索引
       */
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      },
      /**
       * 选中的列表
       */
      selectFood() {
        let foods = [];
        this.goods.map(good => {
          good.foods.map(food => {
            if (food.count > 0) {
              foods.push(food);
            }
          });
        });
        return foods;
      }
    },
    methods: {
      changeFood(food, event) {
        this.selectedFood = food;
        this.isShowFootDetail = true;
      },
      _drop(target) {
        /**
         * 体验优化,异步执行下落动画
         */
        this.$nextTick(() => {
          this.$refs.shopcart.drop(target);
        });
      },
      addFood(target) {
        this._drop(target);
      },
      /**
       * 点击左侧菜单
       */
      selectMenu(index) {
        let footList = this.$refs.foodsWrapper.getElementsByClassName('foot-list-hook');
        let el = footList[index];
        this.foodScroll.scrollToElement(el, 300);
      },
      /**
       * 计算高度
       */
      _calculateHeight() {
        let footList = this.$refs.foodsWrapper.getElementsByClassName('foot-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < footList.length; i++) {
          let item = footList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      },
      /**
       * 滚动
       */
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        });
        this.foodScroll = new BScroll(this.$refs.foodsWrapper, {
          probeType: 3,
          click: true
        });
        this.foodScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      async init() {
        let res = await this.$http.get('/api/goods').then((response) => response.body);
        if (res.errno === 0) {
          this.goods = res.data;
          this.$nextTick(() => {
            this._initScroll();
            this._calculateHeight();
          });
        }
      }
    },
    created() {
      this.init();
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin"
  .goods
    display: flex
    position: absolute
    top: 174px
    bottom: 46px
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          width: 16px
          height: 16px
          vertical-align: top
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
          &.decrease
            bg-image('images/decrease_3')
          &.discount
            bg-image('images/discount_3')
          &.guarantee
            bg-image('images/guarantee_3')
          &.invoice
            bg-image('images/invoice_3')
          &.special
            bg-image('images/special_3')
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          font-size: 12px
          border-1px(rgba(7, 17, 27, 0.2))
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .cart-control-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
