import Vue from 'vue'
import axios from 'axios'
Vue.prototype.$http = axios
// let baseURL='http://api.biaodaa.com'
let baseURL = 'http://pre.biaodaa.com'
// let baseURL = '/'


axios.defaults.baseURL = baseURL

axios.interceptors.request.use(function (config) {
let token = localStorage.getItem('xtoken');
if (token&&token!='undefined') {
  config.headers['X-TOKEN'] = token
}
    return config
}, function (error) {
    return Promise.reject(error)
})