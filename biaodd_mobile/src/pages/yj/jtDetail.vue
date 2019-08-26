<!-- 模型： DOM 结构 -->
<template>
    <div class="jtDetail">
      <top-back :title="'业绩详情'"></top-back>
      <div class="letter-de">
        <!-- 上 -->
        <div class="content">
            <h5>{{detail.proName}}</h5>
            <p v-if="detail.comName" >
                <span class="tit-txt">施工单位</span>
                <span class="val-txt">{{detail.comName}}</span>  
            </p>
            <p v-if="detail.build">
                <span class="tit-txt">建设状态</span>
                <span class="val-txt">{{detail.build}}</span>  
            </p>
            <p v-if="detail.section">
                <span class="tit-txt">标段名称</span>
                <span class="val-txt">{{detail.section}}</span>  
            </p>
            <p v-if="detail.technicalGrade">
                <span class="tit-txt">技术等级</span>
                <span class="val-txt">{{detail.technicalGrade}}</span>  
            </p>
            <p v-if="detail.proWhere">
                <span class="tit-txt">所在省份</span>
                <span class="val-txt">{{detail.proWhere}}</span>  
            </p>
            <p v-if="detail.contractAmount">
                <span class="tit-txt">合同价格</span>
                <span class="val-txt">{{detail.contractAmount}}万元</span>  
            </p>
            <p v-if="detail.clearingAmount">
                <span class="tit-txt">结算价格</span>
                <span class="val-txt">{{detail.clearingAmount}}万元</span>  
            </p>
            <p v-if="detail.begined">
                <span class="tit-txt">开工日期</span>
                <span class="val-txt">{{detail.begined}}</span>  
            </p>
            <p v-if="detail.ended">
                <span class="tit-txt">交工日期</span>
                <span class="val-txt">{{detail.ended}}</span>  
            </p>
            <p v-if="detail.stakeBegin">
                <span class="tit-txt">开始桩号</span>
                <span class="val-txt">{{detail.stakeBegin}}</span>  
            </p>
            <p v-if="detail.stakeEnd">
                <span class="tit-txt">结束桩号</span>
                <span class="val-txt">{{detail.stakeEnd}}</span>  
            </p>
            <p :class="detail.remark&&detail.remark!=''?'more-box':''">
                <span class="tit-txt">主工程量</span>
                <span class="val-txt" :class="{'overHid':!more}">{{detail.remark}}</span>
                <template v-if="detail.remark&&detail.remark!=''">
                    <template v-if="more">
                        <span class="more" @click="more=false">收起</span>
                    </template>
                    <template v-else>
                        <span class="more" @click="more=true">展开</span>
                    </template> 
                </template>
            </p>
            <p>
                <span class="tit-txt">质量评定</span>
                <span class="val-txt">{{detail.assess}}</span>  
            </p>
        </div>
        <!--主要参与人员 -->
        <div class="box" v-if="detail.persons&&detail.persons.length>0">
            <h5>人员履约信息</h5>
            <ul>
                <li v-for="(o,i) in detail.persons" :key="i">
                    <h4>{{o.name}}</h4>
                    <p>
                        <span class="tit-txt">职&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp务</span>
                        <i>：</i>
                        <span class="val-txt">{{o.post}}</span>
                    </p>
                    <p>
                        <span class="tit-txt">任职日期</span>
                        <i>：</i>
                        <span class="val-txt">{{o.begined}}</span>
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
    name: 'jtDetail', // 结构名称
    data() {
        return {
            // 数据模型
             detail:{
                persons:[]
             },
             isload:true,
             vipStr:'',
             isvip:false,
             id:'',
             more:false,
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
        if(sessionStorage.getItem('permissions')){
          this.vipStr=sessionStorage.getItem('permissions');
        }
        this.id = this.$route.query.id
        let that=this;
        this.$http({
            method:'post',
            url: '/project/detail',
            data:{
                id:this.id,
                tabType:'jiaotong'
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
.jtDetail {    
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
    .more-box{
        position: relative;
        margin-bottom: 62px;
        .more{
            font-size: 24px;
            position: absolute;
            z-index: 9;
            right: 0;
            transform: translateY(100%);
            bottom: -10px;
            color: #FE6603;
        }
        .overHid{
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            /*! autoprefixer: off */
            -webkit-box-orient: vertical;
            /* autoprefixer: on */
        }
    }
}
p{
    font-size: 28px;
    display: flex;
    margin-bottom: 23px;
    .tit-txt{
      color: #999;
      margin-right: 32px;
      width: 112px;
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
