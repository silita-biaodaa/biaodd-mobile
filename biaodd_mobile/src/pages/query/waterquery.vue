<!-- 模型： DOM 结构 -->
<template>
    <div class="query">

      <div class="letter-head" >
        <div class="head-nav" >
          <van-icon name="arrow-left" class="head-left" @click="$router.go(-1)" />
          水利信息查询详情
        </div>
        <div class="head-name " >
          <div class="head-color head-over " >{{obj.comName}}</div>
        </div>
        <div class="head-text" style="marginTop:15px;" >
           <span class="head-color" >统一社会信用代码:</span>
           <span  class="head-color">&nbsp{{obj.creditCode}}</span>
        </div>
        <div class="head-text head-color" >
           <span  class="head-color">法定代表:</span>
           <span  class="head-color">&nbsp{{obj.legalPerson}}</span>
        </div>
        <div class="head-text head-color" >
           <span  class="head-color">企业电话:</span>
           <span  class="head-color">&nbsp{{phone}}</span>
        </div>
        <div class="head-text head-color" >
           <span  class="head-color">企业地址:</span>
           <span  class="head-color">&nbsp{{obj.comAddress}}</span>
        </div>
      </div>

       <div class="letter-de">
          <van-tabs :swipe-threshold="2" >
            <van-tab v-for="(el,i) in navList" :title="el.name + '(' + el.number +')'" :key="i">
                <q-zz  v-if="el.name.indexOf('资质') >= 0 "  ></q-zz>
                <q-people  v-if="el.name.indexOf('人员') >= 0"></q-people>
                <q-credit v-if="el.name.indexOf('信用') >= 0" ></q-credit>
                <q-pro v-if="el.name.indexOf('项目') >= 0"  ></q-pro>
            </van-tab>
          </van-tabs>
      </div>
      <v-load v-if="isload"></v-load>
    </div>
</template>
<script>
import queryzz from '@/pages/query/queryzz'
import querypeople from '@/pages/query/querypeople'
import credit from '@/pages/query/credit'
import querypro from '@/pages/query/querypro'
import loading from '@/components/loading'
export default {
    name: 'query', // 结构名称
    data() {
        return {  
            // 数据模型
             navList:[
             ],
             data:{ 
               comId:'',
               type:'detail',
               orderNo:''
             },
             obj:{

             },
             phone:'',
             isload:true
        }
    },
    watch: {
        // 监控集合
    },
    props: {
        // 集成父级参数
    },
    components: {
       'q-zz':queryzz,
       'q-people':querypeople,
       'q-credit':credit,
       'q-pro':querypro,
        'v-load':loading,
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
        this.data.comId = this.$route.query.id
        this.data.orderNo = this.$route.query.orderNo
        this.gainList()
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
        gainList() {
            let that=this;
            this.$http({
                method:'post',
                url: '/gonglu/zhauncha/detail/company',
                data:that.data
            }).then(function(res){
                if(res.data.code==1){
                   that.obj = res.data.data
                   if(that.obj.phone) {
                      that.phone = that.obj.phone.split(';')[0]
                   }
                    if( that.obj.qualCount > 0) {
                     that.navList.push({
                        name:'企业资质',
                        number:that.obj.qualCount,
                        show:false
                     })
                   }
                    if( that.obj.personCount > 0) {
                     that.navList.push({
                        name:'符合要求人员',
                        number:that.obj.personCount,
                        show:false
                     })
                   }
                   if( that.obj.projectCount > 0) {
                     that.navList.push({
                        name:'符合要求项目',
                        number:that.obj.projectCount,
                        show:false
                     })
                   }
                  if( that.obj.creditCount > 0) {
                     that.navList.push({
                        name:'信用等级',
                        number:that.obj.creditCount,
                        show:false
                     })
                   }
                    that.isload = false
                  } else {
                     that.isload= true
                  }
              }).catch(function(req) {
                  that.isload=true
              })
        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
.query {
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
  //  el
 }
 .letter-nav {
   height: 96px;
   background-color: #fff;
  //  padding: 0 32px;
   overflow-x:scroll;
   overflow-y: hidden;
   line-height: 96px;
   border-bottom: 1PX solid #F2F2F2;
    div{
      width: 150%;
      padding: 0 34px;
      span{
        text-align: center;
        box-sizing: border-box;
        font-size: 32px;
        padding-right: 34px;
        color: #999999;
      }
    }
     .active{
        color: #FE6603 
      }
   
 }

}
</style>
