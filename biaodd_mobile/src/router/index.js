import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import Bid from '@/pages/bid'
import Detail from '@/pages/detail'
import Conform from '@/pages/conform'
import Winning from '@/pages/winning'
import zhongBid from '@/pages/zhongBid'
import Letter from '@/pages/letter'
import companyList from '@/pages/companyList'
import commerce from '@/components/enterprise/commerce'
import affairs from '@/components/enterprise/affairs'
import qual from '@/components/enterprise/qual'
import people from '@/components/enterprise/people'
import achievement from '@/components/enterprise/achievement'
import letBid from '@/components/enterprise/bid'
import good from '@/components/enterprise/good'
import award from '@/pages/award'
import badness from '@/pages/badness'
import logo from '@/pages/user/logo'
import enroll from '@/pages/user/enroll'
import find from '@/pages/user/find'
import centre from '@/pages/user/centre'
import install from '@/pages/user/install'
import deal from '@/pages/user/deal'









Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {//首页
      path: '/home',
      name: 'index',
      component: index
    },
    { //中标列表
      path: '/tender',
      component: zhongBid,
      name:'zhongBid'
    },
    { //招标列表
      path: '/bid',
      component: Bid,
      name:'bid' 
    },
    { //企业列表
      path: '/company',
      component: companyList,
      name:'companyList' 
    },
    {  // 招标详情
      path: '/article',
      component: Detail
    },
    { 
      path: '/conform',
      component: Conform 
    },
    {  // 中标详情
      path: '/notice', 
      component: Winning 
    },
    { //企业详情页
      path: '/letter', 
      component: Letter 
    },
    { //企信——工商
      path: '/commerce', 
      component: commerce 
    },
    {//企信——法务
      path:'/affairs',
      component:affairs,
      name:'affairs'
    },
    {  // 资质-企信
      path: '/qual',
      component: qual,
      name: 'qual'
    },
    {   // 人员
      path: '/people',
      component: people,
      name: 'people'
    },
    {   // 人员
      path: '/achievement',
      component: achievement,
      name: 'achievement'
    },
    {   // 中标
      path: '/letbid',
      component: letBid,
      name: 'letbid'
    },
    {   // 诚信
      path: '/good',
      component: good,
      name: 'good'
    },
    {   // 奖项详情
      path: '/award',
      component: award,
      name: 'award'
    },
    {   // 奖项详情
      path: '/badness',
      component: badness,
      name: 'badness'
    },
    {  //登录
      path: '/logo',
      component: logo,
      name: 'logo'
    },
    {  // 注册
      path: '/enroll',
      component: enroll,
      name: 'enroll'
    },
    {  // 找回
      path: '/find',
      component: find,
      name: 'find'
    },
    {  // 个人中心
      path: '/centre',
      component: centre,
      name: 'centre'
    },
    {  // 设置
      path: '/install',
      component: install,
      name: 'install'
    },
    {  // 协议文本
      path: '/deal',
      component: deal,
      name: 'deal'
    }    
  ]
})
