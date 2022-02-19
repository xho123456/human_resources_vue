<!--固定工资方案 -->
<template>
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body">
        <div class="body_2">

          <el-tabs v-model="activeName" @tab-click="handleClick">

            <!--  定薪 -->
            <el-drawer v-model="drawer" title="I am the title" :with-header="false">
              <h3 style="margin-top:1px;">定薪</h3><br/>
              <el-form :inline="true" ref="formInline" :model="formInline" :rules="rules" class="demo-form-inline">
                <el-form-item>
                  <template #label>
                    <div class="el-form-item__label">试用期基本工资</div>
                  </template>
                  <el-input v-model="fixedSalary.fixedwagePeriodmoney"  placeholder="请输入" disabled/>
                </el-form-item>
                <el-form-item>
                  <template #label>
                    <div class="el-form-item__label">正式基本工资</div>
                  </template>

                  <template #default="scope">
                    <el-input v-model="fixedSalary.fixedwageOfficialmoney"  placeholder="请输入"
                              :disabled="false"  v-if="yz.Officialmoney===null" />
                    <el-input v-model="fixedSalary.fixedwageOfficialmoney"  placeholder="请输入"
                              :disabled="true" v-if="yz.Officialmoney!=null" />
                  </template>
                </el-form-item><br>

                <!-- 转正日期输入框 -->
                <el-form-item>

                  <template #label>
                    <div class="el-form-item__label">转正日期</div>
                  </template>
                  <div class="block" >
                    <el-date-picker style="width: 210px;" v-model="postdate" type="date" placeholder="请选择" disabled>

                    </el-date-picker>
                  </div>
                </el-form-item>
                <el-form-item>
                  <template #label>
                    <div class="el-form-item__label">备注</div>
                  </template>
                  <el-input v-model="fixedSalary.fixedwageRemark"  placeholder="请输入" />
                </el-form-item>

                <br>
                <!-- 按钮 -->
                <div style="margin-top: 30px;">
                  <el-button @click="disly=!disly,RestForm()">取消</el-button>
                  <el-button type="primary" @click="updatedept()">保存</el-button>
                </div>
              </el-form>
            </el-drawer>

            <!--  第二个隐藏框      -->
            <el-drawer v-model="drawer1" title="I am the title" :with-header="false">
              <h3 style="margin-top:1px;">调薪1</h3><br/>
              <el-form :inline="true" :model="Salary"  :rules="rules" class="demo-form-inline">
                <el-form-item>
                  <template #label>
                    <div class="el-form-item__label">调薪后基本工资</div>
                  </template>
                  <el-input v-model.number="Salary.afterSalary"  placeholder="请输入" />
                </el-form-item>
                <el-form-item>
                  <template #label>
                    <div class="el-form-item__label">调薪幅度</div>
                  </template>
                  <el-input v-model="range"   disabled />
                </el-form-item><br>


                <el-form-item>
                  <template #label>
                    <div class="el-form-item__label">调薪备注</div>
                  </template>
                  <el-input v-model="Salary.salaryRemarks"  placeholder="请输入" />
                </el-form-item>

                <br>

                <!-- 按钮 -->
                <div style="margin-top: 30px;">
                  <el-button @click="disly_1=!disly_1,RestForm()">取消</el-button>
                  <el-button type="primary" @click="addSalary()">保存</el-button>
                </div>
              </el-form>
            </el-drawer>


            <!-- 测试下拉按钮 -->
            <el-input size="small" v-model="pageInfo.staffName" placeholder="请输入员工姓名" style="width:150px;position: absolute;right: 80px;">
              <template #suffix>
                <el-icon style="margin-top:9px;margin-right:10px"><i-search @click="selectEndAuditflow()"></i-search></el-icon>
              </template>
            </el-input>
            <el-select v-model="pageInfo.deptName" placeholder="请选择部门" style="position: absolute;right: 300px; width: 150px;" >
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.deptName"
                  :value="item.deptName"
              >
              </el-option>
            </el-select>
            <br />
            <br />
            <el-table :data="tableData" style="width: 100%">
              <el-table-column fixed prop="workschemeId" label="加班方案编号" width="150" />
              <el-table-column prop="workschemeName" label="加班方案名称" width="120" />
              <el-table-column prop="workschemeHolidayratio" label="节假日加班工资" width="120" />
              <el-table-column prop="workschemeDayoffratio" label="休息日加班比例" width="150" />
              <el-table-column prop="workschemeWorkratio" label="工作日加班比例" width="120" />
              <el-table-column prop="workschemeState" label="状态" width="120" />
              <el-table-column prop="workschemeRemark" label="备注" width="120" />
              <el-table-column prop="createdTime" label="创建时间" width="120" />
              <el-table-column prop="updatedTime" label="修改时间" width="120" />
              <el-table-column fixed="right" label="操作" width="120">
                <template #default="scope">
                  <el-button type="text" size="small" @click="drawer = true,fixedSalary={fixedwagePeriodmoney:tableData[scope.$index].fixedwagePeriodmoney,fixedwageOfficialmoney:tableData[scope.$index].fixedwageOfficialmoney,fixedwageRemark:tableData[scope.$index].fixedwageRemark,fixedwageId:tableData[scope.$index].fixedwageId},yz={Officialmoney:tableData[scope.$index].fixedwageOfficialmoney}">定薪 </el-button>
                  <el-button type="text" size="small" @click="drawer1 = true,fixedSalary={fixedwagePeriodmoney:tableData[scope.$index].fixedwagePeriodmoney,fixedwageOfficialmoney:tableData[scope.$index].fixedwageOfficialmoney,fixedwageRemark:tableData[scope.$index].fixedwageRemark,fixedwageId:tableData[scope.$index].fixedwageId},yz={Officialmoney:tableData[scope.$index].fixedwageOfficialmoney},Salary={deptId:tableData[scope.$index].deptId,staffId:tableData[scope.$index].staffId,staffName:tableData[scope.$index].staffName,frontSalary:tableData[scope.$index].fixedwageOfficialmoney}">调薪 </el-button>

                </template>
              </el-table-column>
            </el-table>
            <!-- 分页插件 -->
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



            <!-- 调薪查询 -->



          </el-tabs>


        </div>
      </div>
    </div>
  </div>


