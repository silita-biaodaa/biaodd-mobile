<!-- 模型： DOM 结构 -->
<template>
    <div class="find">
      <top-back :title='name'></top-back>
      <div class="input-box">
        <input v-model="username" placeholder="请输入手机号码" @blur.prevent="inputLoseFocus" />
      </div>
       
       <div class="prompt fi-mb"  >
           <span v-show="enname">
              {{ipmsg}}
           </span>
        </div>
        <div class="input-box">
          <input v-model="note" center clearable placeholder="请输入短信验证码" @blur.prevent="inputLoseFocus"/>
          <span slot="button" @click="gainCode" >{{Message}}</span>
        </div>
         <div class="prompt fi-mb"  >
           <span v-show="encode">
              请输入验证码
           </span>
        </div>
        <div class="input-box">
          <input v-model="password" placeholder="请输入新密码(不低于8位)" type='password' @blur.prevent="inputLoseFocus"/>
        </div>
         
        <div class="prompt fi-mb"  >
           <span v-show="fiword">
              <!-- 请确保两次密码一致或密码格式正确 -->
              {{womsg}}
           </span>
        </div>
         <van-field
          v-model="password1"
          placeholder="确认新密码"
          type='password'
          @blur.prevent="inputLoseFocus"
        />
        <div class="logo-btn fi-m" @click="newCode" >
          确定
        </div>  
         <div class="logo-btn reg"  @click="$router.go(-1)" >
          返回
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
    name: 'find', // 结构名称
    data() {
        return {
            // 数据模型
            name:'重置密码',
            Message:'获取验证码',
            enname:false,
            username:'',
            note:'',
            password:'',
            password1:'',
            encode:false,
            fiword:false,
            isShow:false,
            hint:'',
            ipmsg:'',
            womsg:''
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
                    type:2,
                    invitationPhone:that.username
                  }
              }).then(function(res){
                  console.log(res);
                  
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
        newCode() {
            if(this.username.trim() == '') {
              this.ipmsg = '请输入手机号'
              return this.enname = true
            }
           if(!(/^1[3|4|5|7|8][0-9]\d{8,11}$/.test(this.username.trim()))) {
               this.ipmsg = '请输入正确的手机号' 
              return this.enname = true
           }
            if(this.note.trim() == '') {
              return this.encode = true
           } 
           if(this.password.trim() == '' || this.password1.trim() == '') {
               this.womsg = '请输入密码'
               return this.fiword = true
           }
            if(!(/[0-9A-Za-z]{8,16}$/.test(this.password))) {
                this.womsg = '请设置不低于8位数的密码'
                return this.fiword = true
            }
           if( this.password1.trim() != this.password.trim() ) {
              this.womsg = '请确保两次密码一致'
              return this.fiword = true
           }
            let that=this;
              this.$http({
                  method:'post',
                  url: '/userCenter/updatePwd',
                  data:{
                     loginPwd:sha1(that.password1),
                     verifyCode:that.note,
                     phoneNo:that.username,
                     channel:'1004'
                  }
              }).then(function(res){
                if(res.data.code == 1) {
                    that.isShow = true
                    that.hint = res.data.msg
                     setTimeout(() => {
                       that.isShow = false;
                     }, 2000);
                     console.log(res.data);
                     that.$router.push('/')
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

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
.find  {
    background: #fff;
    min-height: 100vh;
    padding: 280px 92px 90px;
    display: flex;
    align-items: center;
    flex-direction: column;
    .fi-mb {
      margin-bottom: 10px;
      height: 30px;
    } 
    .fi-m {
      margin-top: 160px; 
    }
}
</style>
