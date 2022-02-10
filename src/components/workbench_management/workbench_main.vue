<template>
  <div>
    <!-- 用户信息栏 -->
    <div class="divhead div_t">
      <div style="padding: 20px; display: flex;">
        <div style="width: 85px; height: 85px;">
          <img src="../assets/syx.jpg" width="85" height="85" alt="">
        </div>
        <div style=" margin-left: 10px;">
          <div style="padding: 10px;">
            <p style="margin-bottom: 5px; font-size:24px;font-weight: bold;">您好，蛇颖欣，祝您工作顺利 !</p>
            <span style="font-size: 14px; color: #889395; font-weight: bold;">
							余颖欣
							|
							王鑫科技
							-
							市场部</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 左侧区域 -->
    <div class="divleft">

      <div class="ant_left1 div_t">
        <div style="padding: 10px 19px;">
          <div class="ant_disass1">
            <div class="ant_disass2">
								<span class="ant_disass3">
									工作日历
								</span>
            </div>
          </div>
          <!-- 日历组件区域 -->
          <div>
            <div style="padding: 10px">
              <el-calendar v-model="value"/>
            </div>
          </div>
        </div>
      </div>

      <div class="ant_left3 div_t">
        <div style="padding: 10px 19px;">
          <div class="ant_disass1">
            <div class="ant_disass2">
								<span class="ant_disass3">
									待办事宜
								</span>
            </div>
          </div>
          <!-- 内容区域 -->
          <div style="padding: 10px;display: flex">
            <!--筛选-->
            <div class="db-div db-ant1">
              <div style="padding: 10px;text-align: center">
                <div style="width: 100%;height: 130px">
                  <div style="padding: 10px">
                    <div class="db-div2 db-color1">
                      <span class="db-span">筛选</span>
                    </div>
                  </div>
                </div>
                <div class="db-div1">
                  <div class="db-dspan">
                    <span>在招职位：</span>
                    <div>
                      <span style="font-weight:bold; color:#ff4949;">{{allnumber.number1}}</span>
                      <i class="iconfonts">&#xe775;</i>
                    </div>
                  </div>
                </div>
                <div class="db-div1">
                  <div class="db-dspan">
                    <span>新应聘简历：</span>
                    <div>
                      <span style="font-weight:bold; color:#ff4949;">{{allnumber.number2}}</span>
                      <i class="iconfonts">&#xe775;</i>
                    </div>
                  </div>
                </div>
                <div class="db-div1">
                  <div class="db-dspan">
                    <span>候选人简历：</span>
                    <div>
                      <span style="font-weight:bold; color:#ff4949;">{{allnumber.number3}}</span>
                      <i class="iconfonts">&#xe775;</i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--面试-->
            <div class="db-div db-ant2">
              <div style="padding: 10px;text-align: center">
                <div style="width: 100%;height: 130px">
                  <div style="padding: 10px">
                    <div class="db-div2 db-color2">
                      <span class="db-span">面试</span>
                    </div>
                  </div>
                </div>
                <div class="db-div1">
                  <div class="db-dspan">
                    <span>待面试：</span>
                    <div>
                      <span style="font-weight:bold; color:#ff4949;">{{allnumber.number4}}</span>
                      <i class="iconfonts">&#xe775;</i>
                    </div>
                  </div>
                </div>
                <div class="db-div1">
                  <div class="db-dspan">
                    <span>已面试待处理：</span>
                    <div>
                      <span style="font-weight:bold; color:#ff4949;">{{allnumber.number5}}</span>
                      <i class="iconfonts">&#xe775;</i>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <!--录用-->
            <div class="db-div db-ant3">
              <div style="padding: 10px;text-align: center">
                <div style="width: 100%;height: 130px">
                  <div style="padding: 10px">
                    <div class="db-div2 db-color3">
                      <span class="db-span">录用</span>
                    </div>
                  </div>
                </div>
                <div class="db-div1">
                  <div class="db-dspan">
                    <span>待发送offer：</span>
                    <div>
                      <span style="font-weight:bold; color:#ff4949;">{{allnumber.number5}}</span>
                      <i class="iconfonts">&#xe775;</i>
                    </div>
                  </div>
                </div>
                <div class="db-div1">
                  <div class="db-dspan">
                    <span>待接受offer：</span>
                    <div>
                      <span style="font-weight:bold; color:#ff4949;">{{allnumber.number7}}</span>
                      <i class="iconfonts">&#xe775;</i>
                    </div>
                  </div>
                </div>
                <div class="db-div1">
                  <div class="db-dspan">
                    <span>待入职：</span>
                    <div>
                      <span style="font-weight:bold; color:#ff4949;">{{allnumber.number8}}</span>
                      <i class="iconfonts">&#xe775;</i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div class="ant_left2 div_t">
        <div style="padding: 10px 10px;">
          <div class="ant_disass1" style="padding-left: 9px">
            <div class="ant_disass2">
								<span class="ant_disass3">
									快捷功能
								</span>
            </div>
          </div>
          <!-- 快捷功能区域 -->
          <div style="padding: 10px;display: flex">

            <div class="div_li">
              <p><i class="iconfont">&#xe62b;</i></p>
              <span>我的考勤</span>
            </div>
            <div class="div_li">
              <p><i class="iconfont">&#xe68c;</i></p>
              <span>薪酬统计</span>
            </div>
            <div class="div_li">
              <p><i class="iconfont">&#xf8db;</i></p>
              <span>加班申请</span>
            </div>
            <div class="div_li">
              <p><i class="iconfont">&#xe656;</i></p>
              <span>请假申请</span>
            </div>
            <div class="div_li"><p><i class="iconfont">&#xea9d;</i></p>
              <span>公告管理</span>
            </div>
            <div class="div_li">
              <p><i class="iconfont">&#xe60a;</i></p>
              <span>员工信息</span>
            </div>

          </div>
        </div>
      </div>
    </div>

    <!-- 右侧区域 -->
    <div class="divright">

      <div class="ant_right1 div_t">
        <div style="padding: 10px 10px;">
          <div class="ant_disass1" style="padding-left: 9px">
            <div class="ant_disass2">
								<span class="ant_disass3">
									公司公告
								</span>
            </div>
          </div>
          <!-- 公司公告区域 -->
          <div style="padding: 10px;">
            <div style="width: 95%;height: 760px;box-shadow: 0 0 5px #0c0b0b47;margin-top: 10px">
              <el-table :data="tableData" style="width: 100%;margin-top: 15px;" :border="false" :show-header="false">
                <el-table-column style="width: 100%">
                  <template #default="scope">
                    <div class="tb-call" style="width: 100%;">
                      <div>
                        <span style="margin-right: 10px;">1</span>
                        <span>的付款哈尽快发货</span>
                      </div>
                      <div style="display: flex;justify-content: space-between;height: 28px;margin-top: 5px">
                        <span style="font-size: 12px">2001-10-10 10:15:11</span>
                        <el-button type="text" size="small">查看</el-button>
                      </div>
                    </div>
                  </template>
                </el-table-column>

              </el-table>

            </div>
            <div class="demo-pagination-block">
              <el-pagination
                  :page-sizes="[5, 10, 30, 50]"
                  v-model:page-size="pageInfo.pagesize"
                  :default-page-size="pageInfo.pagesize"
                  layout=" prev, pager, next, jumper"
                  :total="pageInfo.total"
                  :pager-count="5"
                  background
              >
              </el-pagination>
            </div>
          </div>
        </div>
      </div>

      <!--      <div class="ant_right2 div_t">-->
      <!--        <div style="padding: 10px 19px;">-->
      <!--          <div class="ant_disass1">-->
      <!--            <div class="ant_disass2">-->
      <!--								<span class="ant_disass3">-->
      <!--									公告统计-->
      <!--								</span>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--          &lt;!&ndash; 公司公告区域 &ndash;&gt;-->
      <!--          <div></div>-->
      <!--        </div>-->
      <!--      </div>-->

    </div>


  </div>

