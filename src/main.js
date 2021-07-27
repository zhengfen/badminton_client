import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import "@/styles/index.scss"; // global css

window.axios = require("axios");
window.axios.defaults.baseURL = location.hostname == 'localhost' ? 'http://localhost:3000/api/competitions': 'http://localhost:3000/api/competitions';

const app = createApp(App)
app.use(router)

app.mount('#app')

export default app
