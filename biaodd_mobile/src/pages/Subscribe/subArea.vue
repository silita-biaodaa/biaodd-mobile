<!-- 模型： DOM 结构 -->
<template>
    <div class="subArea">
       <div class="sub-title" >
           选择业务所在地
       </div>
       <div class="box">
            <div class="provincial" ref="pro">
                <ul>
                    <li v-for="(o,i) of addList" :key="i" :class="tabNum==i?'active':''" @click="tapFn(i)">{{o.name}}</li>
                </ul>
            </div>
            <div class="city" ref="city">
                <ul>
                    <li v-for="(o,j) of cityList" :key="j" @click="citYtap(j)">
                        <span>{{o.name}}</span>
                        <template v-if="o.select">
                            <img src="../../assets/select.png"/>
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
    name: 'subArea', // 结构名称
    data() {
        return {
           tabNum:'',
           addList:[],
           cityList:[],
           isAll:false,
           isToast:false,
           collect:[], //收集，用于展示
           source:'',
           cityArr:[],
        }
    },
    watch: {
        // 监控集合
    },
    props: {
        // 集成父级参数
      
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
                method:'post',
                url: '/new/common/condition/filter',
            }).then(function(res){
                that.addList=res.data.data.area;
                if(that.allress) {
                     that.addList.unshift({name:'全部',list:[]})
                }
            })
        }else{
            let obj=localStorage.getItem('filter');
            obj=JSON.parse(obj);
            that.addList=obj.area;
             if(that.allress) {
                that.addList.unshift({name:'全部',list:[]})
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
            let that=this;
            let addr=sessionStorage.getItem('address') ? JSON.parse(sessionStorage.getItem('address')).name :'湖南省'

            let arr=this.addList;
                for(let x=0;x<arr.length;x++){
                    if(arr[x].code ==addr || arr[x].name == addr ){
                        that.tabNum= x;
                        that.source = arr[x].code
                        that.collect.push(arr[x])
                        that.cityFn(x);
                        that.$refs.pro.scrollTop=(x*85)/2;//自动滚动到当前所选项
                        break
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
    watch: {
     
    },
       methods: {
        // 方法 集合
        tapFn(i){
            this.tabNum=i;
            this.cityFn(i);
            this.$refs.city.scrollTop=0;
            this.collect = []
            let obj = {
              code:this.addList[i].code,
              name:this.addList[i].name
            }
            this.source = this.addList[i].code
            this.collect.push(obj)
        },
        sureFn(){
          if(this.cityArr.length == 0) {
            this.$emit('subcity',{list:this.collect,source:this.source,del:1})
          } else {
            let str = this.source + "||"
            let arr3 = []
            for (let i of this.cityArr) {
              arr3.push(i.code)
            }
            let str2 = arr3.join(',')
            str = str + str2
            this.collect = this.cityArr
            this.$emit('subcity',{list:this.collect,source:this.source,del:0,code:str})
          }
        },
        citYtap(i){
            let list=this.cityList;
            if(i==0){
                for(let x of this.cityList){
                    x.select=false
                }
             }else{
               this.cityList[0].select=false;
              
             }
             if(this.cityList[i].select){
                  list[i].select=false;
              }else{
                  list[i].select=true;
              }
            this.$set(this.cityList,i,list[i]);
            let arr1=[];
            for(let x of this.cityList){
                if(x.select){
                   if(x.name != '全部') {
                     arr1.push(x);
                   }
                    
                }
            }
            this.cityArr = arr1
            if(arr1.length==0){
                this.cityList[0].select=true;
            }
        },
        cityFn(i){
            let arr2=[];
            for(let x of this.addList[i].data){
                x.select = false
                arr2.push(x);
            }
            let arr1=[{
                name:'全部',
                code:'',
                select:true,
            }];
            if(this.addList[i].name!='湖南省'){
                arr2=[];
            }
            this.cityList=arr1.concat(arr2);
        }
    }
}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
.subArea {
    position: absolute;
    top: 90px;
    left: 0;
    z-index: 99999;
    width: 100%;
    box-sizing: border-box;
    // max-height: 90vh;
    .sub-title {
       line-height: 112px;
       font-size: 36px;
       padding-left: 33px;
       background-color: #fff;
       z-index: 9999;
       font-weight: 550;
    }
    .box{
        display: flex;
        height:calc(100vh - 430px);
        box-sizing: border-box;
        /*省级*/
        .provincial{
            width: 320px;
            overflow-y: scroll;
            ul{
            //   height: 100%;
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
            background-color: #f2f2f2;
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
                        right: 16px;
                        transform: translateY(-50%);
                        top: 50%;
                    }
                    .quan{
                        box-sizing: border-box;
                        position: absolute;
                        right: 16px;
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
