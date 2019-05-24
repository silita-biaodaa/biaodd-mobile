import Vue from 'vue'
import axios from 'axios'
import { Toast } from 'vant'
Vue.prototype.$http = axios
// let baseURL='http://api.biaodaa.com'
let baseURL = 'http://pre.biaodaa.com'
// let baseURL = '/'

axios.defaults.baseURL = baseURL
axios.interceptors.request.use(function (config) {
let token = sessionStorage.getItem('xtoken');
if (token&&token!='undefined') {
  config.headers['X-TOKEN'] = token
}
    return config
}, function (error) {
    return Promise.reject(error)
})

axios.interceptors.response.use(function (response) { // ①10010 token过期（30天） ②10011 token无效
  if (response.data.code == 401 ) {
    sessionStorage.removeItem('xtoken')
      Toast('用户信息失效，请重新登陆')
  }
  return response
}, function (error) {
  return Promise.reject(error)
})
