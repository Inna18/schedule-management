import { createApp } from 'vue'
import App from './App.vue'
import {vueAxios} from "@/plugins/axios-plugin";
import "@/assets/css/main.css";

createApp(App)
  .use(vueAxios)
  .mount('#app')
