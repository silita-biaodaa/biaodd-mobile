// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);

import moment from 'moment'
Vue.prototype.$moment = moment;

import base from '@/base/base'
import http from '@/base/http'
function setHtmlFontSize(){
  let baseSize=32;
  const sw=document.documentElement.clientWidth / 750;
  document.documentElement.style.fontSize=baseSize*Math.min(sw,2)+'px';
};
setHtmlFontSize();


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
