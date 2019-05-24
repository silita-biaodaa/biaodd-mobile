<!-- 模型： DOM 结构 -->
<template>
    <div class="comment">
        <!-- tab -->
        <!-- <div class="nav">
            <p v-for="(o,i) in navTab" :key="i" :class="navNum==i?'active':''" @click="navTap(i)">{{o}}</p>
        </div> -->
        <h5>
            <span>评论</span>
        </h5>
        <!-- list -->
        <van-list finished-text="没有更多了"  @load="onLoad" :error.sync="error" error-text="请求失败，点击重新加载" :offset="200" :finished="finished" :immediate-check="false">
            <div class="box" v-for="(o,i) of list" :key="i">
                <div class="left-box">
                    <template v-if="o.image">
                        <img :src="o.image" class="photo"/>
                    </template>
                    <template v-else>
                        <img src="../assets/icon-tpux.png.png" class="photo"/>  
                    </template> 
                </div>   
                <div class="right-box">
                    <div class="top">
                        <p>
                            <span class="nickName">{{o.nickName}}</span>
                            <span class="company">{{o.company}}</span>
                        </p>
                        <p class="time">{{o.pushd}}</p>
                    </div>
                    <div class="center">{{o.commContent}}</div>
                    <div class="reply" v-if="o.replys&&o.replys.length>0">
                        <ul>
                            <li v-for="(x,y) of o.replys" :key="y">
                                <div class="content">
                                    <span class="name">{{x.reNikename}}</span>回复<span class="name">{{x.toNikename}}</span>:
                                    {{x.replyContent}}
                                </div>
                                <p>{{x.pushd}}</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </van-list>
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
    // .nav{/*tab*/
    //     display: flex;
    //     padding:0 30px;
    //     height: 82px;
    //     border-bottom: 1PX solid #F2F2F2;
    //     p{
    //         border-bottom: 4px solid transparent;
    //         box-sizing: border-box;
    //         height: 100%;
    //         display: flex;
    //         align-items: center;
    //         color: #212121;
    //     }
    //     p:first-child{
    //         margin-right: 70px
    //     }
    //     .active{
    //         color: #FE6603;
    //         border-color: #FE6603;
    //     }
    // }
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
    padding: 32px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    .left-box{
        width: 70px;
        .photo{
            width: 70px;
            height:70px;
            border-radius: 50%;
        }
    }
    .right-box{
        width: calc(100% - 102px);
        .top{
            height: 70px;
            display: flex;
            margin-bottom: 30px;
            align-content: space-between;
            flex-wrap: wrap;
            p{
                width: 100%;
                .nickName{
                    margin-right: 50px;
                }
            }
            .time{
                color: #999;
                font-size: 28px
            }
        }
        .reply{
            margin-top: 35px;
            background: #F8F8F8;
            padding: 32px 15px;
            li{
                .content{
                    margin-bottom: 28px;
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
            
        }
    }
}
</style>
