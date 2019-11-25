<!-- 模型： DOM 结构 -->
<template>
    <div class="queryzz">
        <template v-if="isajax">
            <template v-if="isError">
              <v-not :isError="isError"></v-not>
            </template>
            <template v-else>
              <div class="zz-list"  >
                  <div  class="zz-btn" v-for="(el,i) in zzlist" :key="i" :class="el.show ? 'active' : ''" @click="chanceZZ(el)" >
                      {{el.name}}
                  </div>
              </div>
              <q-list :type="1" v-for="(el,i) in list" :key="i" :obj='el' ></q-list>
            </template>  
         </template>
         <template v-else>
           <van-loading size="50px"></van-loading>
         </template>
    </div>
</template>
<script>
import querylist from '@/pages/query/querylist'
import not from '@/components/not'
export default {
    name: 'queryzz', // 结构名称
    data() {
        return {
            // 数据模型
            zzlist:[
              {
                name:'全部',
                show:true
              },
            ],
            allList:[],
            list:[],
            arr:[],
             data:{
              comId:'',
              type:'qual',
            //   pageNo:1,
            //   pageSize:50,
              orderNo:''
            },
            isajax:true,//是否加载完
            isError:false,//是否加载失败
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
        this.data.orderNo = this.$route.query.orderNo
        this.data.comId = this.$route.query.id
        this.gainList()
    },
    components: {
       'q-list':querylist,
        'v-not':not
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
        gainList() {
            let that=this;
            this.$http({
                method:'post',
                url: '/gonglu/zhauncha/detail/company',
                data:that.data
            }).then(function(res){
                if(res.data.code==1){
                  that.arr = res.data.data
                  for (var i of res.data.data) {
                      that.zzlist.push({
                          show:false,
                          name:i.qualType
                      })
                      that.allList=that.allList.concat(i.list)
                  }
                }
                that.list = that.allList
            })
        },
        chanceZZ(el) {
            if(el.name == '全部') {
                 this.list = this.allList
            } else {
                for (var i of this.arr) {
                   if(i.qualType == el.name) {
                         this.list = i.list
                   }
                }
            }
            for (var o of this.zzlist) {
                o.show = false
            }
            el.show = true
        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
.queryzz {
   padding: 20px 33px 120px 33px;
   background-color: #fff;
   min-height: calc(100vh - 650px);
   .zz-list {
       display: flex;
       flex-wrap: wrap; 
       .zz-btn {
           width:212px;
           height:56px;
           background:rgba(255,255,255,1);
           border:1PX solid #ccc;
           border-radius:28px;
           color: #333333;
           line-height: 56px;
           text-align: center;
           margin: 0 15px 24px 0;
       }
       :nth-child(3n) {
           margin-right: 0;
       }
       .active {
            border:1PX solid rgba(254, 102, 3, 0.5);
            color:rgba(254,102,3,1);
        }
   }
   
}
</style>
