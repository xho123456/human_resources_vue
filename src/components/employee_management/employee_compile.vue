<!--员工编辑-->

<template>
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body">
        <router-link :to="{path:this.book,query:{path: this.$route.query.path}}">
          <button type="button" class="ant-btn ant-btn-primary ant-btn-two-chinese-chars" style="margin-left: 1100px;margin-top: 20px;width: 80px;">
            <span>返回</span>
          </button>
        </router-link>
        <div style="text-align: center; margin-top: 60px">
          <!--          <el-upload-->
          <!--            action="https://jsonplaceholder.typicode.com/posts/"-->
          <!--            list-type="picture-card"-->
          <!--            :on-preview="handlePictureCardPreview"-->
          <!--            :on-remove="handleRemove"-->
          <!--            shape="circle"-->
          <!--          >-->
          <!--            <el-icon><plus /></el-icon>-->
          <!--          </el-upload>-->
          <!--          <el-dialog v-model="dialogVisible">-->
          <!--            <img width="100%" :src="dialogImageUrl" alt="" />-->
          <!--          </el-dialog>-->
          <!--          <h1>12345</h1>-->

          <div class="j-tabs2">
            <el-menu
                :default-active="activeIndex"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect">

              <router-link :to="{path:this.basicfile,query:{path: this.$route.query.path}}" style="text-decoration: none;">
                <el-menu-item index="1">基本档案</el-menu-item>
              </router-link>

              <router-link :to="{path:this.information,query:{path: this.$route.query.path}}" style="text-decoration: none;">
                <el-menu-item index="4">个人信息</el-menu-item>
              </router-link>
            </el-menu>

          </div>




        </div>
        <div>
          <section
              class="ant-layout ant-layout-has-sider"
              style="
            min-width: 988px;
            background-color: rgba(232, 239, 246, 0);
          "
              id="scrollLayout"
          >
            <main style="margin: 10px" class="ant-layout-content">
              <router-view></router-view>
            </main>
          </section>
        </div>
      </div>
    </div>
  </div>
  &nbsp;
</template>

<script>

import { Plus } from "@element-plus/icons";
export default {
  components: {
    Plus,
  },
  data() {
    return {
      book:'/employee/message/employee_roster/book',
      basicfile:'/employee/message/employee_roster/basicfile',
      information:'/employee/message/employee_roster/information',
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },
  methods:{
    goblack(){
      this.$router.go('-1');
    }
  }
};
</script>


<style scoped>
.mainContent .sub-Content__primary {
  padding: 12px 24px;
  background: #fff;
  border-radius: 4px;
}
ul{
  border-button:none;
}

/deep/.el-table .el-table__cell{
  text-align: center;
}

</style>
