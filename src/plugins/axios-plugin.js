import axios from "axios";

axios.defaults.timeout = 10 * 1000;
axios.defaults.headers.common.Accept = "application/json";
axios.defaults.headers.common.ContentType = "application/json";

const $axios = axios;

const vueAxios = {
  async install(app) {
    const vue = app.config.globalProperties;
    $axios.defaults.baseURL = `${process.env.VUE_APP_API_PROTOCOL}://${process.env.VUE_APP_API_HOST}`;
    if(process.env.VUE_APP_API_PORT !== '80'){
      $axios.defaults.baseURL += `:${process.env.VUE_APP_API_PORT}`
    }
    vue.$axios = $axios;
  }
}

export { $axios, vueAxios }