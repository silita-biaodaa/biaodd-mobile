<!-- 模型： DOM 结构 -->
<template>
    <div class="enroll">
         <top-back :title='name'></top-back>
         <img src="../../assets/relogo.png" alt="">
         <div class="input-box">
           <input v-model="username" placeholder="请输入手机号码" @blur.prevent="inputLoseFocus" />
         </div>
        
         <div class="prompt en-mb"  >
           <span v-show="enname">
              {{ipmsg}}
           </span>
         </div>
         <div class="input-box">
           <input v-model="note" center clearable placeholder="请输入短信验证码" @blur.prevent="inputLoseFocus"/>
           <span slot="button" type="primary" @click="gainCode" >{{Message}}</span>
         </div>
        
           
         <div class="prompt en-mb"  >
           <span v-show="enword">
             {{msg}}
           </span>
         </div>
         <div class="input-box">
           <input v-model="password" type='password' placeholder="请输入密码(不低于8位)" @blur.prevent="inputLoseFocus" />
         </div>
         
       <div class="en-hint">
         点击注册即表示同意<span class="color" @click="deal" >《标大大用户协议》</span>
       </div>
         <div class="logo-btn en-top" @click="register"  >
          注册
        </div>
         <div class="toast"  v-if="isShow" >
           {{hint}}
        </div>
    </div>
</template>
<script>
import topBack from '@/components/topback'
let sha1 = require("sha1");
export default {
    name: 'enroll', // 结构名称
    data() {
        return {
            // 数据模型
            name:'用户注册',
            username:'',
            enname:false,
            enword:false,
            Message:'获取验证码',
            password:'',
            isShow:false,
            hint:'请输入正确的账号和密码',
            note:'',
            msg:'请输入正确的短信验证码',
            ipmsg:''
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
         inputLoseFocus() {
          // setTimeout(() => {
          //   window.scrollTo(0, 0);
          // }, 200);
        },
        deal() {
          this.$router.push('/deal')
        },
        gainCode() {
            if(this.username.trim() == '') {
              this.ipmsg = '请输入手机号'
               return this.enname = true
            }
            if(!(/^1[3|4|5|7|8][0-9]\d{8,11}$/.test(this.username.trim()))) {
              this.ipmsg = '请输入正确的手机号'
               return this.enname = true
            }
            if(!(this.Message  == '获取验证码') && !(this.Message  == '重新发送')  ) {
              return
            } else {
             
              let that=this;
              this.$http({
                  method:'post',
                  url: '/authorize/getVerifyCode',
                  data:{
                    type:1,
                    invitationPhone:that.username
                  }
              }).then(function(res){
                  that.Message = 60
                  if(res.data.code == 1 ) {

                  } else {
                    that.isShow = true
                    that.hint = res.data.msg
                     setTimeout(() => {
                       that.isShow = false;
                     }, 2000);
                  }
                   var myVar = setInterval(() =>{
                      if(that.Message == 0) {
                        that.Message = '重新发送'
                        return clearInterval(myVar);
                      } else {
                        that.Message =  that.Message - 1
                      }
                    },1000 )
              })
            }
        },
        register() {
          if(this.username.trim() == '') {
              this.ipmsg = '请输入手机号'
               return this.enname = true
            }
           if(!(/^((13[0-9])|(15[^4])|(166)|(17[0-8])|(18[0-9])|(19[8-9])|(147,145))\d{8}$/.test(this.username.trim()))) {
              this.ipmsg = '请输入正确的手机号'
              return this.enname = true
           }
            if(this.note.trim() == '') {
              this.msg = '请输入验证码'
              return this.enword = true
           }
          if(this.password.trim() == '') {
              this.msg = '请输入密码'
              return this.enword = true
           }
            if(this.password.trim() == '' ||  !(/[0-9A-Za-z]{8,16}$/.test(this.password)) ) {
              this.msg = '请设置不低于8位数得密码'
              return this.enword = true
           }
           let code = this.getCode()
            let that=this;
           if(code != '') {
              this.$http({
                  method:'post',
                  url: '/wxAuth/registerBindingUser',
                  data:{
                    verifyCode:that.note,
                    phoneNo:that.username,
                    loginPwd:sha1(that.password),
                    code:code
                    // channel:'1004',
                    // clientVersion:'3.0'
                  }
              }).then(function(res){
                 if(res.data.code ==1 ) {
                  sessionStorage.setItem('firstLogin',res.data.data.isFirst);
                  sessionStorage.setItem('xtoken',res.data.data.xtoken)
                  sessionStorage.setItem('phoneNo',res.data.data.phoneNo);
                  if(res.data.data.nikeName){
                    sessionStorage.setItem('Bname',res.data.data.nikeName)
                  }else{
                    sessionStorage.setItem('Bname',res.data.data.phoneNo)
                  }
                  sessionStorage.setItem('isCollected',res.data.data.isCollected)
                  sessionStorage.setItem('permissions',res.data.data.permissions);
                  sessionStorage.setItem('userid',res.data.data.pkid);
                   that.$router.push('/home')
                 } else {
                   that.isShow = true
                    that.hint = res.data.msg
                     setTimeout(() => {
                       that.isShow = false;
                     }, 2000);
                 }
              })
           } else {
              this.$http({
                  method:'post',
                  url: '/authorize/memberRegister',
                  data:{
                    verifyCode:that.note,
                    phoneNo:that.username,
                    loginPwd:sha1(that.password),
                    channel:'1004',
                    clientVersion:'3.0'
                  }
              }).then(function(res){
                 if(res.data.code ==1 ) {
                    that.isShow = true
                    that.hint = res.data.msg
                     setTimeout(() => {
                       that.isShow = false;
                     }, 2000);
                     that.$router.push('/logo')
                 } else {
                   that.isShow = true
                    that.hint = res.data.msg
                     setTimeout(() => {
                       that.isShow = false;
                     }, 2000);
                 }
              })
           }
            
        }     
            
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
.enroll {
  min-height: 100vh;
  background: #fff;
  padding: 90px 92px;
  display: flex;
  align-items: center;
  flex-direction: column;
   img {
    margin: 115px 0 119px;
    width: 138px;
    height: 116px;
  }
  .en-mb {
    margin-bottom: 10px;
    height: 30px;
  }
  .en-top {
    margin-top: 155px;
  }
  .en-hint {
    width: 100%;
    font-size: 24px;
    color:#999;
    margin: 10px 0;
  }

}

</style>
