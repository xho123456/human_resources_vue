<!-- 面试管理：录用界面 -->
<template>
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <!--标题-->
      <div class="my-cead">
        <div style="width:97%;padding-left: 20px;display: flex;align-items: center;justify-content: space-between;">
          <div style="display: flex;align-items: center;">
            <div class="my-span1" style="display: flex;">
              <i class="iconfont" style="font-size: 20px">&#xe7d9;</i>
            </div>
            <div class="my-span2">面试管理</div>
          </div>
        </div>
      </div>
      <!--内容-->
      <div class="j-card-body ">
        <div class="sub-Content__primary">
          <el-form :model="ruleForm" :rules="addrules" ref="ruleForm" label-width="140px">
            <div class="firstPage" style="height: 490px;">

              <div style="margin-left: -8px; margin-right: -8px;" class="ant-row">

                <div style="padding-left: 8px; padding-right: 8px;" class="ant-col ant-col-12">
                  <div class="ant-card ant-card-bordered">
                    <div class="ant-card-head">
                      <div class="ant-card-head-wrapper">
                        <div class="ant-card-head-title"><span>基本信息</span></div>
                      </div>
                    </div>
                    <!-- 内容区域 -->
                    <div class="ant-card-body">
                      <el-form-item label="姓名:" prop="name">
                        <el-input v-model="ruleForm.lname" disabled size="small" style="width: 320px;"></el-input>
                      </el-form-item>

                      <el-form-item label="手机号:" prop="name">
                        <el-input v-model="ruleForm.lphone" size="small" style="width: 320px;"></el-input>
                      </el-form-item>

                      <el-form-item label="个人邮箱:" prop="name">
                        <el-input v-model="ruleForm.lemlie" size="small" style="width: 320px;"></el-input>
                      </el-form-item>

                      <el-form-item label="应聘部门:" prop="region">
                        <el-select v-model="ruleForm.ldept" disabled size="small" style="width: 320px;">
                        </el-select>
                      </el-form-item>

                      <el-form-item label="应聘职位:" prop="region">
                        <el-select v-model="ruleForm.lpost" disabled size="small" style="width: 320px;">
                        </el-select>
                      </el-form-item>

                      <el-form-item label="招聘计划名称:" prop="region">
                        <el-select v-model="ruleForm.lresumename" disabled size="small" style="width: 320px;">
                        </el-select>
                      </el-form-item>
                    </div>
                    <!-- 内容区域 -->
                  </div>
                  <br>
                </div>
                <div style="padding-left: 8px; padding-right: 8px;" class="ant-col ant-col-12">
                  <div class="ant-card ant-card-bordered">
                    <div class="ant-card-head">
                      <div class="ant-card-head-wrapper">
                        <div class="ant-card-head-title"><span>录用信息</span></div>
                      </div>
                    </div>
                    <!-- 内容区域 -->
                    <div class="ant-card-body">

                      <el-form-item label="入职时间:" prop="rztime">
                        <el-date-picker
                            v-model="ruleForm.rztime"
                            type="date"
                            placeholder="请选择日期"
                            size="small"
                            style="width: 320px;"
                        ></el-date-picker>
                      </el-form-item>

                      <el-form-item label="试用期:" prop="stime">
                        <el-input v-model="ruleForm.stime" size="small" style="width: 320px;"></el-input>
                      </el-form-item>

                      <el-form-item label="试用期月薪:" prop="ssalsy">
                        <el-input v-model="ruleForm.ssalsy" size="small" style="width: 280px;"/>
                        元
                      </el-form-item>

                      <el-form-item label="转正月薪:" prop="zsalsy">
                        <el-input v-model="ruleForm.zsalsy" size="small" style="width: 280px;"/>
                        元
                      </el-form-item>

                      <el-form-item label="薪酬备注:" prop="xbersz">
                        <el-input
                            v-model="ruleForm.xbersz"
                            :rows="3"
                            type="textarea"
                            style="width: 320px; min-height: 101px"
                        />
                      </el-form-item>

                    </div>
                    <!-- 内容区域 -->
                  </div>
                  <br>
                </div>

              </div>
              <br>

            </div>

            <br>
            <div class="ant-row ant-form-item flex-center">
              <div style="margin-left: 42%">
                <el-button size="small" style="height: 40px;width: 80px;font-size: 15px" @click="gohome()">取消</el-button>
                <el-button size="small" style="height: 40px;width: 80px;font-size: 15px" type="primary" @click="addEmployes('ruleForm')">提交</el-button>
              </div>
            </div>
          </el-form>

        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {ElMessage, ElMessageBox} from "element-plus";

