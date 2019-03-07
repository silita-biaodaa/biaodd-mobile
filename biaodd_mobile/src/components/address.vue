<!-- 模型： DOM 结构 -->
<template>
    <div class="addr">
        <ul>
            <li v-for="(o,i) of addList" :key="i">
                <span :class="tabNum==i?'active':''" @click="tapFn(i)">{{o}}</span>
            </li>
        </ul>
        <button @click="sureFn">确定</button>
    </div>
</template>
<script>
export default {
    name: 'addr', // 结构名称
    data() {
        return {
            // 数据模型
            addList:["北京","天津","上海","重庆","河北","山西","辽宁","吉林","黑龙江","江苏","浙江","安徽","福建","江西","山东","河南","湖北","湖南","广东","海南","四川","贵州","云南","陕西","甘肃","青海","内蒙古","广西","西藏","宁夏","新疆"],
            tabNum:'',
        }
    },
    watch: {
        // 监控集合
    },
    props: {
        // 集成父级参数
        add:{
            default:'湖南'
        }
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
        let addr=this.add;
        let arr=this.addList;
        let that=this;
        for(let x=0;x<arr.length;x++){
            if(arr[x]==addr){
                that.tabNum=x
            }
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
        tapFn(i){
            this.tabNum=i;
        },
        sureFn(){
            let str=this.addList[this.tabNum];
            this.$parent.mask=false;
            this.$emit('addObj',str);
        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style scoped lang="less">
.addr{
    position: absolute;
    height: 750px;
    background: #f5f5f5;
    bottom: -750px;
    left: 0;
    z-index: 9999;
    width: 100%;
    padding:50px 0;
    box-sizing: border-box;
    ul{
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 70px;
        li{
            width:20%;
            text-align: center;
            margin-bottom: 25px;
            span{
                padding:5px 10px;
                display: inline-block;
                border-radius: 8px;
                text-align: center;
            }
            .active{
                background: #FE6603;
                color: #fff;
            }
        }
    }
    button{
        width: 100%;
        height: 84px;
        background: #FE6603;
        color: #fff;
        border: none;
    }
}
</style>
