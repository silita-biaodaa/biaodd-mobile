<!-- 模型： DOM 结构 -->
<template>
    <div class="fixbox">
        <div class="fixHead">
            <div class="fix-left">
                <img src="../assets/logo.png"/>
                <span v-if="isshow" @click="addTap">
                    {{address}}
                    <van-icon :name="iconName"/>
                </span>
            </div>
            <div class="fix-right">
               
                <div class="btn " @click="upload">下载APP</div>
                <div class="fix-line">

                </div>
                 <p class="fix-logo color" @click="jump" >
                    {{name}}
                </p>
            </div>
        </div>
        <div class="nav" v-if="isShow" ref="scroll">
            <ul>
                <li v-for="(x,y) of scrNav" :class="nav==y?'active':''" :key="y" @click="$router.push(x.path)">
                    <p>{{x.txt}}</p>
                </li>
            </ul>
        </div>
        <v-addr @addObj="returnAddress" v-if="mask" :add="addressStr" :type="2"></v-addr>
    </div>
    
</template>
<script>
import addr from '@/components/address'
export default {
    name: 'fixHead', // 结构名称
    data() {
        return {
            // 数据模型
            address:'湖南',
            mask:false,
            iconName:'arrow-down',
            addressStr:'',
            scrNav:[
                {
                    txt:'首页',
                    path:'/'
                },{
                    txt:'招标',
                    path:'/bid'
                },{
                    txt:'中标',
                    path:'/tender'
                },{
                    txt:'企业',
                    path:'/company'
                }
                ,{
                    txt:'业绩',
                    path:'/yjList'
                },{
                    txt:'人员',
                    path:'/ryList'
                },
            ],
            name:'登录或注册'
           
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
        // if(sessionStorage.getItem('city')){
        //     this.address=sessionStorage.getItem('city');
        this.addressStr=sessionStorage.getItem('address');
        // }
        this.changeN();
    },
    beforeMount() {
        // console.group('挂载前状态  ===============》beforeMount');
    },
    mounted() {
        // console.group('挂载结束状态===============》mounted');
        this.$nextTick(function() {
            // console.log('执行完后，执行===============》mounted');
            if(this.nav==5){
                this.$refs.scroll.scrollLeft=200;
            }
        });
    },
    beforeUpdate() {
        // console.group('更新前状态  ===============》beforeUpdate');
    },
    updated() {
        // console.group('更新完成状态===============》updated');
    },
    watch: {
       $route:{
          handler: function(val, oldVal){
             if(sessionStorage.getItem('xtoken')) {
               this.name = sessionStorage.getItem('Bname')
             } else {     
               this.name = '登录或注册'
             }
          },
        deep: true
      }
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
            this.address=option.txt;
            let arr=option.str.split('||');
            this.addressStr=option.str;
            sessionStorage.setItem('address',arr[0]);
            // console.log(arr);
            if(arr.length>1){
                sessionStorage.setItem('city',arr[1]);
            }
            this.$emit('address',option.str);
        },
        jump() {
            if(this.name == '登录或注册') {
                 this.$router.push('/logo')
            }
         
        },
        addTap(){
            this.mask=!this.mask
            if(this.iconName=='arrow-down'){
                this.iconName='arrow-up'
            }else{
                this.iconName='arrow-down'
            }
        },
        changeN() {
            if(sessionStorage.getItem('xtoken')) {
                this.name = sessionStorage.getItem('Bname')
            } else {
                this.name = '登录或注册'
            }
        }


    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style scoped lang="less">
.addr{
    font-size: 28px
}
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
    .fix-left{
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
    .fix-right{
        .btn{
            background: #FE6603;
            width: 164px;
            height: 64px;
            border-radius: 8px;
            line-height: 64px;
            color: #fff;
            font-size: 28px;
           text-align: center;
           float: left;
        }
        .fix-logo {
             height: 64px;
             max-width: 150px;
             overflow: hidden;
             text-overflow:ellipsis;
             white-space:nowrap;
             line-height: 64px;
             font-size: 28px;
        }
        .fix-line {
            width: 2px;
            height: 64px;
            background-color:#e5e5e5;
            margin: 0 18px;
            float: left;
        }
    }
}
.nav{
    height: 92px;
    overflow-x: scroll;
    border-top: 1PX solid #f2f2f2;
    border-bottom: 1PX solid #f2f2f2;
    ul{
        // position: absolute;
        height: 92px;
        display: flex;
        justify-content: space-between;
        width: 120%;
        min-width: 100%;
        flex-wrap: nowrap;
        overflow-x:scroll;
        overflow-y: hidden;
        li{
            box-sizing: border-box;
            width: 20%;
            text-align: center;
            padding: 20px 32px 4px;
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
