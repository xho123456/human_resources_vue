<!-- 月考勤统计 -->
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
              <div class="my-span2">月考勤统计</div>
            </div>
            <div>
              <el-button type="primary" size="small">导出Excel</el-button>
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
                        @change="querycdAllmothday()"
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
                          <el-button @click="querycdAllmothday()">搜索</el-button>
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
                <el-table-column align="center" type="index" fixed label="序号" width="60"/>
                <el-table-column align="center" prop="staffName" fixed label="名称" width="100"/>
                <el-table-column align="center" fixed label="部门" width="100">
                  <template #default="scope">
                    {{ scope.row.depts.deptName }}
                  </template>
                </el-table-column>
                <el-table-column align="center" v-for="(item,index) in one" :key="index + item" :label="item.iName"
                                 :prop="item.i">
                </el-table-column>
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
                    @size-change="querycdAllmothday()"
                    @current-change="querycdAllmothday()"
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
import {ElMessage} from "element-plus";

export default {
  data() {
    return {
      value1: '', //日期选择器
      value3: '',
      radio1: '本月',
      radio2: '全部',
      input5: '',//员工名称
      //存放部门信息、职位信息、招聘计划信息
      deptlists: '',
      //分页、模糊查询数据
      pageInfo: {
        currenPage: 1,
        pagesize: 10,
        total: 0,
        classesName: ''
      },
      tableData: [],
      dateArr: [],
      one: [],
    }
  },
  created() {
    this.getCurrentTime();
    this.querycdAllmothday();
  },
  methods: {
    getCurrentTime() {
      //获取当前时间并打印
      var _this = this;
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1;
      _this.value1 = yy + '-' + mm;
      _this.value3 = yy + '-' + mm;
    },
    prevDate() {
      //获取当前时间并打印
      var _this = this;
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1;
      _this.value1 = yy + '-' + mm;
      this.querycdAllmothday();
    },
    newday() {//本月
      //获取当前时间并打印
      var _this = this;
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth() + 1 < 10 ? '0' + new Date().getMonth() : new Date().getMonth();
      _this.value1 = yy + '-' + mm;
    },
    quanbquery(){ //全部按钮事件
      this.input5 = '';
      this.querycdAllmothday();
    },
    querycdAllmothday() {
      this.axios({
        url: "http://localhost:8007/provider/leave/queryallsmothday",
        method: "post",
        data: {
          currenPage: this.pageInfo.currenPage,
          pagesize: this.pageInfo.pagesize,
          years: this.value1,
          staffName:this.input5,
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.error(response.data.data.records)
        this.tableData = response.data.data.records
        this.pageInfo.total = response.data.data.total
        this.one = [];
        for (let i = 0; i < response.data.data.records[0].clockRsList.length; i++) {
          let two = {
            i: i + 1,
            iName: response.data.data.records[0].clockRsList[i].moth
          }
          this.one.push(two)
        }
        for (let i = 0; i < response.data.data.records.length; i++) {
          for (let j = 0; j < response.data.data.records[i].clockRsList.length; j++) {
            response.data.data.records[i][j + 1] =
                response.data.data.records[i].clockRsList[j].smornResult + " " + "-" + " " +
                response.data.data.records[i].clockRsList[j].xafternoonResult
          }
        }
      }).catch(function (error) {
        console.log('获取列表失败')
        console.log(error);
      })
    },


  }

}
</script>

<style type="text/css" scoped>
/deep/ [data-v-313cd6fd] .el-table .el-table__cell {
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
  /*width: 86%;*/
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

/deep/ .el-table .el-table__cell {
  padding: 10px 0;
  min-width: 0;
  box-sizing: border-box;
  text-overflow: ellipsis;
  vertical-align: middle;
  position: relative;
  text-align: left;
}
</style>
