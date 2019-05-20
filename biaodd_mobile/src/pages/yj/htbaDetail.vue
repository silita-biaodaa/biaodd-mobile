<!-- 模型： DOM 结构 -->
<template>
    <div class="htbaDetail">
      <top-back :title="'合同备案详情信息'"></top-back>
      <div class="letter-de">
        <!-- 上 -->
        <div class="content">
            <h5>{{proName}}</h5>
            <p>
                <span class="tit-txt">合同备案编号</span>
                <span class="val-txt">{{detail.recordCode}}</span>  
            </p>
            <p>
                <span class="tit-txt">承包单位</span>
                <span class="val-txt">{{detail.contractComName}}</span>  
            </p>
            <p>
                <span class="tit-txt">联合体承包单位</span>
                <span class="val-txt">{{detail.jointComName}}</span>  
            </p>
            <p>
                <span class="tit-txt">发包单位</span>
                <span class="val-txt">{{detail.letContractComName}}</span>  
            </p>
            <p>
                <span class="tit-txt">合同类别</span>
                <span class="val-txt">{{detail.proWhere}}</span>  
            </p>
            <p>
                <span class="tit-txt">合同分类</span>
                <span class="val-txt">{{detail.category}}</span>  
            </p>
            <p>
                <span class="tit-txt">合同金额</span>
                <span class="val-txt">{{detail.amount}}万元</span>  
            </p>
            <p>
                <span class="tit-txt">建设规模</span>
                <span class="val-txt">{{detail.buildScale}}</span>  
            </p>
            <p>
                <span class="tit-txt">合同签订日期</span>
                <span class="val-txt">{{detail.signDate}}</span>  
            </p>
        </div>
      </div>
    </div>
</template>
<script>
import topBack from '@/components/topback'
export default {
    name: 'htbaDetail', // 结构名称
    data() {
        return {
            // 数据模型
            proName:'',
             detail:{
             },
             id:'',
        }
    },
    watch: {
        // 监控集合
    },
    components: {
      'top-back':topBack,
    },
    props: {
        // 集成父级参数
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
        this.id = this.$route.query.id;
        this.proName=sessionStorage.getItem('proname');
        let that=this;
        this.$http({
            method:'post',
            url: '/project/list/detail',
            data:{
                proId:this.$route.query.proid,
                pkid:this.id,
                tabType:'contract'
            }
        }).then(function(res){
            that.detail = res.data.data;
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
<style scoped lang='less'>
.htbaDetail {    
    padding-top: 100px;
    min-height:100vh;
    background: #f5f5f5;
    box-sizing: border-box;
    .letter-de {
        background-color: #f5f5f5;
    }
}
.content{
    padding: 36px 32px;
    background: #fff;
    h5{
        color: #333333;
        font-size: 32px;
        margin-bottom: 36px
    }
}
p{
    font-size: 28px;
    display: flex;
    margin-bottom: 23px;
    .tit-txt{
      color: #999;
      margin-right: 32px;
      min-width: 112px;
      display: inline-block;
    }
    i{
        color: #999;
        font-size: 28px;
        font-style: normal;
    }
    .val-txt{  
      color: #333;
      max-width: calc(100% - 144px);
    }
}
</style>
