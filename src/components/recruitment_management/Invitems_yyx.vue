<!-- 邀请面试-->
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
            <div class="my-span2">邀请面试</div>
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
                      <el-form-item label="姓名:">
                        <el-input v-model="ruleForm.lname" disabled size="small" style="width: 320px;"></el-input>
                      </el-form-item>

                      <el-form-item label="手机号:" prop="lphone">
                        <el-input v-model="ruleForm.lphone" size="small" style="width: 320px;"></el-input>
                      </el-form-item>

                      <el-form-item label="个人邮箱:" prop="lemlie">
                        <el-input v-model="ruleForm.lemlie" size="small" style="width: 320px;"></el-input>
                      </el-form-item>

                      <el-form-item label="应聘部门:">
                        <el-select v-model="ruleForm.ldept" disabled size="small" style="width: 320px;">
                        </el-select>
                      </el-form-item>

                      <el-form-item label="应聘职位:">
                        <el-select v-model="ruleForm.lpost" disabled size="small" style="width: 320px;">
                        </el-select>
                      </el-form-item>

                      <el-form-item label="招聘计划名称:">
                        <el-select v-model="ruleForm.lresumename" disabled size="small" style="width: 320px;">
                        </el-select>
                      </el-form-item>
                    </div>
                  </div>
                  <br>
                </div>
                <div style="padding-left: 8px; padding-right: 8px;" class="ant-col ant-col-12">
                  <div class="ant-card ant-card-bordered">
                    <div class="ant-card-head">
                      <div class="ant-card-head-wrapper">
                        <div class="ant-card-head-title"><span>面试信息</span></div>
                      </div>
                    </div>
                    <!-- 内容区域 -->
                    <div class="ant-card-body">

                      <el-form-item label="面试时间:" prop="date1">
                        <el-date-picker
                            v-model="ruleForm.date1"
                            value-format="YYYY-MM-DD hh:mm:ss"
                            type="datetime"
                            placeholder="选择日期时间">
                        </el-date-picker>
                      </el-form-item>

                      <el-form-item label="面试官:" prop="name">
                        <div class="input-div" @click="dialogTab()">
                          <div v-for="a in ruleForm.b">
                            <el-tag size="medium" closable @close="aaa(a.staffName)">{{ a.staffName }}</el-tag>
                          </div>
                        </div>
                      </el-form-item>

                    </div>
                    <!-- 内容区域 -->
                  </div>
                  <br>
                </div>

              </div>
              <br>

            </div>
            <el-form-item style="margin-left: 400px">
              <el-button size="small" @click="gohome()">取消</el-button>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <el-button size="small" type="primary" plain @click="addInter('ruleForm')">保存</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>


  <!--选择面试人员对话框-->
  <el-dialog v-model="dialogTableVisible" title="选择面试官" destroy-on-close>
    <el-table :data="tableData" style="cursor: pointer" size="mini"
              :header-cell-style="{color:'#606266'}"
              @selection-change="deleteresumeall" :stripe=true>
      <el-table-column align="center" type="selection" width="80"/>
      <el-table-column align="center" prop="staffName" label="姓名"/>
      <el-table-column align="center" prop="deptName" label="所属部门"/>
      <el-table-column align="center" prop="postName" label="职位"/>
    </el-table>

    <template #footer>
                  <span class="dialog-footer">
                    <el-button size="mini" @click="dogand()">确定</el-button>
                    <el-button size="mini" type="primary">取消</el-button>
                  </span>
    </template>
    <div class="demo-pagination-block">
      <el-pagination
          v-model:currentPage="pageInfo.currenPage"
          :page-sizes="[5, 10, 30, 50]"
          v-model:page-size="pageInfo.pagesize"
          :default-page-size="pageInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageInfo.total"
          :pager-count="5"
          background
          @size-change="queryAllstaff()"
          @current-change="queryAllstaff()"
      >
      </el-pagination>
    </div>
  </el-dialog>
</template>

<script>
import {ElMessage} from "element-plus";

