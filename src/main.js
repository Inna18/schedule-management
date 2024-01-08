import { createApp } from 'vue'
import App from './App.vue'
import {vueAxios} from "@/plugins/axios-plugin";

createApp(App)
  .use(vueAxios)
  .mount('#app')
