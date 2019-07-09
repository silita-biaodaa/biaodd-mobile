<!-- 模型： DOM 结构 -->
<template>
    <div class="law">
      <v-fix :nav="6"></v-fix>
      <div class="search">
        <van-search placeholder="请输入法务信息关键字" v-model="data.keyWord" @focus='jumpS'></van-search>
      </div>
       <div class="screen-box law-box ">
         <div class="condition" :class="{'active':active}" @click="showMask">
            <span>判决年份</span>
            <i></i>
         </div>
          <div class="four condition-box" v-if="active">
            <div class="box yj-chce">
                <div class="top">
                    <h6>判决年份</h6>
                    <div class="money-box">
                            <!-- <input placeholder="判决年份" v-model="data.start" @click="dateTapFn(0)"/>
                            <span>—</span>
                            <input placeholder="判决年份" v-model="data.end"  @click="dateTapFn(1)"/> -->
                        <span @click="dateTapFn(0)" class="date-select" :class="data.start==null?'empty':''">{{data.start==null?'起始年份':data.start}}</span>
                        <span>—</span>
                        <span @click="dateTapFn(1)" class="date-select" :class="data.end==null?'empty':''">{{data.end==null?'结束年份':data.end}}</span>
                    </div>
                    <ul>
                        <li v-for="(o,i) of dateList" :key="i">
                            <span :class="screenData.dateNum==i?'active':''" @click="dateFn(i)">{{o}}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div  class="law-btn" >
                <button class="canle"  @click.stop="ResetFn" >重置</button>
                <button @click.stop="fourTapFn"  >确定</button>
            </div>
        </div>
       </div>
      <div class="total">为您搜索到{{total}}条法务信息</div>
      <!-- 列表 -->
       <template v-if="isajax">
            <template v-if="zbList.length>0">
                  <van-list finished-text="没有更多了"  @load="onLoad" :error.sync="error" error-text="请求失败，点击重新加载" :offset="200" :finished="finished" :immediate-check="false">
                    <law-de  v-for="(o,i) of zbList" :key="i" :obj="o" ></law-de>
                  </van-list>
            </template>

            <template v-else>
                <v-not :isError="isError" :hint="'Sorry，没有找到符合条件的法务信息'"  ></v-not>
            </template>
        </template>
        <template v-else>
          <van-loading size="50px"></van-loading>
          <p style="text-align: center;margin-top:30px">拼命加载中</p>
        </template>
        <van-popup position="bottom" :overlay="true" v-model="dateMask">
        <van-datetime-picker
        type="date"
        :max-date="new Date()"
        @confirm="confirm"
        @cancel="dateMask=false"
        ></van-datetime-picker>
    </van-popup>
    </div>
</template>
<script>
import fixHead from '@/components/fixHead'
import not from '@/components/not'
import lawde from '@/pages/law/lawDe'

