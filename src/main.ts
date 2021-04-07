import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import components from './components/components'
import { LoadingDirective, Occupy } from './plugins/directive'
import './assets/styles/theme/font.scss'
import { downloadFile } from './win/download'

const app = createApp(App)

for (const component in components) {
  app.component(`mg-${component}`, components[component]) //
}

app.directive('loading', LoadingDirective)
app.directive('occupy', Occupy)

app
  .use(store)
  .use(router)
  .mount('#app')
