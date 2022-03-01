<template>
<!-- 月度报表 -->
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body">

        <!-- 搜索框 -->
        <el-button style=" float: right;background-color: #cfe6ff" size="mini" @click="records()">确定</el-button>
        <!-- 登录时间搜索 -->
        <div style="float: right;margin-right: 10px;margin-bottom: 20px">
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
        <!-- 单个 -->
        <div class="main_div" >
          <el-table
              :data="tableData" style="width: 100%;margin-top: 10px "
              :header-cell-style="{textAlign: 'center',background:'#F0F0F0',color:'#6C6C6C'}"
              :default-sort="{ prop: 'date', order: 'descending' }"
              @selection-change="deletepl"
              :cell-style="{ textAlign: 'center', padding:'25px'}">
            <el-table-column
                align="center"
                label="归档时间"
                prop="createdTime"
                width="210px">
            </el-table-column>
            <el-table-column
                align="center"
                label="参保人数"
                prop="quantity "
                width="280px">
            </el-table-column>
            <el-table-column
                align="center"
                label="个人缴费"
                prop="person"
                width="280px">
            </el-table-column>

            <el-table-column
                align="center"
                label="企业缴费"
                prop="enterprise"
                width="280px">
            </el-table-column>

            <el-table-column
                align="center"
                label="操作"
                width="210px">

              <router-link :to="{path:this.paths,query:{path:this.$route.query.path}}">
              <el-button type="text">归档详情</el-button>
              </router-link>
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
              @size-change="records()"
              @current-change="records()"
              prev-text="上一页"
              next-text="下一页"
              background
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
  &nbsp;
</template>

<script lang="ts">
export default {
  data() {
    return {
      paths:'/social/social_payment/payment_details',
      pageInfo: {
        currentPage: 1,
        pagesize: 3,
        total: 0,
        //社保归档时间
        createdTime:[],
      },
      tableData: [ {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],

    };
  },
  methods:{
    records() {
      this.axios({
        method: 'post',
        url: "http://localhost:8007/provider/insuredArchive/record",
        data: {
          startTime:this.pageInfo.createdTime[0],
          endTime:this.pageInfo.createdTime[1],
          currentPage:this.pageInfo.currentPage,
          pagesize:this.pageInfo.pagesize,
          total:this.pageInfo.total,

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

@font-face {
  font-family: 'iconfont';  /* Project id 2994452 */
  src: url('//at.alicdn.com/t/font_2994452_cj8my5ezezl.woff2?t=1640705098291') format('woff2'),
  url('//at.alicdn.com/t/font_2994452_cj8my5ezezl.woff?t=1640705098291') format('woff'),
  url('//at.alicdn.com/t/font_2994452_cj8my5ezezl.ttf?t=1640705098291') format('truetype');
}

/* 分割线 */
.cut_off {
  width: 100%;
  border-bottom: 1px solid #ededed;
}

/* 右div */
.interior_right_div {
  display: inline-block;
  float: right;
  margin-top: 10px;
}

/* 社保公积金 */
.social_accumulation {
  font-weight: bold;
  font-size: 16px;
}

/* 左div */
.interior_left_div {
  display: inline-block;
}

/* 大div */
.main_div {
  margin-bottom: 10px;

}

/* 分页的样式 */
.demo-pagination-block {
  float: right;
  margin: 20px;
}

/* 外层div 内边距 */
.j-card-body {
  padding: 20px 25px 20px 25px;
}

/* 外层阴影 */
.saas-main-content {
  padding-top: 12px;
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
  margin-top: 8px;
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
.j-card {
  background: #fff;
  border-radius: 4px;
  font-size: 14px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
  margin-top: 8px;
  min-height: 100%;
}

.j-card-body{
  padding:2%;
}

</style>
