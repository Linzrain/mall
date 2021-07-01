import { createApp } from 'vue'
import App from './App.vue'
import BarRouter from './router/BarRouter'
import mitt from 'mitt'

const app = createApp(App)
app.use(BarRouter).mount('#app')
app.config.globalProperties.$mybus = new mitt()
