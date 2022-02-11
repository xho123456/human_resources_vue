<template>
  <div id="background">
    <div class="container">
      <br>
      <h1>Login</h1>
      <div class="form">
        <div class="item">
          <label>手机号:</label>
          <el-input type="text" size="small" v-model="rsFrom.staffPhone"  placeholder="请输入用户名" style="width: 235px;"/>
          <br/>
        </div>
        <div class="item">
          <label>密&nbsp;&nbsp;&nbsp;码:</label>
          <el-input type="password" size="small" v-model="rsFrom.staffPass" placeholder="请输入密码" style="width: 235px;"/>
          <br/>
        </div>
      </div>
      <div class="e9login-element" style="padding-top: 0px;top: 238px;left: 80px;width: 324px;height: 45px;position: absolute;">
        <div class="e9login-form-submit e9login-submit" style="width: 324px; height: 45px;">
          <el-button @click="toLogin()" :loading="loading"  style="width: 324px; height: 45px; color: rgb(186, 205, 224); background-color: rgb(11, 26, 50); font-size: 18px; border-radius: 0px; opacity: 1;border: none;" type="button" class="ant-btn ant-btn-primary e9login-form-submit-btn">
            <span>登 录</span>
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ElMessage } from 'element-plus'
export default {
  data(){
    return{
      loading:false,
      rsFrom:{
        staffPhone: '',
        staffPass: ''
      },

      //staffName:''
    }
  },
  methods:{
    toLogin() {
      this.axios({
        method:'post',
        url:"http://localhost:8007/provider/staffs/login",
        data:this.rsFrom,
        responseType:'json',
        responseEncoding:'utf-8',
      }).then(response=>{
        if(response.data.data !== null){
          ElMessage({
            type:'success',
            message:'登录成功'
          })

          //this.staffName===response.data.data.staffName



          this.$router.push({path:'/home'})
        }else{
          ElMessage.error("手机号或密码错误！！")
        }
      })
    }
  }
}
</script>


<style scoped>
.ant-btn:hover{
  color: #000;
}
/*按钮悬浮*/
.ant-btn:hover {
  background: #126c9e !important;
  color: white !important;
  border-color: #01a8f9 !important;
}

#background{
  width: 100%;
  height: 100%;
  background: url("../../assets/WIN_20211220_21_23_01_Pro.jpg");
  background-size:100% 100%;
  position: fixed;
  top: 0;
  left: 0;
}
.container{
  width: 480px;
  height: 330px;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%,-50%);
  background:#00000090;
  text-align: center;
}
.container h1{
  color: aliceblue;
  margin-left: 20px;
}
.item {
  color: white;
  margin-left: 10%;
  margin-top: 35px;
  font-size: 20px;
  text-align: left;
}
.item label{
  float:left;
  width: 5em;
  margin-right: 1em;
  text-align: right;
}

.keep{
  color: white;
}
.keep input{
  width: 15px;
  height: 15px;
  margin-top: 7px;
  margin-left: 10px;
  margin-right: 10px;
}

</style>
