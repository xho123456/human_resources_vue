<!-- 每日考勤统计 -->
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
              <div class="my-span2">每日考勤统计</div>
            </div>
            <div>
              <el-button type="primary" size="small">导入Excel</el-button>
              <el-button type="primary" size="small">导出Excel</el-button>
            </div>
          </div>
        </div>
        <div style="width: 100%;">
          <div class="day-div1">
            <div class="day-div2">
              <div class="day-div3">
                 <div class="day-div4">
                      <div class="ant-day1">时间范围: </div>
                      <div class="ant-day2">
                        <el-button type="primary" size="mini" v-if="value1 === value3">今天</el-button>
                        <el-button type="text" size="mini" v-if="value1!== value3" @click="newday()">今天</el-button>
                        <el-button type="text" size="mini" @click="prevDate">上一天</el-button>
                        <el-date-picker
                            v-model="value1"
                            type="date"
                            size="mini"
                            :clearable="false"
                            style="padding-right: 10px;padding-left: 10px;width: 100px;"
                            placeholder="选择日期">
                        </el-date-picker>
                        <el-button type="text" size="mini" @click="nextDate">下一天</el-button>
                      </div>
                 </div>
                 <div class="day-div5">
                      <div class="ant-day1">查看范围: </div>
                      <div class="ant-day2">
                        <el-radio-group v-model="radio2" size="mini" :border="true">
                          <el-radio-button label="全部"></el-radio-button>
                          <el-radio-button label="部门"></el-radio-button>
                          <el-radio-button label="人员"></el-radio-button>
                        </el-radio-group>
                      </div>
                 </div>
              </div>
            </div>
            <div style="margin-top: 10px">
              <el-table :data="tableData" style="width: 100%; font-size: 12px;"
                        :header-cell-style="{background:'#eef1f6',color:'#606266',textAlign: 'center'}" >
                <el-table-column fixed="left" type="index" label="序号"  width="50"/>
                <el-table-column fixed="left" prop="staffName" label="姓名" width="140"/>
                <el-table-column fixed="left" prop="deptName" label="部门名称" width="140"/>
                <el-table-column fixed="left" prop="dayDate" label="日期" width="140"/>
                <el-table-column label="班次" width="130" :show-overflow-tooltip="true">
                  <template #default="scope">
                    一般工作时间(
                    {{scope.row.classesTimeones}}-{{scope.row.classesTimeonex}}
                    &nbsp;
                    {{scope.row.classesTimetwos}}-{{scope.row.classesTimetwox}}
                    )
                  </template>
                </el-table-column>
                <el-table-column label="上班一">
                  <el-table-column prop="smornClock" label="打卡时间" />
                  <el-table-column prop="smornResult" label="打卡结果" width="100" />
                </el-table-column>
                <el-table-column label="下班一">
                  <el-table-column prop="xafternoonClock" label="打卡时间"/>
                  <el-table-column prop="xafternoonResult" label="打卡结果" width="100" />
                </el-table-column>
                <el-table-column prop="atsShould" label="应出勤天数" width="140"/>
                <el-table-column prop="atShould" label="实际出勤天数" width="140"/>
                <el-table-column prop="cheLate" label="迟到（次数）" width="140"/>
                <el-table-column prop="chesLate" label="迟到时长(小时)" width="140"/>
                <el-table-column prop="zhaiLate" label="早退（次数）" width="140"/>
                <el-table-column prop="zhaisLate" label="早退时长（小时）" width="140"/>
                <el-table-column prop="kangLate" label="旷工（次数）" width="140"/>
                <el-table-column prop="kangsLate" label="旷工时长（小时）" width="140"/>
                <el-table-column prop="workYing" label="应工作时长" width="140"/>
                <el-table-column prop="worksYing" label="实际工作时长" width="140"/>
              </el-table>
              <div class="demo-pagination-block" style="margin-top: 10px">
                <el-pagination
                    v-model:currentPage="pageInfo.currenPage"
                    :page-sizes="[5, 10, 30, 50]"
                    v-model:page-size="pageInfo.pagesize"
                    :default-page-size="pageInfo.pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="pageInfo.total"
                    :pager-count="5"
                    background
                    @size-change="querycdAll()"
                    @current-change="querycdAll()"
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
  data(){
    return{
      value1:'',
      value3:'',
      radio2:'全部',
      //分页、模糊查询数据
      pageInfo: {
        currenPage: 1,
        pagesize: 5,
        total: 0,
        classesName:''
      },
      tableData:[]
    }
  },
  created() {
    this.getCurrentTime();
    this.querycdAll();
  },
  methods: {
    getCurrentTime() {
      //获取当前时间并打印
      var _this = this;
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth()+1 <10 ? '0'+new Date().getMonth() : new Date().getMonth();
      let dd = new Date().getDate() <10 ? '0'+new Date().getDate() : new Date().getDate();
      _this.value1 = yy+'-'+mm+'-'+dd;
      _this.value3 = yy+'-'+mm+'-'+dd;
    },
    prevDate() {
      //前一天
      let odata = new Date(
          new Date(this.value1).getTime() - 24 * 60 * 60 * 1000
      ); //计算当前日期 -1
      this.value1 = this.convertToDate(odata); //格式化日期并赋值
    },
    nextDate() {
      //后一天
      let odata = new Date(
          new Date(this.value1).getTime() + 24 * 60 * 60 * 1000
      ); //计算当前日期 +1
      this.value1 = this.convertToDate(odata); //格式化日期并赋值
    },
    convertToDate(date) {
      var date = new Date(date);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      var d = date.getDate();
      m = m < 10 ? "0" + m : m; //月小于10，加0
      d = d < 10 ? "0" + d : d; //day小于10，加0
      return y + "-" + m + "-" + d;
    },
    newday(){//今天
      var _this = this;
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth()+1 <10 ? '0'+new Date().getMonth() : new Date().getMonth();
      let dd = new Date().getDate() <10 ? '0'+new Date().getDate() : new Date().getDate();
      _this.value1 = yy+'-'+mm+'-'+dd;
    },


    //考勤all打卡记录查询（按照天数查询）
    querycdAll(){
      this.axios({
        url: "http://localhost:8007/provider/leave/queryalls",
        method: "post",
        data: {
          currenPage: this.pageInfo.currenPage,
          pagesize:this.pageInfo.pagesize
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
  }

}
</script>

<style type="text/css" scoped>
.day-div1{
  padding: 10px 20px;min-height: 570px;
}
.day-div2{
  display: flex; justify-content: space-between;padding-left: 0;
}
.day-div3{
  width: 100%;height: 84px;border: 1px solid #ddd;
}
.day-div4{
  height: 50%;border-bottom: 1px solid #ddd;display: flex;
}
.day-div5{
  height: 50%;display: flex;
}
.ant-day1{
  width: 150px;
  padding-top: 6px;
  padding-left: 16px;
  font-size: 12px;
  color: black;
  line-height: 30px;
  background-color: #f4f4f4;
}
.ant-day2{
  padding:5px;
  line-height: 30px;
  width: 86%;
}
.el-radio-group {
  font-size: 0;
  display: block;
}
.el-radio-button{
  padding-right: 10px;
}
/deep/.el-radio-button--mini .el-radio-button__inner {
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
/deep/.el-input__prefix-inner {
  pointer-events: all;
  display: none;
}
/deep/.el-input--prefix .el-input__inner {
  padding-left: 18px;
}
a{
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