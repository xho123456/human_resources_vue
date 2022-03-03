<!-- 考勤月明细 -->
<template>
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body ">

        <div class="my-cead">
          <div style="width:97%;padding-left: 20px;display: flex;align-items: center;justify-content: space-between;">
            <div style="display: flex;align-items: center;">
              <div class="my-span1" style="display: flex;">
                <i class="iconfont" style="font-size: 20px">&#xe7d9;</i>
              </div>
              <div class="my-span2">考勤月明细</div>
            </div>
            <div>
              <el-button type="primary" size="small" @click="querygdall()">归档{{value1}}月份记录</el-button>
            </div>
          </div>
        </div>
        <div style="width: 100%;">
          <div class="day-div1">
            <div class="day-div2">
              <div class="day-div3">
                <div class="day-div4">
                  <div class="ant-day1">时间范围:</div>
                  <div class="ant-day2">
                    <el-button type="primary" size="mini" @click="prevDate" v-if="value1==value3">本月</el-button>
                    <el-button type="text" size="mini" @click="prevDate" v-if="value1!=value3">本月</el-button>
                    <el-date-picker
                        @change="querycdAlls()"
                        v-model="value1"
                        type="month"
                        size="mini"
                        :clearable="false"
                        style="padding-right: 10px;padding-left: 10px;width: 100px;"
                        placeholder="选择日期"
                        value-format="YYYY-MM"
                    >
                    </el-date-picker>
                  </div>
                </div>
                <div class="day-div5">
                  <div class="ant-day1">查看范围:</div>
                  <div class="ant-day2">
                    <el-radio-group v-model="radio2" size="mini" :border="true">
                      <el-radio-button label="全部" @click="quanbquery()"></el-radio-button>
                      <el-radio-button label="人员"></el-radio-button>
                    </el-radio-group>
                  </div>
                  <div>
                    <div style="margin-top: 5px;">
                      <el-input
                          v-if="radio2=='人员'"
                          v-model="input5"
                          placeholder="请输入员工姓名"
                          size="small">
                        <template #append>
                          <el-button @click="querycdAlls()">搜索</el-button>
                        </template>
                      </el-input>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style="margin-top: 10px">
              <el-table :data="tableData" :border="true" style="width: 100%; font-size: 12px;"
                        :header-cell-style="{background:'#eef1f6',color:'#606266',textAlign: 'center'}">
                <el-table-column type="index" label="序号" width="50"/>
                <el-table-column prop="staffName" label="姓名" width="140"/>
                <el-table-column prop="depts.deptName" label="部门" width="140"/>
                <el-table-column label="应出勤天数" width="140">
                  <template #default="scope">
                     {{atttimedays1}}
                  </template>
                </el-table-column>
                <el-table-column prop="clockRs.s1" label="实际出勤天数" width="140"/>
                <el-table-column prop="clockRs.s2" label="迟到次数(次)" width="140"/>
                <el-table-column prop="clockRs.s3" label="迟到总时长(小时)" width="140"/>
                <el-table-column prop="clockRs.s4" label="早退次数(次)" width="140"/>
                <el-table-column prop="clockRs.s5" label="早退总时长(小时)" width="140"/>
                <el-table-column prop="clockRs.s6" label="旷工次数(次)" width="140"/>
                <el-table-column prop="clockRs.s7" label="旷工总时长(小时)" width="140"/>
                <el-table-column prop="overtimeask.jbtimes" label="加班总时长(小时)" width="140"/>
                <el-table-column prop="leaves.qidays" label="请假天数(天)" width="140"/>
                <el-table-column prop="leaves.qjtimes" label="请假总时长(小时)" width="140"/>
                <el-table-column prop="travels.ccday" label="出差天数(天)" width="140"/>
              </el-table>
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
                    @size-change="querycdAlls()"
                    @current-change="querycdAlls()"
                >
                </el-pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ElMessage,ElMessageBox} from "element-plus";
import {export_json_to_excel} from "../../excal/Export2Excel";

