<!-- 模型： DOM 结构 -->
<template>
    <div class="openingVip">
        <top-back :title='"开通会员"'></top-back>
        <!-- 用户信息 -->
        <div class="user-box card">
            <div class="user-img">
                <img :src="userinfo.imageUrl " alt="" v-if="userinfo.imageUrl">
                <img src="../../assets/icon-tpux.png.png" alt="" v-else>
            </div>
            <div class="user-center">
                <div class="cen-name">
                    <span>{{userinfo.nikeName}}</span>
                    <span class="label">{{userinfo.state}}</span>
                </div>
                <div class="cen-day">
                    剩余会员天数：<span class="color">{{userinfo.day}}</span>天
                </div>
            </div>
        </div>
        <!-- 开通会员 -->
        <div class="main card">
            <h5>开通会员</h5>
            <ul>
                <li v-for="(o,i) of viplist" :key="i" :class="{'active':i==tabNum}" @click="tabFn(i)">
                    <p class="time">{{o.time}}</p>
                    <p class="money">￥{{o.money}}</p>
                    <p class="save">节省￥{{o.save}}</p>
                    <div class="discount">{{o.discount}}折</div>
                </li>
            </ul>
            <div class="bottom-box">
                <button>立即开通</button>
                <p @click="$router.push('/membership')">了解会员特权  ></p>
            </div>
        </div>
        <!-- 会员注意事项 -->
        <div class="card item">
            <h5>开通会员注意事项</h5>
            <p>1、会员服务开通后立即生效，如支付遇到问题，请及时拨打客服电话：0731-85076077</p>
            <p>2、您购买的会员服务期限自服务开通之日起计算，会员服务在有效期届满后自行终止，对应的会员权益自动失效</p>
            <p>3、标大大会员服务支持续费功能，若您购买的会员服务有效期届满，您可以通过续费方式进行续费，续费后可继续使用会员服务</p>
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
            userinfo:{//用户信息集合

            },
            userid:'',
            viplist:[
                {
                    time:'1个月',
                    money:318,
                    save:182,
                    discount:'6.3'
                },{
                    time:'3个月',
                    money:898,
                    save:602,
                    discount:'6.0'
                },{
                    time:'6个月',
                    money:1498,
                    save:1502,
                    discount:'5.0'
                },{
                    time:'12个月',
                    money:2298,
                    save:3702,
                    discount:'3.8'
                }
            ],
            tabNum:0
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
        this.userid=sessionStorage.getItem('userid');
        this.getUser();
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
        getUser(){//获取用户信息
            let that=this;
            this.$http({
                method:'post',
                url: '/userCenter/refreshUserInfo',
                data:{}
            }).then(function(res){
                that.userinfo = res.data.data
                let gap = new Date( that.userinfo.expiredDate).getTime() - new Date().getTime()
                that.userinfo.day = Math.ceil(gap/3600/24/1000) >= 0 ? Math.ceil(gap/3600/24/1000) : 0; 
                if( that.userinfo.roleName == '会员用户') {
                    that.userinfo.state = '会员'
                } else {
                    that.userinfo.state = '非会员'
                }

            })
        },
        tabFn(i){
            this.tabNum=i
        },
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
/*开通卡*/
.main{
    margin-bottom: 25px;
    padding-bottom: 20px;
    h5{
        height: 96px;
        line-height: 96px;
        font-size: 36px;
        color: #4D3A3A;
    }
    ul{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .active{
            border: 2PX solid #FF0000
        }
        li{
            width: calc((100% - 30px)/2);
            border: 2PX solid #F0F0F0;
            margin-bottom: 30px;
            overflow: hidden;
            position: relative;
            padding: 20px;
            border-radius: 10px;
            box-sizing: border-box;
            p{
                text-align: left;
                margin-bottom: 24px;
            }
            .discount{
                text-align: center;
                width: 200px;
                height: 60px;
                line-height: 60px;
                font-size: 40px;
                background: red;
                color: #fff;
                position: absolute;
                top: 0;
                right: 0;
                transform: rotateZ(45deg) translate(25%,-50%);

            }
            .save{
                font-size: 24px;
                color: #999;
                margin-bottom: 0;
            }
            .money{
                font-size: 60px;
                color: #FE6603;
            }
            .time{
                color: #4D3A3A;
                font-size: 28px;
            }
        }
    }
    .bottom-box{
        text-align: center;
        button{
            width: 70%;
            line-height: 92px;
            height: 92px;
            border-radius: 92px;
            color: #fff;
            background: #FE6603;
            border: none;
            margin-bottom: 20px;
        }
        p{
            font-size: 24px;
            color:deepskyblue;
            text-align: right;
        }
    }
}
/*注意事项*/
.item{
    padding:30px 36px 38px;
    h5{
        text-align: center;
        color: #FE6603;
        font-size: 32px;
        margin-bottom: 28px;
    }
    p{
        font-size: 28px;
        color: #786D6D
    }
}
</style>
