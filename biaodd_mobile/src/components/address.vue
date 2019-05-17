<!-- 模型： DOM 结构 -->
<template>
    <div class="addr">
        <div class="box">
            <div class="provincial" ref="pro">
                <ul>
                    <li v-for="(o,i) of addList" :key="i" :class="tabNum==i?'active':''" @click="tapFn(i)">{{o.name}}</li>
                </ul>
            </div>
            <div class="city" ref="city">
                <ul>
                    <li v-for="(o,i) of cityList" :key="i" @click="cityTap(i)">
                        <span>{{o.name}}</span>
                        <template v-if="o.select">
                            <img src="../assets/select.png"/>
                        </template>
                        <template v-else>
                            <span class="quan"></span>
                        </template>
                    </li>
                </ul>
            </div>
        </div>
        <button @click="sureFn">确定</button>
        <div class="toast" v-if="isToast">
            <span>最多只能选择三个市</span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'addr', // 结构名称
    data() {
        return {
            // 数据模型
            // addList:["北京","天津","上海","重庆","河北","山西","辽宁","吉林","黑龙江","江苏","浙江","安徽","福建","江西","山东","河南","湖北","湖南","广东","海南","四川","贵州","云南","陕西","甘肃","青海","内蒙古","广西","西藏","宁夏","新疆"],
            tabNum:'',
            addList:[],
            cityList:[],
            isAll:false,
            isToast:false,
            // cityNum:0,
        }
    },
    watch: {
        // 监控集合
    },
    props: {
        // 集成父级参数
        add:{
            default:'湖南省'
        },
        type:{
            default:0
        }
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
        let that=this;
        if(!localStorage.getItem('filter')){
            //资质
            this.$http({
                method:'get',
                url: '/company/filter',
            }).then(function(res){
                that.addList=res.data.data.area;
            })
        }else{
            let obj=localStorage.getItem('filter');
            obj=JSON.parse(obj);
            that.addList=obj.area;
        }


        // let addr=this.add;

    },
    beforeMount() {
        // console.group('挂载前状态  ===============》beforeMount');
    },
    mounted() {
        // console.group('挂载结束状态===============》mounted');
        this.$nextTick(function() {
            // console.log('执行完后，执行===============》mounted');
            let that=this;
            let addr=this.add;
            let arr=this.addList;
            if(addr.indexOf('||')>-1){//市
                let arr1=addr.split('||');
                for(let x=0;x<arr.length;x++){
                    if(arr[x].name.indexOf(arr1[0])>-1){
                        that.tabNum=x;
                        that.cityFn(x);
                        that.$refs.pro.scrollTop=(x*85)/2;//省份滚动到选中位置
                        break
                    }
                }
                this.cityList[0].select=false;
                //市区滚动到选中位置
                setTimeout(function(){//定时器用于当进入时，还未渲染完
                    let first=false;//第一次进入(用来滚动到选中第一个)
                    for(let i=0;i<that.cityList.length;i++){
                        for(let x=1;x<arr1.length;x++){
                            if(that.cityList[i].name.indexOf(arr1[x])>-1){
                                that.cityList[i].select=true;
                                if(!first){
                                    that.$refs.city.scrollTop=(i*85)/2;
                                }
                                first=true;
                            }
                        }
                    }
                },50)
            }else{
                for(let x=0;x<arr.length;x++){
                    if(arr[x].name.indexOf(addr)>-1){
                        that.tabNum=x;
                        that.cityFn(x);
                        that.$refs.pro.scrollTop=(x*85)/2;//自动滚动到当前所选项
                        break
                    }
                }
            }
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
    watch:{
        cityList:{
            handler(val,oldVal){
                if(val[0].select){
                    this.isAll=true
                }else{
                    this.isAll=false
                }
            },
            deep:true
        }
    },
    methods: {
        // 方法 集合
        tapFn(i){
            this.tabNum=i;
            this.cityFn(i);
            this.$refs.city.scrollTop=0;
        },
        sureFn(){
            let str=this.addList[this.tabNum].name;
            let txt=this.addList[this.tabNum].name;
            if(!this.isAll){//如果是选市级则传市级
                let arr=[this.addList[this.tabNum].name]
                for(let x of this.cityList){
                    if(x.select){
                        arr.push(x.name)
                    }
                }
                str=arr.join('||');//用作接口入参
                arr.splice(0,1);
                txt=arr.join(',');//用作显示
            }
            this.$parent.mask=false;
            this.$emit('addObj',{str:str,txt:txt});
        },
        cityTap(i){
            // this.cityNum=i;
            if(i==0){
                for(let x of this.cityList){
                    x.select=false
                }
            }else{
                this.cityList[0].select=false;
                let arr=[];
                for(let x of this.cityList){
                    if(x.select){
                        arr.push(x);
                    }
                }
                if(arr.length==3&&!this.cityList[i].select){
                    let that=this;
                    this.isToast=true;
                    setTimeout(function(){
                        that.isToast=false;
                    },1500)
                    return false
                }
            }
            if(this.cityList[i].select){
                this.cityList[i].select=false;
            }else{
                this.cityList[i].select=true;
            }
        },
        cityFn(i){
            let arr2=[];
            for(let x of this.addList[i].list){
                let data={
                    name:x,
                    select:false
                }
                arr2.push(data);
            }
            let arr1=[{
                name:'全部',
                select:true,
            }];
            if(this.addList[i].name!='湖南省'&&this.type==0){
                arr2=[];
            }
            if(this.type==2){
                arr2=[];
            }
            this.cityList=arr1.concat(arr2);
        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style scoped lang="less">
.addr{
    position: absolute;
    transform: translateY(100%);
    background: #f5f5f5;
    bottom:0;
    left: 0;
    z-index: 9;
    width: 100%;
    // height: 722px;
    box-sizing: border-box;
    .box{
        display: flex;
        /*省级*/
        .provincial{
            width: 320px;
            overflow-y: scroll;
            ul{
                height: 595px;
                li{
                    background: #fff;
                    text-align: center;
                    height: 85px;
                    line-height: 85px;
                }
                .active{
                    background: #f2f2f2;
                    color: #FE6603;
                }
            }
        } 
        /*市级*/
        .city{
            width:calc(100% - 320px);
            overflow-y: scroll;
            ul{
                height: 595px;
                li{
                    text-align: center;
                    height: 85px;
                    line-height: 85px;
                    position: relative;
                    img{
                        width: 40px;
                        height: 40px;
                        position: absolute;
                        right: 48px;
                        transform: translateY(-50%);
                        top: 50%;
                    }
                    .quan{
                        box-sizing: border-box;
                        position: absolute;
                        right: 48px;
                        transform: translateY(-50%);
                        top: 50%;
                        width: 40px;
                        height: 40px;
                        display: inline-block;
                        border-radius: 50%;
                        border: 1PX solid #666;
                    }
                }
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
.toast{
    z-index: 9999991;
    span{
        color: #fff;
        font-size: 28px;
    }
}
</style>
