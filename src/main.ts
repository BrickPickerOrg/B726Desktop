/** @format */

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { LoadingDirective } from './plugins/directive';
import './assets/styles/theme/font.scss';

const app = createApp(App);

app.directive('m-loading', LoadingDirective);

app
  .use(store)
  .use(router)
  .mount('#app');