export default {
  data() {
    return {
      value1: '', //时间范围选择器
      value3: '', //本月时间
      input5:'', //搜索框
      radio1: '本月',
      radio2: '全部',
      //分页、模糊查询数据
      pageInfo: {
        currenPage: 1,
        pagesize: 10,
        total: 0,
        classesName: ''
      },
      tableData: [],
      ofdfdf:'',
      atttimedays1:'', //当前月份应出勤天数
    }
  },
  created() {
    //获取系统当前时间
    this.getCurrentTime();
    //考勤all打卡记录查询（按照天数查询）
    this.querycdAlls();
    //应出勤天数
    this.atttimes_x();
  },
  methods: {
    atttimes_x() {//应出勤天数
      var today = new Date();
      // 获取当月天数 curretMonthDayCount
      var curretMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      var curretMonthDayCount = curretMonth.getDate();
      this.atttimedays1 = curretMonthDayCount - ((curretMonthDayCount / 7) * 2).toString().substring(0, 1);
    },
    getCurrentTime() {
      //获取当前时间并打印
      var _this = this;
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1;
      _this.value1 = yy + '-' + mm;
      _this.value3 = yy + '-' + mm;
    },
    newday() {//本月
      //获取当前时间并打印
      var _this = this;
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1;
      _this.value1 = yy + '-' + mm;
    },
    prevDate() { //时间范围查询
      //获取当前时间并打印
      var _this = this;
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1;
      _this.value1 = yy + '-' + mm;
      this.querycdAlls();
    },
    quanbquery(){ //全部按钮事件
      this.input5 = '';
      this.querycdAlls();
    },
    //考勤all打卡记录查询（按照天数查询）
    querycdAlls() {
      this.axios({
        url: "http://localhost:8007/provider/Check/queryMoth",
        method: "post",
        data: {
          currenPage: this.pageInfo.currenPage,
          pagesize: this.pageInfo.pagesize,
          years: this.value1,
          staffName:this.input5
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        this.tableData = response.data.data.records
        this.pageInfo.total = response.data.data.total
      }).catch(function (error) {
        console.log('获取列表失败')
        console.log(error);
      })
    },
    //查询当前选择器月份是否有归档数据
    querygdall(){
      ElMessageBox.confirm(
          '是否确定归档'+this.value1+'月份数据?',
          'Warning',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }
      ).then(() => {
        this.axios({
          url: "http://localhost:8007/provider/Check/querygd",
          method: "post",
          data: {
            currenPage: 1,
            pagesize: 999,
            datesgd: this.value1
          },
          responseType: 'json',
          responseEncoding: 'utf-8',
        }).then((response) => {
          this.ofdfdf = response.data.data.records
          this.addguid();
        }).catch(function (error) {
          console.log('获取列表失败')
          console.log(error);
        })
      }).catch(() => {
        ElMessage({
          type: 'info',
          message: '已取消操作',
        })
      })
    },
    //考勤数据归档
    addguid() {
      if(this.ofdfdf==''){
        this.axios({
          url: "http://localhost:8007/provider/Check/queryMoths",
          method: "post",
          data: {
            currenPage: 1,
            pagesize: 999,
            years: this.value1
          },
          responseType: 'json',
          responseEncoding: 'utf-8',
        }).then((response) => {
          console.error(response.data.data)
          ElMessage({
            message: "归档成功",
            type: "success",
          });
        }).catch(function (error) {
          console.log('获取列表失败')
          console.log(error);
        })
      }else {
        ElMessage({
          message: "当月已归档",
          type: "error",
        });
      }
    },

  },


}
</script>

<style type="text/css" scoped>
/deep/.el-table .el-table__cell {
  padding: 5px 0;
  min-width: 0;
  box-sizing: border-box;
  text-overflow: ellipsis;
  vertical-align: middle;
  position: relative;
  text-align: left;
}
.day-div1 {
  padding: 10px 20px;
  min-height: 570px;
}

.day-div2 {
  display: flex;
  justify-content: space-between;
  padding-left: 0;
}

.day-div3 {
  width: 100%;
  height: 84px;
  border: 1px solid #ddd;
}

.day-div4 {
  height: 50%;
  border-bottom: 1px solid #ddd;
  display: flex;
}

.day-div5 {
  height: 50%;
  display: flex;
}

.ant-day1 {
  width: 150px;
  padding-top: 6px;
  padding-left: 16px;
  font-size: 12px;
  color: black;
  line-height: 30px;
  background-color: #f4f4f4;
}

.ant-day2 {
  padding: 5px;
  line-height: 30px;
}

.el-radio-group {
  font-size: 0;
  display: block;
}

.el-radio-button {
  padding-right: 10px;
}

/deep/ .el-radio-button--mini .el-radio-button__inner {
  padding: 7px 15px;
  font-size: 12px;
  border-radius: 5px;
  border: none;
}

.el-button--mini {
  min-height: 23px;
  padding: 6px 8px;
  font-size: 12px;
  border-radius: 5px;
}

/deep/ .el-input__prefix-inner {
  pointer-events: all;
  display: none;
}

/deep/ .el-input--prefix .el-input__inner {
  padding-left: 18px;
}

a {
  color: #008df7;
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

/deep/ .el-table td.el-table__cell div {
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

/deep/ .el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell {
  background-color: #e9f7ff;
}

</style>