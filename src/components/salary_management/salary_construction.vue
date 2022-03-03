<!--薪酬结构 -->
<template>
  <div class="demo-collapse">
    <div style="width: 95%;margin: auto">

    <br />
    <div class="">

      <span class="font_size_p">1、设置各薪酬类别下面的薪资项目</span>

      <br>
      <br>
      <div class="">
        <el-collapse v-model="activeNames" @change="handleChange">

          <el-collapse-item name="2">
            <template #title >
              <h3 style="margin-left: 20px;">固定工资</h3>
              <span class="span_1_zhe" >【加项】针对员工定薪、调薪等，可设置固定工资方案 <router-link :to="{path:this.regular,query:{path: this.$route.query.path}}">去设置</router-link> </span>
            </template>
          </el-collapse-item>
          <br />

          <el-collapse-item  name="3">
            <template #title >
              <h3 style="margin-left: 20px;">加班工资</h3>
              <span class="span_1_zhe" >【加项】针对员工定薪、调薪等，可设置固定工资方案 <router-link :to="{path:this.callbackpay,query:{path: this.$route.query.path}}">去设置</router-link> </span>
            </template>

          </el-collapse-item>
          <br />


          <el-collapse-item title="Efficiency" name="4">
            <template #title >
              <h3 style="margin-left: 20px;">考勤扣款</h3>
              <span class="span_1_zhe" >【加项】针对员工定薪、调薪等，可设置固定工资方案 <router-link :to="{path:this.attendanceplan,query:{path: this.$route.query.path}}">去设置</router-link> </span>
            </template>
          </el-collapse-item>

          <br/>

          <el-collapse-item title="Efficiency" name="5">
            <template #title >
              <h3 style="margin-left: 20px;">出差工资</h3>
              <span class="span_1_zhe" >【加项】针对员工定薪、调薪等，可设置固定工资方案 <router-link :to="{path:this.evectionplan,query:{path: this.$route.query.path}}">去设置</router-link> </span>
            </template>

          </el-collapse-item>

        </el-collapse>
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

export default defineComponent({
  data() {
    return {
      //固定工资
      regular:'/salary/regular',
      //加班工资
      callbackpay:'/salary/callbackpay',
      //考勤扣款
      attendanceplan:'/salary/attendanceplan',
      //出差方案
      evectionplan:'/salary/evectionplan',

      checkList:'',
      activeNames:'',
      ruleForm:{
        dept:'',
      }

    }
  },
  setup() {
    const checkList = ref(['selected and disabled', 'Option A'])
    const activeNames = ref(['1'])
    const handleChange = (val) => {
      console.log(val)
    }

    return {
      checkList,
      activeNames,
      handleChange,
    }

  },

})
</script>

<style scoped>
@import url("../../css/navigation.css");
@import url("../../css/Salary.css");
/deep/.body_1 {
  background: darkcyan;
  width:100%;
  height: 200px;
  border-radius: 4px;
  /* font-size: 14px; */
  /*position: relative;*/
  /*overflow: hidden;*/
  /*transition: all 0.3s;*/
  /*min-height: 100%;*/
  /*min-height: 720px;*/
  /*padding: 16px;*/
  /*box-sizing: border-box;*/
  /*border: 1px solid #e9e9e9;*/

  /*padding: 0 24px;*/
  /*color: rgba(0, 0, 0, 0.65);*/
}

.demo-collapse{
  width: 100%;
  /*background: #0c9076;*/
  padding-bottom: 30px;
}


/deep/.font_size_p {
  font-size: 14px;
}

/deep/.span_1_zhe {
  color: rgb(153, 153, 153);
  margin-left: 60px;
}

/deep/.ant-row {
  line-height: 22px;
  padding: 12px 0 12px 40px;
}

/deep/.el-collapse-item__header {
  display: flex;
  align-items: center;
  height: var(--el-collapse-header-height);
  line-height: var(--el-collapse-header-height);
  /*background-color: var(--el-collapse-header-bg-color);*/
  /*color: var(--el-collapse-header-text-color);*/
  cursor: pointer;
  /*border-bottom: 1px solid var(--el-collapse-border-color);*/
  font-size: var(--el-collapse-header-font-size);
  font-weight: 500;
  transition: border-bottom-color var(--el-transition-duration);
  outline: 0;
  background-color: #e8edf2;
  border:#D1DBE5 solid 1px ;


}
/deep/.el-collapse-item__content{
  border:#D1DBE5 solid 1px ;
  background-color: #e8edf2;

}

</style>
