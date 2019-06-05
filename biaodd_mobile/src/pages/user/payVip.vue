<!-- 模型： DOM 结构 -->
<template>
    <div class="payVip">
        <top-back :title='"开通会员"'></top-back>
        <!-- list -->
        <ul class="conten-box">
            <li v-for="(o,i) of viplist" :key="i" :class="{'active':i==tabNum}" @click="tabFn(i)">
                <p class="time">{{o.stdDesc}}</p>
                <p class="money">￥{{o.price}}</p>
                <p class="save">节省￥{{o.save}}</p>
                <!-- <div class="discount">{{o.altInfo}}折</div> -->
            </li>
        </ul>
        <!-- <div class="box money">
            <span>应付金额</span>
            <span>￥{{data.money}}</span>
        </div> -->
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
        <div class="fix-box">
            <div class="left">
                <span class="one">总金额</span>
                <span class="two">￥{{viplist[tabNum].price}}</span>
            </div>
            <div class="btn" @click="payFn">立即支付</div>
        </div>
        <!-- 端午活动 -->
        <div class="dw-box" v-if="mask">
            <div class="content">
                <div class="header">
                    <van-icon name="cross" @click.stop="mask=false"/>
                </div>
                <div class="bottom">
                    <p>请输入邀请人的手机号码（可不填）</p>
                    <div class="input">
                        <input placeholder="请输入手机号码" type="tel" v-model="phone"/>
                    </div>
                    <div class="tips"><b>*</b>填写邀请人手机号码，助力好友领取微信红包</div>
                    <div class="btn"  @click.stop="mask=false">确定</div>
                </div>
            </div>
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
            viplist:[{
                price:'',
                stdDesc:'',
                save:'',
            }],
            tabNum:0,
            webSock:null,
            mask:false,
            phone:'',
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
        // sessionStorage.removeItem('payOrder');
        
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
            that.viplist=res.data.data;
            if(that.$router.query.code){
                for(let x in that.viplist){
                    if(that.viplist[x].stdCode==that.$router.query.code){
                        that.tabNum=x;
                        break
                    }
                }
            }
        }).catch(function(res){
            
        })
        if(sessionStorage.getItem('payOrder')){
            this.tabNum=JSON.parse(sessionStorage.getItem('payOrder')).num;
        }
        if(sessionStorage.getItem('firstLogin')){
            if(sessionStorage.getItem('firstLogin')==0){
                this.mask=true
            }else{
                this.mask=false
            }
        }
        // if(localStorage.getItem('orderNo')){
        //     alert(localStorage.getItem('orderNo'))
        //     this.$http({
        //         method:'post',
        //         url: '/wxPay/queryOrderStatus',
        //         data:{
        //             orderNo:localStorage.getItem('orderNo'),
        //         }
        //     }).then(function(res){
        //         localStorage.removeItem('orderNo');
        //         that.$router.push('/myOrder');
        //     }).catch(function(res){
                
        //     })
        // }

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
        tabFn(i){
            this.tabNum=i
        },
        payFn(){
            let that=this;
            // let uri=location.href;
            // uri=encodeURIComponent(uri);
            let data={
                    channel:'1004',
                    stdCode:that.viplist[that.tabNum].stdCode,
                    userId:that.userid,
                    tradeType:'MWEB',
                    ip:sessionStorage.getItem('ip'),
                }
                if(this.phone!=''){
                    data.phone=this.phone;
                }
            this.$http({
                method:'post',
                url: '/wxPay/unifiedOrder',
                data:data
            }).then(function(res){
                // that.openWebSocket();
                sessionStorage.setItem('firstLogin',1);
                localStorage.setItem('orderNo',res.data.orderNo);
                that.$router.replace('/myOrder');
                window.location.href=res.data.data.webUrl;
            })
        },
        // openWebSocket(){
        //     const wsuri=url;
        //     this.webSock=new WebSocket(wsuri);
        //     this.webSock.onopen=this.socketOpen;
        //     this.webSock.onerror=this.socketError;
        //     this.webSock.onmessage=this.socketMsg;
        //     this.webSock.onclose=this.socketClose;
        // },
        // socketOpen(){//开启链接
        //     alert('链接成功')
        // },
        // socketError(){//错误
        //     alert('错误')
        // },
        // socketMsg(e){//接收
        //     alert(JSON.stringify(e));
        // },
        // socketClose(e){//关闭
        //     console.log(e.code);
        // }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
