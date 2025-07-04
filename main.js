import { createApp } from 'vue'
import App from './App.vue'

import router from './routers'

import './scss/styles.scss'
import './style.css'

const app = createApp(App)
app.use(router)
app.mount('#app')