<!-- 模型： DOM 结构 -->
<template>
    <div class="newList">
      <div class="new-type" >
        <div class="new-Sele" v-show="!condition" :class="!control ? '' : 'bor-col' " @click="changetrol" >
          <img src="../../assets/select.png" alt=""  v-show="control"  >
        </div>
         <div class="new-read" >
           <div class="read-red"  v-show="obj.isRead == 0"  >
           
           </div>
         </div>
         <div class="news-text" :class="condition ? 'con' : 'conf'" >
           <div  class="news-title"  >
             <h6 class="new-over" >{{obj.noticeTitle}}</h6>
             <p style="color:#ccc" >{{obj.pushd}}</p>
           </div>
           <div class="news-name" v-html="obj.replyContent"  >
           
           </div>
         </div>
      </div>
      <div class="news-btn" @click="jump(obj)"  >
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
             
        }
    },
    watch: {
        // 监控集合
    },
    props: {
        // 集成父级参数
        obj:{},
        condition:{
            default:true
        }
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
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
            
          }
        },
        changetrol() {
          this.control = !this.control
        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
.newList {
  padding: 36px  15px 0 ;
  
  background-color: #FFFFFF;
  box-shadow:0px 6px 6px 0px rgba(0, 0, 0, 0.03);
  border-radius:8px;
  margin-bottom: 20px;
  .new-type {
    display: flex;
  }
  .new-Sele {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    box-sizing: border-box;
    border: 1px solid #666;
    img {
      width: 40px;
      height: 40px;
    }
  }
  .bor-col {
    border: none;
  }
  .new-read {
    width: 20px;
    height: 40px;
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
    width: 88%;
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
