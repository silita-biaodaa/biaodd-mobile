<template>
  <div id="app">
    <router-view v-if="isRouter" :class="this.showNav ? 'app-boby': ''" />
    <div class="app-bto" v-if="showNav">
       <div class="app-nav" @click="jump(el)" v-for="(el,i) in nav" :key="i"  >
           <!-- 灰 -->
          <img :src="el.rurl" alt="" v-if="el.states"   >
          <!-- 红 -->
          <img :src="el.url" alt=""  v-else >  
          <div :class="el.states ? 'color' : '' " >
            {{el.name}}
          </div>
        </div>
    </div> 
     <v-dia v-if="isload"></v-dia>
  </div>
</template>

<script>
import dialog from '@/components/dialog'
export default {
  // name: 'App',
  data(){
    return{
      isRouter:true,
      fisrt: true,
      per:true,
      showNav:true,
      isload:false,
      area:[],
      nav:[
        {
          url: require('./assets/nav-icon-biaodada.png.png'),
          rurl: require('./assets/nav-icon-biaodd.png.png'),
          name:'首页',
          path:'/',
          states:false
        },
         {
           url: require('./assets/icon-gzh.png(1).png'),
           rurl: require('./assets/icon-gzh.png.png'),
           name:'关注',
           path:'/followList',
           states:false
        },
        {
           url:require('./assets/icon-zhbdy.png(1).png'),
           rurl:  require('./assets/icon-zhbdy.png.png'),
           name:'招标订阅',
           path:'/subscribe',
           states:false
        },
        {
           url: require('./assets/nav-icon-yonghzhx.png.png'),
           rurl: require('./assets/nav-icon-yonghzh.png.png'),
           name:'个人中心',
           path:'/centre',
           states:false
        }
      ],
      code:''
    }
  },
  provide(){
    return{
      reload:this.reload
    }
  },
  components: {
        'v-dia':dialog
    },
  methods:{
    reload(){
      this.isRouter=false
      this.$nextTick(function(){
        this.isRouter=true
      })
    },
    judge() {
       if(this.$route.path == '/centre' ||  this.$route.path == '/logo'||  this.$route.path == '/find'||  this.$route.path == '/enroll'||  this.$route.path == '/install'||  this.$route.path == '/deal' ||  this.$route.path == '/user' ||this.$route.path=='/openingVip'||this.$route.path=='/myOrder') {
            this.nav[3].states = true 
        } else if(this.$route.path == '/followList') {
           this.nav[1].states = true  
        } else if (this.$route.path == '/subscribe') {
           this.nav[2].states = true  
        } else {
          this.nav[0].states = true  
        }
        if(this.$route.name=='payVip'||this.$route.name=='dwDetail' || this.$route.name=='subset' ||  this.$route.name=='binging' ){
            this.showNav=false
        }
    },
    jump(el) {
      if(el.name == '首页' || el.name == '个人中心' ) {
          for(let i of this.nav) {
            i.states = false
          }
          el.states = true
          this.$router.push(el.path)
      } else {
        if(sessionStorage.getItem('xtoken')) {
            for(let i of this.nav) {
              i.states = false
            }
            el.states = true
            this.$router.push(el.path)
        } else {
            this.modalHelper.afterOpen();
            this.isload = true 
        }
      }
      
     
    },
    pushAll(el) {
           for(let val of el) {
                 for(let vals of val.data) {
                     if(vals.data.length == 0 ) {
                         vals.data.push({name:'全部',code:'0'})
                         continue
                     }
                 }
             }
      },
     gainToken() {
       let that=this;
       this.$http({
        method:'post',
        url: '/wxAuth/loginUser',
        data:{
          code:that.code
        }
        }).then(function(res){
           console.log(res,111);
          if(res.data.code == 302  ) {
            localStorage.setItem('isFi','0')
            window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx393124fdad606b1d&redirect_uri=http%3A%2F%2Fpre-mobile.biaodaa.com%2F%23%2Fbinging&response_type=code&scope=snsapi_base&state=CD-IMIS&connect_redirect=1#wechat_redirect'
            return false
          }
          if(res.data.data.isCollected ) {
            sessionStorage.setItem('xtoken',res.data.data.xtoken)
            sessionStorage.setItem('phoneNo',res.data.data.phoneNo);
            if(res.data.data.nikeName){
              sessionStorage.setItem('Bname',res.data.data.nikeName)
            }else{
              sessionStorage.setItem('Bname',res.data.data.phoneNo)
            }
            sessionStorage.setItem('isCollected',res.data.data.isCollected)
            sessionStorage.setItem('permissions',res.data.data.permissions);
            sessionStorage.setItem('userid',res.data.data.pkid);
            if(that.$route.name == 'binging') {
               that.$router.push('/home')
            }
          } 
          
        })
     }, 
  },
  created () {
    // if(localStorage.getItem('xtoken')){
    //   localStorage.removeItem('xtoken')
    // }
    // if(localStorage.getItem('Bname')){
    //   localStorage.removeItem('Bname')
    // }
    let isF = localStorage.getItem('isFi') ? localStorage.getItem('isFi') : '1' 
    this.code = this.getCode()
    console.log(this.code);
    console.log(isF);
    
    if(this.code != '' && isF == 1 ) {
      this.gainToken()
    }
    this.judge();
     let that=this;
       this.$http({
        method:'post',
        url: '/authorize/address',
    }).then(function(res){
         let str = ''
        if(res.data.data.region.indexOf('广西')>-1){
          str = '广西壮族自治区'
          // sessionStorage.setItem('address','广西壮族自治区');
        }else if(res.data.data.region.indexOf('内蒙古')>-1){
          str = '内蒙古自治区'
          // sessionStorage.setItem('address','内蒙古自治区');
        }else if(res.data.data.region.indexOf('宁夏')>-1){
          str = '宁夏回族自治区'
          // sessionStorage.setItem('address','宁夏回族自治区');
        }else if(res.data.data.region.indexOf('新疆')>-1){
          str = '新疆维吾尔自治区'
          // sessionStorage.setItem('address','新疆维吾尔自治区');
        }else if(res.data.data.region.indexOf('西藏')>-1){
          str = '西藏自治区'
          // sessionStorage.setItem('address',);
        }else{
          str = res.data.data.region+'省'
        } 
         for(let x of that.area) {
            if( str == x.name ) {
              sessionStorage.setItem('address',JSON.stringify(x)); 
            }
          }
        if(res.data.data.ip) {
          sessionStorage.setItem('ip',res.data.data.ip);
        }
        
    }).catch(function(res){
        
    })
    //筛选条件存于本地
    this.$http({
        method:'post',
        url: '/new/common/condition',
    }).then(function(res){
       let arr = res.data.data
       let obj = res.data.data.comQua
       that.area = res.data.data.area
       that.pushAll(obj)   
       arr.newQual = obj 
       localStorage.setItem('filter',JSON.stringify(arr));
    });
  },
  watch: {
   $route: {
      handler: function(val, oldVal){
           for(let i of this.nav) {
              i.states = false
            }
        if(val.path == '/centre' ||  val.path == '/logo'||  val.path == '/find'||  val.path == '/enroll'||  val.path == '/install' ||  val.path == '/deal' ||  this.$route.path == '/user'||val.path == '/myOrder'||val.path == '/payVip'||val.path == '/openingVip'||val.path == '/membership') {
            this.nav[3].states = true 
        }  else if (val.path == '/followList')  {
            this.nav[1].states = true 
        } else if (val.path == '/subscribe' || val.path == '/subset'  )  {
           this.nav[2].states = true
        } else {
           this.nav[0].states = true
        }
        if(this.$route.name=='payVip'||this.$route.name=='dwDetail' || this.$route.name=='subset' ||  this.$route.name=='binging' ){
            this.showNav=false
        } else {
           this.showNav= true
        }
      
       },
      deep: true
    }
  },
    beforeDestroy() {
        // console.group('销毁前状态  ===============》beforeDestroy');
        
    },
}
</script>

<style>
@import './base/base.css';
/* #app {
 position: absolute;
 top: 0;
 left: 0;
 right: 0;
 bottom: 0;
} */
.app-boby {
 padding-bottom: 101px;
}
.app-bto {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 101px;
  display: flex;
  z-index: 999;
  justify-content: space-between;
  border-top: 1px solid #F2F2F2;
  background-color: #fff;
}
.app-nav {
  width: 35%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 6px;
   box-sizing: border-box
}
.app-nav img {
  width: 47px;
  height: 43px;
  margin-bottom: 5px;
}

</style>
