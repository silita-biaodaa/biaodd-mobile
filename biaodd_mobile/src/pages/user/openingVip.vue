<!-- 模型： DOM 结构 -->
<template>
    <div class="openingVip">
        <top-back :title='"开通会员"'></top-back>
        <div class="user-box card">
            <div class="user-img">
                <img src="../../assets/icon-tpux.png.png" alt="">
            </div>
            <div class="user-center">
                <div class="cen-name">
                    <span>用户名</span>
                    <span class="label">会员</span>
                </div>
                <div class="cen-day">
                    剩余会员天数：<span class="color">1</span>天
                </div>
            </div>
        </div>
        <div class="main card">
            <h5>开通会员</h5>
        </div>
    </div>
</template>
<script>
import topBack from '@/components/topback'
export default {
    name: 'openingVip', // 结构名称
    data() {
        return {
            // 数据模型
            userid:''
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
        this.userid=sessionStorage.getItem('userid')
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
.openingVip{
    background: #f5f5f5;
    padding-top: 110px;
    min-height: calc(100vh - 262px);
}
.card{
    background: #fff;
    width: 83%;
    margin: 0 auto;
    padding:0 35px;
    box-shadow:0px 3px 9px 1px rgba(4,0,0,0.1);
    border-radius:8px;
}
/*个人卡*/ 
.user-box{
    display: flex;
    height: 178px;
    margin-bottom: 20px;
    align-items: center;
    .user-img {
        width: 139px;
        height: 139px;
        margin-right: 40px;
        border-radius: 50%;
        overflow: hidden;
        img {
            width: 100%;
        }
    }
    .cen-name{
        margin-bottom: 22px;
        span{
            font-weight: bold
        }
        .label {
          font-size: 24px;
          background-color: #E5FFE1;
          padding: 9px;
          color: #66D554;
          margin-left: 10px;
        }
    }
    .cen-day{
        font-size: 24px;
        color:#999;
    }
}
</style>
