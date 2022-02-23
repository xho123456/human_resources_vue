<!--加班方案 -->
<template>
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body">
        <div class="body_2">

          <el-tabs v-model="activeName" @tab-click="handleClick">

            <!--  定薪 -->
            <el-drawer v-model="drawer" title="I am the title" :with-header="false">
              <h3 style="margin-top:1px;">加班方案编辑</h3><br/>
              <el-form :inline="true" ref="formInline" :model="formInline" :rules="rules" class="demo-form-inline">
                <el-form-item>
                  <template #label>
                    <div class="el-form-item__label">加班方案名称</div>
                  </template>
                  <el-input v-model="workscheme.workschemeName"  placeholder="请输入" />
                </el-form-item>
                <el-form-item>
                  <template #label>
                    <div class="el-form-item__label">节假日加班工资</div>
                  </template>

                  <template #default="scope">
                    <el-input v-model="workscheme.workschemeHolidayratio"  placeholder="请输入" />
                  </template>

                </el-form-item>

                <el-form-item>
                  <template #label>
                    <div class="el-form-item__label">休息日加班工资</div>
                  </template>
                  <el-input v-model="workscheme.workschemeDayoffratio"  placeholder="请输入" />
                </el-form-item>
                <el-form-item>
                  <template #label>
                    <div class="el-form-item__label">工作日加班工资</div>
                  </template>
                  <el-input v-model="workscheme.workschemeWorkratio"  placeholder="请输入" />
                </el-form-item>
                <el-form-item>
                  <template #label>
                    <div class="el-form-item__label">备注</div>
                  </template>
                  <el-input v-model="workscheme.workschemeRemark"  placeholder="请输入" />
                </el-form-item>
                <el-form-item label="状态：  ">
                  <el-radio-group v-model="workscheme.workschemeState">
                    <el-radio :label="0">启用</el-radio>
                    <el-radio :label="1">禁用</el-radio>
                  </el-radio-group>
                </el-form-item><br>





                <br>
                <!-- 按钮 -->
                <div style="margin-top: 30px;">
                  <el-button @click="disly_1=!disly_1,RestForm()">取消</el-button>
                  <el-button type="primary" @click="updateworkscheme()">保存</el-button>
                </div>
              </el-form>
            </el-drawer>




            <el-button type="primary" style="margin-left: 16px" @click="dialogVisible=true"
            >新增
            </el-button>
            <el-dialog
                v-model="dialogVisible"
                title="新增"
                width="30%"
                :before-close="handleClose"
            >

              <el-form ref="form" :model="dept" label-width="120px">
                <el-form-item label="方案名称：">
                  <el-input v-model="workscheme1.workschemeName"></el-input>
                </el-form-item>

                <el-form-item label="节假日加班工资：">
                  <el-input v-model="workscheme1.workschemeHolidayratio"></el-input>
                </el-form-item>
                <el-form-item label="休息日加班工资：">
                  <el-input v-model="workscheme1.workschemeDayoffratio"></el-input>
                </el-form-item>
                <el-form-item label="工作日加班工资：">
                  <el-input v-model="workscheme1.workschemeWorkratio"></el-input>
                </el-form-item>
                <el-form-item label="备注：">
                  <el-input v-model="workscheme1.workschemeRemark"></el-input>
                </el-form-item>
              </el-form>
              <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false,addworkscheme()"
        >确定</el-button
        >
      </span>
              </template>
            </el-dialog>
            <!-- 测试下拉按钮 -->
            <el-input size="small" v-model="pageInfo.workschemeName" placeholder="请输入方案名称" style="width:150px;position: absolute;right: 80px;">
              <template #suffix>
                <el-icon style="margin-top:9px;margin-right:10px"><i-search @click="selectEndAuditflow()"></i-search></el-icon>
              </template>
            </el-input>

            <br />
            <br />
            <el-table :data="tableData" style="width: 100%">
              <el-table-column fixed prop="workschemeId" label="加班方案编号" width="150" />
              <el-table-column prop="workschemeName" label="加班方案名称" width="120" />
              <el-table-column prop="workschemeHolidayratio" label="节假日加班工资" width="120" />
              <el-table-column prop="workschemeDayoffratio" label="休息日加班比例" width="150" />
              <el-table-column prop="workschemeWorkratio" label="工作日加班比例" width="120" />

              <el-table-column label="状态"   >
                <template #default="scope">
                  <span v-if="scope.row.workschemeState===1">禁用</span>
                  <span v-if="scope.row.workschemeState===0">启用</span>
                </template>
              </el-table-column>
              <el-table-column prop="workschemeRemark" label="备注" width="120" />
              <el-table-column prop="createdTime" label="创建时间" width="120" />
              <el-table-column prop="updatedTime" label="修改时间" width="120" />
              <el-table-column fixed="right" label="操作" width="120">
                <template #default="scope">
                  <el-button type="text" size="small" @click="drawer = true,workscheme={workschemeId:tableData[scope.$index].workschemeId,workschemeName:tableData[scope.$index].workschemeName,workschemeHolidayratio:tableData[scope.$index].workschemeHolidayratio,workschemeDayoffratio:tableData[scope.$index].workschemeDayoffratio,workschemeWorkratio:tableData[scope.$index].workschemeWorkratio,workschemeRemark:tableData[scope.$index].workschemeRemark,workschemeState:tableData[scope.$index].workschemeState},yz={Officialmoney:tableData[scope.$index].fixedwageOfficialmoney}">编辑 </el-button>
                  <el-popconfirm @confirm="deleteworkscheme(tableData[scope.$index].workschemeId)"
                                 title="确认要删除此方案吗?">
                    <template #reference>
                      <el-button type="text" size="small" style="color:darkorange" >删除 </el-button>
                    </template>
                  </el-popconfirm>
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
      dialogVisible:false,
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
        workschemeName:"",
        staffName:'',
      },

      tableData: [

      ],
      tableData1: [

      ],
      yz:{
        Officialmoney:"",
      },

      workscheme:{
        workschemeId:"",//加班方案编号
        workschemeName:"",//加班方案名称
        workschemeHolidayratio:"",//节假日加班比例
        workschemeDayoffratio:"",//休息日加班比例
        workschemeWorkratio:"",//工作日加班比例
        workschemeState:"",//状态;0：启用，1：禁用
        workschemeRemark:"",//备注
      },
      workscheme1:{
        workschemeId:"",//加班方案编号
        workschemeName:"",//加班方案名称
        workschemeHolidayratio:"",//节假日加班比例
        workschemeDayoffratio:"",//休息日加班比例
        workschemeWorkratio:"",//工作日加班比例
        workschemeState:0,//状态;0：启用，1：禁用
        workschemeRemark:"",//备注
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
    //添加加班方案表
    addworkscheme(){
      this.axios.post("http://localhost:8007/provider/addworkschemee",this.workscheme1)
          .then(response => {
            this.workscheme1.workschemeId=null
            if (response.data === "添加失败") {
              ElMessage.error('添加失败')
            } else {
              ElMessage({
                message: '添加成功',
                type: 'success',

              })
              this.selectEndAuditflow();
            }
          }).catch(function (error) {
        console.log(error);
      });



    },
    //修改加班方案
    updateworkscheme(){
      this.axios({
        method:"put",
        url:"http://localhost:8007/provider/updateWorkscheme/Workscheme",
        data:this.workscheme,
        responseType:'json',
        responseEncoding:"utf-8"
      }).then(response=>{
        console.log(response)
        if(response.data==="成功"){
          ElMessage.error("修改失败")
        }else{
          ElMessage({
            type:"success",
            message:"修改成功"
          })
          this.selectEndAuditflow();
        }
      })
    },
    //删除加班方案表
    deleteworkscheme(id) {
      this.axios({
        url: "http://localhost:8007/provider/deleteWorkscheme/b",
        method: "post",
        data: [id],
        responseType:'json',
        responseEncoding:'utf-8'
      })
          .then((response) => {
            if (response.data === "删除失败") {

              ElMessage.error("删除失败");

            } else {
              this.selectEndAuditflow();
              ElMessage({
                type: "success",
                message: "删除成功",

              });
              console.log(response.data[0]+"ashdja")
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    //查询加班方案
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
