import { createApp } from 'vue'
import { Quasar, Notify } from 'quasar'
import { createPinia } from 'pinia'
import router from './router'
import './style.css'
import App from './App.vue'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

const pinia = createPinia()

createApp(App)
    .use(router)
    .use(pinia)
    .use(Quasar, {
        plugins: {
          Notify
        }, // import Quasar plugins and add here
      })
    .mount('#app')
