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
import followList from '@/pages/user/followList'
import openingVip from '@/pages/user/openingVip'
import membership from '@/pages/user/membership'
import myOrder from '@/pages/user/myOrder'
import payVip from '@/pages/user/payVip'
import dialog from '@/components/dialog'
import yjList from '@/pages/yjList'
import zjDetail from '@/pages/yj/zjDetail'
import slDetail from '@/pages/yj/slDetail'
import jtDetail from '@/pages/yj/jtDetail'
import htbaDetail from '@/pages/yj/htbaDetail'
import ztbDetail from '@/pages/yj/ztbDetail'
import sgtscDetail from '@/pages/yj/sgtscDetail'
import sgxkDetail from '@/pages/yj/sgxkDetail'
import jgbaDetail from '@/pages/yj/jgbaDetail'
import ryList from '@/pages/ryList'
import user from '@/pages/user/user'





Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {//首页
      path: '/home',
      name: 'home',
      component: index
    },
    { //中标列表
      path: '/tender',
      component: zhongBid,
      name:'tender'
    },
    { //招标列表
      path: '/bid',
      component: Bid,
      name:'bid' 
    },
    { //企业列表
      path: '/company',
      component: companyList,
      name:'company' 
    },
    { //业绩列表
      path: '/yjList',
      component: yjList,
      name:'yjList'
    },
    { //人员列表
      path: '/ryList',
      component: ryList,
      name:'ryList'
    },
    {  // 招标详情
      path: '/article',
      component: Detail,
      name:'article'
    },
    { 
      path: '/conform',
      component: Conform 
    },
    {  // 中标详情
      path: '/notice', 
      component: Winning,
      name: 'notice'
    },
    { //企业详情页
      path: '/letter', 
      component: Letter,
      name: 'letter' 
    },
    { //企信——工商
      path: '/commerce', 
      component: commerce,
      name: 'commerce'
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
    },
    {  // 协议文本
      path: '/dialog',
      component: dialog,
      name: 'dialog'
    },
    {  // 个人信息
      path: '/user',
      component: user,
      name: 'user'
    },
    {// 关注列表
      path: '/followList',
      component: followList,
      name: 'followList'
    },
    {// 开通会员
      path: '/openingVip',
      component: openingVip,
      name: 'openingVip'
    },
    {// 会员特权
      path: '/membership',
      component: membership,
      name: 'membership'
    },
    {//我的订单
      path: '/myOrder',
      component: myOrder,
      name: 'myOrder'
    },
    {//支付方式
      path: '/payVip',
      component: payVip,
      name: 'payVip'
    },   
    {//住建部业绩详情
      path:'/zjDetail',
      component:zjDetail,
      name:'zjDetail'
    },
    {//水利部业绩详情
      path:'/slDetail',
      component:slDetail,
      name:'slDetail'
    },
    {//交通部业绩详情
      path:'/jtDetail',
      component:jtDetail,
      name:'jtDetail'
    },
    {//合同备案详情
      path:'/htbaDetail',
      component:htbaDetail,
      name:'htbaDetail'
    },
    {//招投标详情
      path:'/ztbDetail',
      component:ztbDetail,
      name:'ztbDetail'
    },
    {//施工图审查详情
      path:'/sgtscDetail',
      component:sgtscDetail,
      name:'sgtscDetail'
    },
    {//施工许可详情
      path:'/sgxkDetail',
      component:sgxkDetail,
      name:'sgxkDetail'
    },
    {//竣工备案详情
      path:'/jgbaDetail',
      component:jgbaDetail,
      name:'jgbaDetail'
    }         
  ],
  scrollBehavior (to, from, savedPosition) {
		let u = navigator.userAgent;
		let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
		if(isiOS){
			if (savedPosition) {
				return savedPosition
			}else{
				return { x: 0, y: 0 }
			}
		}else{
			return { x: 0, y: 0 }
		}
		
	}
})
