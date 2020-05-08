<!-- 模型： DOM 结构 -->
<template>
    <div class="conform">
        <top-back :title='name'></top-back>
        <div class="form-top">
              <van-list
                 v-model="loading"
                 :finished="finished"
                 finished-text="没有更多了"
                 :error.sync="error"
                 error-text="请求失败，点击重新加载"
                 @load="onLoad"
                :offset="100"
                :immediate-check="false"
              >
                <com-pany v-for="(el,i) in list" :key="i" :obj='el'></com-pany>
              </van-list>
           
        </div>
    </div>
</template>
<script>
import topBack from '@/components/topback'
import comPany from '@/components/company'
export default {
    name: 'conform', // 结构名称
    data() {
        return {
            // 数据模型.
           name:'符合资质企业',
           list:[],
           loading:false, 
           finished:false,
           current:1,
           total:0,
           source:'',
           error:false,
           continue:false
        }
    },
    watch: {
        // 监控集合
    },
    props: {
        // 集成父级参数
    },
    components: {
      'top-back':topBack,
      'com-pany':comPany   
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
         this.id = this.$route.query.id
         this.source = this.$route.query.source
         let vip = sessionStorage.getItem('isVip') == 'true' ? 1 : 0;
         let that=this;
            this.$http({
                method:'post',
                url: '/company/qual/list/' + that.id,
                data:{
                    source:that.source,
                    pageNo:that.current,
                    pageSize:5,
                    isVip:vip
                }
            }).then(function(res){
                for(let x of res.data.data) {
                    let arr =  x.phone.split(';')
                    x.phone = arr[0]
                }
                that.list = res.data.data
                that.total = res.data.total
            })
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
        onLoad() {
            this.continue = true 
             let vip = sessionStorage.getItem('isVip') == 'true' ? 1 : 0;
              setTimeout(() => {
                  this.current = this.current + 1
                   let that=this;
                    this.$http({
                    method:'post',
                    url: '/company/qual/list/' + that.id,
                    data:{
                        source:that.source,
                        pageNo:that.current,
                        pageSize:5,
                        isVip:vip
                    }
                    }).then(function(res){
                        if(res.data.code == 1 ) {
                             for(let x of res.data.data) {
                                 let arr =  x.phone.split(';')
                                 x.phone = arr[0]
                             }
                            res.data.data.forEach( el => {
                              that.list.push(el)
                           })
                           
                        } else {
                            that.error = true
                        }   
                    })
                    that.loading = false;

                  // 数据全部加载完成
                  if (that.list.length >= that.total) {
                    that.finished = true;
                  }
                }, 500);

        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style scoped  lang="less">
.conform {
position: absolute;
 top: 0;
 left: 0;
 right: 0;
 bottom: 0;   
  .form-top {
    margin-top: 91px;
    height: calc(~"100% - 101px");
    overflow-x: hidden;
    overflow-y: auto;
  }  
}

</style>
