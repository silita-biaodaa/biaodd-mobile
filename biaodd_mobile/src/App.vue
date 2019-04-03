<template>
  <div id="app">
    <router-view v-if="isRouter" class="app-boby" />
    <div class="app-bto"  >
       <div class="app-nav">
         <!-- 红 -->
         <img src="./assets/nav-icon-biaodd.png.png" alt="" v-if="fisrt" >  
         <!-- 灰 -->
         <img src="./assets/nav-icon-biaodada.png.png" alt="" v-else >
         <div :class="fisrt ? 'color' : '' " >
           标大大
         </div>
       </div>
        <div class="app-nav">
          <!-- 灰 -->
          <img src="./assets/nav-icon-yonghzhx.png.png" alt="" v-if="per" >
          <!-- 红 -->
          <img src="./assets/nav-icon-yonghzh.png.png" alt="" v-else >
          <div :class="!fisrt ? 'color' : '' " >
             用户中心
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
       if(this.$route.path == '/user' ||  this.$route.path == '/logo' ) {
            this.fisrt = false 
            this.per  = false
        } else {
            this.fisrt = true  
            this.per  = true 
        }
    }
  },
  created () {
    this.judge()
  },
  watch: {
   $route: {
      handler: function(val, oldVal){
        if(val.path == '/user' || val.path == '/logo' ) {
            this.fisrt = false 
            this.per  = false
        } else {
            this.fisrt = true  
            this.per  = true 
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
  justify-content: space-between;
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
