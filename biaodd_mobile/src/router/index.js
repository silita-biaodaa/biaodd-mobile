import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import Bid from '@/pages/bid'
import Detail from '@/pages/detail'
import Conform from '@/pages/conform'
import Company from '@/components/company'
import testZs from '@/pages/testZs'


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
    },
    { 
      path: '/conform',
      component: Conform 
    },
    { path: '/company', component: Company },
	{
      path: '/testZs', 
      name: 'testZs',
      component: testZs
    }
  ]
})
