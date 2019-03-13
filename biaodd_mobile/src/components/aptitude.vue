<!-- 模型： DOM 结构 -->
<template>
    <div class="aptitude" :class="{'zIndex':isFix}">
        <div class="box">
            <template v-if="boxArr.length==0">
                <p>暂无资质，赶紧去添加吧</p>
            </template>
            <template v-else>
                <div class="content-box">
                    <div class="tit" v-if="type==1">最多可选3条资质</div>
                    <ul>
                        <li  v-for="(o,i) of boxArr" :key="i">
                            <span>{{o.name}}</span>
                            <van-icon name="cross" @click="delteFn(i)"></van-icon>
                        </li>
                    </ul>
                    <div class="addBtn" @click="addFn" v-if="boxArr.length<3&&type==1">继续添加</div>
                </div>
                
            </template>
        </div>
        <div class="btn">
            <button class="canle" @click="recordFn">重置</button>
            <button class="sure" @click="sureFn">{{sureTxt}}</button>
        </div>
        <div class="fix" :class="{'isShow':isFix}">
            <div class="fix-box-con">
                <div>
                    <van-icon name="cross" @click="hideFix"></van-icon>
                </div>
                <div class="nav">
                    <span v-for="(o,i) of navTxt" :class="num==i?'active':''" :key="i">{{o}}</span>
                </div>
                <ul>
                    <li v-for="(o,i) of showArr" :key="o.code" @click="selectFn(i)">{{o.name}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'aptitude', // 结构名称
    data() {
        return {
            // 数据模型
            sureTxt:'添加',
            isFix:false,
            showArr:[],//用于显示
            data:[],//获取的数据
            num:0,
            navTxt:['请选择'],
            storageArr:[],//存
            boxArr:[],//用于显示在筛选区
        }
    },
    watch: {
        // 监控集合
    },
    props: {
        // 集成父级参数
        type:{
            default:1//1为企业
        },
        arr:{
            default:[]
        }
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
        let that=this;
        //资质
        this.$http({
            method:'post',
            url: '/grade/filter',
            data:{
                type:that.type
            }
        }).then(function(res){
            that.data=res.data.data;
            that.showArr=res.data.data;
        })

        that.boxArr=that.arr;
        if(that.boxArr.length>0){
            this.sureTxt='确定';
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
        selectFn(i){
            let that=this;
            let obj={
                code:that.showArr[i].code,
                name:that.showArr[i].name,
            }
            this.storageArr.push(obj);
            this.navTxt[that.num]=that.showArr[i].name;
            if(that.showArr[i].list==null){
                this.hideFix();
                let name=[],code=[];
                for(let x of that.storageArr){
                    name.push(x.name);
                    code.push(x.code);
                }
                that.storageArr=[];
                let boxData={
                    name:name.join(','),
                    code:code.join('||')
                }
                this.boxArr.push(boxData);
                this.navTxt=[];
                this.sureTxt='确定';
                this.showArr=this.data;
            }
            this.showArr=this.showArr[i].list;
            this.num++;
            this.navTxt.push('请选择')
        },
        delteFn(i){
            this.boxArr.splice(i,1);
            if(this.boxArr==0){
                this.sureTxt='添加';
                this.num=0;
                this.showArr=this.data;
            }
        },
        sureFn(){
            let that=this;
            if(that.sureTxt=='添加'){
                that.isFix=true;
                that.modalHelper.afterOpen();
            }else{
                let arr=that.boxArr;
                let str='';
                for(let x of arr){
                    str=str+x.code+'||'
                }
                str=str.substring(0,str.length-2);
                // console.log(str)
                this.$emit('sureFn',{str:str,list:this.boxArr});
            }
            
        },
        addFn(){
            this.isFix=true;
            this.num=0;
            this.showArr=this.data;
            this.modalHelper.afterOpen();
        },
        hideFix(){
            this.isFix=false;
            this.modalHelper.beforeClose();
        },
        recordFn(){
            this.$emit('recordFn');
        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style scoped lang="less">
.aptitude.zIndex{
    z-index: 1000;
}
.aptitude{
    position: absolute;
    height: 568px;
    background: #f5f5f5;
    bottom: -568px;
    left: 0;
    z-index: 9;
    width: 100%;
    box-sizing: border-box;
    .box{
        height: 480px;
        width: 100%;
        text-align: center;
        p{
            color: #999999;
            padding-top: 176px
        }
        .content-box{
            .tit{
                padding: 0 32px;
                height: 72px;
                line-height: 72px;
                text-align: left;
                color: #999;
                font-size: 24px
            }
            ul{
                margin-bottom: 112px;
            }
            li{
                padding: 0 32px;
                background: #fff;
                height: 88px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                span{
                    display: inline-block;
                    max-width: 650px;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space:nowrap;
                }
            }
            .addBtn{
                text-align: center;
                color: #FE6603
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


.fix{
    width: 100%;
    // min-height: 100vh;
    height: 100%;
    position: fixed;
    top: 0;
    right:-100%;
    transition: all .5s;
    background: #fff;
    z-index:999999;
    padding: 35px 32px;
    padding-right: 0;
    overflow-y: scroll;
    box-sizing: border-box;
    -webkit-overflow-scrolling:touch;
    .fix-box-con{
        min-height:calc(100% + 1px);
    }
    li{
        padding:30px 0;
        font-size: 28px;
        border-bottom: 1PX solid #f2f2f2;
    }
    .nav{
        margin-bottom: 30px;
        margin-top: 30px;
        span{
            width: 33%;
            overflow: hidden;
            text-overflow:ellipsis;
            text-align: center;
            white-space:nowrap;
            font-size: 28px;
            display: inline-block
        }
        .active{
            color: #FE6603
        }
    }
}
.isShow{
    right: 0;
    // min-height: 100vh;
}
</style>
