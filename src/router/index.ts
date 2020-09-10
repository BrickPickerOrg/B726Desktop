/** @format */

import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Index from '../pages/index.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/result',
    name: 'Result',
    component: () => import(/* webpackChunkName: "result" */ '../pages/result.vue')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
