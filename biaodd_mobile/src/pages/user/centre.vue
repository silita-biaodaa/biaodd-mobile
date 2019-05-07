<!-- 模型： DOM 结构 -->
<template>
    <div class="centre">
      <div class="cen-top">
        <div class="top-nav">
            <van-icon name="arrow-left" class="top-left" @click="$router.go(-1)" />
                个人中心
        </div>
        <div class="cen-per"  @click="jump" >
          <div class="flex-box">
            <div class="cen-img">
              <img :src="userinfo.imageUrl " alt="" v-show="userinfo.imageUrl">
              <img src="../../assets/icon-tpux.png.png" alt="" v-show="!userinfo.imageUrl">
            </div>
            <div class="cen-logo" v-show="decision"  >
              立即登录
            </div>
            <div  v-show="!decision" >
              <div class="cen-name" >
                <div class="left">{{userinfo.nikeName}}</div>
                <div class=" cen-state left">{{state}}</div>
              </div>
              <div class="cen-day">
                剩余会员天数：<span class="color">{{day}}</span>天
              </div>
            </div>
          </div>
          <van-icon name="arrow" class="cen-i" />
        </div>
        
      </div>
      <div class="cen-nav">
        <!-- 开通会员 -->
        <div class="attention" v-if="isLogin" @click="$router.push('/openingVip')">
          <div class="flex-box">
            <img src="../../assets/hy.png" alt="">
            <span>我的会员</span>  
          </div> 
          <van-icon name="arrow" class="nav-i"  />
        </div>
        <!-- 会员特权 -->
        <div class="attention" v-if="isLogin" @click="$router.push('/membership')">
          <div class="flex-box">
            <img src="../../assets/vip.png" alt="">
            <span>会员特权</span>  
          </div> 
          <van-icon name="arrow" class="nav-i"  />
        </div>
        <!-- 我的关注 -->
        <div class="attention" @click="$router.push('/followList')" v-if="isLogin">
          <div class="flex-box">
            <img src="../../assets/icon-guanzhu.png.png" alt="">
            <span>我的关注</span>  
          </div> 
          <van-icon name="arrow" class="nav-i"  />
        </div>
        <!-- 我的订单 -->
        <div class="attention" @click="$router.push('/myOrder')" v-if="isLogin">
          <div class="flex-box">
            <img src="../../assets/dd.png" alt="">
            <span>我的订单</span>  
          </div> 
          <van-icon name="arrow" class="nav-i"  />
        </div>
        <!-- 设置 -->
        <div class="attention cen-at" @click="jumpto"  v-if="isLogin"> 
          <div class="flex-box">
            <img src="../../assets/icon-shezhi.png.png" alt="">
          <span>设置</span>
          </div>
          <van-icon name="arrow" class="nav-i"   />
        </div>
      </div>
       <div class="attention cen-ip"> 
          <div class="flex-box">
            <img src="../../assets/icon-dianhua.png.png" alt="">
            <span>客服电话</span>
          </div> 
          <!-- <van-icon name="arrow"  /> -->
          <div class="nav-i" >
            0731-85076077
          </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'centre', // 结构名称
    data() {
        return {
            // 数据模型
            userinfo:{},
            state:'',
            day:0,
            isLogin:true,
        }
    },
    watch: {
        // 监控集合
      
    },
    props: {
        // 集成父级参数
    },
    computed: {
       decision() {
         if(sessionStorage.getItem('xtoken')) {
           return false
         } else {
           return true
         }
       } 
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
        this.gainNew();
        if(sessionStorage.getItem('xtoken')){
          this.isLogin=true
        }else{
          this.isLogin=false
        }
    },
    beforeMount() {
        // console.group('挂载前状态  ===============》beforeMount');
    },
    mounted() {
        // console.group('挂载结束状态===============》mounted');
        this.$nextTick(function() {
            // console.log('执行完后，执行===============》mounted');
        });
    },
    beforeUpdate() {
        // console.group('更新前状态  ===============》beforeUpdate');
    },
    updated() {
        // console.group('更新完成状态===============》updated');
    },
    beforeDestroy() {
        // console.group('销毁前状态  ===============》beforeDestroy');
    },
    destroyed() {
        // console.group('销毁完成状态===============》destroyed');
    },
    methods: {
        // 方法 集合
        jump() {
          if(sessionStorage.getItem('xtoken')) {
            this.$router.push('/user')
          } else {
             this.$router.push('/logo')
          }
         
        },
        jumpto() {
            if(sessionStorage.getItem('xtoken')) {
                this.$router.push('/install')
            }
        },
         upload(){//点击下载APP
            window.location.href='https://a.app.qq.com/o/simple.jsp?pkgname=com.yaobang.biaodada';
        },
        gainNew() {
          if(sessionStorage.getItem('xtoken')) {
                let that=this;
                  this.$http({
                      method:'post',
                      url: '/userCenter/refreshUserInfo',
                      data:{}
                  }).then(function(res){
                      that.userinfo = res.data.data
                       let gap = new Date( that.userinfo.expiredDate).getTime() - new Date().getTime()
                       that.day = Math.ceil(gap/3600/24/1000) >= 0 ? Math.ceil(gap/3600/24/1000) : 0; 
                       if( that.userinfo.roleName == '会员用户') {
                         that.state = '会员'
                       } else {
                         that.state = '非会员'
                       }

                  })
            } 
         }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
.flex-box{
  display: flex;
  align-items: center;
}
.centre {
  min-height:calc(100vh - 151px);
  background-color: #F5F5F5;
  // position: absolute;
  // top: 0;
  // left: 0;
  // right: 0;
  // bottom: 0;
  .cen-top {
    background: url(../../assets/webbc.png) no-repeat;
    background-size: auto 100%;
    width: 100%;
    height: 349px;
    display: flex;
    justify-content: center;
    position: relative;
     .top-nav {
      height: 90px;
      width: 100%;
      line-height: 90px;
      text-align: center;
      color:#fff;
      font-size: 36px;
      position: fixed;
      z-index: 99;
      top: 0;
      left: 0;
      .top-left {
          font-size: 50px;
          color:#fff;
          position: absolute;
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
      }
    }
    .cen-per {
      width: 83%;
      height: 178px;
      background-color: #fff;
      position: absolute;
      bottom: -70px;
      box-shadow:0px 3px 9px 1px rgba(4,0,0,0.1);
      border-radius:8px;
      display: flex;
      transform: translateX(-50%);
      left: 50%;
      justify-content: space-between;
      align-items: center;
      padding: 0 35px;
      .cen-img {
        width: 139px;
        height: 139px;
        margin-right: 40px;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .cen-logo {
        font-size: 32px;
        color:#999;
        font-weight: 550;
       
      }
      .cen-name {
        font-size: 36px;
        color:#333;
        font-weight: 550;
        overflow: hidden;
        .left{
          max-width:200px;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap 
        }
        .cen-state {
          font-size: 24px;
          background-color: #E5FFE1;
          padding: 9px;
          color: #66D554;
          margin-left: 10px;
        }
      }
      .cen-day {
        font-size: 24px;
        color:#999;
        margin-top: 12px;
      }
      .cen-i {
        // position: absolute;
        // right: 35px;
        font-size:50px; 
        color:#666;
      }
    }
  
  }
    .cen-nav {
      background-color: #fff;
      padding: 0 29px;
      margin: 95px 0 16px;
       .cen-at {
        img {
          width: 46px;
          height: 47px;
           margin-right: 37px;
        }
      }
      
    }
     .attention{
        font-size: 32px;
        height: 104px;
        color:#333;
        font-weight: 550;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #F2F2F2;
        img {
          width: 51px;
          height: 43px;
          margin-right: 33px;
        }
        .nav-i {
          //  position: absolute;
          //  right: 0px;
           font-size:50px; 
           color:#666;
        }
      }
      .cen-ip {
        background-color: #fff;
         padding: 0 29px;
         .nav-i {
          //  right: 39px;
           font-size: 32px;
           color:#999;
           font-weight: 400;
         }
      }
    
}

</style>
