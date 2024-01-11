import {$axios} from "@/plugins/axios-plugin";

const read = (url, params) => {
  return $axios.get(url, { params: params })
}

const write = (url, body, params) => {
  return $axios.post(url, body, { params: params });
}

const update = (url, data, params) => {
  return $axios.patch(url, data, { params: params });
}

const remove = (url, params) => {
  return $axios.delete(url, { params: params });
}

export { read, write, update, remove }