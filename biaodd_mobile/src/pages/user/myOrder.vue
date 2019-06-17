<!-- 模型： DOM 结构 -->
<template>
    <div class="myOrder">
        <top-back :title='"我的订单"' :isOrder="isPayed"></top-back>
        <div class="nav">
            <p v-for="(o,i) of navArr" :key="i">
                <span :class="{'active':i==navNum}" @click="tabFn(i)">{{o}}</span>
            </p>
        </div>
        <!-- 列表 -->
        <template v-if="isajax">
            <template v-if="list.length>0">
            <!-- <van-pull-refresh v-model="loading" @refresh="onRefresh"> -->
                <van-list finished-text="没有更多了"  @load="onLoad" :error.sync="error" error-text="请求失败，点击重新加载" :offset="200" :finished="finished" :immediate-check="false">
                    <ul class="list">
                        <li v-for="(o,i) of list" :key="i">
                            <template v-if="!o.report">
                                <h5>
                                    <span class="title">VIP会员服务</span>
                                    <template  v-if="isPayed">
                                        <span class="status">已支付</span>
                                    </template>
                                    <template v-else>
                                        <span class="status">未支付</span>
                                    </template>
                                </h5>
                                <div class="box">
                                    <p>订单编号：{{o.orderNo}}</p>
                                    <p>服务时长：{{o.timeLenth}}</p>
                                    <p>购买时间：{{o.time}}</p>
                                    <span>￥{{o.money}}</span>
                                </div>
                                <div class="bom-box">
                                    <template  v-if="isPayed">
                                        <button @click="payBtn(i)">再次购买</button>
                                    </template>
                                    <template v-else>
                                        <button @click="payBtn(i)">立即支付</button>
                                    </template>
                                </div>
                            </template>
                            <template v-else>
                                <h5>
                                    <span class="title">{{o.report.repTitle}}</span>
                                    <template  v-if="isPayed">
                                        <span class="status">已支付</span>
                                    </template>
                                    <template v-else>
                                        <span class="status">未支付</span>
                                    </template>
                                </h5>
                                <div class="box">
                                    <p>订单编号：{{o.orderNo}}</p>
                                    <p>接收邮箱：{{o.report.email}}</p>
                                    <p>报告格式：{{o.report.pattern}}</p>
                                    <p>购买时间：{{o.time}}</p>
                                    <span>￥{{o.money}}</span>
                                </div>
                            </template>
                        </li>
                    </ul>
                </van-list>
            <!-- </van-pull-refresh>   -->
            </template>
            <template v-else>
                <v-not :isError="isError" :hint='msg' ></v-not>
            </template>
        </template>
        <template v-else>
            <van-loading size="50px"></van-loading>
            <p style="text-align: center;margin-top:30px">拼命加载中</p>
        </template>
    </div>
