import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      redirect: 'goods'
    },
    {
      path: '/goods',
      name: 'Goods',
      component: function (resolve) {
        require(['./../pages/goods/goods.vue'], resolve);
      }
    },
    {
      path: '/ratings',
      name: 'Ratings',
      component: function (resolve) {
        require(['./../pages/ratings/ratings.vue'], resolve);
      }
    },
    {
      path: '/seller',
      name: 'Seller',
      component: function (resolve) {
        require(['./../pages/seller/seller.vue'], resolve);
      }
    }
  ]
});
