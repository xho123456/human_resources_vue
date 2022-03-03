<template>
  <div>
    <!-- 用户信息栏 -->
    <div class="divhead div_t">
      <div style="padding: 20px; display: flex;">
        <div style="width: 85px; height: 85px;">
          <img :src="useralls.staffPicture" width="85" height="85" alt="">
<!--          <img src="../assets/syx.jpg" width="85" height="85" alt="">-->
        </div>
        <div style=" margin-left: 10px;">
          <div style="padding: 10px;">
            <p style="margin-bottom: 5px; font-size:24px;font-weight: bold;">您好，{{ useralls.staffName }}，祝您工作顺利 !</p>
            <span style="font-size: 14px; color: #889395; font-weight: bold;">
							{{ useralls.staffName }}
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
                  <router-link :to="{path:this.one,query:{path:this.$route.query.path}}">
                    <div class="db-dspan">
                      <span>在招职位：</span>
                      <div>
                        <span style="font-weight:bold; color:#ff4949;">{{ allnumber.number1 }}</span>
                        <i class="iconfonts">&#xe775;</i>
                      </div>
                    </div>
                  </router-link>
                </div>
                <div class="db-div1">
                  <router-link :to="{path:this.two,query:{path:this.$route.query.path}}">
                    <div class="db-dspan">
                      <span>新应聘简历：</span>
                      <div>
                        <span style="font-weight:bold; color:#ff4949;">{{ allnumber.number2 }}</span>
                        <i class="iconfonts">&#xe775;</i>
                      </div>
                    </div>
                  </router-link>
                </div>
                <div class="db-div1">
                  <router-link :to="{path:this.three,query:{path:this.$route.query.path}}">
                    <div class="db-dspan">
                      <span>候选人简历：</span>
                      <div>
                        <span style="font-weight:bold; color:#ff4949;">{{ allnumber.number3 }}</span>
                        <i class="iconfonts">&#xe775;</i>
                      </div>
                    </div>
                  </router-link>
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
                  <router-link :to="{path:this.four,query:{path:this.$route.query.path}}">
                    <div class="db-dspan">
                      <span>待面试：</span>
                      <div>
                        <span style="font-weight:bold; color:#ff4949;">{{ allnumber.number4 }}</span>
                        <i class="iconfonts">&#xe775;</i>
                      </div>
                    </div>
                  </router-link>
                </div>
                <div class="db-div1">
                  <router-link :to="{path:this.five,query:{path:this.$route.query.path}}">
                    <div class="db-dspan">
                      <span>已面试待处理：</span>
                      <div>
                        <span style="font-weight:bold; color:#ff4949;">{{ allnumber.number5 }}</span>
                        <i class="iconfonts">&#xe775;</i>
                      </div>
                    </div>
                  </router-link>
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
                  <router-link :to="{path:this.six,query:{path:this.$route.query.path}}">
                    <div class="db-dspan">
                      <span>待发送offer：</span>
                      <div>
                        <span style="font-weight:bold; color:#ff4949;">{{ allnumber.number5 }}</span>
                        <i class="iconfonts">&#xe775;</i>
                      </div>
                    </div>
                  </router-link>
                </div>
                <div class="db-div1">
                  <router-link :to="{path:this.seven,query:{path:this.$route.query.path}}">
                    <div class="db-dspan">
                      <span>待接受offer：</span>
                      <div>
                        <span style="font-weight:bold; color:#ff4949;">{{ allnumber.number7 }}</span>
                        <i class="iconfonts">&#xe775;</i>
                      </div>
                    </div>
                  </router-link>
                </div>
                <div class="db-div1">
                  <router-link :to="{path:this.eight,query:{path:this.$route.query.path}}">
                    <div class="db-dspan">
                      <span>待入职：</span>
                      <div>
                        <span style="font-weight:bold; color:#ff4949;">{{ allnumber.number8 }}</span>
                        <i class="iconfonts">&#xe775;</i>
                      </div>
                    </div>
                  </router-link>
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
            <router-link :to="{path:this.nine,query:{path:this.$route.query.path}}">
              <div class="div_li">
                <p><i class="iconfont">&#xe62b;</i></p>
                <span>我的考勤</span>
              </div>
            </router-link>
            <router-link :to="{path:this.ten,query:{path:this.$route.query.path}}">
              <div class="div_li">
                <p><i class="iconfont">&#xe68c;</i></p>
                <span>薪酬统计</span>
              </div>
            </router-link>
            <router-link :to="{path:this.eleven,query:{path:this.$route.query.path}}">
              <div class="div_li">
                <p><i class="iconfont">&#xf8db;</i></p>
                <span>加班申请</span>
              </div>
            </router-link>
            <router-link :to="{path:this.twelve,query:{path:this.$route.query.path}}">
              <div class="div_li">
                <p><i class="iconfont">&#xe656;</i></p>
                <span>请假申请</span>
              </div>
            </router-link>
            <router-link :to="{path:this.thirteen,query:{path:this.$route.query.path}}">
              <div class="div_li"><p><i class="iconfont">&#xea9d;</i></p>
                <span>公告管理</span>
              </div>
            </router-link>
            <router-link :to="{path:this.fourteen,query:{path:this.$route.query.path}}">
              <div class="div_li">
                <p><i class="iconfont">&#xe60a;</i></p>
                <span>员工信息</span>
              </div>
            </router-link>

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
                    <div class="tb-call" style="width: 100%;color:rgb(189, 197, 208);"
                         v-if="scope.row.noticeState1===1">
                      <div>
                        <span style="margin-right: 10px;">{{ scope.$index + 1 }}</span>

                        <span>{{ scope.row.noticePeople }}发布了标题为" {{ scope.row.noticeTitle }} "的公告</span>


                      </div>
                      <div style="display: flex;justify-content: space-between;height: 28px;margin-top: 5px">
                        <span style="font-size: 12px">{{ scope.row.createdTime }}</span>
                        <el-button type="text" size="small"
                                   @click="querygg(scope.row.noticeStaffId,scope.row.noticeMatter)">查看
                        </el-button>
                      </div>
                    </div>
                    <div class="tb-call" style="width: 100%;" v-if="scope.row.noticeState1===0">
                      <div>
                        <span style="margin-right: 10px;">{{ scope.$index + 1 }}</span>
                        <span>{{ scope.row.noticePeople }}发布了标题为" {{ scope.row.noticeTitle }} "的公告</span>
                      </div>
                      <div style="display: flex;justify-content: space-between;height: 28px;margin-top: 5px">
                        <span style="font-size: 12px">{{ scope.row.createdTime }}</span>
                        <el-button type="text" size="small"
                                   @click="querygg(scope.row.noticeStaffId,scope.row.noticeMatter)">查看
                        </el-button>
                      </div>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="demo-pagination-block">
              <el-pagination
                  v-model:currentPage="pageInfo.currenPage"
                  v-model:page-size="pageInfo.pagesize"
                  :default-page-size="pageInfo.pagesize"
                  layout=" prev, pager, next, jumper"
                  :total="pageInfo.total"
                  :pager-count="5"
                  background
                  @size-change="selectNumbero()"
                  @current-change="selectNumbero()"
              >
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <el-dialog
      v-model="dialogVisible"
      title="公告"
      width="40%"
      :show-close="false">


    <div style="min-height: 200px;border: 1px solid black">
      <div style="text-align: center">公告标题</div>
      <div style="margin-top: 5px;padding: 10px"><span style="margin-left: 30px"></span>
        {{ content }}
      </div>
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">关闭</el-button>
      </span>
    </template>
  </el-dialog>{{useralls}}
