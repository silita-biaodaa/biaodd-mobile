<!-- 模型： DOM 结构 -->
<template>
    <div class="zjDetail">
      <top-back :title="'业绩详情'"></top-back>
      <div class="letter-de">
        <!-- 上 -->
        <div class="content">
          <h5>{{detail.proName}}</h5>
          <p>
              <span class="tit-txt">项目类型</span>
              <span class="val-txt">{{detail.proType}}</span>  
          </p>
          <p>
              <span class="tit-txt">建设单位</span>
              <span class="val-txt">{{detail.proOrg}}</span>  
          </p>
          <p>
              <span class="tit-txt">投资总额</span>
              <span class="val-txt">{{detail.investAmount}}万</span>  
          </p>
          <p>
              <span class="tit-txt">立项级别</span>
              <span class="val-txt">{{detail.proLevel}}</span>  
          </p>
          <p>
              <span class="tit-txt">建设性质</span>
              <span class="val-txt">{{detail.buildType}}</span>  
          </p>
          <p>
              <span class="tit-txt">面&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp积</span>
              <span class="val-txt">{{detail.acreage}}</span>  
          </p>
          <p>
              <span class="tit-txt">所在地区</span>
              <span class="val-txt">{{detail.proWhere}}</span>  
          </p>
          <p>
              <span class="tit-txt">工程用途</span>
              <span class="val-txt">{{detail.proUse}}</span>  
          </p>
          
        </div>
        <!-- nav及nav以下 -->
        <div class="letter-nav">
          <div>
              <span v-for="(o,i) of navList" :key="i" :class="navNum==i?'active':''" @click="jump(i)">{{o}}</span>
          </div>
        </div>
        <div class="letter-detail">
            <template>
              <!-- 招投标 -->
              <v-list :type="navNum"></v-list>
            </template>
        </div>

      </div>
    </div>
</template>
<script>
import topBack from '@/components/topback'
import list from '@/components/yj/list'
export default {
    name: 'zjDetail', // 结构名称
    data() {
        return {
            // 数据模型
             detail:{},
             navList:['招投标','施工图审查','合同备案','施工许可','竣工备案'],
             navNum:0,
             isload:true,
             vipStr:'',
             isvip:false,
             id:''
            //  path:'/commerc'
        }
    },
    watch: {
        // 监控集合
    },
    components: {
      'top-back':topBack,
      'v-list':list,
    },
    props: {
        // 集成父级参数
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
        if(sessionStorage.getItem('permissions')){
          this.vipStr=sessionStorage.getItem('permissions');
        }
        this.id = this.$route.query.id
        let that=this;
        this.$http({
            method:'post',
            url: '/project/detail',
            data:{
                id:this.id
            }
        }).then(function(res){
            that.detail = res.data.data;
            sessionStorage.setItem('proname',res.data.data.proName)
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
        jump(i){
          this.navNum=i
        }

    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style scoped lang='less'>
.zjDetail {    
  padding-top: 100px;
  min-height:100vh;
  background: #f5f5f5;
  box-sizing: border-box;
  .le-col{
    color:#FE6603;
  }
  .letter-de {
    background-color: #f5f5f5;
  }
}
.content{
  padding: 36px 32px;
  margin-bottom: 16px;
  background: #fff;
  box-shadow:0px 3px 9px 1px rgba(4,0,0,0.1);
  h5{
    color: #333333;
    font-size: 32px;
    margin-bottom: 36px
  }
  p{
    font-size: 28px;
    margin-bottom: 23px;
    .tit-txt{
      color: #999;
      margin-right: 32px;
      width: 112px;
      display: inline-block;
      text-align-last: justify;
    }
    .val-txt{  
      color: #333;
    }
  }
}


.letter-nav {
  height: 96px;
  background-color: #fff;
//  padding: 0 32px;
  overflow-x:scroll;
  box-shadow:0px 3px 9px 1px rgba(4,0,0,0.1);
  line-height: 96px;
  border-bottom: 1PX solid #F2F2F2;
  div{
    width: 126%;
    span{
      min-width: 20%;
      display: inline-block;
      text-align: center;
    }
    .active{
      color: #FE6603
    }
  }
   
}

  
</style>
