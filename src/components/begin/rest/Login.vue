<!--<template>-->
<!--  <div id="background">-->
<!--    <div class="container">-->
<!--      <br>-->
<!--      <h1>Login</h1>-->
<!--      <div class="form">-->
<!--        <div class="item">-->
<!--          <label>手机号:</label>-->
<!--          <el-input type="text" size="small" v-model="rsFrom.staffPhone"  placeholder="请输入用户名" style="width: 235px;"/>-->
<!--          <br/>-->
<!--        </div>-->
<!--        <div class="item">-->
<!--          <label>密&nbsp;&nbsp;&nbsp;码:</label>-->
<!--          <el-input type="password" size="small" v-model="rsFrom.staffPass" placeholder="请输入密码" style="width: 235px;"/>-->
<!--          <br/>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="e9login-element" style="padding-top: 0px;top: 238px;left: 80px;width: 324px;height: 45px;position: absolute;">-->
<!--        <div class="e9login-form-submit e9login-submit" style="width: 324px; height: 45px;">-->
<!--          <el-button @click="toLogin()" :loading="loading"  style="width: 324px; height: 45px; color: rgb(186, 205, 224); background-color: rgb(11, 26, 50); font-size: 18px; border-radius: 0px; opacity: 1;border: none;" type="button" class="ant-btn ant-btn-primary e9login-form-submit-btn">-->
<!--            <span>登 录</span>-->
<!--          </el-button>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import {ElMessage } from 'element-plus'-->
<!--export default {-->
<!--  data(){-->
<!--    return{-->
<!--      loading:false,-->
<!--      rsFrom:{-->
<!--        staffPhone: '',-->
<!--        staffPass: ''-->
<!--      },-->

<!--      //staffName:''-->
<!--    }-->
<!--  },-->
<!--  methods:{-->
<!--    toLogin() {-->
<!--      this.axios({-->
<!--        method:'post',-->
<!--        url:"http://localhost:8007/provider/staffs/login",-->
<!--        data:this.rsFrom,-->
<!--        responseType:'json',-->
<!--        responseEncoding:'utf-8',-->
<!--      }).then(response=>{-->
<!--        console.log(response)-->
<!--        if(response.data.data !== null){-->
<!--          ElMessage({-->
<!--            type:'success',-->
<!--            message:'登录成功'-->
<!--          })-->
<!--          //this.staffName===response.data.data.staffName-->
<!--          this.$store.state.userall = response.data.data-->

<!--          this.$router.push({path:'/home'})-->
<!--        }else{-->
<!--          ElMessage.error("手机号或密码错误！！")-->
<!--        }-->
<!--      })-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->


<style scoped>
.ant-btn:hover{
  color: #000;
}
/*按钮悬浮*/
.ant-btn:hover {
  background: rgb(17, 73, 104) !important;
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

<template>
  <div id="main">
    <canvas id="myCanvas" style="background-color:#0270c1;height: 100%;width: 100%">
    </canvas>

    <div style="width: 300px;height: 350px;background-color: white;position:fixed;top: 22%;left: 40%">
      <div style="height: 60px">
        <div style="text-align: center;margin: auto;font-size: 30px;font-weight: bold">Logo</div>
        <div style="height: 240px">
          <el-form
              ref="rsFrom"
              :model="rsFrom"
              status-icon
              :rules="rules"
              class="demo-ruleForm"
          >
            <div style="padding: 40px 20px 20px 20px;height: 260px">
              <div style="padding-bottom: 5px">
                <span style="height: 20px;font-size: 12px;">手机号</span>
                <el-form-item prop="staffPhone">
                  <el-input v-model="rsFrom.staffPhone" placeholder="请输入手机号" />
                </el-form-item>

              </div>
              <div>
                <span style="height: 20px;font-size: 12px;">密码</span>
                <el-form-item prop="staffPass">
                  <el-input v-model="rsFrom.staffPass" type="password" placeholder="请输入密码" show-password/>
                </el-form-item>

              </div>
            </div>
          </el-form>

        </div>
        <div>
              <div class="e9login-form-submit e9login-submit" style="width: 262px; height: 45px;margin: auto">
                <el-button @click="toLogin('rsFrom')" :loading="loading"  style="width: 260px; height: 45px; color:white;; background-color: #126c9e; font-size: 18px; border-radius: 0px; opacity: 1;border: none;margin: auto" type="button" class="ant-btn ant-btn-primary e9login-form-submit-btn">
                   <span>登 录</span>
                </el-button>
              </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {ElMessage } from 'element-plus'
export  default{
  data(){
    //验证手机号规则
    var checkMobile = (rule, value, cb) => {
      //验证手机号的正则表达式
      const regMobile =/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
      if (regMobile.test(value)) {
        return cb();
      }
      cb(new Error("请输入合法的手机号"));
    }
    return{
      aas:'/workbench',
      loading:false,
      rsFrom:{
        staffPhone: '',
        staffPass: ''
      },
      rules: {
        staffPhone:[
          { required: true, message: '请输入手机号', change: 'blur' },
          {
            validator:checkMobile,
            trigger: 'blur'
          }
        ],
        staffPass:[
          {required: true, message: '请输入密码', change: 'blur' },
        ]
      }
    }
  },
  mounted(){
    //绘制canvas图像
    this.getCanvas();
    //设置canvas图像为背景
    // document.getElementById('main').style.backgroundImage = 'url("' + context.canvas.toDataURL() + '")';
  },
  methods:{
    toLogin(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios({
            method:'post',
            url:"http://localhost:8007/provider/staffs/login",
            data:this.rsFrom,
            responseType:'json',
            responseEncoding:'utf-8',
          }).then(response=>{
            console.log(response)
            if(response.data.data !== null){
              ElMessage({
                type:'success',
                message:'登录成功'
              })
              this.$store.state.userall = response.data.data
              this.$router.push('/home')
              // this.$router.go(0);
            }else{
              ElMessage.error("手机号或密码错误！！")
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });

   },
  getCanvas(){
    var canvas = document.getElementById("myCanvas");
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
    var ctx = canvas.getContext("2d");
    //创建小球的构造函数
    function Ball() {
      this.x = randomNum(3, canvas.width - 3);
      this.y = randomNum(3, canvas.height - 3);
      this.r = randomNum(1, 3);
      this.color = randomColor();
      this.speedX = randomNum(-3, 3) * 0.2;
      this.speedY = randomNum(-3, 3) * 0.2;
    }
    Ball.prototype = {
      //绘制小球
      draw: function () {
        ctx.beginPath();
        ctx.globalAlpha = 1;
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
      },
      //小球移动
      move: function () {
        this.x += this.speedX;
        this.y += this.speedY;
        //为了合理性,设置极限值
        if (this.x <= 3 || this.x > canvas.width - 3) {
          this.speedX *= -1;
        }
        if (this.y <= 3 || this.y >= canvas.height - 3) {
          this.speedY *= -1;
        }
      }
    };
    //存储所有的小球
    var balls = [];
    //创建200个小球
    for (var i = 0; i < 150; i++) {
      var ball = new Ball();
      balls.push(ball);
    }
    main();

    function main() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      //鼠标移动绘制线
      mouseLine();
      //小球与小球之间自动画线
      drawLine();
      //使用关键帧动画，不断的绘制和清除
      window.requestAnimationFrame(main);
    }
    //添加鼠标移动事件
    //记录鼠标移动时的mouseX坐标
    var mouseX;
    var mouseY;
    canvas.onmousemove = function (e) {
      var ev = event || e;
      mouseX = ev.offsetX;
      mouseY = ev.offsetY;
    }
    //判断是否划线

    function drawLine() {
      for (var i = 0; i < balls.length; i++) {
        balls[i].draw();
        balls[i].move();
        for (var j = 0; j < balls.length; j++) {
          if (i != j) {
            if (Math.sqrt(Math.pow((balls[i].x - balls[j].x), 2) + Math.pow((balls[i].y - balls[j].y), 2)) < 80) {
              ctx.beginPath();
              ctx.moveTo(balls[i].x, balls[i].y);
              ctx.lineTo(balls[j].x, balls[j].y);
              ctx.strokeStyle = "white";
              ctx.globalAlpha = 0.2;
              ctx.stroke();
            }
          }
        }
      }
    }
    //使用鼠标移动划线
    function mouseLine() {
      for (var i = 0; i < balls.length; i++) {
        if (Math.sqrt(Math.pow((balls[i].x - mouseX), 2) + Math.pow((balls[i].y - mouseY), 2)) < 80) {
          ctx.beginPath();
          ctx.moveTo(balls[i].x, balls[i].y);
          ctx.lineTo(mouseX, mouseY);
          ctx.strokeStyle = "white";
          ctx.globalAlpha = 0.8;
          ctx.stroke();
        }
      }
    }
    //随机函数
    function randomNum(m, n) {
      return Math.floor(Math.random() * (n - m + 1) + m);
    }
    //随机颜色
    function randomColor() {
      return "rgb(" + randomNum(0, 255) + "," + randomNum(0, 255) + "," + randomNum(0, 255) + ")";
    }

  }
    }
}
</script>
