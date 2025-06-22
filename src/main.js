import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

//Import Bootstrap CSS & JS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import './scss/styles.scss';
import './style.css';

const app = createApp(App);

app.mount('#app')
