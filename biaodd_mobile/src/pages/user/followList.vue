<!-- 模型： DOM 结构 -->
<template>
    <div class="followList">
        <top-back :title="'我的关注'"></top-back>
        <div class="nav">
            <span v-for="(o,i) of navList" :key="i" :class="{'active':i==navNum}" @click="tabFn(i)">{{o}}</span>
        </div>
        <template v-if="isajax">
            <template v-if="zbList.length>0">
                <!-- 招标 -->
                <template v-if="navNum==0">
                    <v-zb v-for="(o,i) of zbList" :key="i" :obj="o" :follow="true" @nofollow="zbNoFollow"></v-zb>
                </template>
                <!-- 中标 -->
                <template v-else-if="navNum==1">
                    <v-zhongb v-for="(o,i) of zbList" :key="i" :obj="o" :follow="true" @nofollow="zbNoFollow"></v-zhongb>
                </template>
                <!-- 企业 -->
                <template v-else>
                    <v-qy v-for="(o,i) of zbList" :key="i" :obj="o" :follow="true"  @nofollow="qyNoFollow"></v-qy>
                </template>
            </template>
            <template v-else>
                <v-not :isError="isError"  :hint="'暂无关注的' + msg"  ></v-not>
            </template>
        </template>
        <template v-else>
            <van-loading size="50px"></van-loading>
        </template>
    </div>
</template>
<script>
import topBack from '@/components/topback'
import qy from '@/components/qy'
import zbCon from '@/components/zbContent'
import zhongbCon from '@/components/zhongbCon'
import not from '@/components/not'
export default {
    name: 'followList', // 结构名称
    data() {
        return {
            // 数据模型
            navList:['招标','中标','企业'],
            navNum:0,
            zbList:[],
            isajax:false,//是否加载完
            isError:false,//是否加载失败
            msg:'招标'
        }
    },
    watch: {
        // 监控集合
        // $route:{
        //     handler:function(newVal, oldVal){
        //         if(newVal.meta.followNum){
        //             this.navNum=newVal.meta.followNum
        //         }
        //     },
        //     deep:true
        // }
    },
    props: {
        // 集成父级参数
    },
    components: {
      'top-back':topBack,
      'v-qy':qy,
      'v-zb':zbCon,
      'v-zhongb':zhongbCon,
      'v-not':not
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
        if(this.$route.meta.followNum!=undefined){
            this.navNum=this.$route.meta.followNum;
        }
        if(this.navNum==0){
            this.zbAjax()
        }else if(this.navNum==1){
            this.zhongAjax()
        }else{
            this.qyAjax()
        }
        // this.zbAjax();
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
        console.log(1);
    },
    destroyed() {
        // console.group('销毁完成状态===============》destroyed');
    },
    methods: {
        // 方法 集合
        tabFn(i){
            this.navNum=i;
            this.$route.meta.followNum=i;
            this.isajax=false;
           
            if(i ==0 || i == 1) {
               this.msg = this.navList[i] +  '公告'      
            } else {
               this.msg = this.navList[i]
            }
            
            if(i==0){
                this.zbAjax()
            }else if(i==1){
                this.zhongAjax()
            }else{
                this.qyAjax()
            }
            
        },
        zbAjax(){//招标标关注
            let that=this;
            this.$http({
                method:'post',
                url:'/userCenter/listCollectionNotice',
                data:{
                    type:'1',
                    pageNo:1,
                    pageSize:1000
                }
            }).then(function(res){
                that.isajax=true;
                that.zbList=res.data.data;
            }).catch(function(res){
                that.isajax=true;
                that.isError=true;
            })
        },
        zhongAjax(){//中标关注
            let that=this;
            this.$http({
                method:'post',
                url:'/userCenter/listCollectionNotice',
                data:{
                    type:'2',
                    pageNo:1,
                    pageSize:1000
                }
            }).then(function(res){
                that.isajax=true;
                that.zbList=res.data.data;
            }).catch(function(res){
                that.isajax=true;
                that.isError=true;
            })
        },
        qyAjax(){
            let vip = sessionStorage.getItem('permissions') ? 1 : 0
            let that=this;
            this.$http({
                method:'post',
                url:'/userCenter/listCollectionCompany',
                data:{
                    pageNo:1,
                    pageSize:1000,
                    isVip:vip
                }
            }).then(function(res){
                that.isajax=true;
                that.zbList=res.data.data;
            }).catch(function(res){
                that.isajax=true;
                that.isError=true;
            })
        },
        zbNoFollow(e){//招中标取消
            let that=this;
            this.$http({
                method:'post',
                url:'/userCenter/cancelCollectionNotice',
                data:{
                    source:e.source,
                    noticeid:e.id,
                }
            }).then(function(res){
                if(that.navNum==0){
                    that.zbAjax()
                }else{
                    that.zhongAjax()
                }
            })
        },
        qyNoFollow(e){//企业取消
            let that=this;
            this.$http({
                method:'post',
                url:'/userCenter/cancelCollectionCompany',
                data:{
                    companyid:e.id,
                }
            }).then(function(res){
                that.qyAjax()
            })
        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
.followList{
    padding-top: 90px;
    background: #f5f5f5;
    // box-sizing: border-box;
    padding-bottom: 101px;
    min-height: calc(100vh - 191px)
}
.nav{
    background: #fff;
    margin-top: 16px;
    display: flex;
    justify-content: space-between;
    padding: 28px 32px;
    span{
        width: 168px;
        height: 56px;
        border: 1PX solid #999;
        border-radius: 28px;
        font-size: 28px;
        color: #999;
        text-align: center;
        line-height: 56px;
    }
    .active{
        border-color: #FE6603;
        color: #FE6603;
    }
}

.newNotice{
    background: #fff;
    margin-top: 16px
}
</style>
