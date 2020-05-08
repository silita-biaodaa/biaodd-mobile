<!-- 模型： DOM 结构 -->
<template>
    <div class="logo">
       <top-back :title='name'></top-back>
       <img src="../../assets/relogo.png" alt="">
       <div class="input-box">
         <input v-model="username" placeholder="请输入手机号码" @blur.prevent="inputLoseFocus"/>
       </div>
        <div class="prompt"  >
          <span v-show="enname">
            {{msg}}
          </span>
        </div>
        <div class="input-box">
          <input v-model="password" type='password' placeholder="请输入密码" @blur.prevent="inputLoseFocus"/>
        </div>
         <div class="pr-forget"  >
          <div>
           <span v-show="enword">
            请输入密码
           </span>
          </div>
          <div class="color" @click="jump" >
            忘记密码
          </div>
        </div>
        <div class="logo-btn" @click="register" >
          登录
        </div>
        <div class="logo-btn reg" @click="jumpto" >
          注册
        </div>
        <div class="toast"  v-if="isShow" >
           {{back}}
        </div>
    </div>
</template>
<script>
import topBack from '@/components/topback'
let sha1 = require("sha1");
// import toast from '@/components/toast/toast.js';  
export default {
    name: 'logo', // 结构名称
    data() {
        return {
            // 数据模型
          name:'用户登录',
          username:'',
          password:'',
          enname:false,
          enword:false,
          isShow:false,
          msg:'',
          back:''
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
    // mounted() {
    //     // console.group('挂载结束状态===============》mounted');
    //     this.$nextTick(function() {
    //         // console.log('执行完后，执行===============》mounted');
    //     });
    // },
    beforeUpdate() {
        // console.group('更新前状态  ===============》beforeUpdate');
    },
    updated() {
        // console.group('更新完成状态===============》updated');
    },
    // beforeDestroy() {
    //     // console.group('销毁前状态  ===============》beforeDestroy');
    // },
    destroyed() {
        // console.group('销毁完成状态===============》destroyed');
    },

    methods: {
        // 方法 集合
        register() {
            if(this.username.trim() == '') {
              this.msg = '请输入手机号'
              return this.enname = true
            }
            if(!(/^((13[0-9])|(15[^4])|(166)|(17[0-8])|(18[0-9])|(19[8-9])|(147,145))\d{8}$/.test(this.username.trim()))) {
               this.msg = '请输入正确的手机号'
               return this.enname = true
            }
            if(this.password.trim() == '') {
                this.enname = false
                return this.enword = true
            }
        let that=this;
        this.$http({
            method:'post',
            url: '/authorize/memberLogin',
            data:{
              phoneNo:that.username,
              loginPwd:sha1(that.password),
              channel:'1004',
              clientVersion:'3.0'
            }
        }).then(function(res){
            if(res.data.code == '1' ) {
                sessionStorage.setItem('firstLogin',res.data.data.isFirst);
                sessionStorage.setItem('xtoken',res.data.data.xtoken)
                sessionStorage.setItem('phoneNo',res.data.data.phoneNo);
                if(res.data.data.nikeName){
                  sessionStorage.setItem('Bname',res.data.data.nikeName)
                }else{
                  sessionStorage.setItem('Bname',res.data.data.phoneNo)
                }
                
                sessionStorage.setItem('permissions',res.data.data.permissions);
                sessionStorage.setItem('userid',res.data.data.pkid);
                if(sessionStorage.getItem('path')&&sessionStorage.getItem('path')!=null&&sessionStorage.getItem('path')!='enroll'&&sessionStorage.getItem('path')!='find'){
                  let uri=sessionStorage.getItem('path');
                  that.$router.replace(uri)
                }else{
                  that.$router.replace('home')
                }
            } else {
                that.isShow = true;
                that.back = res.data.msg
                setTimeout(() => {
                   that.isShow = false;
                 }, 2000);
            }  
        })

        },
        inputLoseFocus() {
          // setTimeout(() => {
          //   window.scrollTo(0, 0);
          // }, 200);
        },
        jumpto() {
            this.$router.push('/enroll')
        },
        jump() {
             this.$router.push('/find')
        }
    },
    mounted() {
    },
    beforeDestroy() {
    },


}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style lang='less' scoped>
.logo {
  min-height: 100vh;
  background: #fff;
  padding: 90px 92px;
  display: flex;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
//   overflow:scroll;
  img {
    margin: 115px 0 119px;
    width: 138px;
    height: 116px;
  }

  .pr-forget {
     width: 100%;
    font-size: 28px;
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
    margin-bottom: 150px;
    span {
      color: red;
    }
  }
  
 
}
</style>
