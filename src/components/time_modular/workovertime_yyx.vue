<!-- 加班查询 -->
<template>
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body ">


        <div class="mt-20 ml-20 mr-20">
          <el-row :gutter="20">
            <el-col :span="7">
              <!--选择开始日期和结束日期-->
              <el-date-picker
                  v-model="value1"
                  type="daterange"
                  unlink-panels
                  range-separator="到"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  wdaWD
                  aW
                  :shortcuts="shortcuts"
              >
              </el-date-picker>
            </el-col>
            <el-col :span="3.5">
              <!--    全部部门-->
              <el-select v-model="value" clearable placeholder="全部部门">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
              </el-select>
            </el-col>


            <el-col :span="7">
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
              <el-button type="primary" plain @click="">
                <el-icon style="font-size: 13px">
                  <i-upload/>
                </el-icon>
                导入
              </el-button>
            </el-col>
            <el-col :span="2">
              <el-button type="primary" plain  @click="derive()">
                <el-icon style="font-size: 13px">
                  <i-folder-opened/>
                </el-icon>
                导出
              </el-button>
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
            <el-table-column prop="applyfor" label="申请名称"/>
            <el-table-column prop="department" label="发起人部门"/>
            <el-table-column prop="type" label="加班类型"/>
            <el-table-column prop="thing" label="加班事由"/>
            <el-table-column prop="begin" label="加班开始时间"/>
            <el-table-column prop="finish" label="加班结束时间"/>
            <el-table-column prop="hour" label="加班总小时"/>
            <el-table-column prop="subsidy" label="加班补贴" />
            <el-table-column label="操作" width="160px">
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
import {ElMessage, ElMessageBox} from 'element-plus'
import {export_json_to_excel} from "../../excal/Export2Excel";
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
          applyfor: '王鑫',
          department: '行政部',
          type: '加班',
          thing: '没有钱了',
          begin: '20:00',
          finish: '22:00',
          hour: '4小时',
          subsidy: '补贴',
        },
        {
          applyfor: '王鑫',
          department: '行政部',
          type: '加班',
          thing: '没有钱了',
          begin: '20:00',
          finish: '22:00',
          hour: '4小时',
          subsidy: '补贴',
        },
        {
          applyfor: '王鑫',
          department: '行政部',
          type: '加班',
          thing: '没有钱了',
          begin: '20:00',
          finish: '22:00',
          hour: '4小时',
          subsidy: '补贴',
        },
        {
          applyfor: '王鑫',
          department: '行政部',
          type: '加班',
          thing: '没有钱了',
          begin: '20:00',
          finish: '22:00',
          hour: '4小时',
          subsidy: '补贴',
        }

      ]
    }
  },
  methods: {
    // 点击导出操作
    derive() {
      ElMessageBox.confirm(
          '此操作将导出excel文件, 是否继续?',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }
      ).then(() => {
        this.deriveExcel();
      }).catch(() => {
        ElMessage({
          type: 'info',
          message: '取消成功',
        })
      })
    },
    // 导出方法
    deriveExcel() {
      var _this = this;
      let tHeader = ["员工名称", "部门名称", "早上打卡时间", "下午打卡时间", "记录时间"]; // 导出的表头名
      let filterVal = ["staff", "department", "morning", "afternoon", "record"];//导出其prop属性
      ElMessageBox.prompt('请输入文件名', '提示', {
        confirmButtonText: '生成',
        cancelButtonText: '取消',
      }).then(({value}) => {
        let data = _this.formatJson(filterVal, _this.tableData);
        export_json_to_excel(tHeader, data, value);
        ElMessage({
          type: 'success',
          message: `生成成功`,
        })
      })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: '取消成功',
            })
          })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]));
    },


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


.el-table {
  font-size: 13px;
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
.mainContent .sub-Content__primary {
  padding: 15px 24px;
  background: #fff;
  border-radius: 4px;
}


/**
修改样式
 */

</style>