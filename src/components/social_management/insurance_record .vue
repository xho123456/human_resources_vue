<template>
<!-- 参保记录 -->
  <div>
    <!-- 表格按钮部分 -->
    <div class="mt-20 ml-20 mr-20" style="margin-bottom: 5px;margin-top: 10px">
      <!-- 导出按钮 -->
      <el-button style="width: 100px" size="small" ><i class="iconfont">&#xe6a2;</i>导出</el-button>

      <!-- 搜索框 -->
      <el-button style=" float: right;background-color: #cfe6ff" size="mini" @click="record()">确定</el-button>
      <!-- 登录时间搜索 -->
      <div class="resume-operation">
        <el-date-picker
            size="small"
            v-model="pageInfo.createdTime"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-value="[new Date(2010, 9, 1), new Date(2010, 10, 1)]"
        >
        </el-date-picker>
      </div>


    </div>

    <!-- 表格内容部分 -->
    <div class="sub-Content__primary">
      <el-table :data="tableData" style="width: 100%;margin-top: 10px"
                :header-cell-style="{textAlign: 'center',background:'#F0F0F0',color:'#6C6C6C'}"
                :cell-style="{ textAlign: 'center' }"
                :default-sort="{ prop: 'date', order: 'descending' }"
                @selection-change="deletepl"
      >
        <el-table-column prop="insArchiveSalaryMonth" label="计薪月份" />
        <el-table-column prop="insArchiveInsuredName" label="参保方案" />
        <el-table-column prop="insArchiveInsuredMonth" label="社保缴纳月份" />
        <el-table-column prop="insArchiveSocialNumber" label="社保基数" />
        <el-table-column prop="insArchiveInsuredMonth" label="公积金缴纳月份" />
        <el-table-column prop="insArchiveFundNumber" label="公积金基数" />
        <el-table-column prop="cz" label="操作">
          <template #default="scope">
            <router-link :to="{path:this.paths,query:{path:this.$route.query.path,ids:scope.row.insArchiveId}}" >
              <el-button type="text" size="small">查看 </el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
    <div class="demo-pagination-block">
      <el-pagination
          v-model:current-page="pageInfo.currentPage"
          v-model:currentPage="pageInfo.currentPage"
          v-model:page-size="pageInfo.pagesize"
          :default-page-size="pageInfo.pagesize"
          :page-sizes="[3, 4, 5, 6]"
          :page-size="3"
          :pager-count="4"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageInfo.total"
          @size-change="record()"
          @current-change="record()"
          prev-text="上一页"
          next-text="下一页"
          background
      >
      </el-pagination>
    </div>
  </div>

</template>

<script>
import { ref, defineComponent } from "vue";

export default {
  data() {
    return {
      paths:'/social/social_payment/someone_insured_particulars/someone_insured_detailss',
      // 搜索框
      search:"",
      pageInfo: {
        currentPage: 1,
        pagesize: 3,
        total: 0,
        //社保归档时间
        createdTime:[],
      },
      tableData: [
      ],
    };
  },
  created() {
    this.record();
  },
  methods: {
    /**
     * 查询归档记录
     */
    record() {
      this.axios({
        method: 'post',
        url: "http://localhost:8007/provider/insuredArchive/record",
        data: {
          startTime:this.pageInfo.createdTime[0],
          endTime:this.pageInfo.createdTime[1],
          currentPage:this.pageInfo.currentPage,
          pagesize:this.pageInfo.pagesize,
          total:this.pageInfo.total,
          insArchiveStaffName:this.$route.query.ids
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        this.tableData = response.data.data.records
        this.pageInfo.total = response.data.data.total

      })
    }
  }
};
</script>

<style scoped>
/* 分页的样式 */
.demo-pagination-block {
  float: right;
  margin: 20px;
}

/**
	 * 下拉选择器样式
	 */
.resume-operation {
  text-align: right;
  padding-left: 8px;
  float: right;
  width: 352px;

}

</style>

