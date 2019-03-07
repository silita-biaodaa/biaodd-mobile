<!-- 模型： DOM 结构 -->
<template>
    <div class="fixbox">
        <div class="fixHead">
            <div class="left">
                <img src="../assets/logo.png"/>
                <span v-if="isshow" @click="addTap">
                    {{address}}
                    <van-icon :name="iconName"/>
                </span>
            </div>
            <div class="right">
                <div class="btn" @click="upload">下载APP</div>
            </div>
        </div>
        <div class="nav" v-if="isShow">
            <ul>
                <li v-for="(x,y) of scrNav" :class="nav==y?'active':''" :key="y" @click="$router.push(x.path)">
                    <p>{{x.txt}}</p>
                </li>
            </ul>
        </div>
        <v-addr @addObj="returnAddress" v-if="mask" :add="address"></v-addr>
    </div>
    
</template>
<script>
import addr from '@/components/address'
export default {
    name: 'fixHead', // 结构名称
    data() {
        return {
            // 数据模型
            address:'',
            mask:false,
            iconName:'arrow-down',
            scrNav:[
                {
                    txt:'首页',
                    path:'/'
                },{
                    txt:'招标',
                    path:'/bid'
                },{
                    txt:'中标',
                    path:'/'
                },{
                    txt:'企业',
                    path:'/'
                },{
                    txt:'诚信',
                    path:'/'
                },
            ],
        }
    },
    watch: {
        // 监控集合
    },
    props: {
        // 集成父级参数
        isshow:{
            default:false,
        },
        isShow:{
            default:true
        },
        nav:{
            default:0
        }
    },
    components:{
        'v-addr':addr
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
        this.address=sessionStorage.getItem('address');
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
        upload(){//点击下载APP
            window.location.href='https://a.app.qq.com/o/simple.jsp?pkgname=com.yaobang.biaodada';
        },
        returnAddress(option){
            this.iconName='arrow-down'
            this.address=option;
            this.$emit('address',option);
        },
        addTap(){
            this.mask=!this.mask
            if(this.iconName=='arrow-down'){
                this.iconName='arrow-up'
            }else{
                this.iconName='arrow-down'
            }
        }

    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style scoped lang="less">
.fixbox{
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 999;
    background: #fff
}
.fixHead{
    padding: 0 32px;
    height: 112px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    .left{
        display: flex;
        align-items:center;
        img{
            margin-right: 24px;
            width: 176px;
        }
        span{
            font-size: 28px;
            display: flex;
            align-items: center;
            .van-icon{
                margin-left: 12px;
                color: #999
            }
        }
    }
    .right{
        .btn{
            background: #FE6603;
            width: 164px;
            height: 64px;
            border-radius: 8px;
            text-align: center;
            line-height: 64px;
            color: #fff;
            font-size: 28px
        }
    }
}
.nav{
    height: 88px;
    border-top: 1PX solid #f2f2f2;
    ul{
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        li{
            text-align: center;
            padding: 20px 32px 0;
            p{
                border-bottom: 4px solid transparent;
            }
        }
        .active{
            
            p{
                color: #FE6603;
                border-color: #FE6603;
                padding-bottom: 20px
            }
        }

    }
}
</style>
