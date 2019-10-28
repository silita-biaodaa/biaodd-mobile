<!-- 模型： DOM 结构 -->
<template>
    <div class="letter">
      <!-- <top-back :title='name' :id="id" :type="'qy'" :collected="collected" :isFollow="true"></top-back> -->
      <div class="letter-head" >
        <div class="head-nav" >
          <van-icon name="arrow-left" class="head-left" @click="$router.go(-1)" />
          企业详情
          <van-icon name="like" @click="follow" class=" head-right" v-if="follows"/>
          <van-icon name="like-o" @click="follow"  class="head-right" v-else/>
        </div>
        <div class="head-name " >
          <div class="head-color head-over " >{{detail.comName}}</div>
          <!-- <div class="head-collct head-color" @click="follow" >
            {{msg}}
          </div> -->
        </div>
        <div class="head-text" style="marginTop:15px;" >
           <span class="head-color" >联系电话:</span>
           <span  class="head-color">&nbsp{{detail.phone}}</span>
           <span class="head-app" @click="sureFn"  >前往APP查看更多》</span>
        </div>
        <div class="head-text head-color" >
           <span  class="head-color">企业网址:</span>
           <span  class="head-color">&nbsp{{detail.comUrl}}</span>
        </div>
        <div class="head-text head-color" >
           <span  class="head-color">企业邮箱:</span>
           <span  class="head-color">&nbsp{{detail.email ? detail.email : ''}}</span>
        </div>
        <div class="head-text head-color" >
           <span  class="head-color">企业地址:</span>
           <span  class="head-color">&nbsp{{detail.comAddress}}</span>
        </div>
      </div>
      <div class="letter-de">
        <div class="letter-nav">
          <div>
              <span v-for="(o,i) of navList" :key="i" :class="navNum==i?'active':''" @click="jump(i)">{{o}}</span>
          </div>
        </div>
        <div class="letter-detail">
            <template v-if="navNum==0">
              <!-- 工商 -->
              <v-gs></v-gs>
            </template>
            <template v-else-if="navNum==1">
              <!-- 法务 -->
              <v-fw :more="fwIsVip"></v-fw>
            </template>
            <template v-else-if="navNum==2">
              <!-- 资质 -->
              <v-zz></v-zz>
            </template>
            <template v-else-if="navNum==3">
              <!-- 人员 -->
              <v-ry></v-ry>
            </template>
            <template v-else-if="navNum==4">
              <!-- 业绩 -->
              <v-yj></v-yj>
            </template>
            <template v-else-if="navNum==5">
              <!-- 中标 -->
              <v-zb></v-zb>
            </template>
             <template v-else-if="navNum==6">
              <!-- 诚信 -->
              <v-gl></v-gl>
            </template>
        </div>

      </div>

      <v-vip :mask="isvip" :txt="'查看企业更多电话号码，请开通会员'"></v-vip>
      <v-load v-if="isload"></v-load>
      <van-popup v-model="isMore"  position="bottom" :overlay="true">
          <van-picker :columns="phoneArr" ref="picker"/>
      </van-popup>
      <v-vip :mask="isvip1" :txt="'开通会员才能查看法务信息'" @canel="fwCanelFn"></v-vip>
    </div>
