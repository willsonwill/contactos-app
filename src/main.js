import { createApp } from 'vue'
import { Quasar } from 'quasar'
import router from './router'
import './style.css'
import App from './App.vue'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

createApp(App)
    .use(router)
    .use(Quasar, {
        plugins: {}, // import Quasar plugins and add here
      })
    .mount('#app')