export default {
  data() {
    return {
      //用途：添加录用人才前通过简历id查询录用表是否有该数据
      //     有：更改状态  没有：添加录用表并更改状态
      luDates:'',
      //招聘计划编号：路由传入
      id: this.$route.query.id,
      employmentIds:'',
      ruleForm: {
        lname:'',
        lphone: '',
        lemlie: '',
        ldept: '',
        lpost: '',
        lresumename: '',

        rztime: new Date(), //入职时间
        stime: '3个月', //试用期
        ssalsy: '', //试用期月薪
        zsalsy: '', //转正月薪
        xbersz: '', //薪酬备注
      },
      addrules: {
        rztime: [//入职时间
          {
            required: true,
            message: '不可为空',
            trigger: 'change',
          },
        ],
        stime: [//试用期
          {
            required: true,
            message: '不可为空',
            trigger: 'change',
          },
        ],
        ssalsy: [//试用期月薪
          {
            required: true,
            message: '请填写试用期月薪',
            trigger: 'change',
          },
        ],
        zsalsy: [//转正月薪
          {
            required: true,
            message: '请填写转正月薪',
            trigger: 'change',
          },
        ],

      }
    }
  },
  created() {
    this.selectAllsume(); //传入id查询该简历
    this.selectbyid();
  },
  methods: {
    //取消返回上以及
    gohome() {
      this.$router.go(-1);
    },
    //简历基本信息查询
    selectAllsume() {
      this.axios({
        url: "http://localhost:8007/provider/resume/lufindByid",
        method: "post",
        data: {
          resumeId: this.id
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log(1)
        console.log(response)
        console.log(1)
        this.ruleForm.lname = response.data.data.resumeName;
        this.ruleForm.lphone = response.data.data.resumePhone;
        this.ruleForm.lemlie = response.data.data.resumeMailbox;
        this.ruleForm.ldept = response.data.data.deptName;
        this.ruleForm.lpost = response.data.data.postName;
        this.ruleForm.lresumename = response.data.data.recruitmentPlanName;
        this.employmentIds = response.data.data.employmentId;
      }).catch(function (error) {
        console.log('获取列表失败')
        console.log(error);
      })
    },
    //查询录用表是否有该数据
    selectbyid() {
      this.axios({
        url: "http://localhost:8007/provider/employment/findByresumesAll",
        method: "post",
        data: {
          resumeId: this.id
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        this.luDates = response.data.data;
      }).catch(function (error) {
        console.log('获取列表失败')
        console.log(error);
      })
    },
    //录用新增
    addEmployes(name){
      if(this.luDates == null || this.luDates == ''){
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.axios({
              url: "http://localhost:8007/provider/employment/addemployment",
              method: "post",
              data: {
                resumeId:this.id,
                hiredate:this.ruleForm.rztime,
                probation:this.ruleForm.stime,
                probationary:this.ruleForm.ssalsy,
                positiveMonthly:this.ruleForm.zsalsy,
                positiveRemarks:this.ruleForm.xbersz
              },
              responseType: 'json',
              responseEncoding: 'utf-8',
            }).then((response) => {
              this.updateEmolpyzt(); //新增录用人才后更改其简历状态
              this.$router.go(-1); //返回上级
            }).catch(function (error) {
              console.log('获取列表失败')
              console.log(error);
            })
          } else {
            return false
          }
        })
      }else {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.axios({
              url: "http://localhost:8007/provider/employment/updatelvy",
              method: "post",
              data: {
                employmentId:this.employmentIds,
                hiredate:this.ruleForm.rztime,
                probation:this.ruleForm.stime,
                probationary:this.ruleForm.ssalsy,
                positiveMonthly:this.ruleForm.zsalsy,
                positiveRemarks:this.ruleForm.xbersz
              },
              responseType: 'json',
              responseEncoding: 'utf-8',
            }).then((response) => {
              console.log(response)
              this.updateEmolpyzt(); //新增录用人才后更改其简历状态
              this.$router.go(-1); //返回上级
            }).catch(function (error) {
              console.log('获取列表失败')
              console.log(error);
            })
          } else {
            return false
          }
        })
      }
    },
    //新增录用人才后更改其简历状态
    updateEmolpyzt() {
      //删除事件
      this.axios({
        url: "http://localhost:8007/provider/resume/zeliminate",
        method: "post",
        data: {
          resumeId: this.id,
          resumeZt: 7
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        if (response.data.data === "成功") {
          ElMessage({
            message: "操作成功",
            type: "success",
          });
        }
      }).catch(function (error) {
        console.log(error);
      })
    },

  }
}
</script>


