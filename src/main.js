import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';



import Cookies from 'js-cookie'
import 'normalize.css/normalize.css' // a modern alternative to CSS resets

// import './styles/element-variables.scss'
import enLang from 'element-plus/lib/locale/lang/en'
import frLang from 'element-plus/lib/locale/lang/fr'
import "@/styles/index.scss"; // global css
import './icons' // icon
// import './permission' // permission control
// import './utils/error-log' // error log

window.axios = require("axios");
window.axios.defaults.baseURL = location.hostname == 'localhost' ? 'http://localhost:3000/': 'http://localhost:3000/';

// local components
import { registerComponents } from '@/plugins/register-components'

const app = createApp(App)
app.use(router)
app.use(ElementPlus,{
  size: Cookies.get('size') || 'medium', // set element-ui default size
  locale: enLang // 如果使用中文，无需设置，请删除
})
registerComponents(app)
app.mount('#app')
export default app
