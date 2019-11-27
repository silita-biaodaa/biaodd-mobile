<!-- 模型： DOM 结构 -->
<template>
    <div class="querylist">
        <!-- 符合资质列表 -->
       <div class="query-text" v-if="this.type == 1 " >
          <p class="p-one">{{obj.qualName}}</p>
          <p class="p-two" >{{obj.certNo}}</p>
          <p class="p-three" >发证机关：{{obj.certOrg}}</p>
          <p>有效日期：{{obj.validDate}}</p>
       </div>

       <div class="query-text"  v-if="this.type == 2 " >
          <p class="p-five">建筑装修装饰工程专业承包一级</p>
          <p class="p-three" >证书数量：4</p>
          <p class="p-three" >身份证号：4307122011……32</p>
          <p>证件类型：二级注册建筑师-建筑工程，公路工程…</p>
       </div>
        <div class="query-text"   v-if="this.type == 3 "  >
          <p class="p-one">建筑装修装饰工程专业承包一级</p>
          <p class="p-three p-yellow" >勘察</p>
          <p class="p-three" >项目金额：1200万元</p>
          <p>竣工时间：2011-11-11</p>
       </div>
        <div class="query-text" v-if="this.type == 4 "  >
          <p class="p-five">{{obj.level}}-{{obj.years}}年度</p>
          <p class="p-three" >评价类型：{{obj.creditType}}</p>
          <p v-if="ishow" >评价省份：{{obj.issueProvince}}</p>
           <p v-if="!ishow" >有效期至：{{obj.valied}}</p>
       </div>
       <!-- 公路, 水利 专查符合要求项目 -->
        <div class="query-text" v-if="this.type == 5 " @click="jumpwater"  >
          <p class="p-one">{{obj.proName}}</p>
          <p class="p-three" >项目金额：{{obj.amount}}万元</p>
          <p class="p-three" >竣工时间：{{obj.time}}</p>
          <p>主要工程量：{{obj.remark}}</p>
       </div>
         <!-- 住建专查符合要求项目 -->
        <div class="query-text" v-if="this.type == 7 " @click="jumpload" >
          <p class="p-one">{{obj.proName}}</p>
          <p class="p-three p-yellow" >{{obj.type}}</p>
          <p class="p-three" >项目金额：{{obj.amount}}万元</p>
          <p >竣工时间：{{obj.time}}</p>
       </div>
        <div class="query-text" v-if="this.type == 6 " @click="jump" >
          <p class="p-one">{{obj.name}}</p>
          <p class="p-three" >证书数量：{{obj.num}}</p>
          <p>身份证号：{{obj.idCard}}</p>
          <p>证件类型：{{obj.type}}</p>
       </div>
    </div>
</template>
<script>
export default {
    name: 'querylist', // 结构名称
    data() {
        return {
            // 数据模型
            ishow:true
        }
    },
    watch: {
        // 监控集合
    },
    props: {
        // 集成父级参数
        type:{
            default:1
        },
        obj:{
            default:{}
        }
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
        if(this.type == 5 || this.type == 7 ) {
            if(this.obj.buildEnd) {
                this.obj.time =  this.formatDate(this.obj.buildEnd)
            } else {
                this.obj.time = ''
            }
            
        }
      if(this.type == 5 ) {
            this.obj.time =  this.formatDate(this.obj.buildEnd)
        }
        if(this.$route.path == '/wayquery') {
            this.ishow = true
        } else {
            this.ishow = false
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
            sessionStorage.setItem('peoploDetail',JSON.stringify(this.obj))
            this.$router.push({path:'/peopleDetail'})
        },
        jumpload() {
            this.$router.push({path:'/zjDetail',query:{id:this.obj.proId}})
        },
        jumpwater() {
            if(this.$route.path == '/wayquery') {
                  this.$router.push({path:'/jtDetail',query:{id:this.obj.proId}})
            } else {
                 this.$router.push({path:'/slDetail',query:{id:this.obj.proId}})
            }
        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
.querylist {
    padding-top: 24px;
    // padding: 24px 0;
  .query-text {
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 18px 0px rgba(202,202,202,0.5);
    border-radius:10px;
    padding: 30px 24px ;
    font-size: 28px;
    // margin-bottom: 24px;
    p {
      width: 100%;  
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .p-one {
        margin-bottom: 10px;
        font-weight: 550;
    }
    .p-two {
        margin-bottom: 20px;
        font-size: 24px;
        color: #ccc;
    }
    .p-three {
        margin-bottom: 15px;
    }
    .p-five{
        margin-bottom: 25px;
        font-weight: 550;
    }
    .p-yellow{
        width:70px;
        height:36px;
        background:rgba(253,239,227,1);
        text-align: center;
        line-height: 36px;
        color: #EF873A;
        font-size: 20px;
    }
  }
}
</style>
