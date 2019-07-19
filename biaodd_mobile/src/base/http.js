import Vue from 'vue'
import axios from 'axios'
import { Toast } from 'vant'


Vue.prototype.$http=axios
axios.defaults.retryDelay = 1000;//重复请求间隔
// let baseURL='http://api.biaodaa.com'
// let baseURL = 'http://pre.biaodaa.com'
// let baseURL = '/'

axios.defaults.baseURL = process.env.API_HOST
axios.interceptors.request.use(function (config) {
  let token = sessionStorage.getItem('xtoken');
  if (token&&token!='undefined') {
    config.headers['X-TOKEN'] = token
  }
  config.headers['baseInfo']='wap3.5|'+navigator.userAgent+'|1004'
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
}, function (err) {
    var config = err.config;
    if (!config || !config.retry) return Promise.reject(err);
    config.__retryCount = config.__retryCount || 0;
    if (config.__retryCount >= config.retry) {
      return Promise.reject(err);
    }
    config.__retryCount += 1;
    var backoff = new Promise(function (resolve) {
      setTimeout(function () {
        resolve();
      }, config.retryDelay || 1);
    });
    return backoff.then(function () {
      return axios(config);
    });
})