export default {
    name: 'law', // 结构名称
    data() {
        return {
            // 数据模型
            title:'',
            total:0,
            active:false,
            data:{
              start:null,
              end:null,
              pageNo:1,
              pageSize:'10',
              keyWord:''
            },
            dateList:['全部','近三年','近五年'],
            screenData:{
              dateNum:0,
            },
            isajax:false,//是否加载完
            isError:false,//是否加载失败
            finished:false,//是否加载完
            error:false,
            loading:false,//是否加载完，false为加载完
            isScroll:true,
            zbList:[],
             dateMask:false,//时间选择弹窗是否显示
        }
    },
    watch: {
        // 监控集合
      data:{
        deep:true,
        handler(val,old){
          sessionStorage.setItem('lawData',JSON.stringify(val));
        }
      },
    },
    props: {
        // 集成父级参数
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    components: {
       'v-fix':fixHead,
       'v-not':not,
       'law-de':lawde
    },
    created() {
        // console.group('创建完毕状态===============》created');
        if(sessionStorage.getItem('lawData')) {
          let data=JSON.parse(sessionStorage.getItem('lawData'));
          data.pageNo=1;
          this.data=data;
        }
        this.data.keyWord = this.$route.query.key ? this.$route.query.key : (this.$route.query.scom ? this.$route.query.scom :'' )
        this.gainList()
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
        sessionStorage.removeItem('bidData')
    },
    destroyed() {
        // console.group('销毁完成状态===============》destroyed');
    },
    methods: {
        // 方法 集合
      jumpS() {
          this.$router.push({ path:'/history', query:{path:'/law',lo:'lawL'}});
      },
      showMask() {
        this.active = !this.active
      },
      dateTapFn(type){
           if(type==1){
                this.isDateStart=false
            }else{
                this.isDateStart=true
            }
            // this.modalHelper.afterOpen();
            this.screenData.dateNum=0;
            this.dateMask=true
       },
        confirm(pick){
            let y=pick.getFullYear(),
                mon=pick.getMonth()+1,
                day=pick.getDate();
                mon=mon<10?'0'+mon:mon;
                day=day<10?'0'+day:day;
            if(this.isDateStart){
                this.data.start=y+'-'+mon+'-'+day
            }else{
                this.data.end=y+'-'+mon+'-'+day
            }
            this.dateMask=false    
        },
       dateFn(i){
            this.screenData.dateNum=i;
            this.data.start=null;
            this.data.end=null;
        },
        fourTapFn() {
            let date=new Date();
            let y=date.getFullYear(),
                mon=date.getMonth()+1,
                day=date.getDate();
                mon=mon<10?'0'+mon:mon;
                day=day<10?'0'+day:day;
            if(this.screenData.dateNum==1){
                if(mon=='02'&&day==29){
                    day=28
                }
                this.data.end=y+'-'+mon+'-'+day;
                this.data.start=(y-3)+'-'+mon+'-'+day;
            }else if(this.screenData.dateNum==2){
                if(mon=='02'&&day==29){
                    day=28
                }
                this.data.end=y+'-'+mon+'-'+day;
                this.data.start=(y-5)+'-'+mon+'-'+day;
            }
            this.active = false
            this.gainList()
        },
        ResetFn() {
           this.active = false
           this.data.end=null;
           this.data.start=null;
            this.gainList()
        },
        onLoad() {
          if(!this.isScroll){
              return false
          }
          this.data.pageNo++;
          this.gainList()
        },
        gainList() {
          this.isScroll=false;
          let that=this;
          this.$http({
              method:'post',
              url: '/law/list',
              data:that.data
          }).then(function(res){
            if(res.data.code == 1) {
               that.loading = false;
               that.total=res.data.total;
               if(that.zbList.length==0||that.data.pageNo==1){
                 that.zbList=res.data.data;
                 that.isajax=true;
               }else{
                 that.zbList=that.zbList.concat(res.data.data)
               }
               if(res.data.total==that.zbList.length||that.zbList.length<that.data.pageSize){
                   that.finished=true;//如果返回总条数等于当前list长度
               }
               that.isScroll=true;
            } else {
              that.isajax=true;
              that.isError=true;
              if(that.zbList.length>0){
                  that.error = true;
              }
            }
              
          }).catch(function(res){
              that.isajax=true;
              that.isError=true;
              if(that.zbList.length>0){
                  that.error = true;
              }
          })
        }

    }

}
</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
.law {
   padding-top: 200px;
//    .law-box {
//      justify-content: center;
//    }
   .yj-chce {
        height: 545px;
        box-sizing: border-box;
        overflow-y: auto;
    }
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
   .condition-box{
        position: absolute;
        background: #f5f5f5;
        bottom:0;
        transform: translateY(100%);
        left: 0;
        z-index: 9;
        width: 100%;
        padding:50px 0 0;
        box-sizing: border-box;
    }
     .condition-box{       
        ul{
            display: flex;
            justify-content: space-between;
        }
        li{  
            text-align: center;
            margin-bottom: 128px;
            width: calc(100%/3);
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
   .four{
        .condition-box{
           
            li{
                margin-bottom: 64px;
            }
        }
        h6{
            padding-left: 35px;
            margin-bottom: 20px;
            font-size: 28px;
        }
        .money-box{
            display: flex;
            padding: 0 35px;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 32px;
            span{
                width: 30px;
            }
            input{
                width: calc((100% - 100px)/2);
                border-radius: 5px;
                padding: 10px;
                box-sizing: border-box;
                border: 1PX solid #e8e8e8;
                background: #fff;
                outline: medium;
            }
            .date-select{
                width: calc((100% - 100px)/2);
                height: 60px;
                border-radius: 5px;
                padding: 10px;
                box-sizing: border-box;
                border: 1PX solid #e8e8e8;
                background: #fff;
            }
            .empty{
                color: #999;
            }
        }
    }
    .law-btn {
      display: flex;
      button {
        width: 50%;
        height: 84px;
        background: #FE6603;
        color: #fff;
        border: none;
      }
      .canle{
            border: 1PX solid #CCBEBE;
            color: #333;
            background: #fff;
        }
    }
}
</style>
