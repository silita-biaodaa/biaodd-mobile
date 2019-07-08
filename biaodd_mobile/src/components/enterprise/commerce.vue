<!-- 模型： DOM 结构 -->
<template>
    <div class="commerce">
      <template v-if="isajax">
        <template v-if="isError">
          <v-not :isError="isError"></v-not>
        </template>
        <template v-else>
              <div class="com-rush" >
                <div> 
                  更新时间：{{formatDate(detail.updated*1,1)}}
                </div>
                <div class="rush-right" @click="update" >
                  更新
                </div>
              </div>
              <div class="com-basic" @click="isinfo = !isinfo"  :class="isinfo ? 'hide-in' : 'show-in'" >
                <div class="ba-title">
                   <div class="all-cen" >
                     <img src="../../assets/icon-jibxx.png.png"  class="img-bas" alt="">
                     <span>基本信息</span>
                   </div>
                   <div   >
                     <van-icon name="arrow-down"  v-if="isinfo" />
                     <van-icon name="arrow-up" v-else />
                   </div>
                </div>
                <ic-infor :obj='detail' ></ic-infor>
              </div>

              <div class="com-basic"   :class="isbranch ? 'hide-in' : 'show-in'" >
                <div class="ba-title" @click="isbranch = !isbranch"  >
                   <div class="all-cen" >
                     <img src="../../assets/icon-fenzhjg.png.png"  class="img-bch" alt="">
                     <span>分支机构</span>
                   </div>
                   <div   >
                     <van-icon name="arrow-down"  v-if="isbranch" />
                     <van-icon name="arrow-up" v-else />
                   </div>
                </div>
                <ic-br v-for="(el,i) in lists" :key="i"  :obj='el' :isVip='isVip'  ></ic-br>
                <div class="com-app" v-show="lists.length ==2" >
                    <button @click.stop="sureFn" >打开APP，查看更多分支机构信息</button>
                </div>
                <div class="com-hint"  v-show="lists.length == 0 " >
                  Sorry，暂未查询到该公司的分支机构
                </div>
              </div>

              <div class="com-basic"  :class="isgu ? 'hide-in' : 'show-in'" >
                <div class="ba-title"   @click="isgu = !isgu" >
                   <div class="all-cen" >
                     <img src="../../assets/icon-g.png.png"  class="img-gu" alt="">
                     <span>股东信息</span>
                   </div>
                   <div   >
                     <van-icon name="arrow-down"  v-if="isgu" />
                     <van-icon name="arrow-up" v-else />
                   </div>
                </div>
                <ic-gu v-for="(el,i) in listG" :key="i" :i='i' :obj='el' ></ic-gu>
                 <div class="com-hint"  v-show="listG.length == 0 " >
                  Sorry，暂未查询到该公司的股东信息
                 </div>
              </div>

              <div class="com-basic" @click="ismain = !ismain"  :class="ismain ? 'hide-in' : 'show-in'" >
                <div class="ba-title"   >
                   <div class="all-cen" >
                     <img src="../../assets/icon-gud.png.png"  class="img-main" alt="">
                     <span>主要人员</span>
                   </div>
                   <div   >
                     <van-icon name="arrow-down"  v-if="ismain" />
                     <van-icon name="arrow-up" v-else />
                   </div>
                </div>
                <ic-main v-for="(el,i) in listM" :key="i"  :obj='el' ></ic-main>
                <div class="com-hint"  v-show="listM.length == 0 " >
                  Sorry，暂未查询到该公司的主要人员
                 </div>
              </div>

              <div class="com-basic" @click="isalter = !isalter"  :class="isalter ? 'hide-in' : 'show-in'" >
                <div class="ba-title"   >
                   <div class="all-cen" >
                     <img src="../../assets/icon-bgjl.png.png"  class="img-chce" alt="">
                     <span>变更记录</span>
                   </div>
                   <div   >
                     <van-icon name="arrow-down"  v-if="isalter" />
                     <van-icon name="arrow-up" v-else />
                   </div>
                </div>
                <ic-alter v-for="(el,i) in listAl" :key="i"  :obj='el' ></ic-alter>
                <div class="com-app" v-show="listAl.length ==2" >
                    <button @click.stop="sureFn" >打开APP，查看更多变更记录信息</button>
                </div>
                <div class="com-hint"  v-show="listAl.length == 0 " >
                  Sorry，暂未查询到该公司的变更记录
                 </div>
              </div>

               <div class="com-basic" @click="isyear = !isyear"  :class="isyear ? 'hide-in' : 'show-in'" >
                <div class="ba-title"   >
                   <div class="all-cen" >
                     <img src="../../assets/icon-qynb.png.png"  class="img-chce" alt="">
                     <span>企业年报</span>
                   </div>
                   <div   >
                     <van-icon name="arrow-down"  v-if="isyear" />
                     <van-icon name="arrow-up" v-else />
                   </div>
                </div>
                <div class="com-year" v-for="(el,i) in listYe" :key="i"  @click="toYear(el)"  >
                  <div>
                    {{el.years}}年度
                  </div>
                  <van-icon name="arrow" />
                </div>
                <div class="com-hint"  v-show="listYe.length == 0 " >
                  Sorry，暂未查询到该公司的企业年报
                 </div>
              </div>

              <div class="com-basic" @click="ispunish = !ispunish"  :class="ispunish ? 'hide-in' : 'show-in'" >
                <div class="ba-title"   >
                   <div class="all-cen" >
                     <img src="../../assets/icon-xzchf.png.png"  class="img-chce" alt="">
                     <span>行政处罚</span>
                   </div>
                   <div   >
                     <van-icon name="arrow-down"  v-if="ispunish" />
                     <van-icon name="arrow-up" v-else />
                   </div>
                </div>
                <ic-pun v-for="(el,i) in listPun" :key="i"  :obj='el'  ></ic-pun>
                <div class="com-app" v-show="listPun.length ==2" >
                    <button @click.stop="sureFn" >打开APP，查看更多行政处罚信息</button>
                </div>
                <div class="com-hint"  v-show="listPun.length == 0 " >
                  Sorry，暂未查询到该公司的行政处罚
                 </div>
              </div>

        </template>
        
      </template>
      <template v-else>
        <van-loading size="50px"></van-loading>
      </template>
        <v-vip :mask="isvip1" :txt="'开通会员才能更新企业详情'" @canel="fwCanelFn"></v-vip>
    </div>
