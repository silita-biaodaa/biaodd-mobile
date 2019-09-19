<!-- 模型： DOM 结构 -->
<template>
    <div class="newList" @click="changetrol(obj)"  >
      <div class="new-type" >
        <div class="new-Sele" v-show="!condition" :class="!control ? '' : 'bor-col' " >
          <img src="../../assets/select.png" alt=""  v-show="control"  >
        </div>
         <div class="new-read" >
           <div class="read-red"  v-show="obj.isRead == 0"  >
           
           </div>
         </div>
         <!-- 评论 -->
         <div class="news-text" :class="condition ? 'con' : 'conf'"  v-if="obj.msgType == 'reply' " >
           <div  class="news-title"  >
             <h6 class="new-over" >{{obj.reNikename}}<span style="color:#ccc" >回复了你:</span></h6>
             <p style="color:#ccc" >{{obj.pushd}}</p>
           </div>
           <div class="news-name" v-html="obj.replyContent"  >
           
           </div>
           <div class='notice-title' >
             {{obj.relatedType ? '招标公共': '中标公共'}}:{{obj.noticeTitle}}
           </div>
         </div>
         <!-- 企业 -->
         <div class="news-text" :class="condition ? 'con' : 'conf'"  v-if="obj.msgType == 'company' " >
           <div  class="news-title"  >
             <h6 class="new-over" >{{obj.msgTitle}}</h6>
             <p style="color:#ccc" >{{obj.pushd}}</p>
           </div>
           <div class="news-name" v-html="obj.msgContent"  >
           
           </div>
         </div>
         <!-- 会员 -->
          <div class="news-text" :class="condition ? 'con' : 'conf'"  v-if="obj.msgType == 'vip' " >
           <div  class="news-title"  >
             <h6 class="new-over" >{{obj.msgTitle}}</h6>
             <p style="color:#ccc" >{{obj.pushd}}</p>
           </div>
           <div class="news-name" v-html="obj.msgContent"  >
           
           </div>
         </div>
         <!-- 订阅 -->
        <div class="news-text" :class="condition ? 'con' : 'conf'"  v-if="obj.msgType == 'subscribe' " >
           <div  class="news-title"  >
             <h6 class="new-over" >{{obj.msgTitle}}</h6>
             <p style="color:#ccc" >{{obj.pushd}}</p>
           </div>
           <div class="news-name" v-html="newText"  >
           
           </div>
         </div>
         <!-- 关注赠送会员 -->
         <div class="news-text" :class="condition ? 'con' : 'conf'"  v-if="obj.msgType == 'system' "  style="paddingBottom:10px;" >
           <div  class="news-title"  >
             <h6 class="new-over" >{{obj.msgTitle}}</h6>
             <p style="color:#ccc" >{{obj.pushd}}</p>
           </div>
           <div class="news-name" v-html="newText"  >
           
           </div>
         </div>

      </div>
      <div class="news-btn" @click.stop="jump(obj)"  v-if="obj.msgType != 'system'"  >
            查看详情 >
       </div>
       
    </div>
</template>
<script>
export default {
    name: 'templateName', // 结构名称
    data() {
        return {
            // 数据模型
             control:false,
             newText:''
             
        }
    },
    watch: {
        // 监控集合
        isall(val) {
          if(val) {
            if(!this.control) {
               this.control = true
               this.$emit('pushid', {id:this.obj.pkid,state:this.control})
            } 
          } else {
            this.control = false
          }
        },
        isk(val) {
          if(val) {
            this.control = false
          }
        }
    },
    props: {
        // 集成父级参数
        obj:{},
        condition:{
            default:true
        },
        isall:{
            default:true
        },
         isk:{
            default:0
        }
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
       this.newText = this.obj.msgContent.replace(/\n/g,"<br/>")
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
        jump(o) {
          if(o.msgType == 'reply') {
            if(o.relatedType == 'zhongbiao') {
              this.$router.push({ path:'/notice', query:{id:o.relatedId,source:o.source,key:true}})
            } else {
              this.$router.push({ path:'/article', query:{id:o.relatedId,source:o.source,key:true}})
            }
            
          } else if(o.msgType == 'company') {
                this.$router.push({path:'/letter',query:{id:o.replyId,source:o.regisAddress,name:o.comName}})
          } else if(o.msgType == 'subscribe') {
                 this.$router.push({ name:'subscribe' ,params:{ id:o.replyId} })
          } else {
              this.$router.push({path:'/openingVip'})
          }
           let that=this;
            this.$http({
                method:'post',
                url: 'message/set/read' ,
                data:{
                 pkid:o.pkid
                }
            }).then(function(res){
                
             }).catch(function(res){
                
            })
        },
        changetrol(obj) {
          if(!this.condition) {
             this.control = !this.control
             this.$emit('pushid', {id:obj.pkid,state:this.control})
          }
        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' >
.newList {
  padding: 36px  15px 0 ;
  
  background-color: #FFFFFF;
  box-shadow:0px 6px 6px 0px rgba(0, 0, 0, 0.03);
  border-radius:8px;
  margin-bottom: 20px;
  .new-type {
    display: flex;
  }
  .new-read {
    width: 20px;
    height: 40px;
    margin-left: 8px;
    display: flex;
    align-items: center;
    .read-red {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: red;
    }
  }
  .con {
    width: 96%;
  }
  .conf {
    width: 86%;
  }
  .news-text {
    margin-left: 10px;
    
    font-size: 28px;
    box-sizing: border-box;
    .news-title{
      display: flex;
      justify-content: space-between;
      h6 {
        font-size: 32px;
        color:#333;
      }
      .new-over {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 70%;
      }
    }
  }
  .news-name {
    margin-top: 30px;
    color:#666;
  }
  .notice-title {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color:#ccc;
  }
  .news-btn {
    height: 80px;
    text-align: center;
    line-height: 80px;
    color: #FE6603;
    font-size: 32px;
    border-top: 1px solid #F0F0F0;
    margin-top: 20px;
  }
}
</style>
