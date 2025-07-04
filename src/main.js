import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

//Import Bootstrap CSS & JS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// import './scss/_styles.scss';
import './style.css';
import router from "./router"

const app = createApp(App);

app.use(router)
app.mount('#app')