<style type="text/css" scoped>
.ant-row::before, .ant-row::after {
  display: table;
  content: '';
}

*, ::before, ::after {
  box-sizing: border-box;
}

.ant-row::after {
  clear: both;
}

.ant-row::before, .ant-row::after {
  display: table;
  content: '';
}

*, ::before, ::after {
  box-sizing: border-box;
}


.ant-form-item {
  color: rgba(0, 0, 0, 0.65);
}

.flex-center {
  display: flex;
  justify-content: center;
}

.mainContent .ant-card-body {
  padding: 25px 25px;
}

.ant-card-body::before, .ant-card-body::after {
  display: table;
  content: '';
}

*, ::before, ::after {
  box-sizing: border-box;
}

.ant-card-body::after {
  clear: both;
}

.ant-card-body::before, .ant-card-body::after {
  display: table;
  content: '';
}

*, ::before, ::after {
  box-sizing: border-box;
}

.ant-col-12 {
  flex: 0 0 auto;
  float: left;
  position: relative;
}

.ant-card-head::before, .ant-card-head::after {
  display: table;
  content: '';
}

*, ::before, ::after {
  box-sizing: border-box;
}

.mainContent .ant-card .ant-card-head-title, .edit__forms .ant-card .ant-card-head-title {
  font-weight: bold;
  color: #333;
  padding: 10px 0;
  border-bottom: none;
}

.ant-card-head-title {
  display: inline-block;
  flex: 1;
  padding: 16px 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.ant-card-head-wrapper {
  display: flex;
  align-items: center;
}

.ant-card:not(.normal) .ant-card-head {
  background: #f2f4fa;
}

.ant-card:not(.normal) .ant-card-head {
  background: #f0f3f6;
  border-bottom: none;
}

.ant-card-head {
  color: rgba(0, 0, 0, 0.85);
  background: transparent;
  border-bottom: 1px solid #e8e8e8;
  border-radius: 2px 2px 0 0;
}

.ant-card-head {
  min-height: 40px;
  margin-bottom: -1px;
  padding: 0 24px;
  color: #f0f3f6;
  font-weight: 500;
  font-size: 16px;
  background: transparent;
  border-bottom: 1px solid #e8e8e8;
  border-radius: 2px 2px 0 0;
  zoom: 1;
}

.ant-col-12 {
  display: block;
  box-sizing: border-box;
  width: 50%;
}

.mainContent .ant-card-bordered {
  transition: box-shadow 0.5s;
  border: 1px solid #d3dae2;
}

.mainContent .ant-card, .edit__forms .ant-card {
  width: 100%;
}

.ant-card-bordered {
  border: 1px solid #e8e8e8;
}

.ant-card {
  color: rgba(0, 0, 0, 0.65);
  background: #fff;
  border-radius: 2px;
}

.ant-card-bordered {
  border: 1px solid #e8e8e8;
}

.ant-card {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: #333;
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  list-style: none;
  font-feature-settings: 'tnum';
  position: relative;
  background: #fff;
  border-radius: 2px;
  transition: all 0.3s;
}

.ant-row::before, .ant-row::after {
  display: table;
  content: '';
}

*, ::before, ::after {
  box-sizing: border-box;
}

.ant-row {
  position: relative;
  height: auto;
  margin-right: 0;
  margin-left: 0;
  zoom: 1;
  display: block;
  box-sizing: border-box;
}

.mainContent .sub-Content__primary {
  padding: 12px 24px;
  background: #fff;
  border-radius: 4px;
}

*, ::before, ::after {
  box-sizing: border-box;
}

.mainContent .ant-card .ant-card-head-title, .edit__forms .ant-card .ant-card-head-title {
  font-weight: bold;
  color: #333;
  padding: 10px 0;
  border-bottom: none;
}


.ant-layout, .ant-layout * {
  box-sizing: border-box;
}

.mainContent .ant-card-body {
  padding: 25px 25px;
}


.j-card-head {
  height: 48px;
  line-height: 48px;
  background: #fff;
  border-bottom: 1px solid #e9e9e9;
  margin: 0 24px;
  overflow: hidden;
}


.j-card-head-title {
  float: left;
  font-size: 18px;
  display: inline-block;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
  letter-spacing: 0.3px;
}

.mainContent .sub-Content__primary {
  padding: 12px 24px;
  background: #fff;
  border-radius: 4px;
}

.saas-main-content {
  min-height: 500px;
}

.j-card-bordered {
  border: 1px solid #e9e9e9;
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

.j-card {
  background: #fff;
  border-radius: 4px;
  font-size: 14px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
  min-height: 100%;
}
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

</style>