</template>

<script>
import {
  defineComponent,
  ref
} from 'vue'
import {ElMessage} from "element-plus";



export default {
  data() {
    return {
      drawer: false,
      drawer1: false,
      disly_1:false,
      activeName: 'first',
      periodpay: '',
      duepay: '',
      periodfixed: '',
      duefixed: '',
      postdate: '',
      remark: '',
      increasepay: '',
      range: '',
      takedate: '',
      cause: '',
      remark2: '',
      seek:'',
      dept2:'',
      seek2:'',
      pageInfo: {
        currentPage: 1,
        /* 当前的页 */
        pageSize: 3,
        total: 0,
        deptName:'',
        staffName:'',
      },
      pageInfo1: {
        currentPage: 1,
        /* 当前的页 */
        pageSize: 3,
        total: 0,
        deptName:'',
        staffName:'',
      },
      tableData: [

      ],
      tableData1: [

      ],
      yz:{
        Officialmoney:"",
      },
      fixedSalary :{
        fixedwageId:"", //固定工资表id
        fixedwagePeriodmoney:"",//试用基本工资
        fixedwageOfficialmoney:"",//正式基本工资
        fixedwageRemark:"",//备注
      },
      options:[
        {
          value: '',
          label: '',
        },

      ],
      Salary:{
        deptId:'',
        staffId:'',
        staffName:'',
        frontSalary:'',//调薪前
        afterSalary:'',//调薪后
        salaryRemarks:'',
        takeEffectDate:'',//生效日期
        salaryState:0,//默认为不同意 0
      },
    }
  },
  methods: {
    selectEndAuditflow1() {
      this.axios({
        method:'post',
        url:"http://localhost:8007/provider/jbgz/a",
        data:this.pageInfo1,
        responseType:'json',
        responseEncoding:'utf-8'
      })  .then((response) => {
        console.log("查询giao111");
        console.log(response.data.data.records);
        this.tableData1 = response.data.data.records;
        this.pageInfo1.total = response.data.data.total;
      })
          .catch(function (error) {
            console.log("失败")
            console.log(error);

          });


    },
    //查询员工 部门 固定工资 职位
    selectEndAuditflow() {
      this.axios({
        method:'post',
        url:"http://localhost:8007/provider/jbgz/a",
        data:this.pageInfo,
        responseType:'json',
        responseEncoding:'utf-8'
      })  .then((response) => {
        console.log("查询giao111");
        console.log(response.data.data.records);
        this.tableData = response.data.data.records;
        this.pageInfo.total = response.data.data.total;
      })
          .catch(function (error) {
            console.log("失败")
            console.log(error);

          });


    },
    handleClick(tab, event) {
      console.log(tab, event)

    },
    submitForm() {
      if (this.duepay.length == 0) {
        ElMessage({
          message: '请输入正式基本工资',
          type: 'warning',
        })
      } else if (this.duefixed.length == 0) {
        ElMessage({
          message: '请输入正式固定工资',
          type: 'warning',
        })
      } else {
        alert(1111)
      }
    },
    submitForm2(){
      if (this.increasepay.length == 0) {
        ElMessage({
          message: '请输入调薪后基本工资',
          type: 'warning',
        })
      } else if (this.takedate.length == 0) {
        ElMessage({
          message: '请输入生效日期',
          type: 'warning',
        })
      } else if (this.cause.length == 0) {
        ElMessage({
          message: '请输入调薪原因',
          type: 'warning',
        })
      } else {
        alert(1111)
      }
    },
    Salarypd(){
      /*/!*   alert('11111111111')
       if (this.fixedSalary.fixedwageOfficialmoney===null){
         alert('msg')
           document.getElementById("aaa").css("disabled","false")
       }else {
         alert('error')*!/
       }*/

    },
    RestForm(){
      this.periodpay='',
          this.duepay= '',
          this.periodfixed= '',
          this.duefixed= '',
          this.postdate= '',
          this.remark= '',
          this.increasepay= '',
          this.range='',
          this.takedate= '',
          this.cause= '',
          this.remark2= ''
    },
    takedates(){
      var date = new Date();
      if(this.takedate<date){
        ElMessage({
          message:'生效日期不能小于当前日期',
          type:'warning',
        })
      }
    }
  },created() {
    this.selectEndAuditflow();
    this.selectEndAuditflow1();


  },watch:{
    pageInfo:{
      handler: function () {

        this.selectEndAuditflow();

      },
      deep: true,
    },
    pageInfo1:{
      handler: function () {

        this.selectEndAuditflow1();

      },
      deep: true,
    },
  }
}
</script>