</template>

<script>
import * as echarts from "echarts"
import {ref} from 'vue'
import {ElMessage} from "element-plus";

export default {
  data() {
    return {
      //路由地址
      one: '/recruitment/plan/plan', //招聘计划路由地址
      two: '/recruitment/recruit/newresume', //新简历路由地址
      three: '/recruitment/candidate', //候选人路由地址
      four: '/recruitment/daiInterview', //待面试路由地址
      five: '/recruitment/interviewPass', //面试通过待出来路由地址
      six: '/recruitment/interviewPass',//待发送offer路由地址
      seven: '/recruitment/druzhi', //待介绍offer路由地址
      eight: '/recruitment/yjieshou',//待入职路由地址
      nine: '/my/attendance', //我的考勤路由地址
      ten: '/statistics/staff_analyze/statistics_personnel1', //统计分析路由地址
      eleven: '/examine/examine_centre/overtime_examine',  //加班申请
      twelve: '/examine/examine_centre/leave_examine',
      thirteen: '/system/announcement_management/announcement_set', //公告管理
      fourteen: '/employee/message/employee_roster/book', //员工信息


      //当前登录用户消息
      useralls: this.$store.state.userall,
      value: new Date(),
      tableData: [],
      //分页、模糊查询数据
      pageInfo: {
        currenPage: 1,
        /* 当前的页 */
        pagesize: 10,
        total: 0
      },
      allnumber: {
        number1: '', //待办筛选：在找职位
        number2: '', //待办筛选：新简历
        number3: '', //待办筛选：候选人
        number4: '', //待办筛选：待面试
        number5: '', //待办筛选：已面试待处理
        number7: '', //待办筛选：待接受offer
        number8: '', //待办筛选：待入职
      },
      //公告对话框
      dialogVisible: false,
      //公告对话框详情
      content: '',
    }
  },
  created() {
    this.selectNumberone();   //待办筛选：在找职位
    this.selectNumbertwo();   //待办筛选：新简历
    this.selectNumberthree(); //待办筛选：候选人
    this.selectNumberfour();  //待办筛选：待面试
    this.selectNumberfix();   //待办筛选：已面试待处理
    this.selectNumbersix();   //待办筛选：待接受offer
    this.selectNumbernice();  //待办筛选：待入职
    this.selectNumbero();     //公告查询
  },
  methods: {
    //待办筛选：在找职位
    selectNumberone() {
      this.axios({
        url: "http://localhost:8007/provider/work/recruites",
        method: "post",
        data: {
          //招聘计划状态为在招职位计划
          recruitmentZt: 0
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
    selectNumbertwo() {
      this.axios({
        url: "http://localhost:8007/provider/work/resumes",
        method: "post",
        data: {
          //简历状态为以新简历
          resumeZt: 0
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        this.allnumber.number2 = response.data.data
      }).catch(function (error) {
        console.log('获取列表失败')
        console.log(error);
      })
    },
    //待办筛选：候选人
    selectNumberthree() {
      this.axios({
        url: "http://localhost:8007/provider/work/resumes",
        method: "post",
        data: {
          //简历状态为候选人
          resumeZt: 1
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        this.allnumber.number3 = response.data.data
      }).catch(function (error) {
        console.log('获取列表失败')
        console.log(error);
      })
    },
    //待办筛选：待面试
    selectNumberfour() {
      this.axios({
        url: "http://localhost:8007/provider/work/resumes",
        method: "post",
        data: {
          //简历状态为待面试
          resumeZt: 2
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        this.allnumber.number4 = response.data.data
      }).catch(function (error) {
        console.log('获取列表失败')
        console.log(error);
      })
    },
    //待办筛选：已面试待处理
    selectNumberfix() {
      this.axios({
        url: "http://localhost:8007/provider/work/resumes",
        method: "post",
        data: {
          //简历状态为以面试
          resumeZt: 5
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        this.allnumber.number5 = response.data.data
      }).catch(function (error) {
        console.log('获取列表失败')
        console.log(error);
      })
    },
    //待办筛选：待接受offer
    selectNumbersix() {
      this.axios({
        url: "http://localhost:8007/provider/work/resumes",
        method: "post",
        data: {
          //简历状态为待录用
          resumeZt: 7
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        this.allnumber.number7 = response.data.data
      }).catch(function (error) {
        console.log('获取列表失败')
        console.log(error);
      })
    },
    //待办筛选：待入职
    selectNumbernice() {
      this.axios({
        url: "http://localhost:8007/provider/work/resumes",
        method: "post",
        data: {
          //简历状态为待入职
          resumeZt: 8
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        this.allnumber.number8 = response.data.data
      }).catch(function (error) {
        console.log('获取列表失败')
        console.log(error);
      })
    },
    //公告查询
    selectNumbero() {
      this.axios({
        url: "http://localhost:8007/provider/workno/selectAllnos",
        method: "post",
        data: {
          currenPage: this.pageInfo.currenPage,
          pagesize: this.pageInfo.pagesize,
          staffId: this.useralls.staffId  //当前登录的员工编号
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        this.tableData = response.data.data.records
        this.pageInfo.total = response.data.data.total
      }).catch(function (error) {
        console.log('获取列表失败')
        console.log(error);
      })
    },

    //公告修改
    querygg(id, row) {
      this.axios({
        url: "http://localhost:8007/provider/workno/updatedno",
        method: "post",
        data: {
          noticeStaffId: id,
          noticeState: 1  // 1 表示：公告状态为已读
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        this.selectNumbero();//修改公告状态为已读
        this.content = row;
        this.dialogVisible = true;//打开对话框
      }).catch(function (error) {
        console.log('获取列表失败')
        console.log(error);
      })
    },
  }
}

</script>
<style type="text/css" scoped>
/*包含以下四种的链接*/
a {
  text-decoration: none;
  color: rgb(114, 116, 118);
}

/*正常的未被访问过的链接*/
a:link {
  text-decoration: none;
}

/*已经访问过的链接*/
a:visited {
  text-decoration: none;
}

/*鼠标划过(停留)的链接*/
a:hover {
  text-decoration: none;
}

/* 正在点击的链接*/
a:active {
  text-decoration: none;
}

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

.db-dspan {
  display: flex;
  justify-content: space-between;
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

