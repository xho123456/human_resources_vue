<!-- 新增简历-->
<template>
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <!--标题-->
      <div class="j-card-head">
        <div class="j-card-head-title">
          <span>邀请面试</span>
        </div>
      </div>
      <!--内容-->
      <div class="j-card-body ">
        <div class="sub-Content__primary">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" >
          <div class="firstPage" style="height: 490px;">

              <div style="margin-left: -8px; margin-right: -8px;" class="ant-row">

                <div style="padding-left: 8px; padding-right: 8px;" class="ant-col ant-col-12">
                  <div class="ant-card ant-card-bordered">
                    <div class="ant-card-head">
                      <div class="ant-card-head-wrapper"><div class="ant-card-head-title"><span>基本信息</span></div></div>
                    </div>
                    <!-- 内容区域 -->
                    <div class="ant-card-body">


                        <el-form-item label="姓名:" prop="name">
                          <el-input v-model="ruleForm.name" size="small" style="width: 320px;"></el-input>
                        </el-form-item>

                        <el-form-item label="手机号:" prop="name">
                          <el-input v-model="ruleForm.name" size="small" style="width: 320px;"></el-input>
                        </el-form-item>

                        <el-form-item label="个人邮箱:" prop="name">
                          <el-input v-model="ruleForm.name" size="small" style="width: 320px;"></el-input>
                        </el-form-item>

                        <el-form-item label="应聘部门:" prop="region">
                          <el-select v-model="ruleForm.region" disabled  size="small" style="width: 320px;">
                          </el-select>
                        </el-form-item>

                        <el-form-item label="应聘职位:" prop="region">
                          <el-select v-model="ruleForm.region" disabled  size="small" style="width: 320px;">
                          </el-select>
                        </el-form-item>

                        <el-form-item label="招聘计划名称:" prop="region">
                          <el-select v-model="ruleForm.region" disabled  size="small" style="width: 320px;">
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
                      <div class="ant-card-head-wrapper"><div class="ant-card-head-title"><span>面试信息</span></div></div>
                    </div>
                    <!-- 内容区域 -->
                    <div class="ant-card-body">

                        <el-form-item label="面试时间:">
                          <el-col :span="11">
                            <el-date-picker type="date" placeholder="选择日期" size="small" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                          </el-col>
                          <el-col class="line" :span="2">-</el-col>
                          <el-col :span="11">
                            <el-time-picker placeholder="选择时间" size="small" v-model="ruleForm.date2" style="width: 70%;"></el-time-picker>
                          </el-col>
                        </el-form-item>

                        <el-form-item label="面试官:" prop="name">
                          <el-input v-model="ruleForm.name" size="small" style="width: 320px;"></el-input>
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
              <el-button size="small"  @click="gohome()">取消</el-button>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <el-button size="small" type="primary" plain @click="addResume()">保存</el-button>
            </el-form-item>
          </el-form>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  data(){
    return{
      ruleForm:{
        name:'',
        region:'',
        date1:'',
        date2:'',
      },
    }
  },
  methods:{
    //取消返回上以及
    gohome() {
      this.$router.go(-1);
    },
  }
}
</script>


<style type="text/css" scoped>
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
.ant-col-12{
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
  padding-top: 12px;
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
  margin-top: 8px;
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
  margin-top: 8px;
  min-height: 100%;
}
</style>
