import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import '@/styles/index.scss'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from '@/router/'

const app = createApp(App)
app.use(router)
app.use(ElementPlus, { size: 'small', zIndex: 3000 })
app.mount('#app')
