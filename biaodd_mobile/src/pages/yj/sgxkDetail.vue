<!-- 模型： DOM 结构 -->
<template>
    <div class="sgxkDetail">
      <top-back :title="'施工许可详情'"></top-back>
      <div class="letter-de">
        <!-- 上 -->
        <div class="content">
            <h5>{{detail.proName}}</h5>
            <p>
                <span class="tit-txt">施工许可证编号</span>
                <span class="val-txt">{{detail.blicence}}</span>  
            </p>
            <p>
                <span class="tit-txt">合同金额</span>
                <span class="val-txt">{{detail.amount}} 万</span>  
            </p>
            <p>
                <span class="tit-txt">面&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp积</span>
                <span class="val-txt">{{detail.area}} ㎡</span>  
            </p>
            <p>
                <span class="tit-txt">发证日期</span>
                <span class="val-txt">{{detail.licenceDate}}</span>  
            </p>
            <p>
                <span class="tit-txt">项目经理</span>
                <span class="val-txt">{{detail.pmName}}</span>  
            </p>
            <p>
                <span class="tit-txt">项目总监</span>
                <span class="val-txt">{{detail.pdName}}</span>  
            </p>
        </div>
        <!--企业主体信息 -->
        <div class="box" v-if="detail.companys&&detail.companys.length>0">
            <h5>企业主体信息</h5>
            <ul>
                <li :key="i">
                    <h4>{{detail.companys.comName}}</h4>
                </li>
            </ul>
        </div>
      </div>
    </div>
</template>
<script>
import topBack from '@/components/topback'
export default {
    name: 'sgxkDetail', // 结构名称
    data() {
        return {
            // 数据模型
             detail:{
             },
             id:'',
            //  path:'/commerc'
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
        this.id = this.$route.query.id
        let that=this;
        this.$http({
            method:'post',
            url: '/project/list/detail',
            data:{
                proId:this.$route.query.proId,
                pkid:this.id,
                tabType:'build',
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
.sgxkDetail {    
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
      text-align-last: justify;
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
.box{
    h5{
        padding: 0 32px;
        color: #999;
        font-size: 28px;
        font-weight: normal;
        line-height: 80px;
    }
    ul{
        li{
            padding: 28px 32px;
            background: #fff;
            border-bottom: 1PX solid #F0F0F0;
            h4{
                color: #4D3A3A;
                font-size: 32px;
                padding-bottom: 28px;
            }
            p{
                margin-bottom: 22px;
            }
            p:last-child{
                margin-bottom: 0
            }
            // .val-txt{
            //     color: #333;
            //     font-weight: bold;
            // }
        }
    }
}

  
</style>
