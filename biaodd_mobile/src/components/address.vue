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
                    <li v-for="(o,j) of cityList" :key="j" @click="citYtap(j)">
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
            tabNum:'',
            addList:[],
            cityList:[],
            isAll:false,
            isToast:false,
            name:''
            // cityNum:0,
        }
    },
    watch: {
        // 监控集合
       
    },
    props: {
        // 集成父级参数
        add:{
            default:{}
        },
        type:{
            default:0
        },
        allress:{
             default:false
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
            let addr=this.add.name ? this.add.name : (this.add.regions ? this.add.regions : '湖南省');
            let arr=this.addList;
            console.log(addr,8);
            
            if(addr.indexOf('||') > -1) {//市
                let arr1=addr.split('||');
                let arr4 = []
                // if(addr.indexOf(',')>-1) {
                //    arr4 = arr1[1].split(',')
                // } 
                // if(arr1[1] != null) {
                     arr4 = arr1[1].split(',')
                // }
                for(let x=0;x<arr.length;x++){
                    if(this.$route.path == '/tender' || this.$route.path == '/bid' ) {
                        if(arr[x].code.indexOf(arr1[0])>-1 ){
                            that.tabNum=x;
                            that.cityFn(x);
                            that.$refs.pro.scrollTop=(x*85)/2;//省份滚动到选中位置
                            break
                        }
                    } else {
                        if(arr[x].name.indexOf(arr1[0])>-1 ){
                            that.tabNum=x;
                            that.cityFn(x);
                            that.$refs.pro.scrollTop=(x*85)/2;//省份滚动到选中位置
                            break
                        }
                    }
                }
                if(arr4.length >= 1 ) {
                     that.cityList[0].select=false; 
                      for(let item of that.cityList ) {
                        if(arr4.indexOf(item.code) > -1 || arr4.indexOf(item.name) > -1 ) {
                            item.select = true
                        }
                     }
                } else if (arr1.length >= 2) {
                     that.cityList[0].select=false; 
                      for(let item of that.cityList ) {
                        if(arr1.indexOf(item.name) > -1) {
                            item.select = true
                        }
                     }
                } else {
                     that.cityList[0].select= true
                }
                //市区滚动到选中位置
                setTimeout(function(){//定时器用于当进入时，还未渲染完
                    let first=false;//第一次进入(用来滚动到选中第一个)
                    for(let i=0;i<that.cityList.length;i++){
                        if(arr4.length >= 1) {
                             for(let x=0;x<arr4.length;x++){
                              if(that.$route.path == '/tender' || that.$route.path == '/bid' ) {
                                    if(arr4.indexOf(that.cityList[i].code)>-1){ 
                                        that.cityList[i].select=true;
                                        if(!first){
                                            that.$refs.city.scrollTop=(i*85)/2;
                                        }
                                        first=true;
                                    }
                              } else {
                                   if(arr4.indexOf(that.cityList[i].name)>-1){
                                        that.cityList[i].select=true;
                                        if(!first){
                                            that.$refs.city.scrollTop=(i*85)/2;
                                        }
                                        first=true;
                                    }
                              }
                          }
                        } else {
                            for(let x=1;x<arr1.length;x++){
                                    if(arr1.indexOf(that.cityList[i].name)>-1){
                                        that.cityList[i].select=true;
                                        if(!first){
                                            that.$refs.city.scrollTop=(i*85)/2;
                                        }
                                        first=true;
                                    }
                          }
                        }
                       
                    }
                },50)
            }else{
                for(let x=0;x<arr.length;x++){
                    if(arr[x].code ==addr || arr[x].name == addr ){
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
        },
         isToast(val) {
          if(val) {
              setTimeout(() => {
                  this.isToast = false
              },1500 );
          }
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
            let str = ''
            let txt = ''
            let showstr =this.addList[this.tabNum].name;
            if(this.$route.path == '/tender'|| this.$route.path == '/bid' || this.$route.path == '/home') {
                 str=this.addList[this.tabNum].code;
                 txt=this.addList[this.tabNum].name;
                //  name = this.addList[this.tabNum].shortName;
            } else {
                 str=this.addList[this.tabNum].name;
                 txt=this.addList[this.tabNum].name;
                //  name = this.addList[this.tabNum].shortName;
            }
            
            if(!this.isAll){//如果是选市级则传市级
                let arr = []
                 if(this.$route.path == '/tender' || this.$route.path == '/bid' || this.$route.path == '/home' ) {
                      arr.push(this.addList[this.tabNum].code)
                 } else {
                      arr.push(this.addList[this.tabNum].name)
                 }
                // let arr=[this.addList[this.tabNum].name]
                let arr1 = []
                let str1 = ''
                for(let x of this.cityList){
                    if(x.select){
                         if(this.$route.path == '/tender' || this.$route.path == '/bid' || this.$route.path == '/home' ) {
                           arr1.push(x.code)
                           
                         } else {
                           arr1.push(x.name)  
                         }
                    }
                }
                  str1 = arr1.join(',')
                 if(arr.length == 1) {
                     str = arr[0] + "||" + str1
                 }
                //用作接口入参
                // arr.splice(0,1);
                txt=showstr;//用作显示
            }
            this.$parent.mask=false;
            this.$emit('addObj',{str:str,txt:txt,name:this.name});
        },
        citYtap(i){
            let list=this.cityList;
            if(i==0){
                for(let x of this.cityList){
                    x.select=false
                }
            }else{
                this.cityList[0].select=false;
                // this.cityList[i].select=true;
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
                list[i].select=false;
            }else{
                list[i].select=true;
            }
            this.$set(this.cityList,i,list[i]);
            let arr1=[];
            for(let x of this.cityList){
                if(x.select){
                    arr1.push(x);
                }
            }
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
            this.name = this.addList[i].shortName
            let arr1=[{
                name:'全部',
                code:'',
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
