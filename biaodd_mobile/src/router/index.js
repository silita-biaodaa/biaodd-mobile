import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import Bid from '@/pages/bid'
import Detail from '@/pages/detail'
import Conform from '@/pages/conform'
import testZs from '@/pages/testZs'
import Winning from '@/pages/winning'
import zhongBid from '@/pages/zhongBid'


Vue.use(Router)

export default new Router({
  routes: [
    {//首页
      path: '/',
      name: 'index',
      component: index
    }, 
    { //中标列表
      path: '/zhongBid',
      component: zhongBid,
      name:'zhongBid'
    },{ //招标列表
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
	  {
      path: '/testZs', 
      name: 'testZs',
      component: testZs
    },
    { 
      path: '/winning', 
      component: Winning 
    }
  ]
})
