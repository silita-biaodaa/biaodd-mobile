<!-- 模型： DOM 结构 -->
<template>
    <div class="jgbaDetail">
      <top-back :title="'竣工备案详情'"></top-back>
      <div class="letter-de">
        <!-- 上 -->
        <div class="content">
            <h5>{{proName}}</h5>
            <p>
                <span class="tit-txt">竣工备案编号</span>
                <span class="val-txt">{{detail.provCode}}</span>  
            </p>
            <p>
                <span class="tit-txt">实际造价</span>
                <span class="val-txt">{{detail.cost}}万元</span>  
            </p>
            <p>
                <span class="tit-txt">实际面积</span>
                <span class="val-txt">{{detail.area}}㎡</span>  
            </p>
            <p>
                <span class="tit-txt">结构体系</span>
                <span class="val-txt">{{detail.struct}}</span>  
            </p>
            <p>
                <span class="tit-txt">实际建设规模</span>
                <span class="val-txt">{{detail.buildScale}}</span>  
            </p>
            <p>
                <span class="tit-txt">实际开工日期</span>
                <span class="val-txt">{{detail.buildStart}}</span>  
            </p>
            <p>
                <span class="tit-txt">实际竣工验收日期</span>
                <span class="val-txt">{{detail.buildEnd}}</span>  
            </p>
        </div>
        <!--企业主体信息 -->
        <div class="box" v-if="detail.companys&&detail.companys.length>0">
            <h5>企业主体信息</h5>
            <ul>
                <li>
                    <p v-for="(o,i) in detail.companys" :key="i">
                        <span class="tit-txt">{{o.role}}</span>
                        <i>：</i>
                        <span class="val-txt">{{o.comName}}</span>
                    </p>          
                </li>
            </ul>
        </div>
        <!-- 从业人员信息 -->
        <div class="box" v-if="detail.persons&&detail.persons.length>0">
            <h5>从业人员信息</h5>
            <ul>
                <li v-for="(o,i) in detail.persons" :key="i">
                    <h4>{{o.name}}</h4>
                    <p>
                        <span class="tit-txt">担任角色</span>
                        <i>：</i>
                        <span class="val-txt">{{o.role}}</span>
                    </p>
                    <p>
                        <span class="tit-txt">注册类别</span>
                        <i>：</i>
                        <span class="val-txt">{{o.category}}</span>
                    </p>          
                </li>
            </ul>
        </div>
      </div>
    </div>
</template>
<script>
import topBack from '@/components/topback'
export default {
    name: 'jgbaDetail', // 结构名称
    data() {
        return {
            // 数据模型
             detail:{
                persons:[]
             },
             id:'',
             proName:''
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
        this.id = this.$route.query.id;
        let proid=this.$route.query.proid;
        this.proName=sessionStorage.getItem('proname');
        let that=this;
        this.$http({
            method:'post',
            url: '/project/list/detail',
            data:{
                proId:proid,
                pkid:this.id,
                tabType:'completion',
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
.jgbaDetail {    
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
                .tit-txt{
                    margin-right:0;
                }
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
