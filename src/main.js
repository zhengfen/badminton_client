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
const token = localStorage.getItem("token");
if (token) {
    window.axios.defaults.headers.common["Authorization"] = 'Token ' + JSON.parse(token);
}

window.Popper = require('popper.js').default;
window.$ = window.jQuery = require('jquery');
require('bootstrap');

// mixin
import helper from '@/mixins/helper'
// 3rd part 
import VueSelect from 'vue-next-select'
import 'vue-next-select/dist/index.min.css'

import { VueFinalModal } from 'vue-final-modal'



// local components
import { registerComponents } from '@/plugins/register-components'

const app = createApp(App)
app.use(router)
app.use(store)
app.mixin(helper)
app.component('vue-select', VueSelect)
app.component('vue-modal',VueFinalModal)
registerComponents(app)
app.mount('#app')
export default app
