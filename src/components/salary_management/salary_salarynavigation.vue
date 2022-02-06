<!--薪酬步骤导航 -->
<template>
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body">
        <span></span>


        <router-view></router-view>
      </div>
    </div>
  </div>
  &nbsp;
</template>

<script>
export default {
  data(){
    return{
      //薪酬结构
      flat:'/salary/flat',
      //核算方案
      scheme:'/salary/scheme',
      //工资表
      paysheet:'/salary/paysheet',
    }
  }
}
</script>




<style scoped>
@import url("../../css/navigation.css");
@import url("../../css/Salary.css");
</style>