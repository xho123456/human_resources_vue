<template>

<!-- 参保明细 -->
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane>
            <template #label>
              <router-link :to="{path:this.path1,query:{path:this.$route.query.path,id:this.id}}" >参保明细</router-link>
            </template>
            <router-view ></router-view>
          </el-tab-pane>

        </el-tabs>
      </div>
    </div>
  </div>
  &nbsp;{{this.$route.query.names}}
</template>

<script>
import { ref, defineComponent } from "vue";

export default {
  data() {
    return {
      id:this.$route.query.id,

      path1:"/social/social_payment/someone_insured_particulars/someone_insured_details",

      pageInfo: {
        // 分页参数
        currentPage: 1, //当前页
        pagesize: 3, // 页大小
        total: 0, // 总页数
      },
      tableData: [
        {
          date: "2016-05-03",
          name: "Tom",
          state: "California",
          city: "Los Angeles",
          address: "No. 189, Grove St, Los Angeles",
          zip: "CA 90036",
          tag: "Home",
        },
      ],
    };
  },
};
</script>

<style scoped>
.j-card-body {
  padding: 1% 2%;
}

/* 分页的样式 */
.demo-pagination-block {
  float: right;
  margin: 20px;
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

a{
  text-decoration:none;
  color:#4779b9;
}

</style>

