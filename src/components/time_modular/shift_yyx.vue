<!-- 班次管理 -->
<template>
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body ">


        <div class="mt-20 ml-20 mr-20">
          <el-row :gutter="20">

            <el-col :span="8">
              <el-input
                  v-model="input3"
                  placeholder="Please input"
                  class="input-with-select"
              >
                <template #append>
                  <el-button>搜索</el-button>
                </template>
              </el-input>
            </el-col>
            <el-col :span="2">
              <el-button type="primary" plain @click="dialogVisible=true">新增</el-button>
            </el-col>

          </el-row>
        </div>
        <!--
           新增班次对话框
        -->
        <el-dialog
            v-model="dialogVisible"
            title="添加班次"
            width="50%"
        >
          <!-- 内容主体区域-->
          <span>
            <el-form
                ref="ruleForm"
                :model="ruleForm"
                :rules="rules"
                label-width="120px"
                class="demo-ruleForm"
            >
              <el-form-item label="班次名称" prop="name">
                <el-col :span="30">
                   <el-input v-model="ruleForm.name"></el-input>
                </el-col>
              </el-form-item>

              <el-form-item label="工作时间范围" required>
                <el-col :span="11">
                  <el-form-item prop="date2">
                    <el-time-picker
                        v-model="ruleForm.date1"
                        placeholder="Pick a time"
                        style="width: 100%"
                    ></el-time-picker>
                  </el-form-item>
                </el-col>
                <el-col class="line" :span="2">到</el-col>
                <el-col :span="11">
                  <el-form-item prop="date2">
                    <el-time-picker
                        v-model="ruleForm.date2"
                        placeholder="Pick a time"
                        style="width: 100%"
                    ></el-time-picker>
                  </el-form-item>
                </el-col>
              </el-form-item>
            </el-form>
          </span>

          <!-- 底部按钮区域-->
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogVisible = false">确定</el-button>
              <el-button type="primary" @click="dialogVisible = false"
              >取消</el-button
              >
            </span>
          </template>
        </el-dialog>


        <!-- 表格内容部分 -->
        <div class="sub-Content__primary">
          <el-table border :data="tableData">
            <el-table-column type="index" label="序号"/>
            <el-table-column prop="staff" label="员工名称"/>
            <el-table-column prop="department" label="部门名称"/>
            <el-table-column prop="morning" label="早上打卡时间"/>
            <el-table-column prop="afternoon" label="下午打卡时间"/>
            <el-table-column prop="record" label="记录时间"/>
            <el-table-column label="操作">
              <template #default>
                <el-button size="mini" type="success">编辑</el-button>
                <el-button size="mini" type="danger">删除</el-button>
              </template>
            </el-table-column>
          </el-table>

        </div>

      </div>
      <div class="demo-pagination-block">
        <!-- <span class="demonstration">All combined</span> -->
        <el-pagination
            v-model:currentPage="pageInfo.currenPage"
            :page-sizes="[3, 5, 10, 50]"
            v-model:page-size="pageInfo.pagesize"
            :default-page-size="pageInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageInfo.total"
            :pager-count="5"
            background
            @size-change="selectrecruitmentplan"
            @current-change="selectrecruitmentplan"
            prev-text="上一页"
            next-text="下一页"
        >
        </el-pagination>
      </div>
    </div>

  </div>
</template>

<script>
import {ElMessage} from 'element-plus'

