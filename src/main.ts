import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import components from './components/index'
import { LoadingDirective, Occupy } from './plugins/directive'

// components
import Toast from "@/components/bknds-toast/toast"
import Confirm from "@/components/bknds-confirm/confirm"

import './assets/styles/theme/font.scss'

const app = createApp(App)

for (const component in components) {
  app.component(`bknds-${component}`, components[component])
}

//全局注册Confirm插件
app.use(Confirm)
//全局注册toast插件
app.use(Toast)

app.directive('loading', LoadingDirective)
app.directive('occupy', Occupy)

app.use(store).use(router).mount('#app')
