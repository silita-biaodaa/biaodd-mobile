<!-- 模型： DOM 结构 -->
<template>
    <div class="payVip">
        <top-back :title='"开通会员"'></top-back>
        <h5 class="box">{{data.time}}VIP会员</h5>
        <div class="box money">
            <span>应付金额</span>
            <span>￥{{data.money}}</span>
        </div>
        <p class="box payMode">选择支付方式</p>
        <ul>
            <li class="box">
                <div>
                    <img src="../../assets/icon-wx.png"/>
                    <span>微信支付</span>
                </div>
                <div class="select active"></div>
            </li>
            <!-- <li class="box">
                <div>
                    <img src="../../assets/icon-zfb.png"/>
                    <span>支付宝支付</span>
                </div>
                <div class="select"></div>
            </li> -->
        </ul>
        <div class="box">
            <button class="payBtn">提交支付</button>
        </div>
    </div>
</template>
<script>
import topBack from '@/components/topback'
export default {
    name: 'payVip', // 结构名称
    data() {
        return {
            // 数据模型
            userid:'',
            data:{}
        }
    },
    watch: {
        // 监控集合
    },
    props: {
        // 集成父级参数
    },
    components: {
       'top-back':topBack,
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
        this.data=JSON.parse(sessionStorage.getItem('payOrder')).obj;
        // sessionStorage.removeItem('payOrder');
        this.$http({
            method:'post',
            url: '/vip/queryFeeStandard',
            data:{
                channel:'1004',
            }
        }).then(function(res){
            console.log(res);
        }).catch(function(res){
            
        })
        this.userid=sessionStorage.getItem('userid');
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
        testFn(){
            let that=this;
            let data={
                    channel:'1004',
                    stdCode:'month',
                    userId:that.userid
                }
            this.$http({
                method:'post',
                url: '/wxPay/unifiedOrder',
                data:data
            }).then(function(res){
                console.log(res);
                let wxObj={
                    appid:res.data.data.appid,//appid
                    mch_id:res.data.data.partnerid,//商户号
                    nonce_str:res.data.data.noncestr,//随机串
                    sign:res.data.data.sign,//签名
                    body:'标大大会员开通',//商品描述
                    out_trade_no:res.data.orderNo,//商品订单
                    total_fee:0.01,//金额
                    spbill_create_ip:sessionStorage.getItem('ip'),//ip
                    trade_type:'MWEB',//交易类型
                    notify_url:'http://pre.biaodaa.com',//通知地址
                    scene_info:{"h5_info": {"type":"Wap","wap_url": "http://pre-mobile.biaodaa.com/","wap_name": "标大大"}},//场景信息
                }
                console.log(wxObj);
                that.$http({
                    method:'post',
                    url: 'https://api.mch.weixin.qq.com/pay/unifiedorder',
                    data:wxObj
                }).then(function(res){
                    console.log(res)
                })
            })
        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
.payVip{
    padding-top: 90px;
    min-height: calc(100vh - 262px);
    background: #f5f5f5;
    h5{
        padding: 18px 30px;
        background: #FE6603;
        color: #fff;
        font-size: 32px;
    }
    .money{
        background: #fff;
        height: 118px;
        justify-content: space-between;
        span{
            color: #4D3A3A;
            font-size: 32px;
        }
        span:last-child{
            color: #212121;
            font-size: 52px;
            font-weight: bold;
        }
    }
    .payMode{
        height: 80px;
        color: #786D6D;
    }
    ul{
        margin-bottom: 160px;
        li{
            background: #fff;
            height: 128px;
            margin-bottom: 16px;
            justify-content: space-between;
            div{
                display: flex;
                align-items: center;
            }
            img{
                width: 47px;
                margin-right: 23px
            }
            .select{
                width: 40px;
                height: 40px;
                border-radius: 50%;
                border: 4px solid #999;
            }
            .active{
                background: url(../../assets/select.png) no-repeat;
                border: none;
                background-size: cover;
            }
        }
    }
    .payBtn{
        width: 100%;
        background: #FE6603;
        color: #fff;
        height: 92px;
        border-radius: 92px;
        border: none;
    }
}
.box{
    padding: 0 30px;
    display: flex;
    align-items: center;
}

</style>
