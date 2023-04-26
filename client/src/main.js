import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { VueClipboard } from '@soerenmartius/vue3-clipboard'

createApp(App).use(VueClipboard).use(store).use(router).mount('#app')
