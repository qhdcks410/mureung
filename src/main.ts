/* eslint-disable @typescript-eslint/no-require-imports */
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import App from './App.vue'
import router from './router'
import axios from 'axios';

const vuetify = createVuetify({
  components,
  directives,
})


const app = createApp(App)
app.config.globalProperties.axios = axios;

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.mount('#app')
