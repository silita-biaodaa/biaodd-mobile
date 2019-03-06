<!-- 招标 -->
<template>
    <div class="detail">
        <div class="top-nav">
            招标详情
        </div>
        <div class="detail-text">
          <div class="detail-title">
             <p>公告标题： 湖南郴电国际发展股份有限公司的公告标题湖南郴电国际发展股份有限公司的…</p>
             <div class="detail-time">
                <div class="de-size" >
                    发布时间：2019-01-22
                </div>
                <div class="de-size" >
                    点击次数：30
                </div>
             </div>
             <div class="detail-time" >
                <div class="det-size" >
                    项目地区：湖南
                </div>
                <div class="det-size">
                    评标办法：综合评估法
                </div>
             </div>
             <div class="det-size m-15">
                 资质要求：建筑工程施工总承包三级及以上，建筑工程施工总承包三级及以上
             </div>
          </div>
          <div class="detail-cli">
             <div>
                符合资质企业
             </div>
             <div>
                 >
             </div>
          </div>
          <div class="detail-cli">
             <div>
                访问原文出处
             </div>
             <div>
                 >
             </div>
          </div>
          <div class="detail-contant">
             公告原文：
             
             一、招标条件
             
             本招标项目湖南郴电国际发展股份有限公司郴州市自来水有限责任公司哈夫节、管卡及三氯化铁采购（第二次）已由郴州市发展和改革委员会以郴发改核［2010］22号文件批准为公开招标，资金来源为自筹。招标人为郴州市自来水有限责任公司，招标代理机构为陕西国正建设工程项目管理有限责任公司，项目已具备招标条件，现对该项目进行公开招标。
             
             二、项目概况与招标范围
             
             2.1、项目名称：湖南郴电国际发展股份有限公司郴州市自来水有限责任公司哈夫节、管卡及三氯化铁采购（第二次）
             2.2、招 标 人：郴州市自来水有限责任公司
             2.3、招标编号：SXGZ-CZGC2018-023
             2.4、项目规模：286.5万元
             湖南省招标有限责任公司岳阳分公司受岳阳市王家河流域综合治理工程项目管理办公室的委托，代理岳阳市王家河流域综合治理工程施工监理招标，2018年11月19日09时00分（北京时间）在岳阳市公共资源交易中心进行了公开开标，在岳阳市水务局监督下，依法组建的评标委员会按照招标文件确定的评标原则和评标办法进行了细致的评审，推荐本项目中标候选人排名如下：
             
             2.5、招标范围：第一包：哈夫节与管卡（66.5万元）第二包：三氯化铁（220万元）  
          </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'templateName', // 结构名称
    data() {
        return {
            // 数据模型
            id:'',
            source:''
        }
    },
    watch: {
        // 监控集合
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
        let that=this;
        this.$http({
            method:'post',
            url: '/notice/detail/' + that.id,
            data:{
                source:that.source,
                type: "0"
            }
        }).then(function(res){
            that.zbList=res.data.data;
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
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style scoped lang="less" >
.detail {
 position: absolute;
 top: 0;
 left: 0;
 right: 0;
 bottom: 0;
 .top-nav {
   height: 90px;
   width: 100%;
   background-color: #FE6603;
   line-height: 90px;
   text-align: center;
   color:#fff;
   font-size: 36px;
   position: fixed;
   top: 0;
   left: 0;
 }
 .detail-text {
   margin-top: 91px;
   height: calc(~"100% - 101px");
   overflow-x: hidden;
   overflow-y: auto;
   font-size: 32px;
   color:#333;
   .detail-title {
     padding: 35px;
     p {
       overflow: hidden;
       text-overflow:ellipsis;
       white-space: nowrap;
     }
     .detail-time {
        display: flex;
        justify-content: space-between;
        margin-top: 23px;
        .de-size {
          font-size: 20px;
          color:#999;
        }
        
     }
     .det-size {
           font-size: 24px;
           color:#666; 
      }
      .m-15 {
          margin-top: 15px;
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
   }
   .detail-contant {
     padding: 35px;
     font-size: 28px;
     color:#999;
   }
 }
}
</style>
