<!-- 模型： DOM 结构 -->
<template>
    <div class="money">
        <div class="box">
            <div class="top-box">
                <div v-if="moneyNum==0">
                    <p>
                        <input type="number" placeholder="最低价" v-model="projSumStart"/>
                    </p>
                    <p class="line"></p>
                    <p>
                        <input type="number" placeholder="最高价" v-model="projSumEnd"/>
                    </p>
                </div>
                
                <span>单位/万</span>
            </div>
            <ul>
                <li v-for="(o,i) of moneyList" :key="i">
                    <span :class="moneyNum==i?'active':''" @click="moneyNum=i;">{{o}}</span>
                </li>
            </ul>
        </div>
        <div class="btn">
            <button class="canle" @click="canleFn">取消</button>
            <button class="sure" @click="sureFn">确定</button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'money', // 结构名称
    data() {
        return {
            // 数据模型
            moneyList:['全部','500-1000万','1000-5000万','5000-10000万','10000万以上'],
            moneyNum:0,
            projSumStart:'',
            projSumEnd:''
        }
    },
    watch: {
        // 监控集合
    },
    props: {
        // 集成父级参数
        data:{
            default:{}
        }
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
        let obj=this.data;
        if(JSON.stringify(obj)!='{}'){
            this.moneyNum=this.data.num;
            this.projSumStart=this.data.projSumStart;
            this.projSumEnd=this.data.projSumEnd;
        }
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
        sureFn(){
            // if(this.moneyNum!=0){
            //     this.projSumStart='';
            //     this.projSumEnd=''
            // }
            let data={
                num:this.moneyNum,
                projSumStart:this.projSumStart,
                projSumEnd:this.projSumEnd
            }
            this.$emit('sureFn',data);
        },
        canleFn(){
            this.$parent.mask=false;
            this.$emit('canleFn');
        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style scoped lang="less">
.money{
    position: absolute;
    background: #f5f5f5;
    bottom:0;
    transform: translateY(100%);
    left: 0;
    z-index: 9;
    width: 100%;
    padding:50px 0 0;
    box-sizing: border-box;
    .btn{
        display: flex;
        button{
            height: 84px;
            flex-grow:1;
        }
        .sure{
            background: #FE6603;
            border: 1PX solid #FE6603;
            color: #fff;
        }
        .canle{
            border: 1PX solid #CCBEBE;
            color: #333;
            background: #fff;
        }
    }
    .box{
        .top-box{
            padding: 8px 32px 0;
            display: flex;
            align-items: center;
            justify-content:space-between;
            margin-bottom: 32px;
            span{
                color: #999;
                font-size: 24px
            }
            div{
                display: flex;
                align-items: center;
                .line{
                    width: 35px;
                    height: 1PX;
                    background: #CCBEBE;
                    margin:0 21px;
                }
                p{
                    width: 210px;
                    height: 56px;
                    border-radius: 56px;
                    border: 1PX solid #CCBEBE;
                    text-align: center;
                    background: #fff;
                    input{
                        background: none;
                        width: 44%;
                        height: 100%;
                        border: none
                    }
                }
            }   
            
        }
        ul{
            display: flex;
            flex-wrap: wrap;
            padding: 0 32px;
            margin-bottom: 120px;
            li{
                text-align: center;
                margin-bottom: 32px;
                // width: 50%;
                span{
                    margin-right: 40px;
                    padding: 15px 32px;
                    display: inline-block;
                    border-radius:10px;
                    text-align: center;
                    color: #999;
                    background: #fff;
                    border: 1PX solid #CCBEBE
                }
                .active{
                    border-color: #FE6603;
                    background: #FE6603;
                    color: #fff;
                }
            }
        }
    }
  }
</style>
