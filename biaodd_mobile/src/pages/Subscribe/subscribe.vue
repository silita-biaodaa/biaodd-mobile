<!-- 模型： DOM 结构 -->
<template>
    <div class="Subscribe">
       <top-back :title="'我的订阅'" :isSet='isSet' ></top-back>
       <div class="no-scribe" v-if="isSub"  >
         <!-- <div> -->
           <div class="scribe-hint" >
             订阅成功后，将第一时间推送符合条件的招标信息给您，再也不怕错过任何项目啦！
           </div>
           <div class="scribe-btn"  @click="jump" >
             立即订阅
           </div>
         <!-- </div> -->
       </div>
        <template v-if="this.subLits.length > 0 || this.error == true" > 
          <van-list finished-text="没有更多了"  @load="onLoad" :error.sync="error" error-text="请求失败，点击重新加载" :offset="200" :finished="finished" :immediate-check="false">
            <sub-list v-for="(el,i) in this.subLits" :key="i" :obj='el' ></sub-list>
          </van-list>
        </template>  
        <template v-if="this.subLits.length == 0 && this.isSub == false && this.loadIng == false && this.error == false">
            <v-not  :hint="'Sorry，没有找到符合条件的公告信息'"  ></v-not>
        </template>
       <div class="scribe-coll" v-if="iShow"  >
         <div class="coll-img" >
           <div class="coll-btn" @click.stop="closeImg" >

           </div>
         </div>
       </div>
       <v-vip :mask="isvip" :txt="'开通会员即可订阅相关招标公告轻松挑选项目，快人一步'"></v-vip>
       <template v-if="loadIng" >
          <van-loading size="50px"></van-loading>
          <p style="text-align: center;margin-top:30px">拼命加载中</p>
        </template>
    </div>
</template>
<script>
import subList from '@/pages/Subscribe/subList'
import not from '@/components/not'
export default {
    name: 'Subscribe', // 结构名称
    data() {
        return {
            // 数据模型a
            isvip:false,
            isSub:false,
            iShow:false,
            openList:false,
            isSet:false,
            data:{},
            subLits:[],
            finished:false,
            error:false,
            loadIng:true,
            isError:false,
            error:false
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
        setTimeout(() => {
             this.gainIp()
        }, 1000);
       
        
    },
    beforeMount() {
        // console.group('挂载前状态  ===============》beforeMount');
    },
    mounted() {
        // console.group('挂载结束状态===============》mounted');
        this.$nextTick(function() {
            // console.log('执行完后，执行===============》mounted');
            this.gainArea()
        });
    },
    components:{
      'sub-list':subList,
      'v-not':not
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
        jump() {
          if(sessionStorage.getItem('permissions') == 'null') {
            this.isvip=true;
            this.modalHelper.afterOpen();
          } else {
             this.$router.push('/subset')
          }
        },
        gainIp() {
          let that=this; 
           this.$http({
                method:'post',
                url: '/subscribe/gain/condition',
                data: {
                  pkid: that.$route.params.id ? that.$route.params.id : null,
                }
            }).then(function(res){
              console.log(111);
              
               if(res.data.code == 1) {
                 if(res.data.data.regions ==  null) {
                    console.log(res.data.data);
                     that.isSub = true
                     that.loadIng = false
                     return
                 }
                 that.data =  res.data.data
                 that.data.pageNo = 1
                 that.data.pageSize = 5
                 that.gainList()
                 if(that.$route.query.form == 1) {
                   that.iShow = true
                   that.modalHelper.afterOpen();
                 }
                 that.openList = true
                 that.isSub = false
                 that.isSet = true
               }
            })
        },
        gainList()  {
           let that=this; 
           that.isScroll = false
           that.loadIng = true
           let data=that.data;
           this.$http({
                method:'post',
                url: '/newnocite/subscribe/list',
                data:data
            }).then(function(res){
              console.log(res);
              
               if(res.data.code == 1) {
                 that.loadIng = false 
                 that.isScroll = true
                  if(that.subLits.length==0||that.data.pageNo==1){
                      that.subLits=res.data.data;
                      that.isajax=true;
                    }else{
                      that.subLits=that.subLits.concat(res.data.data)
                    }
                 if(res.data.total==that.subLits.length){
                      that.finished=true;//如果返回总条数等于当前list长度
                  }
               } else {
                  that.loadIng = false
                  that.error = true;
               }
            }).catch(function(res){
                
            })
        },
        closeImg() {
          this.iShow = false
          this.modalHelper.beforeClose();
        },
        onLoad(){//下滚加载
          if(!this.isScroll){
              return false
          }
          this.data.pageNo++;
          this.gainList();
      },
      gainArea() {
          let that=this;
          let allArea = JSON.parse(localStorage.getItem('filter')).area 
           this.$http({
                method:'post',
                url: '/subscribe/gain/condition',
                data: {
                  pkid:null
                }
            }).then(function(res){
               if(res.data.code == 1) {
                 let select = []
                 if(res.data.data.regionName ==  null) {
                    return 
                 } else {
                   let str = res.data.data.regionName
                   let arr5 = str.split(';')
                   for (var o of arr5) {
                     let arr =  o.split('||')
                     for (var i = 0;i < allArea.length;i++) {
                       if(allArea[i].name == arr[0]) {
                         if(arr[1] != ''  ) {
                            let arr1 = arr[1].split(',')
                              for (var k = 0;k < arr1.length;k++) {
                                 for (var j = 0;j < allArea[i].data.length;j++) {
                                     if(arr1[k] == allArea[i].data[j].name ) {
                                        select.push(allArea[i].data[j])
                                     }
                                 }
                             }

                          } else {
                             select.push(allArea[i])
                          }
                       }
                     }
                    
                   }
                   setTimeout(() => {
                     localStorage.setItem('subarea',JSON.stringify(select))
                   }, 1000);
                    
                 }
               }
            })
        },

    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
.Subscribe {
  padding: 100px 0 130px;
  min-height: 100vh;
  box-sizing: border-box;
  position: relative;
  .no-scribe {
    margin:300px 32px 0; 
    .scribe-hint {
      padding: 0 70px;
      line-height:48px;
      font-size:32px;
      color:rgba(153,153,153,1);
      max-height: 96px;
    }
    .scribe-btn {
      margin-top: 300px;
      width: 100%;
      height: 92px;
      border-radius: 50px;
      background-color: #FE6603;
      line-height: 92px;
      text-align: center;
      color: #fff;
      font-size: 35px;
      font-weight: 500;
      box-shadow:5PX 5PX 5PX 1PX rgba(153,153,153,0.5);
    }
  }
  .scribe-coll {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    max-height: 100vh;
    background-color:rgba(0,0,0,0.5);
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
    .coll-img {
      height: 869px;
      width: 747px;
      background: url('../../assets/pic-tanch.png') no-repeat;
      background-size: 100%;
      position: relative;
      .coll-btn {
        position: absolute;
        top: 60px;
        right: 80px;
        height: 60px;
        width: 130px;
      }
    }
  }
}
</style>
