import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import components from './components/components'
import { LoadingDirective, Occupy } from './plugins/directive'
import './assets/styles/theme/font.scss'
import { downloadFile } from './win/download'


import Toast from "@/components/toast/toast"
import Confirm from "@/components/confirm/confirm"

const app = createApp(App)

for (const component in components) {
  app.component(`mg-${component}`, components[component]) //
}

//全局注册Confirm插件
app.use(Confirm)
//全局注册toast插件
app.use(Toast)

app.directive('loading', LoadingDirective)
app.directive('occupy', Occupy)

app
  .use(store)
  .use(router)
  .mount('#app')