<style scoped>
#tab-first {
  margin: 40px
}

/deep/.body_1 {
  background: #fff;
  border-radius: 4px;
  /* font-size: 14px; */
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
  min-height: 100%;
  padding: 16px;
  box-sizing: border-box;
  border: 1px solid #e9e9e9;
  position: relative;
  padding: 0 24px;
  color: rgba(0, 0, 0, 0.65);
}
/deep/.el-input__inner{
  height: 32px;
}
/deep/.body_2 {
  background: #fff;
  border-radius: 4px;
  /* font-size: 14px; */
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
  min-height: 100%;
  min-height: 720px;
  padding: 16px;
  box-sizing: border-box;
  border: 1px solid #e9e9e9;
  position: relative;
  padding: 0 24px;
  color: rgba(0, 0, 0, 0.65);
  margin: 20px;

}

/deep/.body_3 {
  background: #e8edf2;
  padding: 24px 0 34px 24px;
  min-height: 100%;
  box-sizing: border-box;
  /* display: none; */
  text-align: center;
  border: 1px solid #e9e9e9;
}
/deep/.body_4{
  background: #e8edf2;
  padding: 24px 0 34px 24px;
  min-height: 100%;
  box-sizing: border-box;
  /* display: none; */

  text-align: center;
  border: 1px solid #e9e9e9;
}

/deep/.el-form--inline .el-form-item {
  margin-right: 110px;
}

/deep/.el-form-item__label {
  width: 110px;
}
/* 分页的样式 */
/deep/.demo-pagination-block {
  float: right;
  margin: 20px;
}
/deep/.el-table thead{
  color: #607d8b;
}
</style>
