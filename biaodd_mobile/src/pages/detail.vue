<!-- 招标 -->
<template>
    <div class="detail">
        <top-back :title='name'></top-back>
        <div class="detail-text">
          <div class="detail-title">
             <p>{{detail.title}}</p>
             <div class="detail-time">
                <div class="de-size" >
                    发布时间：{{detail.opendate}}
                </div>
                <div class="de-size" >
                    点击次数：{{clickCount}}
                </div>
             </div>
             <div class="detail-time" >
                   <div class="det-size" >
                        项目地区：{{detail.projDq}}
                    </div>
                    <div class="det-size">
                        评标办法：{{detail.pbMode}}
                    </div>      
             </div>
             <div class="m-15">
                    资质要求：{{detail.zzRank}}
             </div>
          </div>
          <div class="detail-cli" @click="topush(detail)" >
             <div>
                符合资质企业
             </div>
             <div>
                <van-icon name="arrow" />
             </div>
          </div>
          <div class="detail-cli">
             <div>
                访问原文出处
             </div>
            <a :href="detail.url" target="_blank" >
                 <van-icon name="arrow" />
             </a>
          </div>
          <div class="detail-contant" v-html="detail.content"  >
             
          </div>
        </div>
    </div>
</template>
<script>
import topBack from '@/components/topback'
export default {
    name: 'templateName', // 结构名称
    data() {
        return {
            // 数据模型
            id:'',
            source:'',
            detail:{},
            clickCount:0,
            name:'招标详情'
        }
    },
    watch: {
        // 监控集合
    },
    components: {
      'top-back':topBack  
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
           that.detail = res.data.data[0]
           console.log(res.data);
           
           that.detail.projDq = that.detail.projDq.substring(0,2)
           that.clickCount = res.data.clickCount
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
         topush(o) {
            this.$router.push({path:'/conform',query:{id:o.id,source:o.source}})
        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style   lang="less" scoped >
.detail {
 position: absolute;
 top: 0;
 left: 0;
 right: 0;
 bottom: 0;
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
   }
   .detail-contant {
     padding: 35px;
   }
 }
}
</style>