</template>

<script>
import * as echarts from "echarts"
import {ref} from 'vue'

export default {
  data() {
    return {
      value: new Date(),
      tableData: [
        {
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        // {
        //   date: '2016-05-03',
        //   name: 'Tom',
        //   address: 'No. 189, Grove St, Los Angeles',
        // },
        // {
        //   date: '2016-05-03',
        //   name: 'Tom',
        //   address: 'No. 189, Grove St, Los Angeles',
        // },
        // {
        //   date: '2016-05-03',
        //   name: 'Tom',
        //   address: 'No. 189, Grove St, Los Angeles',
        // },
        // {
        //   date: '2016-05-03',
        //   name: 'Tom',
        //   address: 'No. 189, Grove St, Los Angeles',
        // },
        // {
        //   date: '2016-05-03',
        //   name: 'Tom',
        //   address: 'No. 189, Grove St, Los Angeles',
        // },
        // {
        //   date: '2016-05-03',
        //   name: 'Tom',
        //   address: 'No. 189, Grove St, Los Angeles',
        // },
        // {
        //   date: '2016-05-03',
        //   name: 'Tom',
        //   address: 'No. 189, Grove St, Los Angeles',
        // },
        // {
        //   date: '2016-05-03',
        //   name: 'Tom',
        //   address: 'No. 189, Grove St, Los Angeles',
        // },
        {
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },

      ],
      //分页、模糊查询数据
      pageInfo: {
        currenPage: 4,
        /* 当前的页 */
        pagesize: 5,
        total: 0
      },
      allnumber: {
        number1: '',
        number2: '',
        number3: '',
        number4: '',
        number5: '',
        number7: '',
        number8: '',
      },
    }
  },
  created() {
    this.selectNumber1();
    this.selectNumber2();
    this.selectNumber3();
    this.selectNumber4();
    this.selectNumber5();
    this.selectNumber7();
    this.selectNumber8();

  },
  methods: {
    //待办筛选：在找职位
    selectNumber1(){
      this.axios({
        url: "http://localhost:8007/provider/work/recruites",
        method: "post",
        data: {
          recruitmentZt:0
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        this.allnumber.number1 = response.data.data
      }).catch(function (error) {
        console.log('获取列表失败')
        console.log(error);
      })
    },
    //待办筛选：新简历
    selectNumber2(){
      this.axios({
        url: "http://localhost:8007/provider/work/resumes",
        method: "post",
        data: {
          resumeZt:0
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        this.allnumber.number2= response.data.data
      }).catch(function (error) {
        console.log('获取列表失败')
        console.log(error);
      })
    },
    //待办筛选：候选人
    selectNumber3(){
      this.axios({
        url: "http://localhost:8007/provider/work/resumes",
        method: "post",
        data: {
          resumeZt:1
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        this.allnumber.number3= response.data.data
      }).catch(function (error) {
        console.log('获取列表失败')
        console.log(error);
      })
    },
    //待办筛选：待面试
    selectNumber4(){
      this.axios({
        url: "http://localhost:8007/provider/work/resumes",
        method: "post",
        data: {
          resumeZt:2
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        this.allnumber.number4= response.data.data
      }).catch(function (error) {
        console.log('获取列表失败')
        console.log(error);
      })
    },
    //待办筛选：已面试待处理
    selectNumber5(){
      this.axios({
        url: "http://localhost:8007/provider/work/resumes",
        method: "post",
        data: {
          resumeZt:5
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        this.allnumber.number5= response.data.data
      }).catch(function (error) {
        console.log('获取列表失败')
        console.log(error);
      })
    },
    //待办筛选：待接受offer
    selectNumber7(){
      this.axios({
        url: "http://localhost:8007/provider/work/resumes",
        method: "post",
        data: {
          resumeZt:7
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        this.allnumber.number7= response.data.data
      }).catch(function (error) {
        console.log('获取列表失败')
        console.log(error);
      })
    },
    //待办筛选：待入职
    selectNumber8(){
      this.axios({
        url: "http://localhost:8007/provider/work/resumes",
        method: "post",
        data: {
          resumeZt:8
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        this.allnumber.number8= response.data.data
      }).catch(function (error) {
        console.log('获取列表失败')
        console.log(error);
      })
    },
  }
}

</script>
<style type="text/css" scoped>
/deep/ .el-calendar-table .el-calendar-day:hover {
  cursor: pointer;
  background-color: #409eff;
}

/deep/ .el-calendar-table td.is-today {
  color: #fff;
}

/deep/ .el-calendar-table .el-calendar-day {
  padding: 6px;
}

/deep/ .el-calendar-table:not(.is-range) td.next { /*隐藏下个月的日期*/
  visibility: hidden;
}

/deep/ .el-calendar {
  --el-calendar-border: none;
  --el-calendar-header-border-bottom: var(--el-calendar-border);
  --el-calendar-selected-background-color: #409eff;
  --el-calendar-cell-width: none;
  background-color: #fff;
  text-align: center;
}

/deep/ .el-calendar__header {
  display: flex;
  padding: 0px;
  justify-content: space-between;
  border-bottom: var(--el-calendar-header-border-bottom);
}

/deep/ .el-calendar__body {
  padding: 0px;
}

/*/deep/.el-calendar-day{*/
/*  height: 30px;*/
/*  width: 30px;*/
/*  margin: auto;*/
/*  border-radius: 20px;*/
/*}*/
@font-face {
  font-family: 'iconfont';  /* Project id 3164770 */
  src: url('//at.alicdn.com/t/font_3164770_tvl48drtes.woff2?t=1643981694109') format('woff2'),
  url('//at.alicdn.com/t/font_3164770_tvl48drtes.woff?t=1643981694109') format('woff'),
  url('//at.alicdn.com/t/font_3164770_tvl48drtes.ttf?t=1643981694109') format('truetype');
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 36px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
  color: #0270c1;
}
.iconfonts {
  font-family: "iconfont" !important;
  font-size: 14px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
/* table表格去边框 */
/deep/ .el-table td.el-table__cell, .el-table th.el-table__cell.is-leaf {
  border-bottom: none;
}

/deep/ .el-table {
  --el-table-border-color: none;
}

/deep/ .el-table__cell {
  padding: 0 0;
  min-width: 0;
  box-sizing: border-box;
  text-overflow: ellipsis;
  vertical-align: middle;
  position: relative;
  text-align: left;
  padding-top: 12px;
}

.tb-call {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  word-break: break-all;
  line-height: 23px;
  padding-left: 20px;
  padding-right: 40px;
}

.div_li {
  height: 100px;
  width: 100px;
  margin-left: 10px;
  text-align: center;
  cursor: pointer;
}

.div_li span {
  font-size: 12px;
}

.div_li:hover .iconfont {
  font-size: 38px;
}

.div_li:hover span {
  color: #0270c1;
}


.divhead {
  width: 100%;
  margin-bottom: 15px;
  background: #fff;
  min-height: 100px;
  border-radius: 5px;
}

.div_t:hover {
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  border-color: transparent;
}

.divleft {
  float: left;
  width: 55%;
}

.divright {
  float: right;
  width: 44%;
}

/* 左侧样式 */
.ant_left1 {
  width: 100%;
  height: 350px;
  background: #fff;
  border-radius: 3px;
}

.ant_left2 {
  margin: 10px 0 6px;
  width: 100%;
  height: 175px;
  background: #fff;
  border-radius: 3px;
}

.ant_left3 {
  margin: 10px 0 6px;
  width: 100%;
  height: 380px;
  background: #fff;
  border-radius: 3px;
}

img {
  border-radius: 40px;
}

.db-div {
  width: 220px;
  height: 310px;
}

.db-div1 {
  width: 100%;
  height: 40px;
  margin-top: 5px;
  background-color: #eaedf1;
}

.db-div2 {
  width: 80px;
  height: 80px;
  margin: auto;
  border-radius: 50px;
  display: flex;
}

.db-color1 {
  background-color: #0db882;
}

.db-color2 {
  background-color: #ff4949;
}

.db-color3 {
  background-color: #008df7;
}

.db-span {
  margin: auto;
  font-size: 18px;
  color: white;
}

.db-ant1 {

}
.db-ant2 {
  padding-left: 35px;
  padding-right: 35px;
}
.db-dspan{
  display: flex; justify-content: space-between;
  padding: 10px 10px 10px 20px;
  cursor: pointer;
}

/* 右侧样式 */
.ant_right1 {
  width: 100%;
  height: 880px;
  background: #fff;
  border-radius: 3px;
}


/* 首页内容标题区域样式 */
.ant_disass1 {
  font-size: 20px;
  font-weight: bold;
}

.ant_disass2 {
  border-bottom: 1px solid #e5e5e5;
  height: 38px;
}

.ant_disass3 {
  border-bottom: 3px solid #8a97f8;
}

/deep/ .el-table__body, .el-table__footer, .el-table__header {
  table-layout: fixed;
  border-collapse: separate;
  margin-top: 15px;
}
</style>

