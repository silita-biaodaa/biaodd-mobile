<!-- 模型： DOM 结构 -->
<template>
    <div class="getType">
        <div class="get-add" >
            <ul>
                <li v-for="(o,i) of addList" :key="i">
                    <span :class="tabNum==i?'active':''" @click="tapFn(i)">{{o.name}}</span>
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
    name: 'getType', // 结构名称
    data() {
        return {
            // 数据模型
            addList:[
                {
                    return:'',
                    name:'全部',
                },{
                    return:'01',
                    name:'施工',
                },{
                    return:'03',
                    name:'设计',
                },{
                    return:'02',
                    name:'监理',
                },{
                    return:'05',
                    name:'采购',
                },{
                    return:'04',
                    name:'勘察',
                },{
                    return:'06',
                    name:'其他',
                }
            ],
            tabNum:0,
        }
    },
    watch: {
        // 监控集合
    },
    props: {
        // 集成父级参数
        num:{
            default:0
        }
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
        this.tabNum=this.num
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
        tapFn(i){
            this.tabNum=i;
        },
        sureFn(){
            let str=this.addList[this.tabNum].return;
            this.$parent.mask=false;
            this.$emit('sureFn',{str:str,index:this.tabNum});
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
.getType{
    position: absolute;
    background: #f5f5f5;
    bottom:0;
    transform: translateY(100%);
    left: 0;
    z-index: 9;  
    width: 100%;
    box-sizing: border-box;
    .get-add {
       padding:50px 0 0;
       height: 595px;
       box-sizing: border-box;
    }
    ul{
        display: flex;
        flex-wrap: wrap;
        // height: 595px;
        // margin-bottom: 150px;
        li{
            width:33%;
            text-align: center;
            margin-bottom: 32px;
            span{
                display: inline-block;
                border-radius:10px;
                text-align: center;
                width: 176px;
                height: 56px;
                line-height: 56px;
                color: #999;
                border: 1PX solid #CCBEBE;
                background: #fff;
            }
            .active{
                border-color: #FE6603;
                background: #FE6603;
                color: #fff;
            }
        }
    }
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
    
}
</style>
