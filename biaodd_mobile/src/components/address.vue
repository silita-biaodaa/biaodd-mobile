<!-- 模型： DOM 结构 -->
import { setTimeout } from 'timers';
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
                        <span>{{o}}</span>
                        <template v-if="cityNum==i">
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
            cityNum:0,
        }
    },
    watch: {
        // 监控集合
    },
    props: {
        // 集成父级参数
        add:{
            default:'湖南省'
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
                that.tabNum=14;
                that.cityFn(14);
                that.$refs.pro.scrollTop=(14*85)/2;//自动滚动到当前所选项
                let arr1=addr.split('||');
                setTimeout(function(){
                    for(let i=0;i<that.cityList.length;i++){
                        if(that.cityList[i].indexOf(arr1[1])>-1){
                            that.cityNum=i;
                            that.$refs.city.scrollTop=(i*85)/2;
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
    methods: {
        // 方法 集合
        tapFn(i){
            this.tabNum=i;
            this.cityFn(i);
        },
        sureFn(){
            let str=this.addList[this.tabNum].name;
            let txt=this.addList[this.tabNum].name;
            if(this.cityNum!=0){//如果是选市级则传市级
                str=this.addList[this.tabNum].name+'||'+this.cityList[this.cityNum];
                txt=this.cityList[this.cityNum];
            }
            this.$parent.mask=false;
            this.$emit('addObj',{str:str,txt:txt});
        },
        cityTap(i){
            this.cityNum=i;
        },
        cityFn(i){
            let arr2=this.addList[i].list;
            let arr1=['全'+this.addList[i].name];
            if(this.addList[i].name!='湖南省'){
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
</style>