export default {
  data() {
    return {
      //路由传入：简历id
      sid: this.$route.query.sid,
      //员工消息对话框
      dialogTableVisible: false,
      mDates:'',
      //分页
      pageInfo: {
        currenPage: 1,
        /* 当前的页 */
        pagesize: 5,
        total: 0,
      },
      tableData: [],
      ruleForm: {
        lname: '', //投简人姓名
        lphone: '', //电话
        lemlie: '', //邮箱
        ldept: '', //部门名称
        lpost: '', //职位名称
        lresumename: '', //招聘计划名称

        date1: '',//面试时间
        staffsid: '',
        b: [],
      },
      names: '',
      addrules: {
        date1: [
          {
            required: true,
            message: '请选择面试时间',
            trigger: 'change',
          },
        ],
        lphone: [
          {
            required: true,
            message: '请填写联系电话',
            trigger: 'change',
          },
        ],
        lemlie: [
          {
            required: true,
            message: '请填写邮箱地址',
            trigger: 'change',
          },
        ],
      }
    }
  }, created() {
    this.selectAllsumes();//应聘者消息查询
    this.selectinterbyid(); //添加前查询表中是否有该数据
  },
  methods: {
    //取消返回上以及
    gohome() {
      this.$router.go(-1);
    },
    //简历基本信息查询
    selectAllsumes() {
      this.axios({
        url: "http://localhost:8007/provider/resume/lufindByid",
        method: "post",
        data: {
          resumeId: this.sid
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
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
    //分页查询全部员工信息
    queryAllstaff() {
      this.axios({
        url: "http://localhost:8007/provider/Interview/queryallstaffs",
        method: "post",
        data: this.pageInfo,
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log(response);
        this.tableData = response.data.data.records
        this.pageInfo.total = response.data.data.total
      }).catch(function (error) {
        console.log('获取列表失败')
        console.log(error);
      })
    },
    //打开对话框
    dialogTab() {
      this.dialogTableVisible = true;
      this.queryAllstaff();
    },
    //获取中的数据
    deleteresumeall(val) {
      this.names = val
    },
    //对话框确定按钮事件
    dogand() {
      for (let i = 0; i < this.names.length; i++) {
        this.ruleForm.b.push(this.names[i]);
        this.ruleForm.staffsid = this.names[i].staffId
      }
      this.dialogTableVisible = false
    },
    //面试官标签删除事件
    aaa(row) {
      for (let a = 0; a < this.ruleForm.b.length; a++) {
        if (this.ruleForm.b[a].staffName == row) {
          this.ruleForm.b.splice(a, 1);
          break;
        }
      }
      this.ruleForm.staffsid = ''

    },
    //查询录用表是否有该数据
    selectinterbyid() {
      this.axios({
        url: "http://localhost:8007/provider/Interview/findinsterbyid",
        method: "post",
        data: {
          resumeId: this.sid
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        this.mDates = response.data.data;
      }).catch(function (error) {
        console.log('获取列表失败')
        console.log(error);
      })
    },
    //添加面试消息
    addInter(name) {
      if(this.mDates == '' || this.mDates==null){
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.axios({
              url: "http://localhost:8007/provider/Interview/addInsterv",
              method: "post",
              data: {
                resumeId: this.sid,
                interviewTime: this.ruleForm.date1,
                staffId: this.ruleForm.staffsid
              },
              responseType: 'json',
              responseEncoding: 'utf-8',
            }).then((response) => {
              console.log(1)
              console.log(1)

              console.log(response)
              this.updateinterzt();//新增后更改其简历状态
              this.$router.go(-1);
            }).catch(function (error) {
              console.log('获取列表失败')
              console.log(error);
            })
          } else {
            return false
          }
        })
      }else{
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.axios({
              url: "http://localhost:8007/provider/resume/updatemsbyid",
              method: "post",
              data: {
                interviewId:this.mDates.interviewId,
                interviewTime:this.ruleForm.date1,
                staffId:this.ruleForm.staffsid
              },
              responseType: 'json',
              responseEncoding: 'utf-8',
            }).then((response) => {
              console.log(response)
              this.updateinterzt();//更改其简历状态
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
    updateinterzt() {
      //删除事件
      this.axios({
        url: "http://localhost:8007/provider/resume/zeliminate",
        method: "post",
        data: {
          resumeId: this.sid,
          resumeZt: 2
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
.demo-pagination-block {
  margin-top: 20px;
}

.input-div {
  min-height: 32px;
  width: 100px;
  border: 1px solid #eaecf0;
  border-radius: 3px;
  margin-top: 5px;
}

.input-div:hover {
  border: 1px solid #008df7;
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

.my-cead {
  height: 50px;
  width: 100%;
  display: flex;
  background-color: #f9f9f9;
  border-bottom: 1px solid #eaeaea;
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
