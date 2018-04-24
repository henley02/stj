<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item" v-for="(item,index) in tabList" :key="index">
        <router-link tag="a" :to="{path:`${item.path}`}" active-class="active">{{item.name}}</router-link>
      </div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from 'components/header/header.vue';

  export default {
    name: 'app',
    components: {
      'vHeader': header
    },
    data() {
      return {
        tabList: [
          {path: '/goods', name: '商品'},
          {path: '/ratings', name: '评论'},
          {path: '/seller', name: '商家'}
        ],
        seller: {}
      };
    },
    methods: {
      async init() {
        let res = await this.$http.get('/api/seller').then((response) => response.body);
        if (res.errno === 0) {
          this.seller = res.data;
          console.log(this.seller);
        }
      }
    },
    created() {
      this.init();
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl";
  #app
    .tab
      display: flex
      width: 100%
      height 40px
      line-height 40px
      /* border-bottom :1px solid rgba(7,17,17,0.1)*/
      border-1px(rgba(7, 17, 17, 0.1))
      .tab-item
        flex: 1
        text-align: center
        & > a
          font-size 14px;
          color: rgb(77, 85, 93)
          &.active
            color: rgb(240, 20, 20)
</style>
