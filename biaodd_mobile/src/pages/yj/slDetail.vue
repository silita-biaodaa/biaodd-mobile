<!-- 模型： DOM 结构 -->
<template>
    <div class="slDetail">
      <top-back :title="'业绩详情'"></top-back>
      <div class="letter-de">
        <!-- 上 -->
        <div class="content">
            <h5>{{detail.proName}}</h5>
            <p>
                <span class="tit-txt">施工单位</span>
                <span class="val-txt">{{detail.comName}}</span>  
            </p>
            <p>
                <span class="tit-txt">建设单位</span>
                <span class="val-txt">{{detail.proOrg}}</span>  
            </p>
            <p>
                <span class="tit-txt">工程状态</span>
                <span class="val-txt">{{detail.proStatus}}</span>  
            </p>
            <p>
                <span class="tit-txt">合同金额</span>
                <span class="val-txt">{{detail.contractAmount}}</span>  
            </p>
            <p>
                <span class="tit-txt">结算金额</span>
                <span class="val-txt">{{detail.clearingAmount}}</span>  
            </p>
            <p>
                <span class="tit-txt">开工日期</span>
                <span class="val-txt">{{detail.worked}}</span>  
            </p>
            <p>
                <span class="tit-txt">完工日期</span>
                <span class="val-txt">{{detail.finished}}</span>  
            </p>
            <p>
                <span class="tit-txt">合同工期</span>
                <span class="val-txt">{{detail.duration}}</span>  
            </p>
            <p>
                <span class="tit-txt">所在地区</span>
                <span class="val-txt">{{detail.proWhere}}</span>  
            </p>
            <p class='more-box'>
                <span class="tit-txt">关键指标</span>
                <span class="val-txt" :class="{'overHid':!htmore}">{{detail.majorTarget}}</span>
                <template v-if="detail.majorTarget&&detail.majorTarget!=''">
                    <template v-if="htmore">
                        <span class="more" @click="htmore=false">收起</span>
                    </template>
                    <template v-else>
                        <span class="more" @click="htmore=true">展开</span>
                    </template> 
                </template>
            </p>
            <p class='more-box'>
                <span class="tit-txt">合同内容</span>
                <span class="val-txt" :class="{'overHid':!zbmore}">{{detail.contractContent}}</span>
                <template v-if="detail.contractContent&&detail.contractContent!=''">
                    <template v-if="zbmore">
                        <span class="more" @click="zbmore=false">收起</span>
                    </template>
                    <template v-else>
                        <span class="more" @click="zbmore=true">展开</span>
                    </template>
                </template>
            </p>
        </div>
        <!--主要参与人员 -->
        <div class="box" v-if="detail.mainPersons&&detail.mainPersons.length>0">
            <h5>主要参与人员</h5>
            <ul>
                <li v-for="(o,i) in detail.mainPersons" :key="i">
                    <h4>{{o.姓名}}</h4>
                    <p>
                        <span class="tit-txt">职&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp务</span>
                        <i>：</i>
                        <span class="val-txt">{{o.职务}}</span>
                    </p>
                    <p>
                        <span class="tit-txt">职&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp称</span>
                        <i>：</i>
                        <span class="val-txt">{{o.职称}}</span>
                    </p>          
                </li>
            </ul>
        </div>
        <!-- 工程获奖 -->
        <div class="box" v-if="detail.proPrizes&&detail.proPrizes.length>0">
            <h5>工程获奖</h5>
            <ul>
                <li v-for="(o,i) in detail.proPrizes" :key="i">
                    <h4>xxx</h4>
                    <p>
                        <span class="tit-txt">颁奖单位</span>
                        <i>：</i>
                        <span class="val-txt">{{o.颁奖单位}}</span>
                    </p>
                    <p>
                        <span class="tit-txt">颁奖时间</span>
                        <i>：</i>
                        <span class="val-txt">{{o.颁奖时间}}</span>
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
    name: 'slDetail', // 结构名称
    data() {
        return {
            // 数据模型
             detail:{},
             isload:true,
             vipStr:'',
             isvip:false,
             id:'',
             htmore:false,//控制合同内容展开收起
             zbmore:false,//控制关键指标展开收起
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
                tabType:'shuili'
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
.slDetail {    
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
            /*! autoprefixer: off */
            -webkit-box-orient: vertical;
            /* autoprefixer: on */
            display: -webkit-box;
            -webkit-line-clamp: 2;
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
        }
    }
}

  
</style>
