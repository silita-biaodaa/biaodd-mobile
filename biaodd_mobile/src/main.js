// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import 'lib-flexible'
import axios from 'axios'

import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

import moment from 'moment'
Vue.prototype.$moment = moment;
import sha1 from 'sha1'
Vue.prototype.$sha1 = sha1;

import base from '@/base/base'
import http from '@/base/http'

/*全局引用会员组件*/
import isvip from '@/components/isVip'
import icinfo from '@/components/enterprise/icinfo'
import icbr from '@/components/enterprise/icbr'
import icgu from '@/components/enterprise/ingu'
import icmain from '@/components/enterprise/icmain'
import icalter from '@/components/enterprise/icalter'
import icpun from '@/components/enterprise/icpun'


import newList from '@/pages/user/newList'
import aninfo from '@/components/enterprise/aninfo'
import ansite from '@/components/enterprise/ansite'
import anshare from '@/components/enterprise/anshare'
import aninvest from '@/components/enterprise/aninvest'
import anset from '@/components/enterprise/anset'
import ancury from '@/components/enterprise/ancury'


Vue.component('v-vip', isvip)
Vue.component('ic-infor', icinfo)
Vue.component('ic-br', icbr)
Vue.component('ic-gu', icgu)
Vue.component('ic-main', icmain)
Vue.component('ic-alter', icalter)
Vue.component('ic-pun', icpun)


Vue.component('new-list', newList)
Vue.component('an-info', aninfo)
Vue.component('an-site', ansite)
Vue.component('an-share', anshare)
Vue.component('an-vest', aninvest)
Vue.component('an-set', anset)
Vue.component('an-cury', ancury)


// function HtmlFontSize(){
//   let baseSize=32;
//   const sw=document.documentElement.clientWidth / 750;
//   document.documentElement.style.fontSize=baseSize*Math.min(sw,2)+'px';
// };
// HtmlFontSize();

function setHtmlFontSize(){
  const htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
  const htmlDom = document.getElementsByTagName('html')[0];
  htmlDom.style.fontSize = htmlWidth / 10 + 'px';
  let u = navigator.userAgent;
  let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  // if(isiOS){
    let beforeMeta=document.querySelector('meta[name="viewport"]');
    // 
    // if(beforeMeta.content.indexOf('0.5')!=-1){
    //   htmlDom.style.fontSize = htmlWidth / 20 + 'px';
    // }else if(beforeMeta.content.indexOf('0.3')!=-1){
    //   htmlDom.style.fontSize = htmlWidth / 30 + 'px';
    // }else{
    //   htmlDom.style.fontSize = htmlWidth / 10 + 'px';
    // }
    htmlDom.style.fontSize ='16px';
    var oMeta = document.createElement('meta');
      oMeta.content = 'initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no';
      oMeta.name = 'viewport';
      document.getElementsByTagName('head')[0].appendChild(oMeta);
  // }
};
let that=Vue;
router.beforeEach(function(to, from, next){
  if(to.name=='logo'){
    sessionStorage.setItem('path',from.fullPath);
  }
  if(to.fullPath=='/centre'&&from.fullPath=='/followList'){
    from.meta.followNum=0
  }
  if(from.name=='letter'&&to.name=='company'){
    sessionStorage.removeItem('peoploDetail');
    sessionStorage.removeItem('letterStr');
  }
  next()
  
})
setHtmlFontSize();
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
