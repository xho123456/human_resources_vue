<!--  放弃入职员工页面  -->
<template>
  <div class="saas-main-content">
    <!--搜索输入框-->
    <el-row style="width:200px;float:right;">
      <el-input v-model.number="input3" placeholder="搜索" @change="selectGiveup(this.input3)">
        <template #suffix>
          <el-icon class="el-input__icon"><i-search/></el-icon>
        </template>
      </el-input>
    </el-row>
	<br/>
    <el-table :data="tableData" stripe style="width: 100%">
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
      <el-table-column prop="waivereason" label="放弃原因" width="200" />
      <el-table-column prop="employmentstate" label="状态" width="200" />

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
          @size-change="selectGiveup(this.input3)"
          @current-change="selectGiveup(this.input3)"
      >
      </el-pagination>
    </div>



  </div>
</template>

<script lang="ts">
import {error} from "echarts/types/src/util/log";

export default {
  data() {
    return {
      tableData: [
        {
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
          waivereason:'',
          employmentstate:'',
        },

      ],
      input3:null,
      pageInfo: {
        // 分页参数
        currentPage: 1, //当前页
        pagesize: 3, // 页大小
        total: 0, // 总页数

        resumename: '',
      },

    }
  }, created(){
    this.selectGiveup(null);
  },
  methods:{
    selectGiveup(like){
      if(Object.prototype.toString.call(like)===Object.prototype.toString.call(null)){
        var _this = this;
        _this.axios.get(
            "http://localhost:8007/provider/staff/giveupinduction", {
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
          url:"http://localhost:8007/provider/staff/giveupinduction/likename",
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



}
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
