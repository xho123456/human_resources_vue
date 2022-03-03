<!--核算方案 -->
<template>
       <!-- 四个方案导航 -->
       <div style="width: 100%;">

      		<div style="width: 90%;height: 400px; margin-top: 90px;margin-left: 190px;" >

				<div  style="margin: auto;height: 200px;">

          <!--固定工资方案·-->
          <router-link :to="{path:this.regular,query:{path: this.$route.query.path}}">
				<div class="j-card j-card-bordered mainContent" style=" width: 155px;height: 195px; border: 1px solid #e8edf2; border-radius: 10px; text-align: center; display: block;float: left;margin-right: 78px;">
      			<span style="margin-top: 50px;display: block; font-size: 18px;color: black">固定工资方案

				</span>
				<el-skeleton :rows="5" animated />
				</div>
			 </router-link>

          <!--加班工资方案·-->
          <router-link :to="{path:this.callbackpay,query:{path: this.$route.query.path}}">
				<div class="j-card j-card-bordered mainContent" style=" width: 155px;height: 195px; border: 1px solid #e8edf2; border-radius: 10px; text-align: center;display: block; float: left;margin-right: 78px;">
					<span style="margin-top: 50px;display: block; font-size: 18px;">加班工资方案</span>
					<el-skeleton :rows="5" animated />
				</div>
         </router-link>

          <!--考勤扣款方案·-->
          <router-link :to="{path:this.attendanceplan,query:{path: this.$route.query.path}}">
				<div  class="j-card j-card-bordered mainContent" style=" width: 155px;height: 195px; border: 1px solid #e8edf2; border-radius: 10px; text-align: center;display: block; float: left;margin-right: 78px;">
					<span style="margin-top: 50px;display: block; font-size: 18px;">考勤扣款方案</span>
					<el-skeleton :rows="5" animated />
				</div>
          </router-link>

          <!--出差工资方案·-->
          <router-link :to="{path:this.evectionplan,query:{path: this.$route.query.path}}">
            <div  class="j-card j-card-bordered mainContent" style=" width: 155px;height: 195px; border: 1px solid #e8edf2; border-radius: 10px; text-align: center;display: block; float: left;">
              <span style="margin-top: 50px;display: block; font-size: 18px;">出差工资方案</span>
              <el-skeleton :rows="5"  animated/>
            </div>
          </router-link>

				</div>
          </div>
      		</div>
</template>

<script>
export default {
  data(){
    return{
      //固定工资
      regular:'/salary/regular',
      //加班工资
      callbackpay:'/salary/callbackpay',
      //考勤扣款
      attendanceplan:'/salary/attendanceplan',
      //出差工资
      evectionplan:'/salary/evectionplan',
      ruleForm:{
        dept:'',
      }
    }
  }
}
</script>

<style scoped>
@import url("../../css/navigation.css");
@import url("../../css/Salary.css");

</style>

