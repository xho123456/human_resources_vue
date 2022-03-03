
<!--薪酬统计 -->
<template>
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">

      <div class="j-card-body">
        <div class="j-card-head">
          <div class="j-card-head-title" style="margin-left:20px;">
            <span>薪酬统计1</span>
          </div>
        </div>
        <br/>



          <br/>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column fixed prop="createdTime" label="月份" width="185" />
          <el-table-column prop="moneypigeonholeAskperson" label="计薪人数" width="185" />
          <el-table-column prop="moneypigeonholeSalary" label="应发工资" width="185" />
          <el-table-column prop="moneypigeonholePayrollsalary" label="实发工资" width="185" />
          <el-table-column prop="moneypigeonholeFirmpayment" label="公司缴纳" width="185" />
          <el-table-column prop="totalwage" label="员工成本" width="185" />
          <el-table-column fixed="right" label="操作" width="185">
            <template #default="scope">
              <el-button type="text" size="small" style="color:darkorange"  @click="dialogVisible = true,pageInfo1={gdid:tableData[scope.$index].moneypigeonholeId,currentPage:1,pageSize:5},   this.selectEndAuditflow1();">查看归档信息 </el-button>
<!--              <el-popconfirm @confirm="deleteBusinessss(tableData[scope.$index].businessId)"
                             title="确认要删除此归档信息吗?">
                <template #reference>,   this.selectEndAuditflow1();
                  <el-button type="text" size="small" style="color:darkorange" >删除 </el-button>
                </template>
              </el-popconfirm>-->

            </template>
          </el-table-column>
        </el-table>
        <!-- 分页插件 -->

        <el-dialog
            v-model="dialogVisible"
            title="查看工资表"
            width="80%"

            :before-close="handleClose"
        >
          <el-input size="small" v-model="pageInfo1.staffName" placeholder="请输入方案名称" style="width:150px;position: absolute;right: 80px;top: 45px;">
            <template #suffix>
              <el-icon style="margin-top:9px;margin-right:10px"><i-search @click="selectEndAuditflow1()"></i-search></el-icon>
            </template>
          </el-input>
          <div style="text-align: center;">

            <el-table :data="tableData1"  style="width: 100%;font-size: 12px;color:black;font-weight: normal;">

              <el-table-column  label="基本信息">
                <el-table-column     prop="staffId" label="ID" width="66" />
                <el-table-column     prop="staffName" label="姓名" width="67" />
                <el-table-column   prop="deptName" label="部门" width="66" />
                <el-table-column   prop="postName" label="职位" width="67" />
                <!--            <el-table-column   prop="name" label="本月变动" width="100" />-->
              </el-table-column>

              <el-table-column prop="fixedwageOfficialmoney" label="正式工资" width="67"  :formatter="caseTypeNamesFormat1"/>
              <el-table-column prop="fixedwagePeriodmoney" label="试用工资" width="67" :formatter="caseTypeNamesFormat2" />

              <el-table-column prop="jiabanmoney" label="加班工资" width="67"  :formatter="caseTypeNamesFormat3"/>

              <el-table-column label="考勤扣款" >
                <el-table-column prop="chidaomony" label="迟到" width="67" :formatter="caseTypeNamesFormat4" />
                <el-table-column prop="zaotueimoney" label="早退" width="67"  :formatter="caseTypeNamesFormat5"/>

                <el-table-column prop="kuangonmoney" label="旷工" width="67"  :formatter="caseTypeNamesFormat6"/>
                <el-table-column prop="qinjiamoney" label="请假" width="67" :formatter="caseTypeNamesFormat7" />

              </el-table-column>
              <el-table-column label="社保" >
                <el-table-column prop="grsb" label="个人缴纳社保" width="67" :formatter="caseTypeNamesFormat8" />
                <el-table-column prop="gssb" label="公司缴纳社保" width="67" :formatter="caseTypeNamesFormat9" />
              </el-table-column>
              <el-table-column label="公积金" >
                <el-table-column prop="grgjj" label="个人缴纳公积金" width="67" :formatter="caseTypeNamesFormat10" />
                <el-table-column prop="gsgjj" label="公司缴纳公积金" width="67"  :formatter="caseTypeNamesFormat11"/>
              </el-table-column>
              <el-table-column prop="zt" label="员工状态" width="67" :formatter="caseTypeNamesFormat13">
                <template #default="scope">
                  <span v-if="scope.row.zt===1">正式员工</span>
                  <span v-if="scope.row.zt===0">试用员工</span>
                </template>
              </el-table-column>
              <el-table-column prop="yfgzz" label="应发工资" width="67"   :formatter="caseTypeNamesFormat" />
              <el-table-column prop="sfgzz" label="实发工资" width="67"  :formatter="caseTypeNamesFormat12" />
            </el-table>
          </div>
          <!-- 分页插件 -->
          <div class="demo-pagination-block" style="float: right">
            <el-pagination
                v-model:currentPage="pageInfo1.currentPage"
                v-model:page-size="pageInfo1.pageSize"
                :default-page-size="pageInfo1.pageSize"
                :page-sizes="[3, 4, 5, 6]"
                :page-size="3"
                :pager-count="4"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pageInfo1.total"
                @size-change="selectEndAuditflow1"
                @current-change="selectEndAuditflow1"
                prev-text="上一页"
                next-text="下一页"
                background
            >
            </el-pagination>
          </div>
          <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false,addDept()"
        >确定</el-button
        >
      </span>
          </template>
        </el-dialog>

    </div>
      <div class="demo-pagination-block" style="float: right">
        <el-pagination
            v-model:currentPage="pageInfo.currentPage"
            v-model:page-size="pageInfo.pageSize"
            :default-page-size="pageInfo.pageSize"
            :page-sizes="[3, 4, 5, 6]"
            :page-size="3"
            :pager-count="4"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageInfo.total"
            @size-change="selectEndAuditflow"
            @current-change="selectEndAuditflow"
            prev-text="上一页"
            next-text="下一页"
            background
        >
        </el-pagination>
      </div>
  </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      tableData: [],
      tableData1: [],
      pageInfo: {
        currentPage: 1,
        /* 当前的页 */
        pageSize: 3,
        total: 0,
       /* createdTime: '',*/
      },
      pageInfo1: {
        currentPage: 1,
        /* 当前的页 */
        pageSize: 5,
        total: 0,
        gdid:'',
        staffName:'',
        /* createdTime: '',*/
      },
      months: '',
      dialogVisible:false
    }
  },
  methods: {
    pd(){
      if(this.dialogVisible == false){

      }
    },
    //查询工资归档表有那些
    selectEndAuditflow() {
      this.axios({
        method: 'post',
        url: "http://localhost:8007/provider/moneypigeonhole/select",
        data: this.pageInfo,
        responseType: 'json',
        responseEncoding: 'utf-8'
      }).then((response) => {

        this.tableData = response.data.data.records;
        this.pageInfo.total = response.data.data.total;
      })
          .catch(function (error) {
            console.log("失败")
            console.log(error);

          });


    },
    selectEndAuditflow1() {
      this.axios({
        method:'post',
        url:"http://localhost:8007/provider/StaffSalarySelect1/Staff1",
        data:this.pageInfo1,
        responseType:'json',
        responseEncoding:'utf-8'
      })  .then((response) => {
        console.log(response.data.data.records);
        this.tableData1 = response.data.data.records;
        this.pageInfo1.total = response.data.data.total;


      })
          .catch(function (error) {
            console.log("失败")
            console.log(error);

          });

    },
    handleClick() {
      console.log('click')
    },
    caseTypeNamesFormat13 (row) {
      let sfgz = null
      row.yfgz ? sfgz = row.yfgz : sfgz = row.fixedwageOfficialmoney+row.jiabanmoney
      return sfgz
    },

    caseTypeNamesFormat (row) {
      let sfgz = null
      if (row.zt===1){
        row.yfgzz ? sfgz = row.yfgzz : sfgz = row.fixedwageOfficialmoney+row.jiabanmoney

      }else if (row.zt===0){
        row.yfgzz ? sfgz = row.yfgzz : sfgz = row.fixedwagePeriodmoney+row.jiabanmoney
      }

      return sfgz
    },
    caseTypeNamesFormat1 (row) {
      let sfgz = null
      row.fixedwageOfficialmoney ? sfgz = row.fixedwageOfficialmoney : sfgz = 0
      return sfgz
    },
    caseTypeNamesFormat2 (row) {
      let sfgz = null
      row.fixedwagePeriodmoney ? sfgz = row.fixedwagePeriodmoney : sfgz = 0
      return sfgz
    },
    caseTypeNamesFormat3 (row) {
      let sfgz = null
      row.jiabanmoney ? sfgz = row.jiabanmoney : sfgz = 0
      return sfgz
    },
    caseTypeNamesFormat4 (row) {
      let sfgz = null
      row.chidaomony ? sfgz = row.chidaomony : sfgz = 0
      return sfgz
    },
    caseTypeNamesFormat5 (row) {
      let sfgz = null
      row.zaotueimoney ? sfgz = row.zaotueimoney : sfgz = 0
      return sfgz
    },
    caseTypeNamesFormat6 (row) {
      let sfgz = null
      row.kuangonmoney ? sfgz = row.kuangonmoney : sfgz = 0
      return sfgz
    },
    caseTypeNamesFormat7 (row) {
      let sfgz = null
      row.qinjiamoney ? sfgz = row.qinjiamoney : sfgz = 0
      return sfgz
    },
    caseTypeNamesFormat8 (row) {
      let sfgz = null
      row.grsb ? sfgz = row.grsb : sfgz = 0
      return sfgz
    },
    caseTypeNamesFormat9 (row) {
      let sfgz = null
      row.gssb ? sfgz = row.gssb : sfgz = 0
      return sfgz
    },
    caseTypeNamesFormat10 (row) {
      let sfgz = null
      row.grgjj ? sfgz = row.grgjj : sfgz = 0
      return sfgz
    },
    caseTypeNamesFormat11 (row) {
      let sfgz = null
      row.gsgjj ? sfgz = row.gsgjj : sfgz = 0
      return sfgz
    },
    caseTypeNamesFormat12 (row) {
      let sfgz = null
      if (row.zt===1){
        row.sfgzz ? sfgz = row.sfgzz : sfgz = row.fixedwageOfficialmoney+row.jiabanmoney- row.chidaomony-row.zaotueimoney- row.kuangonmoney-row.qinjiamoney-row.grsb- row.grgjj
      }else if (row.zt===0){

        row.sfgzz ? sfgz = row.sfgzz : sfgz = row.fixedwagePeriodmoney+row.jiabanmoney- row.chidaomony-row.zaotueimoney- row.kuangonmoney-row.qinjiamoney-row.grsb- row.grgjj
      }
      return sfgz
    },

  }, created() {
    this.selectEndAuditflow();
    this.selectEndAuditflow1();
    this.pd();
  }, watch: {
    pageInfo: {
      handler: function () {

        this.selectEndAuditflow();

      },
      deep: true,
    },
      gdid: {
      handler: function () {



      },
      deep: true,
    },

  }
}
</script>


<style scoped>
@import url("../../css/navigation.css");
@import url(../../css/dimission.css);
/deep/.demo-collapse{
  margin-left: 10PX;
}

/deep/.el-collapse-item__header {
  display: flex;
  align-items: center;
  height: var(--el-collapse-header-height);
  line-height: var(--el-collapse-header-height);
  cursor: pointer;
  border-bottom: 1px solid var(--el-collapse-border-color);
  font-size: var(--el-collapse-header-font-size);
  font-weight: 500;
  transition: border-bottom-color var(--el-transition-duration);
  outline: 0;
  background-color: #e8edf2;
}
</style>