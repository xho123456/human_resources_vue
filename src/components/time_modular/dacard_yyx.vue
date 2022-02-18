<!-- 班次新增 -->
<template>
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body ">

        <div class="my-cead">
          <div style="padding-left: 20px;display: flex;align-items: center;">
            <div class="my-span1" style="display: flex;">
              <i class="iconfont" style="font-size: 20px">&#xe7d9;</i>
            </div>
            <div class="my-span2">新增班次</div>
          </div>
        </div>

        <div style="width: 100%;">
          <div style="padding: 10px 20px;min-height: 570px;">
            <div style="margin-top: 10px">
              <el-form
                  ref="ruleFormRef"
                  :model="ruleForm"
                  :rules="Fromadd"
              >
                <el-form-item label="班次名称："  size="small" prop="classesNames" style="display: block;width: 240px;">
                  <el-input v-model="ruleForm.classesNames" placeholder="例如：日常班"></el-input>
                </el-form-item>
                <hr style="border: 0;border-top: 1px solid #e1e3e4;margin: 28px auto;">
                <h4>第一段上下班时间段：</h4>
                <div style="display: flex;">
                  <el-form-item label="上班时间:"  size="small" prop="classesTimeones" style="width: 240px;margin-top: 20px">
                    <el-time-picker v-model="ruleForm.classesTimeones" value-format="YYYY-MM-DD HH:mm:ss"  format="HH:mm"/>
                  </el-form-item>

                  <el-form-item label="下班时间:"  size="small" prop="classesTimeonex" style="width: 240px;margin-top: 20px;margin-left: 80px">
                    <el-time-picker v-model="ruleForm.classesTimeonex" value-format="YYYY-MM-DD HH:mm:ss"  format="HH:mm"/>
                  </el-form-item>
                </div>
                <div style="display: flex;">
                  <el-form-item label="休息时长:"  size="small" prop="classesXxtimeState" style="width: 240px;">
                    <el-time-picker v-model="ruleForm.classesXxtimeState" value-format="YYYY-MM-DD HH:mm:ss"  format="HH:mm"/>
                  </el-form-item>

                  <el-form-item label="到"  size="small" prop="classesXxtimeEnd" style="width: 240px;margin-left: 60px">
                    <el-time-picker v-model="ruleForm.classesXxtimeEnd" value-format="YYYY-MM-DD HH:mm:ss"  format="HH:mm"/>
                  </el-form-item>
                </div>
                <hr style="border: 0;border-top: 1px solid #e1e3e4;margin: 28px auto;">
                <h4>第二段上下班时间段：</h4>
                <div style="display: flex;">
                  <el-form-item label="上班时间:"  size="small" prop="classesTimetwos" style="width: 240px;margin-top: 20px">
                    <el-time-picker v-model="ruleForm.classesTimetwos" value-format="YYYY-MM-DD HH:mm:ss"  format="HH:mm"/>
                  </el-form-item>

                  <el-form-item label="下班时间:"  size="small" prop="classesTimetwox" style="width: 240px;margin-top: 20px;margin-left: 80px">
                    <el-time-picker v-model="ruleForm.classesTimetwox" value-format="YYYY-MM-DD HH:mm:ss"  format="HH:mm"/>
                  </el-form-item>
                </div>
                <div style="display: flex;">
                  <el-form-item label="打卡时间范围:"  size="small" prop="dkState" style="width: 240px;">
                    <el-time-picker v-model="ruleForm.dkState" value-format="YYYY-MM-DD HH:mm:ss"  format="HH:mm"/>
                  </el-form-item>

                  <el-form-item label="到"  size="small" prop="dkEnd" style="width: 240px;margin-left: 60px">
                    <el-time-picker v-model="ruleForm.dkEnd" value-format="YYYY-MM-DD HH:mm:ss"  format="HH:mm"/>
                  </el-form-item>
                </div>
                <div style="padding-top: 50px;padding-left: 40%;">
                  <el-form-item>
                    <el-button size="small"  @click="goshows()">
                      <el-icon style="font-size: 10px"><i-circle-close /></el-icon>
                      取消
                    </el-button>
                    <el-button size="small" type="primary" plain @click="addClasses('ruleFormRef')">
                      <el-icon style="font-size: 10px"><i-copy-document /></el-icon>
                      保存
                    </el-button>
                  </el-form-item>
                </div>

              </el-form>


            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ElMessage} from "element-plus";
