
<!--工资表 -->
<template>
  <div>
    <el-tabs type="card" @tab-click="handleClick">

      <!--月份选择框·-->
      <div style="display: inline-block;margin-left: 840px;">
        <div class="demo-date-picker">
          <div class="container">
            <div class="block">
              <span class="demonstration"></span>

              <el-date-picker
                  v-model="months"
                  type="month"
                  placeholder="请选择月份"
              >
              </el-date-picker>
            </div>
          </div>
        </div>
      </div>

      <div style="margin-top: -40px">
        <!--搜索输入框-->
        <el-row style="width:200px;margin-left: 1090px">
          <el-input v-model="seek" placeholder="搜索" :prefix-icon="Search">
            <template #suffix>
              <el-icon class="el-input__icon"><i-search/></el-icon>
            </template>
          </el-input>
        </el-row>
      </div><br/>

      <el-tab-pane label="未归档">

        <!-- 表格内容部分 -->
        <div class="sub-Content__primary">
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="wagenotfiledId" label="编号" width="160" />
            <el-table-column prop="wagenotfiledAskperson" label="计薪人数" width="160" />
            <el-table-column prop="wagenotfiledSalary" label="应发工资" width="160" />
            <el-table-column prop="wagenotfiledPayrollsalary" label="实发工资" width="160" />
            <el-table-column prop="wagenotfiledFirmpayment" label="公司缴纳" width="160" />
            <el-table-column prop="wagenotfiledStaffcost" label="员工成本" width="160" />
            <el-table-column label="状态"   >
              <template #default="scope">
                <span v-if="scope.row.wagenotfiledState===1">已归档</span>
                <span v-if="scope.row.wagenotfiledState===0">未归档</span>
              </template>
            </el-table-column>
            <el-table-column  label="操作" width="170">
              <template #default>
                <router-link :to="{path:this.wagesheet,query:{path: this.$route.query.path}}"><el-button type="text" size="small" @click="handleClick">查看工资表&nbsp;</el-button></router-link>
                <!--                      <el-button type="text" size="small" @click="handleClick">归档</el-button>-->
                <el-popconfirm title="归档之后，数据一律不允许修改">
                  <template #reference>
                    <el-button type="text" size="small">归档 </el-button>
                  </template>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </div>


      </el-tab-pane>
      <el-tab-pane label="已归档">

        <!-- 表格内容部分 -->
        <div class="sub-Content__primary">

          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="name" label="部门" width="160" />
            <el-table-column prop="date" label="计薪人数" width="160" />
            <el-table-column prop="yfSalary" label="应发工资" width="160" />
            <el-table-column prop="sfSalary" label="实发工资" width="160" />
            <el-table-column prop="name" label="公司缴纳" width="160" />
            <el-table-column prop="name" label="员工成本" width="160" />
            <el-table-column prop="date" label="状态" width="160" />
            <el-table-column  label="操作" width="170">
              <template #default>
                <router-link :to="{path:this.wagesheet,query:{path: this.$route.query.path}}"><el-button type="text" size="small" @click="handleClick">查看工资表&nbsp;</el-button></router-link>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>


    <!--          <template #default>
                <router-link :to="{path:this.wagesheet,query:{path: this.$route.query.path}}"><el-button type="text" size="small" @click="handleClick">查看工资表&nbsp;</el-button></router-link>
              </template>-->
  </div>

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

</template>
<script lang="ts">
export default {

  data() {
    return {
      //工资表
      wagesheet:'/salary/wagesheet',
      tableData: [
        {
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
          yfSalary:12343,
          sfSalary:1543,
        },
        {
          date: '2016-05-02',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
          yfSalary:12343,
          sfSalary:1543,
        },
      ],
      months:'',
      seek:'',
      pageInfo: {
        currentPage: 1,
        /* 当前的页 */
        pageSize: 3,
        total: 0,
        deptName:'',
        staffName:'',
      },


    }

  },  methods: {
    selectEndAuditflow() {

      this.axios({
        method:'post',
        url:"http://localhost:8007/provider/chagzweiguidan/a",
        data:this.pageInfo,
        responseType:'json',
        responseEncoding:'utf-8'
      })  .then((response) => {
           console.log("完成1")
        console.log(response+"卧槽");
        this.tableData = response.data.data.records;
        this.pageInfo.total = response.data.data.total;
      })
          .catch(function (error) {
            console.log("失败")
            console.log(error);

          });


    },
  },created() {
    this.selectEndAuditflow();
  }
}

</script>
<style scoped>
@import url("../../css/Salary.css");
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}
/deep/.cell {
  padding-left: 10px;
  text-align: center;
  color: black;
}
/* 分页的样式 */
.demo-pagination-block {
  float: right;
  margin: 20px;
}
/deep/.el-tabs__item{
  padding-left: 18px;
}
/deep/.el-tabs__header .el-tabs__item.is-active{
  border-bottom-color: #2196f3;
}
</style>