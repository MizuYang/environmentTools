import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios'
import VueAxios from 'vue-axios'

import 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'

import VueLoading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

const app = createApp(App)

app.component('IsLoading', VueLoading)

app.use(router)
app.use(VueAxios, axios)
app.mount('#app')
