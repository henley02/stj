<template>
  <div id="app">
    <v-header></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link tag="a" :to="{path:'/goods'}">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link tag="a" :to="{path:'/ratings'}">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link tag="a" :to="{path:'/seller'}">商家</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import header from 'components/header/header.vue';

  export default {
    name: 'app',
    components: {
      'vHeader': header
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    .tab
      display: flex
      width: 100%
      height 40px
      line-height 40px
      .tab-item
        flex: 1
        text-align: center
</style>
