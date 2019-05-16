<template>
  <div id="app">
    <router-view v-if="isRouter" class="app-boby" />
    <div class="app-bto" v-if="showNav">
       <div class="app-nav" @click="jump" >
         <!-- 红 -->
         <img src="./assets/nav-icon-biaodd.png.png" alt="" v-if="fisrt" >  
         <!-- 灰 -->
         <img src="./assets/nav-icon-biaodada.png.png" alt="" v-else >
         <div :class="fisrt ? 'color' : '' " >
           标大大
         </div>
       </div>
        <div class="app-nav" @click="jumpto" >
          <!-- 灰 -->
          <img src="./assets/nav-icon-yonghzhx.png.png" alt="" v-if="per" >
          <!-- 红 -->
          <img src="./assets/nav-icon-yonghzh.png.png" alt="" v-else >
          <div :class="!fisrt ? 'color' : '' " >
             个人中心
          </div>
         
       </div>
    </div> 
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      isRouter:true,
      fisrt: true,
      per:true,
      showNav:true,
    }
  },
  provide(){
    return{
      reload:this.reload
    }
  },
  methods:{
    reload(){
      this.isRouter=false
      this.$nextTick(function(){
        this.isRouter=true
      })
    },
    judge() {
       if(this.$route.path == '/centre' ||  this.$route.path == '/logo'||  this.$route.path == '/find'||  this.$route.path == '/enroll'||  this.$route.path == '/install'||  this.$route.path == '/deal' ||  this.$route.path == '/user' ||this.$route.path=='/followList'||this.$route.path=='/openingVip'||this.$route.path=='/myOrder') {
            this.fisrt = false 
            this.per  = false
        } else {
            this.fisrt = true  
            this.per  = true 
        }
        if(this.$route.name=='payVip'){
            this.showNav=false
        }
    },
    jump() {
      this.$router.push('/')
    },
     jumpto() {
      this.$router.push('/centre')
    }
  },
  created () {
    if(localStorage.getItem('xtoken')){
      localStorage.removeItem('xtoken')
    }
    if(localStorage.getItem('Bname')){
      localStorage.removeItem('Bname')
    }
    this.judge();
    this.$http({
        method:'post',
        url: '/authorize/address',
    }).then(function(res){
        if(res.data.data.region.indexOf('广西')>-1){
          sessionStorage.setItem('address','广西壮族自治区');
        }else if(res.data.data.region.indexOf('内蒙古')>-1){
          sessionStorage.setItem('address','内蒙古自治区');
        }else if(res.data.data.region.indexOf('宁夏')>-1){
          sessionStorage.setItem('address','宁夏回族自治区');
        }else if(res.data.data.region.indexOf('新疆')>-1){
          sessionStorage.setItem('address','新疆维吾尔自治区');
        }else if(res.data.data.region.indexOf('西藏')>-1){
          sessionStorage.setItem('address','西藏自治区');
        }else{
          sessionStorage.setItem('address',res.data.data.region+'省');
        } 
        if(res.data.data.region=='湖南'){
          sessionStorage.setItem('city',res.data.data.city);
        }
        sessionStorage.setItem('ip',res.data.data.ip);
    }).catch(function(res){
        
    })


    //筛选条件存于本地
    this.$http({
        method:'get',
        url: '/company/filter',
    }).then(function(res){
        localStorage.setItem('filter',JSON.stringify(res.data.data));
    })
  },
  watch: {
   $route: {
      handler: function(val, oldVal){
        if(val.path == '/centre' ||  val.path == '/logo'||  val.path == '/find'||  val.path == '/enroll'||  val.path == '/install' ||  val.path == '/deal' ||  this.$route.path == '/user'||val.path == '/followList'||val.path == '/myOrder'||val.path == '/payVip'||val.path == '/openingVip'||val.path == '/membership') {
            this.fisrt = false 
            this.per  = false
        } else {
            this.fisrt = true  
            this.per  = true 
        }
        if(val.name=='payVip'){
            this.showNav=false
        }else{
          this.showNav=true
        }
       },
      deep: true
    }
  }
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