</template>
<script>
import not from '@/components/not'
export default {
    name: 'commerce', // 结构名称
    data() {
        return {
            // 数据模型
            detail:{},
            id:'',
            name:'',
            lists:[],
            listG:[], // 股东信息
            listM:[], // 主要人员
            listAl:[], // 变更记录
            listYe:[], //年报
            listPun:[], // 行政
            total:0,
            isajax:false,//是否加载完
            isError:false,//是否加载失败
            isVip:false,
            isinfo:true, // 基本信息下拉
            isbranch:true,  // 分支机构
            isgu:true, //股东信息
            ismain:true, //主要人员
            isalter:true, //变更记录
            isyear:true, //企业年报
            ispunish:true, // 行政处罚
            isvip1:false,
        }
    },
    watch: {
        // 监控集合 
    },
    props: {
        // 集成父级参数
     
    },
    components:{
      'v-not':not
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
        if(sessionStorage.getItem('permissions')){
          let vipstr=sessionStorage.getItem('permissions');
          if(vipstr.indexOf('comPhone')!=-1){
            this.isVip=true;
          }
        }
         this.id = this.$route.query.id
         let that=this;
            this.$http({
                method:'post',
                url: '/company/' + that.id,
                data:{
                   
                }
            }).then(function(res){
                that.detail = res.data.data
                 that.isajax=true;
                var arr = []
                if(that.detail.phone) {
                  arr = that.detail.phone.split(';')
                  that.detail.phone = arr[0];
                }                
               
             }).catch(function(res){
                that.isajax=true;
                that.isError=true;
            })
           this.$http({
                method:'post',
                url: '/company/branchCompany',
                data:{
                   comId:that.id
                }
            }).then(function(res){
                that.lists = res.data.data  
                that.total = that.lists.length
                if(that.lists.length > 2) {
                  that.lists.length = 2
                }
                var arr = []
                that.lists.forEach(el => {
                    if(el.phone) {
                       arr = el.phone.split(';')
                       el.phone = arr[0]
                       arr.length =0
                    }
                })
               
             }).catch(function(res){
                that.isajax=true;
                that.isError=true;
            })   
            this.gainG()
            this.gainM()
            this.gainAl()
            this.gainYe()
            this.gainPu()
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
      resetPhone(phone) {
        var str = String(phone)
        var len = str.length;
        if (len >= 7) {
            var reg = str.slice(-8, -4)
            return str.replace(reg, "****")
        }
      },
      sureFn(){
           window.location.href='https://a.app.qq.com/o/simple.jsp?pkgname=com.yaobang.biaodada';
      },
       fwCanelFn(){
          this.isvip1=false
        },
      gainG() {
        let that=this;
            this.$http({
                method:'post',
                url: 'gs/info' ,
                data:{
                   comId:that.id,
                   paramter:'partner'
                }
            }).then(function(res){
                that.listG = res.data.data ? res.data.data :[];
             }).catch(function(res){
                that.isajax=true;
                that.isError=true;
            })
      },
       gainM() {
        let that=this;
            this.$http({
                method:'post',
                url: 'gs/info' ,
                data:{
                   comId:that.id,
                   paramter:'personnel'
                }
            }).then(function(res){
                that.listM = res.data.data ? res.data.data : []
             }).catch(function(res){
                that.isajax=true;
                that.isError=true;
            })
      },
       gainAl() {
        let that=this;
            this.$http({
                method:'post',
                url: 'gs/info' ,
                data:{
                   comId:that.id,
                   paramter:'changeRecord'
                }
            }).then(function(res){
                that.listAl =res.data.data ? res.data.data : []
                if(that.listAl.length > 2) {
                  that.listAl.length = 2
                }
             }).catch(function(res){
                that.isajax=true;
                that.isError=true;
            })
      },
      gainYe() {
        let that=this;
            this.$http({
                method:'post',
                url: 'gs/report/years' ,
                data:{
                   comId:that.id,
                }
            }).then(function(res){
                that.listYe = res.data.data ? res.data.data : []
             }).catch(function(res){
                that.isajax=true;
                that.isError=true;
            })
      },
      gainPu() {
        this.name = this.$route.query.name
        let that=this;
            this.$http({
                method:'post',
                url: 'gs/info' ,
                data:{
                   comId:that.id,
                    paramter:'punish'
                }
            }).then(function(res){
                that.listPun = res.data.data ? res.data.data : []
                if(that.listPun.length > 2) {
                  that.listPun.length = 2
                }
             }).catch(function(res){
                that.isajax=true;
                that.isError=true;
            })
      },
      toYear(o) {
          this.$router.push({path:'/annals',query:{id:o.comId,year:o.years}})
      },
      update() {
        if( !sessionStorage.getItem('permissions')) {
           return  this.isvip1 = true
        }
        let that=this;
            this.$http({
                method:'post',
                url: '/updated/company' ,
                data:{
                   comId:that.id,
                   comName:that.name
                }
            }).then(function(res){
               that.$toast(res.data.msg)
                // that.listPun = res.data.data ? res.data.data : []
                // if(that.listPun.length > 2) {
                //   that.listPun.length = 2
                // }
             }).catch(function(res){
                that.isajax=true;
                that.isError=true;
            })
      }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less'>
.commerce {
  background-color: #F5F5F5;
  .com-basic {
    background-color: #fff;
    border-bottom: 1PX solid #f2f2f2;
    margin-bottom: 15px;
    .bas-test {
      padding: 35px 35px 10px;
      font-size: 28px; 
      
      .bas-line {
        overflow: hidden;
        margin-bottom: 25px;
        display: flex;
       .bas-first {
           width: 25%;
           color:#999;
       }
       .bas-two {
           width: 74%;
       }
      }
    }
  }
  .branch {
    margin-bottom: 15px;
    padding: 0 35px;
    background-color: #fff;
  }
  .hide-in {
    height: 88px;
    overflow: hidden;
  }
  .show-in {
     height: auto;
  }
  
  .ba-title {
      height: 88px;
      // line-height: 88px;
      font-size: 28px;
      color:#333;
      padding: 0 35px;
      border-bottom: 1PX solid #f2f2f2;
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .img-bas {
        width: 35px;
        height: 40px;
        margin-right: 15px;
      }
      .img-bch {
        margin-right: 15px;
        width: 45px;
        height: 39px;
      }
      .img-gu {
         margin-right: 15px;
         width: 47px;
         height: 37px;
      }
      .img-main {
        margin-right: 15px;
         width: 42px;
         height: 35px;
      }
      .img-chce {
         margin-right: 15px;
         width: 38px;
      }
      .all-cen {
        display: flex;
        align-items: center;
      }
      i {
        font-size: 44px;
      }
    }
    .letter-title {
     margin:  0 35px;
     padding: 20px 0;
     border-bottom: 1PX solid #F2F2F2;
    .letter-name {
      font-size: 32px;
      color:#333;
      display: flex;
      align-items: center;
      margin-bottom: 27px;
      p {
        // max-width: 550px;
        overflow: hidden;
        text-overflow:ellipsis;
        // white-space: nowrap;
        display: -webkit-box;
        -webkit-line-clamp: 2;
      }
    }
     .letter-save {
       height: 39px;
       width: 70px;
       border: 1px solid #CF6D2B;
       color:#CF6D2B;
       border-radius: 8px;
       text-align: center;
       line-height: 39px;
       box-sizing: border-box;
       margin-left: 29px;
     }
   } 
    .letter-lead {
     font-size: 28px;
     color:#333333;
     margin-bottom: 20px;
     box-sizing: border-box;
     display: flex;
     .person {
       font-size: 28px;
       color: #ccc;
     }
   }
   .com-app {
     height: 150px;
     display: flex;
     align-items: center;
     justify-content: center;
     button {
       width:520px;
       height:72px;
       border:1px solid rgba(254,102,3,1);
       border-radius:36px;
       background-color: #fff;
       color: #FE6603;
       font-size: 28px;
     }
  }
  .com-year {
    height: 88px;
    font-size: 28px;
    border-bottom: 1PX solid #F2F2F2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding:  0 30px;
    i {
      font-size: 45px;
    }
  } 
  .com-hint {
    height: 150px;
    line-height: 150px;
    color:#ccc;
    font-size: 28px;
    text-align: center;
  }
  .com-rush {
    height: 88px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 24px;
    padding: 0 30px;
    .rush-right {
      text-align: center;
      line-height: 40px;
      color: #FE6603;
      width: 100px;
      border: 1PX solid #FE6603;
      border-radius: 8px;
    }
  }
}
</style>