import { reactive, ref } from 'vue'
export default {
  data(){
    return{
      ruleForm:{
        classesNames:'',
        classesSd:'分段打卡',
        classesTimeones:'2022-02-10 09:00:00',
        classesTimeonex:'2022-02-10 23:00:00',
        classesXxtimeState:'2022-02-10 12:00:00',
        classesXxtimeEnd:'2022-02-10 13:30:00',
        classesTimetwos:'2022-02-10 09:00:00',
        classesTimetwox:'2022-02-10 23:00:00',
        dkState:'2022-02-10 06:00:00',
        dkEnd:'2022-02-10 23:00:00'
      },
      Fromadd: {
        classesNames: [
          {
            required: true,
            message: '输入信息不能为空',
            trigger: 'change',
          },
        ],
      }

    }
  },
  methods:{
    goshows(){
      this.$router.go(-1);
    },
    addClasses(name){
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.axios({
            url: "http://localhost:8007/provider/Classes/isaddclass",
            method: "post",
            data: {
              classesName:this.ruleForm.classesNames,
              classesSd:this.ruleForm.classesSd,
              classesTimeones:this.ruleForm.classesTimeones,
              classesTimeonex:this.ruleForm.classesTimeonex,
              classesXxtimeState:this.ruleForm.classesXxtimeState,
              classesXxtimeEnd:this.ruleForm.classesXxtimeEnd,
              classesTimetwos:this.ruleForm.classesTimetwos,
              classesTimetwox:this.ruleForm.classesTimetwox,
              dkState:this.ruleForm.dkState,
              dkEnd:this.ruleForm.dkEnd,
              classesstate:0
            },
            responseType: 'json',
            responseEncoding: 'utf-8',
          }).then((response) => {
            console.log(response)
            if (response.data.data === "成功") {
              ElMessage({
                message: "操作成功！！！",
                type: "success",
              });
              this.$router.go(-1);
            }
          }).catch(function (error) {
            console.log('获取列表失败')
            console.log(error);
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style type="text/css" scoped>
@font-face {
  font-family: 'iconfont';  /* Project id 3164770 */
  src: url('//at.alicdn.com/t/font_3164770_te5p4157fzj.woff2?t=1644419209354') format('woff2'),
  url('//at.alicdn.com/t/font_3164770_te5p4157fzj.woff?t=1644419209354') format('woff'),
  url('//at.alicdn.com/t/font_3164770_te5p4157fzj.ttf?t=1644419209354') format('truetype');
}

.iconfont {
  font-family: "iconfont" !important;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
  margin: auto;
  color: white;
}
/deep/.el-table td.el-table__cell div {
  box-sizing: border-box;
  text-align: center;
}
.demo-pagination-block {
  margin-left: 15px;
  margin-top: 10px;
  margin-bottom: 30px;
}


.my-cead {
  height: 50px;
  width: 100%;
  display: flex;
  background-color: #f9f9f9;
  border-bottom:1px solid #eaeaea;
}

.my-span1 {
  width: 35px;
  height: 35px;
  border-radius: 20px;
  background-color: rgb(87, 153, 229) !important;
}

.my-span2 {
  margin-left: 10px;
  font-size: 18px;
  color: black;
}



.saas-main-content {
  min-height: 500px;
}

.j-card-bordered {
  border: 1px solid #e9e9e9;
}

.j-card {
  background: #fff;
  border-radius: 4px;
  font-size: 14px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
  min-height: 100%;
}

.j-card:hover {
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  border-color: transparent;
}

.j-card-bordered {
  border: 1px solid #e9e9e9;
  border-top-color: rgb(233, 233, 233);
  border-right-color: rgb(233, 233, 233);
  border-bottom-color: rgb(233, 233, 233);
  border-left-color: rgb(233, 233, 233);
}

/deep/.el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell {
  background-color: #e9f7ff;
}
/deep/.el-table .el-table__cell {
  padding: 10px 0;
  min-width: 0;
  box-sizing: border-box;
  text-overflow: ellipsis;
  vertical-align: middle;
  position: relative;
  text-align: left;
}
</style>