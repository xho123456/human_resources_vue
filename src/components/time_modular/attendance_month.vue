<!--考勤月报表-->
<template>
  <!-- 月份报表页面 -->
  <div class="head">
    <div class="head-surface">
      <span>2021 6月人事报表</span>
    </div>
    <div class="head-to">
      <el-tabs v-model="activeName">
        <el-tab-pane label="考勤统计" name="first"></el-tab-pane>
      </el-tabs>
    </div>
    <!--    搜索框-->
    <el-row :gutter="20">
      <el-col :span="7">
        <el-input
            v-model="input3"
            placeholder="Please input"
            class="input-with-select"
        >
          <template #append>
            <el-button>搜索</el-button>
          </template>
        </el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" plain @click="">
          <el-icon style="font-size: 13px">
            <i-upload/>
          </el-icon>
          导入
        </el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" plain  @click="derive()">
          <el-icon style="font-size: 13px">
            <i-folder-opened/>
          </el-icon>
          导出
        </el-button>
      </el-col>
    </el-row>


  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first",
      pageInfo: {
        currenPage: 1,
        /* 当前的页 */
        pagesize: 3,
        total: 0,
      },
    };
  },
};
</script>

<style scoped>



.head-surface {
  font-size: 20px;
  text-align: center;
  margin-top: 20px;
}

.head-to {
  margin-left: 20px;
}

.head-examine {
  margin-left: 30px;
}


</style>