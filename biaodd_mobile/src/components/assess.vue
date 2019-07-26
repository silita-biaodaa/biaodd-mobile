<!-- 模型： DOM 结构 -->
<template>
    <div class="assess">
        <ul>
            <li v-for="(o,i) of assessList" :key="i">
                <span :class="{'active':o.class}" @click="tapFn(i)">{{o.name}}</span>
            </li>
        </ul>
        <div class="btn">
            <button class="canle" @click="canleFn">取消</button>
            <button class="sure" @click="sureFn">确定</button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'assess', // 结构名称
    data() {
        return {
            // 数据模型
            assessList:[
            ],
            selectPush:[],
            source:''
        }
    },
    watch: {
        // 监控集合
    },
    props: {
        // 集成父级参数
        selectArr:{
            default:[]
        },
        souCode: {
           default:''
        }
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        let that=this;
        if(!localStorage.getItem('filter')){
            this.$http({
                method:'post',
                url: '/new/common/condition',
            }).then(function(res){
                for(let item of res.data.data.pbMode) {
                    if(item.provice == that.souCode) {
                        that.assessList = item.list
                    }
                }
                that.assessList.unshift({name:'全部',code:''})
                for (let x of that.assessList) {
                   that.$set(that.assessList,x.class,false) 
                }
            })
        }else{
            let obj=localStorage.getItem('filter');
            let obj1 =JSON.parse(obj);
            let arr1 = obj1.pbMode
            for(let item of arr1) {
                if(item.provice == that.souCode) {
                    that.assessList = item.list
                }
            }
            that.assessList.unshift({name:'全部',code:''})
            for (let x in that.assessList) {
                that.assessList[x].class = false
            }
        }
        let str = sessionStorage.getItem('assess') ? sessionStorage.getItem('assess') : '0'
        if(that.selectArr.length>0 && str != 1 ){
          for(let x of that.assessList){
              for(let y of that.selectArr){
                  if(x.name == y.name){
                      x.class=true
                  }
              }
          }
          for(let y of that.selectArr){
              that.selectPush.push(y);
          }
        } else {
            that.assessList[0].class = true
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
         sessionStorage.removeItem('assess')
    },
    destroyed() {
        // console.group('销毁完成状态===============》destroyed');
    },
    methods: {
        // 方法 集合
        tapFn(i){
            
            let that=this;
            let list = that.assessList
            if(i==0){
                for(let x of list){
                    x.class=false
                }
                list[i].class=true;
                that.selectPush=[];
                that.$set(that.assessList,0,list[0])
                return false
            }else{
                list[0].class=false;
               
            }

            if(!list[i].class){
                that.selectPush.push(list[i]);
                list[i].class=true;
            }else{
                for(let x in that.selectPush){
                    if(that.selectPush[x].name == list[i].name){
                        that.selectPush.splice(x,1)
                    }
                }
                list[i].class=false;
            }
            that.$set(that.assessList,i,list[i])
        },
        sureFn(){
            let arr1 = []
            for (let item of this.selectPush) {
                arr1.push(item.code)
            }
            let str = arr1.join('||')
            this.$parent.mask=false;
            this.$emit('sureFn',{str:str,select:this.selectPush});
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
.assess{
    position: absolute;
    background: #f5f5f5;
    bottom:0;
    transform: translateY(100%);
    left: 0;
    z-index: 9;
    width: 100%;
    box-sizing: border-box;
    ul{
        display: flex;
        flex-wrap: wrap;
        padding: 50px 32px 0;
        height: 595px;
        box-sizing: border-box;
        overflow-y: auto;
        // margin-bottom: 130px;
        li{
            text-align: center;
            margin-bottom: 32px;
            // width: 50%;
            span{
                margin-right: 40px;
                padding: 15px 40px;
                display: inline-block;
                border-radius:10px;
                text-align: center;
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
@media screen and (max-width: 321px) {
    .assess ul li span{
        // margin-right: 10px;
    }
}
@media screen and (min-width:376px){
    .assess ul li span{
        // margin-right: 60px;
    }
}
</style>