</template>
<script>
import topBack from '@/components/topback'
import not from '@/components/not'
export default {
    name: 'myOrder', // 结构名称
    data() {
        return {
            // 数据模型
            isPayed:true,//是否已支付,true为已支付
            navArr:['已支付订单','未支付订单'],
            navNum:0,
            isajax:false,//是否加载完
            isError:false,//是否加载失败
            finished:false,//是否加载完
            isScroll:true,
            error:false,
            data:{
                pageNo:1,
                pageSize:'10',
                // channelNo:'1004',
                orderStatus:'9'
            },
            list:[],
            total:null,
            msg:''
        }
    },
    watch: {
        // 监控集合
        data:{
            handler:function(val, oldVal){
                if(val.orderStatus=='1'){
                    val.channelNo='1004'
                }else{
                    val.channelNo=''
                }
            },
            deep:true
        }
    },
    components: {
       'top-back':topBack,
       'v-not':not
    },
    props: {
        // 集成父级参数
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
        if(localStorage.getItem('orderTabNum')){
            let i=localStorage.getItem('orderTabNum')*1;
            this.navNum=localStorage.getItem('orderTabNum');
        }
        if(this.navNum!=0){
            this.data.orderStatus='1';
            this.isPayed=false;
            this.ajax1('9')
        }else{
            this.isPayed=true;
            this.ajax1('1')
        }
        this.ajax();
        this.Gmsg()
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
        localStorage.removeItem('orderTabNum');
    },
    destroyed() {
        // console.group('销毁完成状态===============》destroyed');
    },
    methods: {
        // 方法 集合
        ajax(){
            //招标
            this.isScroll=false;
            let that=this;
            this.$http({
                method:'post',
                url: '/vip/queryOrderList',
                data:that.data
            }).then(function(res){
                that.loading = false;
                that.isajax=true;
                if(res.data.code==1){
                    that.total=res.data.total;
                    if(that.navNum==0){
                        that.navArr[0]='已支付订单('+res.data.total+')'
                    }else{
                        that.navArr[1]='未支付订单('+res.data.total+')'
                    }
                    
                    for(let x of res.data.data){
                        if(x.stdCode=='month'){
                            x.timeLenth='1个月'
                        }else if(x.stdCode=='quarter'){
                            x.timeLenth='3个月'
                        }else if(x.stdCode=='hlafYear'){
                            x.timeLenth='6个月'
                        }else if(x.stdCode=='year'){
                            x.timeLenth='12个月'
                        }
                        x.time=that.formatDate(x.createTime,0)
                        x.money=x.fee/100;
                    }
                    if(that.list.length==0||that.data.pageNo==1){
                        that.list=res.data.data;
                    }else{
                        that.list=that.list.concat(res.data.data)
                    }
                    if(res.data.total==that.list.length||that.list.length<that.data.pageSize){
                        that.finished=true;//如果返回总条数等于当前list长度
                    }
                    that.isScroll=true;
                }
            }).catch(function(res){
                that.isajax=true;
                that.isError=true;
                if(that.list.length>0){
                    that.error = true;
                }
            })
        },
        ajax1(orderStatus){
            let that=this;
            let data={
                pageNo:1,
                pageSize:'10',
                // channelNo:'1004',
                orderStatus:orderStatus
            }
            if(orderStatus=='1'){
                data.channelNo='1004'
            }
            this.$http({
                method:'post',
                url: '/vip/queryOrderList',
                data:data
            }).then(function(res){
                if(res.data.code==1){
                    if(that.navNum!=0){
                        that.navArr[0]='已支付订单('+res.data.total+')'
                    }else{
                        that.navArr[1]='未支付订单('+res.data.total+')'
                    }
                }
            })
        },
        onLoad(){//下滚加载
            if(!this.isScroll){
                return false
            }
            this.data.pageNo++;
            this.ajax();
        },
        tabFn(i){
            if(i==0){
                this.data.orderStatus='9';
                this.pageNo=1;
                this.list=[];
                this.isPayed=true;
                this.navNum=0;
                this.msg = '暂无已支付订单'
            }else{
                this.data.orderStatus='1';
                this.pageNo=1;
                this.list=[];
                this.isPayed=false;
                this.navNum=1;
                this.msg = '暂无未支付订单'
            }
            localStorage.setItem('orderTabNum',i);
            this.ajax();
        },
        Gmsg() {
          if(this.isPayed) {
               this.msg = '暂无已支付订单'
          } else {
               this.msg = '暂无未支付订单'
          }
        },
        payBtn(i){
            this.$router.push({
                path:'/payVip',
                query:{
                    code:this.list[i].stdCode
                }
            });
        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
.myOrder{
    padding-top: 90px;
}
.nav{
    display: flex;
    height: 80px;
    line-height: 80px;
    border-bottom: 1PX solid #F0F0F0;
    p{
        flex-grow:1;
        text-align: center;
        .active{
            color: #FE6603;
            border-bottom: 3px solid #FE6603;
            height: 100%;
            display: inline-block;
            box-sizing: border-box;
        }
    }
}
.list{
    li:last-child{
        border-bottom: none;
    }
    li{
        background: #fff;
        border-bottom: 16px solid #f5f5f5;
        padding: 0 32px;
        h5{
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 88px;
            border-bottom: 1PX solid #F0F0F0;
            font-size: 28px;
            font-weight: normal;
            .title{
                color: #4D3A3A;
            }
            .status{
                color: #FE6603
            }
        }
        .box{
            padding: 29px 0;
            border-bottom: 1PX solid #F0F0F0;
            position: relative;
            p{
                font-size: 24px;
                color: #786D6D;
                margin-bottom: 23px;
            }
            span{
                position: absolute;
                font-size: 28px;
                color: #212121;
                top: 29px;
                right: 0;
                font-weight: bold
            }
        }
        .bom-box{
            height: 95px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            button{
                width: 160px;
                color: #fff;
                // height: 52px;
                line-height: 52px;
                border-radius: 52px;
                border: none;
                background: #FE6603
            }
        }
    }
}
</style>
