<!-- 模型： DOM 结构 -->
<template>
  <div class="winning">
    <top-back :title='name' :isFollow="true" :id="id" :type="'zhongb'" :collected="collected" :source="source" :collect="detail.type" ></top-back>
    <div class="win-text">
      <div class="win-title">
        <p>
          {{detail.title}}
        </p>
        <div class="win-time">
          <div class="win-c" >
            发布时间：{{detail.openDate}}
          </div>
          <div class="win-c">
            浏览量：<span class="color" >{{clickCount}}</span>
          </div>
          <div class="win-c" @click="tocomment" >
            评论数：<span class="color" >{{commentLength}}</span>
          </div>
        </div>
        <div class="win-one">
            第一候选人：{{detail.oneName? detail.oneName : '详见原文'}}
          </div>
          <div class="win-one" >
            中标金额：{{detail.oneOffer ? detail.oneOffer + '万' : '详见原文'}} 
          </div>
      </div>
      <div class="win-to" @click="jump" >
        <div>
          访问原文出处
        </div>
        <div >
            <van-icon name="arrow" />
        </div>
      </div>
      <!-- 相关公告 -->
       <div   :class="this.corrShow ? 'showHei' : 'hideHei'" >
         <div  @click.stop="tocorr" class="win-to" :class="this.num ==0 ? 'current' : ''"  >
            <div>
              相关公告 ({{num}})
            </div>
            <div >
                <van-icon name="arrow" />
            </div>
         </div> 
         <!-- <corr-list :corrList='corrList'    ></corr-list> -->
      </div>
      <div class="win-contant" v-html="detail.content"  >

      </div>
    </div>
    <!-- 相关公告组件 -->
    <re-levant  v-if="rele" @closeLe='closeRele' ></re-levant>
    <!-- 评论 -->
    <v-comment :type="'zhongbiao'" id="divId"  @comlength="comFn"></v-comment>
  </div>
</template>
<script>
import topBack from '@/components/topback'
import comment from '@/components/comment'
export default {
    name: 'winning', // 结构名称
    data() {
        return {
            // 数据模型
            name:'中标详情',
            detail:{},
            clickCount:0,
            id:'',
            source:'',
            collected:false,
            commentLength:0,
            num:0,
            corrList:[],
            corrShow:false,
            rele:false
        }
    },
    watch: {
        // 监控集合
          $route: {
            handler: function(val, oldVal){
                this.id = this.$route.query.id
                this.source = this.$route.query.source
                this.gainText()
                this.gainCorr()
                this.closeRele()
                this.corrShow = false
          },
            deep: true
          }
    },
    components: {
      'top-back':topBack,
      'v-comment':comment    
    },
    props: {
        // 集成父级参数
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
        this.id = this.$route.query.id
        this.source = this.$route.query.source
        this.gainText()
        this.gainCorr()
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
             window.location.href =this.detail.url
        },
        comFn(e){
            this.commentLength=e
        },
        tocomment() {
           if(this.commentLength == 0) {
                return
            }
            document.getElementById("divId").scrollIntoView(true);
                var dis = 0
                if(document.documentElement.scrollTop) {
                    dis = document.documentElement.scrollTop -100 
                    document.documentElement.scrollTop = dis
                } else {
                    dis = document.body.scrollTop -100 
                    document.body.scrollTop  = dis
                }
          
        },
       tocorr() {
           if(this.num == 0 ) {
               return
           }
           this.rele = true
           this.modalHelper.afterOpen();
        },
        closeRele() {
           this.rele = false
           this.modalHelper.beforeClose();
        },
        formNew() {
           setTimeout(() => {
                 if(this.$route.query.key) {
                  this.tocomment()
                }
            }, 600);
         
        },
        gainText() {
           let that=this;
           this.$http({
               method:'post',
               url: '/newnocite/nociteDetails/' + that.id,
               data:{
                   source:that.source,
                   type: "2"
               }
           }).then(function(res){
              that.detail = res.data.data
              that.collected=res.data.data.collected
              if(that.detail.oneName&&sessionStorage.getItem('isVip') == 'false'){
                   that.detail.oneName=that.getPassOnename(that.detail.oneName);
               }
               if(that.detail.oneOffer&& sessionStorage.getItem('isVip') == 'false'){
                   that.detail.oneOffer=that.getPassOneoffer(that.detail.oneOffer);
               }
              that.clickCount = res.data.clickCount
              that.formNew()
           })
        },
        gainCorr() {
            let that=this;
            this.$http({
                method:'post',
                url: '/newnocite/correlation/list',
                data:{
                    source:that.source,
                    ntId:that.id
                }
            }).then(function(res){
              if(res.data.code  ==1) {
                  that.corrList = res.data.data
                  that.num = that.corrList.length
              }
            })
        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style scoped lang="less" > 
.winning {
//  position: absolute;
//  top: 0;
//  left: 0;
//  right: 0;
//  bottom: 0;
padding-bottom: 101px;
background: #F8F8F8;
 .win-text {
   background: #fff;
   margin-top: 91px;
   min-height: calc(~"100vh - 101px");
   padding-bottom: 90px;
   overflow-x: auto;
   overflow-y: auto;
   .win-title {
     padding: 35px 35px 0;
     font-size: 32px;
     color:#333;
     border-bottom: 1PX solid #F5F5F5;
      p {
       text-align: center;
     }
     .win-time {
       display: flex;
       justify-content: space-between;
       margin-bottom: 20px;
       font-size: 20px;
       margin-top: 20px;
       .win-c {
          color:#999;
       }
     }
       .win-one {
        font-size: 24px;
        color:#666;
        margin-bottom: 10px;
      }
   }
   .winHei {
     height:auto !important ;
     border-bottom: 1PX solid #f5f5f5;
   }
   .hideHei {
     height: 88px;
     overflow: hidden;
      border-bottom: 1PX solid #f5f5f5;
   }
   .win-to {
     height: 88px;
     display: flex;
     align-items: center;
     justify-content: space-between;
     font-size: 32px;
     color:#333;
     padding: 0 35px;
     border-bottom: 1PX solid #f5f5f5;
     cursor: pointer;
   }
   .win-contant {
     padding: 35px;
   }
 }
 .current {
   opacity: 0.3;
 }
}
</style>
