import Vue from 'vue'
import axios from 'axios'
Vue.prototype.$http = axios
let baseURL='http://api.biaodaa.com'
// let baseURL = 'http://pre.biaodaa.com'
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

axios.interceptors.response.use(function (response) { // ①10010 token过期（30天） ②10011 token无效
  if (response.data.code == 401 ) {
      localStorage.removeItem('xtoken')
       alert('用户信息失效，请重新登录')
    return window.location.href = "http://mobile.biaodaa.com/#/logo";
  }
  return response
}, function (error) {
  return Promise.reject(error)
})
