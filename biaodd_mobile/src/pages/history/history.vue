<!-- 模型： DOM 结构 -->
<template>
    <div class="history">
       <div class="search">
         <van-search :placeholder="msg" v-model="title"  @search="searchFn" ref='id' id="id" @clear="clearFn">
         </van-search>
       </div>
       <div  class="his-title" v-show="ishow && iHis" >
         <span>历史记录</span>
         <img src="../../assets/search_icon_delate@2x.png" @click="delocal"  alt="">
       </div>
       <div style="overflowY:auto" >
           <div class="history-list" v-for="(el,i) in HList" :key="i"  @click="saveHis(el)"  >
             <img src="../../assets/icon_search@2x.png" v-show="!ishow"  alt=""> <span>{{el.comName}}</span>
          </div>
          
       </div>
       
    </div>
</template>
<script>
import fixHead from '@/components/fixHead'

export default {
    name: 'history', // 结构名称
    data() {
        return {
            // 数据模型
            title:'',
            regisAddress:'',
            HList:[],
            cHis:true, // 用于判断点击的是来源于搜索还是历史记录
            msg:'',
            ishow:true,
            iHis:true,
        }
    },
    watch: {
        // 监控集合
        title(val) {
          if(val == '') {
            this.ishow = true
            this.HList = JSON.parse(localStorage.getItem(this.$route.query.lo))
          } else {
            this.gainCom()
          }
           
        }
    },
    props: {
        // 集成父级参数
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
        this.regisAddress = localStorage.getItem('address') ? localStorage.getItem('address') : '湖南省'
        this.gainHis()
        this.gainHin()
        
    },
    beforeMount() {
        // console.group('挂载前状态  ===============》beforeMount');
    },
    mounted() {
        // console.group('挂载结束状态===============》mounted');
        // this.$nextTick(function() {
        //     // console.log('执行完后，执行===============》mounted');
        // });
        this.myFocus()
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
        // 搜索确认按钮
        searchFn() {
          if(localStorage.getItem(this.$route.query.lo) ) {
              let str = JSON.parse(localStorage.getItem(this.$route.query.lo))
              var same = false
                for (var i = 0; i< str.length;i++) {
                  if(str[i].comName == this.title) {
                    same = true
                    break
                  }
                }
                if(!same) {
                   if(str.length <= 10) {  // 最多保存十条历史记录
                        str.unshift({comName:this.title,comId:null})
                   } else {
                     str.length = 9
                     str.unshift({comName:this.title,comId:null}) 
                   }
                   localStorage.setItem(this.$route.query.lo,JSON.stringify(str))
                   this.$router.push({ path:this.$route.query.path, query:{key:this.title}});
                } else {
                   this.$router.push({ path:this.$route.query.path, query:{key:this.title}});
                }
          } else {
            var arr = []
            arr.unshift({comName:this.title,comId:null}) 
            localStorage.setItem(this.$route.query.lo,JSON.stringify(arr))
            this.$router.push({ path:this.$route.query.path, query:{key:this.title}});
          }  
        },
        clearFn() {

        },
        delocal() {
          localStorage.removeItem(this.$route.query.lo)
          this.HList = []
          this.iHis = false
        },
        gainCom() {  // 企业模糊搜索
            let that=this;
            this.$http({
                method:'post',
                url: '/company/matchName',
                data:{
                  regisAddress:that.regisAddress,
                  name:that.title
                }
            }).then(function(res){
               if(res.data.code == 1 )  {
                  if(res.data.data.length >= 1) {
                      that.HList = res.data.data
                      that.ishow = false
                      that.cHis = false
                  } else {
                    that.cHis = true
                    that.HList = []
                    that.HList = JSON.parse(localStorage.getItem(this.$route.query.lo))
                  }
                
               }
               
              
            }).catch(function(res){
               
            })
        },
        // 点击列表搜索
        saveHis(el) {  // 历史记录点击的所属  
           if(this.cHis) {  // 点击来源历史记录
                if(el.comId == null) {
                   this.$router.push({ path:this.$route.query.path, query:{key:el.comName}});
                } else {
                  if(this.$route.query.path == '/yjList') {
                    this.$router.push({ path:this.$route.query.path, query:{scom:el.comName,cid:el.comId}});
                  } else {
                    this.$router.push({ path:this.$route.query.path, query:{scom:el.comName}});
                  }
                  
                }
           } else {  // 点击来源搜索记录
              if(localStorage.getItem(this.$route.query.lo)) {  //判断是否已有历史记录

                let str = JSON.parse(localStorage.getItem(this.$route.query.lo))
                var same = false
                for (var i = 0; i< str.length;i++) {
                  if(str[i].comName == el.comName) {
                    same = true
                    break
                  }
                }
                if(!same) {
                   if(str.length <= 10) {  // 最多保存十条历史记录
                        str.unshift(el) 
                   } else {
                     str.length = 9
                     str.unshift(el) 
                   }
                   localStorage.setItem(this.$route.query.lo,JSON.stringify(str))
                   this.$router.push({ path:this.$route.query.path, query:{key:el.comName}});
                } else {
                   this.$router.push({ path:this.$route.query.path, query:{key:el.comName}});
                }
              } else {
                let arr = []
                arr.unshift(el)
                localStorage.setItem(this.$route.query.lo,JSON.stringify(arr))
              }
               if(this.$route.query.path == '/yjList') {
                   this.$router.push({ path:this.$route.query.path, query:{scom:el.comName,cid:el.comId}});
                 } else {
                   this.$router.push({ path:this.$route.query.path, query:{scom:el.comName}});
                 }
           }
        },
        gainHis() {
          if(localStorage.getItem(this.$route.query.lo)) {
            this.HList = JSON.parse(localStorage.getItem(this.$route.query.lo))
          } else {
            this.HList = [],
            this.iHis = false

          }
        },
        gainHin(){
          if(this.$route.query.path == '/bid') {
            this.msg = '请输入公告名称或企业名称'
          } else if(this.$route.query.path == '/tender') {
             this.msg = '请输入公告名称或企业名称'
          } else if(this.$route.query.path == '/company') {
             this.msg = '请输入公告名称或法人名称'
          } else if(this.$route.query.path == '/yjList') {
             this.msg = '请输入项目名称或企业名称'
          } else if(this.$route.query.path == '/ryList') {
            this.msg = '请输入注册人员姓名或企业名称'             
          }else {
            this.msg = '请输入法务信息关键字'
          }
        },
         myFocus:function(){
               var idObj = document.getElementById('id');
               idObj.focus();
           }
    },
    components: {
      'v-fix':fixHead,
    },

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
.history {
  overflow: hidden;
  height: calc(~"100% - 105px");
  .history-list {
    padding: 0 28px;
    font-size: 24px;
    line-height: 70px;
    border-bottom: 1px solid #f5f5f5;
    color:#333;
    img {
      width: 30px;
      height: 30px;
    }
  }
  .his-title {
    height: 70px;
      line-height: 70px;
     display: flex;
     justify-content: space-between;
     align-items: center;
     font-size: 28px;
     color: #333;
     padding: 0 28px;
     font-weight: 550;
     border-bottom: 1px solid #f5f5f5;
     img {
       width: 36px;
       height: 36px;
     }
  }
}
</style>
