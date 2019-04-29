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
        <h5 class="title">开通会员</h5>
        <!-- 开通会员 -->
        <div class="main card">
            <ul>
                <li v-for="(o,i) of viplist" :key="i" :class="{'active':i==tabNum}" @click="tabFn(i)">
                    <p class="time">{{o.stdDesc}}</p>
                    <p class="money">￥{{o.price}}</p>
                    <p class="save">节省￥{{o.save}}</p>
                    <div class="discount">{{o.altInfo}}</div>
                </li>
            </ul>
            <div class="bottom-box">
                <button @click="jumpPay" class="openBtn">{{openTxt}}</button>
                <button @click="$router.push('/membership')" class="privilegeBtn">了解会员特权</button>
                <!-- <p @click="$router.push('/membership')">了解会员特权  ></p> -->
            </div>
        </div>
        <!-- 会员注意事项 -->
        <div class="card item">
            <h5>开通会员注意事项</h5>
            <p>1、会员服务开通后立即生效，如支付遇到问题，请及时拨打客服电话：0731-85076077。</p>
            <p>2、您购买的会员服务期限自服务开通之日起计算，会员服务在有效期届满后自行终止，对应的会员权益自动失效。</p>
            <p>3、标大大会员服务支持续费功能，若您购买的会员服务有效期届满，您可以通过续费方式进行续费，续费后可继续使用会员服务。</p>
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
            viplist:[],
            tabNum:0,
            openTxt:'立即开通'
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
        if(sessionStorage.getItem('payOrder')){
            this.tabNum=JSON.parse(sessionStorage.getItem('payOrder')).num;
        }
        //获取商品
        let that=this;
        this.$http({
            method:'post',
            url: '/vip/queryFeeStandard',
            data:{
                channel:'1004',
            }
        }).then(function(res){
            for(let x of res.data.data){
                x.save=x.primePrice-x.price
            }
            that.viplist=res.data.data
        }).catch(function(res){
            
        })
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
                    that.userinfo.state = '会员';
                    that.openTxt='立即续费';
                } else {
                    that.userinfo.state = '非会员';
                    that.openTxt='立即开通'
                }

            })
        },
        tabFn(i){
            this.tabNum=i
        },
        jumpPay(){
            let data={
                num:this.tabNum
            };
            sessionStorage.setItem('payOrder',JSON.stringify(data));
            this.$router.push('/payVip');
        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
.openingVip{
    background: #f5f5f5;
    padding-top: 110px;
    padding-bottom: 121px;
    // min-height: calc(100vh - 282px);
}
.card{
    box-sizing: border-box;
    background: #fff;
    width: 90%;
    margin: 0 auto;
    padding:0 35px;
    box-shadow:0px 3px 9px 1px rgba(4,0,0,0.1);
    border-radius:8px;
}
/*个人卡*/ 
.user-box{
    display: flex;
    height: 178px;
    // margin-bottom: 20px;
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
.title{
    height: 88px;
    line-height: 88px;
    font-size: 36px;
    color: #4D3A3A;
    width: 90%;
    margin: 0 auto;
}
/*开通卡*/
.main{
    margin-bottom: 25px;
    padding-bottom: 20px;
    ul{
        display: flex;
        margin-bottom: 50px;
        padding-top: 36px;
        justify-content: space-between;
        flex-wrap: wrap;
        .active{
            border: 2PX solid #FF0000
        }
        li{
            width: calc((100% - 30px)/2);
            border: 2PX solid #F0F0F0;
            margin-bottom: 30px;
            height: 222px;
            overflow: hidden;
            position: relative;
            // padding: 20px;
            padding-top: 50px;
            border-radius: 10px;
            box-sizing: border-box;
            p{
                text-align: center;
                margin-bottom: 10px;
            }
            .discount{
                text-align: center;
                width: 200px;
                height: 50px;
                line-height: 50px;
                font-size: 36px;
                background: orange;
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
                font-size: 50px;
                color: #FE6603;
            }
            .time{
                color: #4D3A3A;
                font-size: 24px;
            }
        }
    }
    .bottom-box{
        text-align: center;
        button{
            width: 100%;
            line-height: 92px;
            height: 92px;
            border-radius: 92px;
            border: none;
            margin-bottom: 30px;
        }
        .openBtn{
            color: #fff;
            background: #FE6603;
        }
        .privilegeBtn{
            background: #fff;
            color: #FE6603;
            border: 1PX solid #FE6603;
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
