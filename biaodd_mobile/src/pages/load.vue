<!-- 模型： DOM 结构 -->
<template>
    <div class="load">
      <van-loading size="35px" vertical></van-loading>
      <div class="load-text"  >
          正在加载中...
      </div>
    </div>
</template>
<script>
export default {
    name: 'load', // 结构名称
    data() {
        return {
            // 数据模型a
            code:'',
            path:'',
            id:''

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
         this.code = this.getCode()
         this.path = this.$route.params.path
         this.id = this.$route.params.id ? this.$route.params.id :''
         if(this.code != '') {
             this.gainToken()
         }
        //  console.log(encodeURIComponent('http://pre-mobile.biaodaa.com/#/home'));

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
        gainToken() {
           let that=this;
           this.$http({
            method:'post',
            url: '/wxAuth/loginUser',
            data:{
              code:that.code
            }
            }).then(function(res){
              if(res.data.code == 302  ) {
                // 预发布地址
                // window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx94304dddc9d055d2&redirect_uri=http%3A%2F%2Fpre-mobile.biaodaa.com%2F%23%2Fbinging&response_type=code&scope=snsapi_base&state=CD-IMIS&connect_redirect=1#wechat_redirect'
                // 线上地址
                window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx393124fdad606b1d&redirect_uri=http%3A%2F%2Fmobile.biaodaa.com%2F%23%2Fbinging&response_type=code&scope=snsapi_base&state=CD-IMIS&connect_redirect=1#wechat_redirect'
                return false
              }
              console.log(res.data.data.isCollected);
              
              if(res.data.data.isCollected ) {
                sessionStorage.setItem('xtoken',res.data.data.xtoken)
                sessionStorage.setItem('phoneNo',res.data.data.phoneNo);
                if(res.data.data.nikeName){
                  sessionStorage.setItem('Bname',res.data.data.nikeName)
                }else{
                  sessionStorage.setItem('Bname',res.data.data.phoneNo)
                }
                sessionStorage.setItem('isCollected',res.data.data.isCollected)
                sessionStorage.setItem('isVip',res.data.data.isVip);
                sessionStorage.setItem('userid',res.data.data.pkid);         
                // this.$http({
                //           method:'post',
                //           url: '/foundation/version',
                //           data:{
                //             loginChannel:''
                //           }
                //       }).then(function(res){
                //       })
            //    console.log(that.path);
               if(that.id != '') {
                    that.$router.replace({ name:'subscribe' ,params:{ id:that.id}})
                } else {
                    that.$router.replace({name:that.path})
                }
              } 
            })
        }, 
        // jump() {
        //   this.$router.replace({ name:'subscribe' ,params:{ id:this.id}})
        // }
        
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
.load {
  color: red;
  .load-text {
      width: 100%;
      text-align: center;
      line-height: 48px;
  }
}
</style>
