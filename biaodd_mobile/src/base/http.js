import Vue from 'vue'
import axios from 'axios'
Vue.prototype.$http = axios
let baseURL='http://pre.biaodaa.com'

axios.defaults.baseURL = baseURL

axios.interceptors.request.use(function (config) {
let token = 'biaodaaTestToken';
if (token&&token!='undefined') {
  config.headers['X-TOKEN'] = token
}
    return config
}, function (error) {
    return Promise.reject(error)
})