export default {
  data() {
    return {
      //控制添加班次对话框的显示与隐藏
      dialogVisible: false,
      //分页
      pageInfo: {
        currenPage: 1,
        /* 当前的页 */
        pagesize: 3,
        total: 0,
      },
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      },
      tableData: [
        {
          staff: '123',
          department: '23',
          morning: '9:00',
          afternoon: '18:00',
          record: '8',

        },
        {
          staff: '123',
          department: '23',
          morning: '9:00',
          afternoon: '18:00',
          record: '8',

        },
        {
          staff: '123',
          department: '23',
          morning: '9:00',
          afternoon: '18:00',
          record: '8',

        },
        {
          staff: '123',
          department: '23',
          morning: '9:00',
          afternoon: '18:00',
          record: '8',

        },

      ]
    }
  },
  methods: {
    //分页查询招聘计划数据


    //消息提示框确认按钮事件
    confirmgb() {
      ElMessage({
        message: '操作成功',
        type: 'success',
      })
    },
    //消息提示框取消按钮事件
    cancelgb() {
      ElMessage({
        message: '已取消该操作',
        type: 'warning',
      })
    },
    //消息提示框确认按钮事件
    confirmsc() {
      ElMessage({
        message: '操作成功',
        type: 'success',
      })
    },
    //消息提示框取消按钮事件
    cancelsc() {
      ElMessage({
        message: '已取消该操作',
        type: 'warning',
      })
    }
  }
}

</script>


<style type="text/css" scoped>

@import url("../../css/zpdaohang.css");

.demo-pagination-block {
  margin-left: 65%;
  margin-top: 20px;
  margin-bottom: 30px;
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

.mr-20 {
  margin-right: 20px;
}

.ml-20 {
  margin-left: 20px;
}

.mt-20 {
  margin-top: 20px;
}

a {
  color: #085fc3;
  background-color: transparent;
}

a, area, button, [role="button"], input:not([type="range"]), label, select, summary, textarea {
  touch-action: manipulation;
}

a {
  color: #366cb3;
  text-decoration: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  transition: color 0.3s;
  -webkit-text-decoration-skip: objects;
}

button::-moz-focus-inner, [type="button"]::-moz-focus-inner, [type="reset"]::-moz-focus-inner, [type="submit"]::-moz-focus-inner {
  border-style: none;
}

button::-moz-focus-inner, [type="button"]::-moz-focus-inner, [type="reset"]::-moz-focus-inner, [type="submit"]::-moz-focus-inner {
  padding: 0;
  border-style: none;
}

.ant-btn::before {
  background: #fff;
  border-radius: inherit;
}

.ant-btn::before {
  position: absolute;
  top: -1px;
  right: -1px;
  bottom: -1px;
  left: -1px;
  z-index: 1;
  display: none;
  background: #fff;
  border-radius: inherit;
  opacity: 0.35;
  transition: opacity 0.2s;
  content: '';
  pointer-events: none;
}

button, html [type="button"], [type="reset"], [type="submit"] {
  -webkit-appearance: button;
}

.ant-btn-primary {
  color: #fff;
  background-color: #085fc3;
  border-color: #085fc3;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
}

.ant-btn-primary {
  color: #fff;
  background-color: #366cb3;
  border-color: #366cb3;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
}

.ant-btn, .ant-btn:active, .ant-btn:focus {
  outline: 0;
}

.ant-btn {
  line-height: 1.499;
  position: relative;
  display: inline-block;
  font-weight: 400;
  white-space: nowrap;
  text-align: center;
  background-image: none;
  border: 1px solid transparent;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  user-select: none;
  touch-action: manipulation;
  height: 32px;
  padding: 0 15px;
  font-size: 14px;
  border-radius: 3px;
  color: #606c82;
  background-color: #fff;
  border-color: #d3dae2;
}

.ant-btn-primary {
  color: #fff;
  background-color: #085fc3;
  border-color: #085fc3;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
}


/**
 * 下拉选择器样式
 */
.resume-operation {
  text-align: right;
  padding-left: 8px;
}

.resume-operation .ant-form-item {
  display: inline-block;
  margin-right: 10px;
  margin-bottom: 4px;
  width: 200px;
}

.ant-form-item {
  color: rgba(0, 0, 0, 0.65);
}


.mainContent .sub-Content__primary {
  padding: 15px 24px;
  background: #fff;
  border-radius: 4px;
}

.el-table {
  font-size: 13px;
}

.abt:hover {
  border: 1px solid #085FC3;
  color: #085FC3;
}

/deep/ .el-table th.el-table__cell > .cell {
  display: inline-block;
  box-sizing: border-box;
  position: relative;
  vertical-align: middle;
  width: 100%;
  font-weight: initial;
  color: black;
}


/**
修改样式
 */

</style>


