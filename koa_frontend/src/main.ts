import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { setupStore } from './store'
import i18n from './locales'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(router)
app.use(i18n)
setupStore(app)

app.mount('#app')
