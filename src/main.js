import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Cookies from 'js-cookie'
import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import "@/styles/index.scss"; // global css
import './icons' // icon

window.moment = require('moment');

window.axios = require("axios");
window.axios.defaults.baseURL = location.hostname == 'localhost' ? 'http://localhost:3000/' : 'http://localhost:3000/';
const token = localStorage.getItem("token");
if (token) {
    window.axios.defaults.headers.common["Authorization"] = 'Token ' + JSON.parse(token);
}

window.Popper = require('popper.js').default;
window.$ = window.jQuery = require('jquery');
require('bootstrap');

/* mixin */
import helper from '@/mixins/helper'

/* 3rd part */
import VueSelect from 'vue-next-select'
import 'vue-next-select/dist/index.min.css'

import { VueFinalModal } from 'vue-final-modal'

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
const toastOptions = {
  // You can set your default options here
};

import VPopover from "vue3-popper";

import Toggle from '@vueform/toggle'
import "@vueform/toggle/themes/default.css"
/* localization */
import i18n from './locales'

/* local components */
import { registerComponents } from '@/plugins/register-components'

const app = createApp(App)
app.use(router)
app.use(store)
app.use(i18n)
app.mixin(helper)
// 3rd part
app.component('vue-select', VueSelect)
app.component('vue-modal',VueFinalModal)
app.use(Toast, toastOptions)
app.component("VPopover", VPopover)
app.component("Toggle", Toggle)

registerComponents(app)
app.mount('#app')
export default app