.payVip{
    padding-top: 90px;
    min-height: calc(100vh - 242px);
    background: #fff;
    .conten-box{
        background: #f5f5f5;
        display: flex;
        padding:40px 32px 0;
        margin-bottom: 0;
        justify-content: space-between;
        flex-wrap: wrap;
        .active{
            border: 2PX solid #FF0000
        }
        li:nth-last-child(1),li:nth-last-child(2){
            margin-bottom: 0
        }
        li{
            width: calc((100% - 18px)/2);
            border: 2PX solid #F0F0F0;
            margin-bottom:18px;
            height: 247px;
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
                font-size: 50px;
                color: #FE6603;
            }
            .time{
                color: #4D3A3A;
                font-size: 24px;
            }
        }
    }
    // .money{
    //     background: #fff;
    //     height: 118px;
    //     justify-content: space-between;
    //     span{
    //         color: #4D3A3A;
    //         font-size: 32px;
    //     }
    //     span:last-child{
    //         color: #212121;
    //         font-size: 52px;
    //         font-weight: bold;
    //     }
    // }
    .payMode{
        height: 98px;
        color: #666;
        background: #f5f5f5;
    }
    ul{
        margin-bottom: 160px;
        li:after{
            position: absolute;
            content: '';
            width:calc(100% - 60px);
            height:1PX;
            background: #F0F0F0;
            bottom: 0;
            left: 30px;
        }
        li{
            background: #fff;
            height: 128px;
            margin-bottom: 16px;
            position: relative;
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
    .fix-box{
        padding-left: 30px;
        box-sizing: border-box;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        display: flex;
        justify-content: space-between;
        height: 95px;
        line-height: 95px;
        .btn{
            width: 200px;
            background: #FE6603;
            color: #fff;
            font-size: 32px;
            text-align: center
        }
        .one{
            font-size: 24px;
            color: #666;
        }
        .two{
            color: #FE6603;
            font-size: 36px;
        }
    }
    .fix-box:after{
        content: '';
        position: absolute;
        width: calc(100% - 200px);
        height: 1PX;
        background: #f2f2f2;
        top: 0;
        left: 0;
    }
}

.box{
    padding: 0 30px;
    display: flex;
    align-items: center;
}
/*端午活动*/
.dw-box{
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,.5);
    z-index: 998;
    display: flex;
    align-items: center;
    justify-content: center;
    .content{
        border-radius:5px;
        height: 590px;
        box-sizing: border-box;
        background: #fff;
        width: 630px;
    }
    .header{
        padding: 0 40px;
        background: #f5f5f5;
        height: 80px;
        line-height: 80px;
        font-size: 28px;
        text-align: right;
        .van-icon{
            color: #ccc;
        }
    }
    .bottom{
        padding: 0 49px;
        p{
            margin-bottom: 25px;
            margin-top: 48px;
        }
        .input{
            background: url(../../assets/icon-shoujihao.png) no-repeat;
            background-size: 34px 51px;
            background-position: 23px 22px;
            border: 1PX solid #ccc;
            box-sizing: border-box;
            height: 96px;
            padding-left: 82px;
            display: flex;
            align-items: center;
            input{
                border: 0;
            }
            input::-webkit-input-placeholder{
                color: #ccc;
            }
        }
        .tips{
            margin-top: 22px;
            font-size: 24px;
            color: #666;
            b{
                color: #FE6603;
                display: inline-block;
                vertical-align: middle;
                text-align: center;
                width: 18px;
                height: 24px;
            }
        }
        .btn{
            width: 100%;
            height: 80px;
            line-height: 80px;
            border-radius: 80px;
            color: #fff;
            background: #FE6603;
            text-align: center;
            margin-top: 98px;
        }
    }
}
</style>
