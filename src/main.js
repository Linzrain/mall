import { createApp } from 'vue'
import App from './App.vue'
import BarRouter from './router/BarRouter'
import mitt from 'mitt'
import Toast from "components/common/Toast/toast.vue"


const app = createApp(App)
app.use(BarRouter).mount('#app')
app.config.globalProperties.$mybus = new mitt()

const toast = createApp(Toast).mount(document.createElement("div"))
document.body.appendChild(toast.$el)
app.config.globalProperties.$toast = toast