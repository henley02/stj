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
    }
  ]
});
