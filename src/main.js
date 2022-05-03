import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios'
import VueAxios from 'vue-axios'

import 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'

import VueLoading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

import {
  $uvDangerLv, $uvLvColor,
  $weatherIconsStatus,
  $unitChange,
  $getDate,
  $openAccordionColor
} from '@/methods/weatherMethods.js'

const app = createApp(App)

app.config.globalProperties.$unitChange = $unitChange
app.config.globalProperties.$uvDangerLv = $uvDangerLv
app.config.globalProperties.$uvLvColor = $uvLvColor
app.config.globalProperties.$weatherIconsStatus = $weatherIconsStatus
app.config.globalProperties.$getDate = $getDate
app.config.globalProperties.$openAccordionColor = $openAccordionColor

app.component('IsLoading', VueLoading)

app.use(router)
app.use(VueAxios, axios)
app.mount('#app')