</template>
<script>
import topBack from '@/components/topback'
import commerce from '@/components/enterprise/commerce'
import affairs from '@/components/enterprise/affairs'
import qual from '@/components/enterprise/qual'
import people from '@/components/enterprise/people'
import achievement from '@/components/enterprise/achievement'
import bid from '@/components/enterprise/bid'
import good from '@/components/enterprise/good'
import loading from '@/components/loading'
export default {
    name: 'letter', // 结构名称
    data() {
        return {
            // 数据模型
             name:'企业详情',
             detail:{},
             phoneArr:[],
             navList:['工商','法务','资质','人员','业绩','中标','诚信'],
             navNum:0,
             isload:true,
             mask:false,
             vipStr:'',
             isvip:false,
             isvip1:false,
             fwIsVip:false,
             collected:false,
             follows:false,
             id:'',
             isMore:false,
             msg:'关注'
            //  path:'/commerc'
        }
    },
    watch: {
        // 监控集合
    },
    components: {
       'top-back':topBack,
       'v-fw':  affairs,
       'v-gs':commerce,
       'v-zz':qual,
       'v-ry':people,
       'v-yj':achievement,
       'v-zb':bid,
       'v-gl':good,
       'v-load':loading,
    },
    props: {
        // 集成父级参数
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
        if(sessionStorage.getItem('isVip')){
          this.vipStr=sessionStorage.getItem('isVip');
        }
        if(sessionStorage.getItem('peoploDetail')){
          this.navNum=3
        }
        if(sessionStorage.getItem('letterStr')){
          this.navNum=4
        }
        this.id = this.$route.query.id
         let that=this;
            this.$http({
                method:'post',
                url: '/company/' + this.id,
                data:{
                   
                }
            }).then(function(res){
                that.detail = res.data.data;
                that.isload=false
                var arr = []
                if(that.detail.phone) {
                   arr = that.detail.phone.split(';');
                   that.phoneArr=arr;
                   if(that.vipStr == 'false'){
                     that.detail.phone =that.resetPhone(arr[0]) 
                   }else{
                     that.detail.phone=arr[0]
                   } 
                }
                that.collected=res.data.data.collected
                if(that.detail.collected) {
                  that.follows = true
                }  else {
                  that.follows = false
                }
             }).catch(function(req) {
                that.isload=false
             })
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
        more(){
          if(this.vipStr=='false'){
            this.isvip=true;
            this.modalHelper.afterOpen();
          }else{
            this.isMore=true;
          }
        },
        sureFn(){
           window.location.href='https://a.app.qq.com/o/simple.jsp?pkgname=com.yaobang.biaodada';
        },
        resetPhone(phone) {
          var str = String(phone)
          var len = str.length;
          if (len >= 7) {
            var reg = str.slice(-8, -4)
            return str.replace(reg, "****")
          }
        },
        jump(i){
          if(i==1&&this.vipStr=='false'){
            this.isvip1=true
            return false
          }
          this.navNum=i
        },
        fwCanelFn(){
          this.isvip1=false
        },
        follow() {
          let useid = sessionStorage.getItem('userid')
          let that=this;
          if(!that.follows) {
             
              this.$http({
                  method:'post',
                  url: '/userCenter/collectionCompany',
                  data:{
                     companyid:that.id,
                     userid:useid
                  }
              }).then(function(res){
                 that.$toast(res.data.msg)
                 that.follows = true
                //  that.msg = '取关'
               })
          } else {
             this.$http({
                  method:'post',
                  url: '/userCenter/cancelCollectionCompany',
                  data:{
                     companyid:that.id,
                     userid:useid
                  }
              }).then(function(res){
                 that.$toast(res.data.msg)
                  that.follows = false
                //  that.msg = '关注'
               })
          }
          
         
        }


    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style scoped lang='less'>
.letter {    
 min-height:100vh;
 background: #f5f5f5;
 box-sizing: border-box;
 .le-col{
   color:#FE6603;
 }
 .letter-head {
   color: #fff;
   width: 100%;
   box-sizing: border-box;
   background:linear-gradient(-10deg,rgba(254,102,3,1) 0%,rgba(255,168,0,1) 100%);
   padding: 0 30px 15px;
   .head-nav {
     height: 90px;
     line-height: 90px;
     text-align: center;
      font-size: 36px;
      color: #fff;
      overflow: hidden;
      position: relative;
      .head-left {
        font-size: 40px;
        position: absolute;
        left: 0;
        top: 50%;
        color: #fff;
        transform: translateY(-50%);
     }
     .head-right {
        font-size: 40px;
        position: absolute;
        right: 0;
        top: 50%;
        color: #fff;
        transform: translateY(-50%);
     }
   }
    .head-name {
       display: flex;
       justify-content: space-between;
       align-items: center;
       font-size: 36px;
       height: 110px;
       border-bottom: 1PX solid #fff;
       .head-collct {
         font-size: 32px;
         padding: 2px 15px;
         border: 1PX solid #fff;
         border-radius:8px;
       }
     }
     .head-over {
       max-width: 80%;
       overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
     }
     .head-color {
        color: #fff;
     }
     .head-text {
       font-size:24px;
       line-height:52px;
     }
     .head-app {
       font-size: 24px;
       color: #fff;
       font-weight: 550;
       margin-left: 20px;
     }
 }
 .letter-de {
   background-color: #f5f5f5;
  //  .letter-lead {
  //    font-size: 28px;
  //    color:#FE6603;
  //    margin-bottom: 40px;
  //    .person {
  //      font-size: 24px;
  //      color:#999;
  //      margin-left: 15px;
  //    }
  //  }
  //  .letter-iphone {
  //    font-size: 28px;
  //    display: flex;
  //    align-items: center;
  //    margin-bottom: 40px;
  //    i {
  //      font-size: 36px;
  //      color:#FE6603;
  //    }
  //    .iphone {
  //      margin-left: 16px;
  //      margin-right: 36px;
  //      color:#FE6603;
  //    }
  //  }
  //  .letter-url {
  //    font-size: 28px;
  //    display: flex;
  //    align-items: center;
  //    box-sizing: border-box;
  //    color:#666;
  //    i {
  //      font-size: 36px;
  //      margin-right: 15px;
  //    }
  //    p {
  //      width: 100%;
  //      overflow: hidden;
  //      text-overflow:ellipsis;
  //      white-space: nowrap;
  //    }
  //  }
 }
 .letter-nav {
   height: 96px;
   background-color: #fff;
  //  padding: 0 32px;
   overflow-x:scroll;
   line-height: 96px;
   border-bottom: 1PX solid #F2F2F2;
    div{
      width: 126%;
      span{
        width: 14%;
        display: inline-block;
        text-align: center;
      }
      .active{
        color: #FE6603
      }
    }
   
 }
}
  
</style>
