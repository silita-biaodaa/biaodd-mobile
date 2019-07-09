<!-- 招标 -->
<template>
    <div class="detail">
        <top-back :title='name' :isFollow="true" :id="id" :type="'zhaob'" :collected="collected" :source="source"></top-back>
        <!-- 详情内容 -->
        <div class="detail-text">
            <div class="detail-title">
                <p>{{detail.title}}</p>
                <div class="detail-time">
                    <div class="de-size" >
                        发布时间：{{detail.opendate}}
                    </div>
                    <div class="de-size" >
                        浏览量：<span class="color" >{{clickCount}}</span>
                    </div>
                    <div class="de-size" @click="tocomment" >
                        评论数：<span class="color" >{{commentLength}}</span>
                    </div>
                </div>
                <div class="detail-time" >
                    <div class="det-size" >
                            项目地区：{{detail.projDq}}
                        </div>
                        <div class="det-size">
                            评标办法：{{detail.pbMode?detail.pbMode:'详见原文'}}
                        </div>      
                </div>
                <div class="m-15">
                        资质要求：{{detail.zzRank ? detail.zzRank : '详见原文'}}
                </div>
            </div>
            <div class="detail-cli" @click="topush(detail)" :class="this.total == null ? 'current' : ''" >
                <div  >
                    符合资质企业
                </div>
                <div>
                    <van-icon name="arrow" />
                </div>
            </div>
            <div class="detail-cli" @click="jump" >
                <div>
                    访问原文出处
                </div>
                <div >
                    <van-icon name="arrow" />
                </div>
            </div>
            <div class="detail-contant" v-html="detail.content"  >
                
            </div>
        </div>
        <!-- 评论 -->
        <v-comment :type="'zhaobiao'" @comlength="comFn" id="divId"  ></v-comment>
    </div>
</template>
<script>
import topBack from '@/components/topback'
import comment from '@/components/comment'
export default {
    name: 'detail', // 结构名称
    data() {
        return {
            // 数据模型
            id:'',
            source:'',
            detail:{},
            clickCount:0,
            name:'招标详情',
            total:0,
            collected:false,
            commentLength:0
        }
    },
    watch: {
        // 监控集合
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
        this.gainD()
       
    
    },
    beforeMount() {
        // console.group('挂载前状态  ===============》beforeMount');
    },
    mounted() {
        // console.group('挂载结束状态===============》mounted');
        this.formNew()
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
         topush(o) {
             if(this.total == null) {
                 return 
             }
            this.$router.push({path:'/conform',query:{id:o.id,source:o.source}})
        },
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
        formNew() {
            setTimeout(() => {
                 if(this.$route.query.key) {
                  this.tocomment()
                }
            }, 600);
        },
        gainD() {
            let that=this;
            let str=sessionStorage.getItem('permissions');
            this.$http({
                method:'post',
                url: '/notice/detail/' + that.id,
                data:{
                    source:that.source,
                    type: "0"
                }
            }).then(function(res){
                that.total = res.data.relCompanySize 
                that.collected=res.data.data[0].collected
                that.detail = res.data.data[0]  
                that.detail.projDq = that.detail.projDq.substring(0,2)
                if(that.detail.zzRank&&(sessionStorage.getItem('permissions') == null || sessionStorage.getItem('permissions') == '')){
                    that.detail.zzRank=that.getPassCertificate(that.detail.zzRank);
                }
                if(that.detail.pbMode&&(sessionStorage.getItem('permissions') == null || sessionStorage.getItem('permissions') == '')){
                    that.detail.pbMode=that.getPassPbMode(that.detail.pbMode);
                }
                that.clickCount = res.data.clickCount    
            })
        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style   lang="less" scoped >
.detail {
//  position: absolute;
//  top: 0;
//  left: 0;
//  right: 0;
//  bottom: 0;
padding-bottom: 101px;
background: #F8F8F8;
 .detail-text {
     background: #fff;
   margin-top: 91px;
   min-height: calc(~"100vh - 101px");
   overflow-x: hidden;
   overflow-y: auto;
   font-size: 32px;
   color:#333;
   .detail-title {
     padding: 35px;
     p {
       text-align: center;
     }
     .detail-time {      
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        margin-bottom: 20px;
        .de-size {
          font-size: 20px;
          color:#999;
        }
        .det-size{
          font-size: 24px;
          color:#999;
        }
     }
      .m-15 {
        margin-top: 15px;
        font-size: 24px;
        color:#999;
      }
     
   }
   .detail-cli {
      height: 88px;
      line-height: 88px;
      font-size: 32px;
      color:#333;
      padding: 0 35px; 
      display: flex;
      justify-content: space-between;
      border-bottom: 1PX solid #F2F2F2;
      cursor: pointer;
   }
   .detail-contant {
     padding: 35px;
   }
 }
}
#app .detail .current {
    opacity: 0.3;
}
</style>
