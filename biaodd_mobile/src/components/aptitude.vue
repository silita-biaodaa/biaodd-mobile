<!-- 模型： DOM 结构 -->
import { setTimeout } from 'timers';
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
                            <span @click="modifyFn(i)">{{o.name}}</span>
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

                <div class="fix-paing" >
                    <van-icon name="cross" @click="hideFix"></van-icon>
                </div>
                <div class="search">
                  <van-search placeholder="请输入资质关键字"  v-model="rchname" ></van-search>
                </div>

                <div class="fix-padd" v-if="rchShow" >
                    <div class="nav">
                        <span v-for="(o,i) of navTxt" :class="num==i?'active':''" :key="i" @click="navTap(i)">{{o}}</span>
                    </div>
                </div>
               
                <!-- 资质单极选择 -->
                <ul class="fix-padd"  v-if="rchShow" >
                    <li v-for="(o,i) of showArr" :key="o.code" @click="selectFn(i)">{{o.name}}</li>
                </ul>
                <!-- 资质搜索列表 -->
                <ul class="fix-padd"  v-else >
                    <li v-for="(o,i) of rcharr" :key="o.quaCode" @click="selectRch(o)">{{o.quaName}}</li>
                </ul>
                <div class="fix-hint" v-if="this.rcharr.length ==0 && !this.rchShow" >
                    暂未找到该资质，请输入其他关键字
                </div>
            </div>
        </div>
        <div class="toast" v-if="isToast">
            <span>资质不可重复选择哟~</span>
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
            isToast:false,
            rchname:'',
            rcharr:[],
            rchShow:true,
        }
    },
    watch: {
        // 监控集合
        rchname(val) {
            if(val != '') {
                this.rchShow = false
                let that=this;
                this.$http({
                    method:'post',
                    url: '/new/common/filter/qual',
                    data:{
                       bizType:that.bizType,
                       keyWord:that.rchname,
                    }
                }).then(function(res){    
                    if(res.data.code ==1 ) {
                        that.rcharr = res.data.data
                    }
                })
            } else {
                this.rchShow = true
                this.rcharr = []
                if(this.navTxt.length != 1) {                    
                    for(var item of this.data){	
                       if(item.name == this.navTxt[0] ) {
                          for(var el of item.data){	
                              if(el.name == this.navTxt[1] &&  this.navTxt[1] !='请选择' ) {
                                  this.showArr =  el.data
                              }
                          }
                       }
                    }
                } else {
                  this.showArr=this.data;
                }
                
            }
            
        }
    },
    props: {
        // 集成父级参数
        type:{
            default:1//1为企业
        },
        arr:{
            default:[]
        },
        bizType: {
           default:2
        }
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
        let that=this;
        // //资质
        if(!localStorage.getItem('filter')){
            //资质
            this.$http({
                method:'post',
                url: '/new/common/condition',
            }).then(function(res){
                if(that.$route.path == '/bid') {
                   that.data=res.data.data.noticeQua;
                   that.showArr=res.data.data.noticeQua;
                } else {
                  that.data=res.data.data.newQual;
                  that.showArr=res.data.data.newQual;
                }
            })
        }else{
            let obj=localStorage.getItem('filter');
            obj=JSON.parse(obj);
            if(that.$route.path == '/bid') {
               that.data=obj.noticeQua;
               that.showArr=obj.noticeQua;
            } else {
              that.data=obj.newQual;
              that.showArr=obj.newQual;
            }
            
            
        }
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
            this.storageArr.push(obj);   // 存进去选择资质
            this.navTxt[that.num]=that.showArr[i].name;  // 对应位置展示
            if(that.showArr[i].data==null){    // 资质选到最后一级的操作 
                let name=[],code=[];
                for(let x of that.storageArr){
                    name.push(x.name);
                    if(that.storageArr[0].code != x.code) {
                     code.push(x.code);
                    }
                }
                let boxData = {
                    name:name.join('-'),
                    code:code.join('/')
                }
                for(let x of this.boxArr){
                   if(x.code==boxData.code){
                       that.storageArr.length=2;
                       that.isToast=true;
                       setTimeout(function(){
                           that.isToast=false;
                       },1500)
                       return false
                   }
                }
                this.hideFix();
                that.storageArr=[];
                this.boxArr.push(boxData);
                this.navTxt=[];
                this.sureTxt='确定';
                this.showArr=this.data;
            }
            this.showArr=this.showArr[i].data;
            this.num++;
            this.navTxt.push('请选择')
        },
        selectRch(el) {
           this.storageArr = []
           this.num = 2;
           let name = el.quaName.split('-')
           let code = el.quaCode.split('-')
           for(let x in name){
             let obj = {
                 code:code[x],
                 name:name[x]
             }
              this.storageArr.push(obj);
           }
           for(var item of this.data){	
               if(item.name == name[0] ) {
                  for(var el of item.data){	
                      if(el.name == name[1]) {
                          this.showArr =  el.data
                      }
                  }
               }
            }
           this.navTxt = name
           this.navTxt.push('请选择')
           this.rchShow = true
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
            
            this.rchname = ''
            let that=this;
            if(that.sureTxt=='添加'){
                that.isFix=true;
                that.modalHelper.afterOpen();
            }else{
                let arr=that.boxArr;
                let str='';
                for(let x of arr){
                    str=str+x.code+','
                }
                str=str.substring(0,str.length-1);
                this.$emit('sureFn',{str:str,list:this.boxArr});
            }
        },
        addFn(){
            this.rchname = ''
            this.isFix=true;
            this.num=0;
            this.showArr=this.data;
            this.modalHelper.afterOpen();
        },
        hideFix(){
            this.rchname = ''
            this.isFix=false;
            this.modalHelper.beforeClose();
        },
        recordFn(){
            this.$emit('recordFn');
        },
        navTap(i){
            this.num=i;
            if(i==0){
                this.showArr=this.data;
                this.navTxt=['请选择'];
                this.storageArr=[];
            }else if(i==1){
                for(let x in this.data){
                    if(this.data[x].name == this.navTxt[0]){
                        this.showArr = this.data[x].data
                        break
                    }
                }
                this.navTxt[1]='请选择';
                this.navTxt.length=2;
                this.storageArr.length=1;
            }
        },
        modifyFn(i){
            this.rchname = ''
            this.isFix=true;
            this.modalHelper.afterOpen();
            //取之前的数据
            let arrName=this.boxArr[i].name.split('-');
            let arrCode=this.boxArr[i].code.split('/');
            //删除之前的那行
            this.boxArr.splice(i,1);
            this.navTxt=arrName;
            this.navTxt[2]='请选择';
            this.num=2;
            for(let x of this.data){
                if(x.name == arrName[0]){
                    for(let y of x.data){
                        if(y.code == arrCode[0]){
                            this.showArr = y.data
                            break
                        }
                    }
                    break
                }
            }
            arrCode.unshift('0000')
           for(let x=0;x<arrName.length-1;x++){
                let data={
                    code:arrCode[x],
                    name:arrName[x]
                }
                this.storageArr.push(data);
            }
        },
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style scoped lang="less">
.aptitude.zIndex{
    z-index: 1000;
    transform:initial;
}
.aptitude{
    position: absolute;
    // height: 568px;
    transform: translateY(100%);
    background: #f5f5f5;
    bottom: 0;
    left: 0;
    z-index: 9;
    width: 100%;
    box-sizing: border-box;
    .box{
        height: 595px;
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
    // padding: 35px 32px;
    // padding-right: 0;
    overflow-y: scroll;
    box-sizing: border-box;
    -webkit-overflow-scrolling:touch;
    .fix-paing {
         padding: 35px 32px;
    }
    .fix-box-con{
        min-height:calc(100% + 1px);
    }
    .fix-padd {
       padding: 20px 32px;
       padding-bottom: 0;
    }
    .fix-hint {
        line-height: 150px;
        font-size: 28px;
        color:#999;
        text-align: center;
    }
    li{
        padding:30px 0;
        font-size: 28px;
        border-bottom: 1PX solid #f2f2f2;
    }
    .nav{
        margin-bottom: 20px;
        margin-top: 20px;
        span{
            width: 31%;
            overflow: hidden;
            text-overflow:ellipsis;
            // text-align: center;
            white-space:nowrap;
            font-size: 28px;
            display: inline-block;
            margin-right: 10px;
        }
        :last-child {
            margin-right: 0;
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
.toast{
    z-index: 9999991;
    span{
        color: #fff;
        font-size: 28px;
    }
}
</style>
