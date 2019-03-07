import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import Bid from '@/pages/bid'
import Detail from '@/pages/detail'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    }, 
    { 
      path: '/bid',
      component: Bid 
    },
    {
      path: '/detail',
      component: Detail
    }
  ]
})
