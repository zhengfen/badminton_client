import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Cookies from 'js-cookie'
import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import "@/styles/index.scss"; // global css
import './icons' // icon



window.axios = require("axios");
window.axios.defaults.baseURL = location.hostname == 'localhost' ? 'http://localhost:3000/' : 'http://localhost:3000/';


window.Popper = require('popper.js').default;
window.$ = window.jQuery = require('jquery');
require('bootstrap');

import VueSelect from 'vue-next-select'
import 'vue-next-select/dist/index.min.css'

// local components
import { registerComponents } from '@/plugins/register-components'

const app = createApp(App)
app.use(router)
app.use(store)
app.component('vue-select', VueSelect)
registerComponents(app)
app.mount('#app')
export default app
