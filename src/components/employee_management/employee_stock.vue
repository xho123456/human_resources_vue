<!--待入职员工页面-->
<template>
  <div class="saas-main-content">

    <!--搜索输入框-->
    <el-row style="width:200px;float:right;">
      <el-input v-model.number="input" placeholder="搜索" @change="selectInduction(this.input)">
        <template #suffix>
          <el-icon class="el-input__icon"><i-search/></el-icon>
        </template>
      </el-input>
    </el-row>

    <br/>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column fixed prop="resumeid" label="简历编号" width="180" />
      <el-table-column fixed prop="employmentid" label="录用编号" width="180" />
      <el-table-column fixed prop="resumename" label="姓名" width="180" />
      <el-table-column prop="resumesex" label="姓别" width="180" />
      <el-table-column prop="deptName" label="部门" width="180" />
      <el-table-column prop="postname" label="职位" width="180" />
      <el-table-column prop="resumephone" label="手机号" width="180" />
      <el-table-column prop="resumemailbox" label="邮箱" width="180" />
      <el-table-column prop="resumepoliticaloutlook" label="政治面貌" width="180" />
      <el-table-column prop="resumeeducation" label="学历" width="180" />
      <el-table-column prop="resumebirthday" label="出生日期" width="180" />
      <el-table-column prop="resumeresidence" label="户口所在地" width="180" />
      <el-table-column prop="resumezt" label="状态" width="200" >
        <template #default="scope">
          <span v-if="scope.row.resumezt==6">待入职</span>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="180">
        <template #default="scope">
          <el-button type="text" size="small" @click="addInduction(scope.row)">入职 </el-button>

          <el-button @click="giveupInduction(scope.row) " type="text" size="small">放弃 </el-button>

        </template>
      </el-table-column>
    </el-table>

    <!-- 分页插件 -->
    <div class="demo-pagination-block">
      <el-pagination
          v-model:currentPage="pageInfo.currentPage"
          :page-sizes="[3, 5, 10, 50]"
          v-model:page-size="pageInfo.pagesize"
          :default-page-size="pageInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageInfo.total"
          :pager-count="5"
          background
          @size-change="selectInduction(this.input)"
          @current-change="selectInduction(this.input)"
      >
      </el-pagination>
    </div>

    <!--  弹框  -->
    <div >
      <el-dialog
          v-model="become"
          width="30%"
          :close-on-click-modal="false" >
        放弃原因：<el-input v-model="waivereason" type="textarea" style="width:240px;"></el-input>
        <div style="margin-top:30px;margin-left: 120px;">
          <el-button @click="become=false">取消</el-button>
          <el-button type="primary" @click="addgivewhy(this.waivereason)">确定</el-button></div>

      </el-dialog>
    </div>



  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import {ElMessage,ElMessageBox} from "element-plus";

export default defineComponent({
  data(){
    return{
      input:null,
      waivereason:"",
      pageInfo: {
        // 分页参数
        currentPage: 1, //当前页
        pagesize: 3, // 页大小
        total: 0, // 总页数

        resumeid:'',
        resumename: '',
        waivereason:'',
        employmentid:'',
      },
      tableData: [
        {
          resumeid:'',
          resumename: '',
          resumesex:'',
          deptName: '',
          postname: '',
          resumemailbox: '',
          resumephone: '',
          resumeresidence: '',
          resumebirthday:'',
          resumeeducation:'',
          resumepoliticaloutlook:'',
          resumezt:'',
        },

      ],

      resueme:{
        resumeid:'',
        resumezt:'',

      },

      form:[
        {
          desc:""
        }
      ]

    }
  },setup() {
    const become = ref(false)
    return{
      become,
    }
  },
  created() {
    this.selectInduction(null);
  },
  methods:{
    addgivewhy(why){
      this.pageInfo.waivereason=why;
      this.axios({
        method:'post',
        url:"http://localhost:8007/provider/staff/givewhy",
        data:this.pageInfo,
        responseType:'json',
        responseEncoding:'utf-8',
      }).then(response=>{
        console.log(response)
        if (response.data.data === "放弃成功") {
          ElMessage({
            type: "success",
            message: "放弃成功",
          });
        } else if(response.data.data === "放弃失败"){
          ElMessage.error("放弃失败");
        }
      });
      this.become=false;
      this.waivereason="";
      this.selectInduction(null);
    },

    addInduction(row){
      this.axios({
        method:'put',
        url:"http://localhost:8007/provider/staff/addStaff",
        data:this.tableData,
        responseType:'json',
        responseEncoding:'utf-8',
      }).then(response=>{
        console.log(response)
        if (response.data.data === "入职成功") {
          ElMessage({
            type: "success",
            message: "入职成功",
          });
        } else if(response.data.data === "入职失败"){
          ElMessage.error("入职失败");
        }
      })

    },

    giveupInduction(row){
      this.pageInfo.resumeid=row.resumeid;

      this.axios({
        method:'post',
        url:"http://localhost:8007/provider/staff/giveinduction",
        data:this.pageInfo,
        responseType:'json',
        responseEncoding:'utf-8',
      }).then(response=>{
        console.log(response)
      })
      this.pageInfo.employmentid=row.employmentid;
      this.become=true;

    },

    selectInduction(like){
      if(Object.prototype.toString.call(like)===Object.prototype.toString.call(null)){
        var _this = this;
        _this.axios.get(
            "http://localhost:8007/provider/staff/induction", {
              params:this.pageInfo,
            }).then((response)=>{
          console.log(response);
          _this.tableData = response.data.data.records
          _this.pageInfo.total=response.data.data.total
        }).catch(function (error){
          console.log('获取表单失败')
          console.log(error)
        })
      }else {
        this.pageInfo.resumename=like;
        this.axios({
          method:'post',
          url:"http://localhost:8007/provider/staff/induction/likename",
          data:this.pageInfo,
          responseType:'json',
          responseEncoding:'utf-8',
        }).then((response)=>{
          console.log(response);
          this.tableData  = response.data.data.records
          this.pageInfo.total=response.data.data.total
        }).catch(function (error){
          console.log('获取表单失败')
          console.log(error)
        })
      }
    },



  }
})
</script>

<style scoped>

/deep/.mainContent .sub-Content__primary {
  padding: 12px 24px;
  background: #fff;
  border-radius: 4px;
}
/deep/.cell {
  padding-left: 10px;
  text-align: center;
  color: black;
}
/* 分页的样式 */
/deep/.demo-pagination-block {
  float: right;
  margin: 20px;
}

/deep/.el-table .el-table__cell{
  text-align: center;
}
</style>
