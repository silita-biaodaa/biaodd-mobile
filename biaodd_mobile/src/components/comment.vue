<!-- 模型： DOM 结构 -->
<template>
    <div class="comment" >

        <h5>
            <span>评论</span>
        </h5>

        <van-list finished-text="没有更多了" v-if="list.length>0"  @load="onLoad" :error.sync="error" error-text="请求失败，点击重新加载" :offset="200" :finished="finished" :immediate-check="false">
            <div class="box center" v-for="(o,i) of list" :key="i">
    
                <div class="right-box center">
                   <div class="rigit-top center" >
                       <div>
                           <template v-if="o.image">
                                <img :src="o.image" class="photo"/>
                            </template>
                            <template v-else>
                                <img src="../assets/icon-tpux.png.png" class="photo"/>  
                            </template> 
                       </div>
                       <div style="marginLeft:10px;width: 100%;"   >
                            <div class="top">
                                <p>
                                    <span class="nickName">{{o.nickName}}</span>
                                </p>
                                <p class="time">{{o.pushd}}</p>
                            </div>
                            <div>
                                <template v-if="o.state==1"   >
                                   <div v-html="o.commContent" style="color:#666" ></div>
                                </template>
                                <template v-else>
                                    该评论已被屏蔽
                                </template>
                            </div>
                       </div>
    
                   </div> 
                    
                    <div class="reply" v-if="o.replys&&o.replys.length>0&&o.state==1">
                        <ul>
                            <li v-for="(x,y) of o.replys" :key="y" class="center" >
                                <div class="reply-flex" >
                                      <div class="reply-img" >
                                          <img src="../assets/icon-tpux.png.png" alt="" v-if="x.reImage == null" >
                                          <img :src="x.reImage" alt="">
                                      </div>
                                      <div>   
                                         <div class="content  ">
                                              <div>
                                                <span class="name">{{x.reNikename}}</span>  
                                                <span style="color:#786D6D" >回复</span>
                                                <span class="name">{{x.toNikename}}</span>:
                                              </div>
                                              <p class="reply-time" >{{x.pushd}}</p>
                                              <div>
                                                  <template v-if="x.state==1">
                                                      <div v-html="x.replyContent" style="color:#666"  >
                                                      
                                                      </div>
                                                  </template>
                                                  <template v-else>
                                                      该评论已被屏蔽
                                                  </template>
                                              </div>
                                         </div>
                                      </div>
                                </div>                               
                                
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </van-list>
        <div v-else  class="com-no" >
            暂无评论
        </div>
    </div>
</template>
<script>
export default {
    name: 'comment', // 结构名称
    data() {
        return {
            // 数据模型
            navTab:['全部评论','与我相关'],
            navNum:0,
            finished:false,
            error:false,
            isScroll:true,
            data:{
                relatedId:'',
                relatedType:'',
                pageNum:1,
                pageSize:5,
                source:'',
            },
            list:[],
            total:0,
        }
    },
    watch: {
        // 监控集合
    },
    props: {
        // 集成父级参数
        type:{
            default:'zhaobiao'
        }
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
        this.data.relatedId=this.$route.query.id;
        this.data.relatedType=this.type;
        this.data.source=this.$route.query.source;
        this.ajax();
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
        onLoad(){//下滚加载
            if(!this.isScroll){
                return false
            }
            this.data.pageNum++;
            this.ajax();
        },
        ajax(){
            //招标
            this.isScroll=false;
            let that=this;
            this.$http({
                method:'post',
                url: '/comment/list',
                data:that.data
            }).then(function(res){
                that.total=res.data.total;
                that.$emit('comlength',that.total);
                if(that.list.length==0||that.data.pageNum==1){
                    that.list=res.data.data;
                }else{
                    that.list=that.list.concat(res.data.data)
                }
                if(res.data.total==that.list.length||that.list.length<that.data.pageSize){
                    that.finished=true;//如果返回总条数等于当前list长度
                }
                that.isScroll=true;
            }).catch(function(res){
                if(that.list.length>0){
                    that.error = true;
                }
            })
        },
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
.comment{
    margin-top: 16px;
    background: #fff;
    h5{
        padding:0 30px;
        height: 82px;
        line-height: 82px;
        border-bottom: 1PX solid #F2F2F2;
        span{
            border-left: 6px solid #fe6603;
            padding-left: 18px;
        }
    }
}
.box{
    padding: 24px;
    display: flex;
        .photo{
            width: 70px;
            height:70px;
            border-radius: 50%;
        }
    .right-box{
        width: 100%;
        .rigit-top {
           display: flex;
           padding-bottom: 35px;
        }
        .top{
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 32px;
            width: 100%;
            height: 70px;
            .time{
                color: #999;
                font-size: 24px
            }
        }
       
        .reply{
            margin-top: 15px;
            margin-left: 80px;
            padding: 20px 15px 32px; 
            .reply-flex {
                display: flex;
                img {
                    width: 48px;
                    height:48px;
                    border-radius: 50%;
                    margin-right: 10px;
                }
            }
            li{
                margin-bottom: 28px;
                .content{
                    color: #999;
                    .name{
                        color: #333;
                    }
                }
                p{
                    font-size: 24px;
                    color: #999;
                }
              
            }
             li:last-child {
                   border-bottom: none!important;
             }
            .reply-time {
                margin: 10px 0;
            }
            
        }
        
    }
    .center {
           border-bottom: 1px solid #f0f0f0;
        }
}
.com-no {
   text-align: center;
   font-size: 24px;
   color:#666;
   line-height: 70px;  
}
 
</style>
