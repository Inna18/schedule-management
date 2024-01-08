import axios from "axios";

axios.defaults.timeout = 10 * 1000;
axios.defaults.headers.common.Accept = "application/json";
axios.defaults.headers.common.ContentType = "application/json";

const $axios = axios;

export { $axios }