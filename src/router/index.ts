import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Index from '../pages/index.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/index', //首页广场
    name: 'Index',
    component: Index
  },
  {
    path: '/search', //搜索结果页
    name: 'Search',
    component: () => import('../pages/search/index.vue')
  },
  {
    path: '/top', //排行榜
    name: 'Top',
    component: () => import('../pages/top/index.vue')
  },
  {
    path: '/playlist', //精选歌单
    name: 'Playlist',
    component: () => import('../pages/playlist/index.vue')
  },
  {
    path: '/playlistDetail', //歌单详情
    name: 'PlaylistDetail',
    component: () => import('../pages/playlist/detail.vue')
  },
  {
    path: '/singer', //歌手详情
    name: 'Singer',
    component: () => import('../pages/singer/index.vue')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
