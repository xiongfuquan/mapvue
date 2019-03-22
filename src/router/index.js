import Vue from 'vue';
import Router from 'vue-router';
import BaseDataTree from '@/components/leftmenu/BaseDataTree';
import Statistics from '@/components/leftmenu/Statistics';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/leftmenu/basedatatree',
      component: BaseDataTree,
    },
    {
      path: '/leftmenu/statistics',
      component: Statistics,
    },
  ],
});
