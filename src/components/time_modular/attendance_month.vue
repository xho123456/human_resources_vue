<!-- 考勤归档明细 -->
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
            <div></div>
          </div>
        </div>
        <div style="width: 100%;">
          <div class="day-div1">
            <div>
              <div style="margin-bottom: 20px;margin-top: 10px">
                <el-button type="primary" size="small" @click="derive()">
                  导出
                </el-button>
                <div style="width: 500px; float: right">
                  <el-select v-model="deptNames" clearable ref="vueSelect"  size="small"
                             @click="onclicks()" @clear="deletedis()">
                    <el-option hidden></el-option>
                    <el-tree
                        :data="deptlists"
                        :default-expand-all=true
                        :check-on-click-node=true
                        :check-strictly=true
                        node-key="deptId"
                        :props="defaultProps"
                        ref="tree"
                        @check-change="handleCheckChangesx()"
                    />
                  </el-select>
                  &nbsp;
                  <el-input
                      v-model="classesName"
                      placeholder="搜索"
                      class="input-with-select"
                      size="small"
                      style="width: 300px;"
                  >
                    <template #append>
                      <el-button @click="querycdAlls()">搜索</el-button>
                    </template>
                  </el-input>
                </div>
              </div>
            </div>
            <div style="margin-top: 10px">
              <el-table :data="tableData" :border="true" style="width: 100%; font-size: 12px;"
                        :header-cell-style="{background:'#eef1f6',color:'#606266',textAlign: 'center'}">
                <el-table-column type="index" label="序号" width="50"/>
                <el-table-column prop="staffName" label="姓名" width="140"/>
                <el-table-column prop="deptName" label="部门" width="140"/>
                <el-table-column prop="years" label="所属年月" width="140"/>
                <el-table-column prop="attendanceTime" label="应出勤天数" width="140"/>
                <el-table-column prop="actualattendanceTime" label="实际出勤天数" width="140"/>
                <el-table-column prop="lateTimes" label="迟到次数(次)" width="140"/>
                <el-table-column prop="hoursLate" label="迟到总时长(小时)" width="140"/>
                <el-table-column prop="earlyLeave" label="早退次数(次)" width="140"/>
                <el-table-column prop="earlyHours" label="早退总时长(小时)" width="140"/>
                <el-table-column prop="absenteeism" label="旷工次数(次)" width="140"/>
                <el-table-column prop="absenteeismHours" label="旷工总时长(小时)" width="140"/>
                <el-table-column prop="overtimeHours" label="加班总时长(小时)" width="140"/>
                <el-table-column prop="numberofLeave" label="请假天数(天)" width="140"/>
                <el-table-column prop="lengthofLeave" label="请假总时长(小时)" width="140"/>
                <el-table-column prop="travelDays" label="出差天数(天)" width="140"/>
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
    const defaultProps = {
      children: 'deptlist',
      label: 'deptName',
    }
    return {
      defaultProps,
      //存放部门信息
      deptlists: '',
      //搜索框值
      classesName:'',
      //下拉框选中的部门名称
      deptNames:'',
      //分页、模糊查询数据
      pageInfo: {
        currenPage: 1,
        pagesize: 10,
        total: 0,
        classesName: ''
      },
      daymothtims:this.$route.query.daymoth,
      tableData: [],
    }
  },
  created() {
    this.querycdAlls();
    //部门信息查询
    this.selectAlldept();
  },
  methods: {

    //点击Select选择器清空原有复选框选项
    onclicks() {
      this.$refs.tree.setCheckedKeys([]);
    },
    //筛选：节点选中状态发生变化时的回调
    handleCheckChangesx(data, checked, indeterminate) {
      //获取所有选中的节点 start
      let res = this.$refs.tree.getCheckedNodes()
      res.forEach((item) => {
        this.deptNames = item.deptName

        //调用查询方法
        this.querycdAlls();
        //关闭Select选择器
        this.$refs.vueSelect.blur();
      })
    },
    //部门选择器清空按钮
    deletedis(){
      this.deptNames = '';
      this.querycdAlls();
    },
    /**
     * select：查询所有部门信息
     */
    selectAlldept() {
      this.axios({
        url: "http://localhost:8007/provider/dept/dept/selectAlldept",
        method: "post",
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log(response);
        this.deptlists = response.data.data
      }).catch(function (error) {
        console.log('获取列表失败')
        console.log(error);
      })
    },
    //通过日期查询归档表的数据
    querycdAlls() {
      this.axios({
        url: "http://localhost:8007/provider/Check/queryBytimes",
        method: "post",
        data: {
          currenPage: this.pageInfo.currenPage,
          pagesize: this.pageInfo.pagesize,
          datesgd: this.daymothtims,
          deptName: this.deptNames,
          staffName:this.classesName
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.error(1)
        console.error( response.data.data.records)
        this.tableData = response.data.data.records
        this.pageInfo.total = response.data.data.total
      }).catch(function (error) {
        console.log('获取列表失败')
        console.log(error);
      })
    },

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
      let tHeader = ["姓名","部门","所属年月","应出勤天数","实际出勤天数","迟到次数(次)","迟到总时长(小时)","早退次数(次)","早退总时长(小时)","旷工次数(次)","旷工总时长(小时)","加班总时长(小时)","请假天数(天)","请假总时长(小时)","出差天数(天)"]; // 导出的表头名
      let filterVal = ["staffName", "deptName", "years", "attendanceTime", "actualattendanceTime", "lateTimes","hoursLate",
        "earlyLeave", "earlyHours","absenteeism","absenteeismHours","overtimeHours","numberofLeave","lengthofLeave","travelDays"];//导出其prop属性
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