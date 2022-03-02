<!-- 考勤记录汇总 -->
<template>
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body ">
        <div class="my-cead">
          <div style="width:97%;padding-left: 20px;display: flex;align-items: center;justify-content: space-between;">
            <div style="display: flex;align-items: center;">
              <div class="my-span1" style="display: flex;">
                <i class="iconfont" style="font-size: 20px">&#xe7d9;</i>
              </div>
              <div class="my-span2">考勤记录汇总</div>
            </div>
          </div>
        </div>
        <div style="width: 100%;">
          <div class="day-div1">
             <ul style="margin-top: 20px">
               <li v-for="items in daytimes">
                 <div style="display: flex;align-items: center">
                   <div style="width: 80%;">
                     <div style="height: 45px;font-weight: bold;font-size: 20px">
                       {{items.years}}出勤统计
<!--                       <el-tag class="ml-2" type="danger" size="small">已归档</el-tag>-->
                     </div>
                     <div style="padding-bottom: 5px;">
                       <el-tag class="ml-2" type="danger" size="small">已归档</el-tag>
<!--                       <el-row :gutter="20">-->
<!--                         <el-col :span="3">-->
<!--                           <span>全勤员工：0</span>-->
<!--                         </el-col>-->
<!--                         <el-col :span="3">-->
<!--                           <span>迟到率：0%</span>-->
<!--                         </el-col>-->
<!--                         <el-col :span="3">-->
<!--                           <span>早退率：0%</span>-->
<!--                         </el-col>-->
<!--                         <el-col :span="3">-->
<!--                           <span>缺勤率：0%</span>-->
<!--                         </el-col>-->
<!--                         <el-col :span="4">-->
<!--                           <span>总请假天数：0</span>-->
<!--                         </el-col>-->
<!--                         <el-col :span="3">-->
<!--                           <span>总加班小时：0</span>-->
<!--                         </el-col>-->
<!--                       </el-row>-->
                     </div>
                   </div>
                   <div style="width: 20%;text-align: center">
                     <span>
                       <router-link :to="{path:this.guidang,query:{path:this.$route.query.path,daymoth:items.years}}">
                          <el-button type="primary" style="font-size: 15px" size="small">查看</el-button>
                       </router-link>
                     </span>
                   </div>
                 </div>

               </li>
             </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ElMessage} from "element-plus";

export default {
  data() {
    return {
      guidang:'/yyx/statistics/report',
      daytimes:''
    }
  },
  created() {
    this.queryDayTimes();
  },
  methods: {
    queryDayTimes(){
      this.axios({
        url: "http://localhost:8007/provider/Check/querydaytimes",
        method: "post",
        data: {
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.error(response.data.data)
         this.daytimes = response.data.data;
      }).catch(function (error) {
        console.log('获取列表失败')
        console.log(error);
      })
    },
  },


}
</script>

<style type="text/css" scoped>
ul li{
  list-style: none;
  border-bottom: 1px solid #a7aeb085;
  margin-bottom: 25px;
}
.day-div1 {
  padding: 10px 20px;
  min-height: 570px;
}
a {
  color: #008df7;
}

@font-face {
  font-family: 'iconfont';  /* Project id 3164770 */
  src: url('//at.alicdn.com/t/font_3164770_te5p4157fzj.woff2?t=1644419209354') format('woff2'),
  url('//at.alicdn.com/t/font_3164770_te5p4157fzj.woff?t=1644419209354') format('woff'),
  url('//at.alicdn.com/t/font_3164770_te5p4157fzj.ttf?t=1644419209354') format('truetype');
}

.iconfont {
  font-family: "iconfont" !important;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
  margin: auto;
  color: white;
}

/deep/ .el-table td.el-table__cell div {
  box-sizing: border-box;
  text-align: center;
}

.demo-pagination-block {
  margin-left: 15px;
  margin-top: 10px;
  margin-bottom: 30px;
}


.my-cead {
  height: 50px;
  width: 100%;
  display: flex;
  background-color: #f9f9f9;
  border-bottom: 1px solid #eaeaea;
}

.my-span1 {
  width: 35px;
  height: 35px;
  border-radius: 20px;
  background-color: rgb(87, 153, 229) !important;
}

.my-span2 {
  margin-left: 10px;
  font-size: 18px;
  color: black;
}


.saas-main-content {
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

/deep/ .el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell {
  background-color: #e9f7ff;
}

</style>