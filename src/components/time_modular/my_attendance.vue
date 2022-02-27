<!-- 我的考勤 -->
<template>
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body ">

        <div class="my-cead">
          <div style="padding-left: 20px;display: flex;align-items: center;">
            <div class="my-span1" style="display: flex;">
              <i class="iconfont" style="font-size: 20px">&#xe7d9;</i>
            </div>
            <div class="my-span2">我的考勤</div>
          </div>
        </div>
        <div class="my-cead my-time">
          <div style="padding-left: 20px;display: flex;align-items: center;">
           <span style="font-size: 13px;margin-left: 10px">年<span style="color:cornflowerblue;margin-left: 10px">月</span></span>

            <el-date-picker
                @change="querycdAlldk()"
              v-model="value1"
              type="month"
              size="mini"
              :clearable="false"
              style="padding-right: 10px;padding-left: 10px;width: 100px;"
              placeholder="选择日期"
              value-format="YYYY-MM"
            >
          </el-date-picker>

          </div>
        </div>

        <!--内容主体区域-->
        <div class="my-cead1">
          <div class="an-card">
            <div class="an-cread">
              <!--出勤统计-->
              <div style="width: 468px;border: 1px solid #e9e9e9;">
                <div class="aks-div">出勤统计</div>
                <div>
                  <div id="mains" class="div_a2"></div>
                </div>
                <div>
                  <div class="div-a3">
                    <div style="width: 100%">
                      <div class="div-a4 ant-rows1">234</div>
                      <div class="div-a4">
                        <span class="ant-rows-span1"></span>
                        <span style="font-size: 12px;color: black">实际出勤（天）</span>
                      </div>
                    </div>
                    <div style="width: 100%">
                      <div class="div-a4 ant-rows2">234</div>
                      <div class="div-a4">
                        <span class="ant-rows-span2"></span>
                        <span style="font-size: 12px;color: black">未出勤（天）</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!--异常考勤汇总-->
              <div style="width: 766px;border: 1px solid #e9e9e9;border-right: none">
                <div class="aks-div">异常考勤汇总</div>
                <div>
                  <div class="my-caerdq">

                    <div class="my-ant" @click="querychid()">
                      <div class="my-ant-show" style="background-color: rgb(72, 198, 81);">
                        <i class="iconfont" style="font-size: 30px">&#xeb17;</i>
                      </div>
                      <div class="show-dv1">
                        <div class="show-dv2">{{numbers.numbercd}}</div>
                        <div class="show-dv3" title="迟到(次)">迟到(天)</div>
                      </div>
                    </div>

                    <div class="my-ant" @click="queryzaot()">
                      <div class="my-ant-show" style="background-color: rgb(79, 140, 255);">
                        <i class="iconfont" style="font-size: 24px">&#xe638;</i>
                      </div>
                      <div class="show-dv1">
                        <div class="show-dv2">{{numbers.numberzt}}</div>
                        <div class="show-dv3" title="早退(次)">早退(次)</div>
                      </div>
                    </div>
                    <div class="my-ant" @click="querykuang()">
                      <div class="my-ant-show" style="background-color: rgb(141, 107, 243);">
                        <i class="iconfont" style="font-size: 32px">&#xeb34;</i>
                      </div>
                      <div class="show-dv1">
                        <div class="show-dv2">{{numbers.numberkg}}</div>
                        <div class="show-dv3" title="旷工(次)">旷工(次)</div>
                      </div>
                    </div>
                    <div class="my-ant">
                      <div class="my-ant-show" style="background-color: rgb(72, 198, 81);">
                        <i class="iconfont" style="font-size: 29px">&#xe61e;</i>
                      </div>
                      <div class="show-dv1">
                        <div class="show-dv2">9</div>
                        <div class="show-dv3" title="漏签(次)">漏签(天)</div>
                      </div>
                    </div>
                  </div>
                  <div class="my-caerdq">
                    <div class="my-ant"  @click="querycdAll()">
                      <div class="my-ant-show" style="background-color: rgb(79, 140, 255);">
                        <i class="iconfont" style="font-size: 29px">&#xe62b;</i>
                      </div>
                      <div class="show-dv1">
                        <div class="show-dv2">{{numbers.numberqj}}</div>
                        <div class="show-dv3" title="请假(天)">请假(天)</div>
                      </div>
                    </div>
                    <div class="my-ant" @click="querycdjb()">
                      <div class="my-ant-show" style="background-color: rgb(141, 107, 243);">
                        <i class="iconfont" style="font-size: 29px">&#xe69f;</i>
                      </div>
                      <div class="show-dv1">
                        <div class="show-dv2">{{numbers.numberjab}}</div>
                        <div class="show-dv3" title="加班(天)">加班(天)</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!--表格数据区域-->
          <div class="an-card">
            <el-table :data="tableData" style="width: 100%; font-size: 12px;"
                      :header-cell-style="{background:'#eef1f6',color:'#606266',textAlign: 'center'}" >
              <el-table-column type="index" label="序号"  width="50"/>
              <el-table-column prop="dayDate" label="日期" width="140"/>
              <el-table-column prop="name" label="班次" width="130" :show-overflow-tooltip="true">
                <template #default="scope">
                   一般工作时间(
                  {{scope.row.classesTimeones}}-{{scope.row.classesTimeonex}}
                  &nbsp;
                  {{scope.row.classesTimetwos}}-{{scope.row.classesTimetwox}}
                  )
                </template>
              </el-table-column>
              <el-table-column label="上班一">
                <el-table-column prop="smornClock" label="打卡时间" />
                <el-table-column label="打卡结果" width="100">
                  <template #default="scope">
                    <span v-if="scope.row.smornResult=='正常'">{{scope.row.smornResult}}</span>
                    <span style="color: red" v-if="scope.row.smornResult=='迟到' || scope.row.smornResult=='旷工'">
                      {{scope.row.smornResult}}
                    </span>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column label="下班一">
                <el-table-column prop="xafternoonClock" label="打卡时间"/>
                <el-table-column label="打卡结果" width="100">
                  <template #default="scope">
                    <span v-if="scope.row.xafternoonResult=='正常'">{{scope.row.xafternoonResult}}</span>
                    <span style="color: red" v-if="scope.row.xafternoonResult=='早退' || scope.row.xafternoonResult=='旷工'">
                      {{scope.row.xafternoonResult}}
                    </span>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column prop="atsShould" label="应出勤天数" width="140"/>
              <el-table-column prop="atShould" label="实际出勤天数" width="140"/>
              <el-table-column prop="cheLate" label="迟到（次数）" width="140"/>
              <el-table-column prop="chesLate" label="迟到时长(小时)" width="140"/>
              <el-table-column prop="zhaiLate" label="早退（次数）" width="140"/>
              <el-table-column prop="zhaisLate" label="早退时长（小时）" width="140"/>
              <el-table-column prop="kangLate" label="旷工（次数）" width="140"/>
              <el-table-column prop="kangsLate" label="旷工时长（小时）" width="140"/>
            </el-table>
            <div class="demo-pagination-block" style="margin-top: 10px">
              <el-pagination
                  v-model:currentPage="pageInfo.currenPage"
                  :page-sizes="[5, 10, 30, 50]"
                  v-model:page-size="pageInfo.pagesize"
                  :default-page-size="pageInfo.pagesize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="pageInfo.total"
                  :pager-count="5"
                  background
                  @size-change="querycdAlldk()"
                  @current-change="querycdAlldk()">
              </el-pagination>
            </div>
          </div>


        </div>
      </div>
    </div>
  </div>

  <!-- 请假记录对话框 -->
  <el-dialog v-model="dialogTableVisible" title="请假明细" destroy-on-close width="60%">
    <div style="height: 350px">
      <el-table :data="tableDatas" style="cursor: pointer" size="mini"
                :header-cell-style="{color:'#606266',background:'rgb(234, 237, 241)',textAlign: 'center'}" :stripe=true>
        <el-table-column align="center" prop="staffName1" label="姓名"/>
        <el-table-column align="center" prop="deptName" label="部门"/>
        <el-table-column align="center" prop="leaveSDate" label="开始时间" width="130px"/>
        <el-table-column align="center" prop="leaveEDate" label="结束时间" width="130px"/>
        <el-table-column align="center" prop="leaveType" label="请假类型"/>
        <el-table-column align="center" prop="leaveMatter" label="请假事由"/>
        <el-table-column align="center" prop="auditflowStaff" label="审批状态">
          <template #default="scope">
            <span v-if="scope.row.auditflowStaff==0">待审</span>
            <span v-if="scope.row.auditflowStaff==1">通过</span>
            <span v-if="scope.row.auditflowStaff==2">驳回</span>
            <span v-if="scope.row.auditflowStaff==3">撤销</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="leaveTotalDate" label="请假总时长"/>
      </el-table>
    </div>
    <template #footer>
                  <span class="dialog-footer">
                    <el-button size="mini" type="primary" @click="dialogTableVisible=false">取消</el-button>
                  </span>
    </template>
    <div class="demo-pagination-block">
      <el-pagination
          v-model:currentPage="pageInfo2.currenPage"
          :page-sizes="[5, 10, 30, 50]"
          v-model:page-size="pageInfo2.pagesize"
          :default-page-size="pageInfo2.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageInfo2.total"
          :pager-count="5"
          background
          @size-change="querycdAll()"
          @current-change="querycdAll()"
      >
      </el-pagination>
    </div>
  </el-dialog>

  <!-- 加班记录对话框 -->
  <el-dialog v-model="dialogTableVisible1" title="加班明细" destroy-on-close width="60%">
    <div style="height: 350px">
      <el-table :data="tableDatajb" style="cursor: pointer" size="mini"
                :header-cell-style="{color:'#606266',background:'rgb(234, 237, 241)',textAlign: 'center'}" :stripe=true>
        <el-table-column align="center" prop="staffName1" label="姓名"/>
        <el-table-column align="center" prop="deptName" label="部门"/>
        <el-table-column align="center" prop="overtimeaskSDate" label="开始时间" width="130px"/>
        <el-table-column align="center" prop="overtimeaskEDate" label="结束时间" width="130px"/>
        <el-table-column align="center" prop="overtimeaskType" label="加班类型"/>
        <el-table-column align="center" prop="overtimeaskMatter" label="加班事由"/>
        <el-table-column align="center" prop="auditflowStaff" label="审批状态">
          <template #default="scope">
            <span v-if="scope.row.auditflowStaff==0">待审</span>
            <span v-if="scope.row.auditflowStaff==1">通过</span>
            <span v-if="scope.row.auditflowStaff==2">驳回</span>
            <span v-if="scope.row.auditflowStaff==3">撤销</span>
          </template>
        </el-table-column>
        <el-table-column  align="center" prop="overtimeaskTotalDate" label="总时长(小时)"/>
      </el-table>
    </div>
    <template #footer>
                  <span class="dialog-footer">
                    <el-button size="mini" type="primary" @click="dialogTableVisible1=false">取消</el-button>
                  </span>
    </template>
    <div class="demo-pagination-block">
      <el-pagination
          v-model:currentPage="pageInfo1.currenPage"
          :page-sizes="[5, 10, 30, 50]"
          v-model:page-size="pageInfo1.pagesize"
          :default-page-size="pageInfo1.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageInfo1.total"
          :pager-count="5"
          background
          @size-change="querycdjb()"
          @current-change="querycdjb()"
      >
      </el-pagination>
    </div>
  </el-dialog>

  <!-- 迟到明细对话框 -->
  <el-dialog v-model="dialogTableVisible2" title="迟到明细" destroy-on-close width="60%">
    <div style="height: 350px">
      <el-table :data="tableDatacd" style="cursor: pointer" size="mini"
                :header-cell-style="{color:'#606266',background:'rgb(234, 237, 241)',textAlign: 'center'}" :stripe=true>
        <el-table-column align="center" prop="staffName" label="姓名"/>
        <el-table-column align="center" prop="deptName" label="部门"/>
        <el-table-column align="center" prop="dayDate" label="日期" width="130px"/>
        <el-table-column prop="name" label="班次" width="130" :show-overflow-tooltip="true">
          <template #default="scope">
            一般工作时间(
            {{scope.row.classesTimeones}}-{{scope.row.classesTimeonex}}
            &nbsp;
            {{scope.row.classesTimetwos}}-{{scope.row.classesTimetwox}}
            )
          </template>
        </el-table-column>
        <el-table-column align="center" prop="smornClock" label="打卡时间"/>
        <el-table-column align="center" label="迟到(小时)">
          <template #default="scope">
            {{scope.row.chesLate}}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <template #footer>
                  <span class="dialog-footer">
                    <el-button size="mini" type="primary" @click="dialogTableVisible2=false">取消</el-button>
                  </span>
    </template>
    <div class="demo-pagination-block">
      <el-pagination
          v-model:currentPage="pageInfocd.currenPage"
          :page-sizes="[5, 10, 30, 50]"
          v-model:page-size="pageInfocd.pagesize"
          :default-page-size="pageInfocd.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageInfocd.total"
          :pager-count="5"
          background
          @size-change="querycdAllcd()"
          @current-change="querycdAllcd()">
      </el-pagination>
    </div>
  </el-dialog>

  <!-- 早退明细对话框 -->
  <el-dialog v-model="dialogTableVisible3" title="早退明细" destroy-on-close width="60%">
    <div style="height: 350px">
      <el-table :data="tableDatazt" style="cursor: pointer" size="mini"
                :header-cell-style="{color:'#606266',background:'rgb(234, 237, 241)',textAlign: 'center'}" :stripe=true>
        <el-table-column align="center" prop="staffName" label="姓名"/>
        <el-table-column align="center" prop="deptName" label="部门"/>
        <el-table-column align="center" prop="dayDate" label="日期" width="130px"/>
        <el-table-column prop="name" label="班次" width="130" :show-overflow-tooltip="true">
          <template #default="scope">
            一般工作时间(
            {{scope.row.classesTimeones}}-{{scope.row.classesTimeonex}}
            &nbsp;
            {{scope.row.classesTimetwos}}-{{scope.row.classesTimetwox}}
            )
          </template>
        </el-table-column>
        <el-table-column align="center" prop="xafternoonClock" label="打卡时间"/>
        <el-table-column align="center" prop="zhaisLate" label="早退(小时)"/>
      </el-table>
    </div>
    <template #footer>
                  <span class="dialog-footer">
                    <el-button size="mini" type="primary" @click="dialogTableVisible3=false">取消</el-button>
                  </span>
    </template>
    <div class="demo-pagination-block">
      <el-pagination
          v-model:currentPage="pageInfocdzts.currenPage"
          :page-sizes="[5, 10, 30, 50]"
          v-model:page-size="pageInfocdzts.pagesize"
          :default-page-size="pageInfocdzts.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageInfocdzts.total"
          :pager-count="5"
          background
          @size-change="querycdAllcd()"
          @current-change="querycdAllcd()">
      </el-pagination>
    </div>
  </el-dialog>

  <!-- 旷工明细对话框 -->
  <el-dialog v-model="dialogTableVisible4" title="旷工明细" destroy-on-close width="60%">
    <div style="height: 350px">
      <el-table :data="tableDatakg" style="cursor: pointer" size="mini"
                :header-cell-style="{color:'#606266',background:'rgb(234, 237, 241)',textAlign: 'center'}" :stripe=true>
        <el-table-column align="center" prop="staffName" label="姓名"/>
        <el-table-column align="center" prop="deptName" label="部门"/>
        <el-table-column align="center" prop="dayDate" label="日期" width="130px"/>
        <el-table-column prop="name" label="班次" width="130" :show-overflow-tooltip="true">
          <template #default="scope">
            一般工作时间(
            {{scope.row.classesTimeones}}-{{scope.row.classesTimeonex}}
            &nbsp;
            {{scope.row.classesTimetwos}}-{{scope.row.classesTimetwox}}
            )
          </template>
        </el-table-column>
        <el-table-column align="center" prop="xafternoonClock" label="打卡时间"/>
        <el-table-column align="center" prop="kangsLate" label="旷工(小时)"/>
      </el-table>
    </div>
    <template #footer>
                  <span class="dialog-footer">
                    <el-button size="mini" type="primary" @click="dialogTableVisible4=false">取消</el-button>
                  </span>
    </template>
    <div class="demo-pagination-block">
      <el-pagination
          v-model:currentPage="pageInfocdkuang.currenPage"
          :page-sizes="[5, 10, 30, 50]"
          v-model:page-size="pageInfocdkuang.pagesize"
          :default-page-size="pageInfocdkuang.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageInfocdkuang.total"
          :pager-count="5"
          background
          @size-change="querycdAllcd()"
          @current-change="querycdAllcd()">
      </el-pagination>
    </div>
  </el-dialog>



</template>

<script>
import * as echarts from "echarts"
import {ref} from 'vue'

export default {
  data() {
    return {
      //当前登录用户消息
      useralls:this.$store.state.userall,

      //年月：查询范围
      value1:'',

      //数据次数统计
      numbers:{
        numberqj:'', //请假
        numbercd:'', //迟到
        numberzt:'', //早退
        numberkg:'', //旷工
        numberjab:'',//加班
      },
      tableData: [],
      //分页
      pageInfo: {
        currenPage: 1,
        /* 当前的页 */
        pagesize: 5,
        total: 0,
      },

      //请假对话框
      dialogTableVisible:false,
      //请假数据
      tableDatas:[],
      //请假明细分页
      pageInfo2: {
        currenPage: 1,
        /* 当前的页 */
        pagesize: 5,
        total: 0,
      },

      //加班对话框
      dialogTableVisible1:false,
      //加班数据
      tableDatajb: [],
      //加班明细分页
      pageInfo1: {
        currenPage: 1,
        /* 当前的页 */
        pagesize: 5,
        total: 0,
      },

      //迟到明细对话框
      dialogTableVisible2:false,
      //迟到数据
      tableDatacd: [],
      //迟到明细分页
      pageInfocd: {
        currenPage: 1,
        /* 当前的页 */
        pagesize: 5,
        total: 0,
      },

      //早退明细对话框
      dialogTableVisible3:false,
      //早退数据
      tableDatazt: [],
      //早退明细分页
      pageInfocdzts: {
        currenPage: 1,
        /* 当前的页 */
        pagesize: 5,
        total: 0,
      },

      //旷工明细对话框
      dialogTableVisible4:false,
      //旷工数据
      tableDatakg: [],
      //旷工明细分页
      pageInfocdkuang: {
        currenPage: 1,
        /* 当前的页 */
        pagesize: 5,
        total: 0,
      },
    }
  },
  created() {
    //获取当前月分
    this.getCurrentTime();
    //请假次数统计
    this.querynumber();
    //当前登录用户考勤打卡记录查询（按照月份查询）
    this.querycdAlldk();


  },
  methods: {
    //获取当前月分
    getCurrentTime() {
      //获取当前时间并打印
      var _this = this;
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth()+1 <10 ? '0'+(new Date().getMonth()+1) : new Date().getMonth()+1;
      _this.value1 = yy+'-'+mm;
    },
    two(mains) {
      this.charts = echarts.init(document.getElementById(mains));
      this.charts.setOption({
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '11',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              {value: 1048, name: 'Search Engine'},
              {value: 735, name: 'Direct'}
            ]
          }
        ]
      });
    },
    //当前登录用户考勤打卡记录查询（按照月份查询）
    querycdAlldk(){
      this.axios({
        url: "http://localhost:8007/provider/leave/queryalldk",
        method: "post",
        data: {
          currenPage: this.pageInfo.currenPage,
          pagesize:this.pageInfo.pagesize,
          staffId: this.useralls.staffId,
          dates:this.value1
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        this.tableData = response.data.data.records
        this.pageInfo.total = response.data.data.total
        //迟到次数统计
        this.chidnumber();
        //早退次数统计
        this.zaotnumbers();
        //旷工次数统计
        this.kgnumber();
        //加班次数统计
        this.jiabnumber();
      }).catch(function (error) {
        console.log('获取列表失败')
        console.log(error);
      })
    },
    //当前登录用户考勤请假记录查询
    querycdAll(){
      this.dialogTableVisible = true
      this.axios({
        url: "http://localhost:8007/provider/leave/queryallqjs",
        method: "post",
        data: {
          currenPage: this.pageInfo2.currenPage,
          pagesize:this.pageInfo2.pagesize,
          staffId:this.useralls.staffId
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log(response)
        this.tableDatas = response.data.data.records
        this.pageInfo2.total = response.data.data.total
      }).catch(function (error) {
        console.log('获取列表失败')
        console.log(error);
      })
    },
    //请假次数统计
    querynumber() {
      this.axios({
        url: "http://localhost:8007/provider/leave/leavenumbers",
        method: "post",
        data: {
          staffId:this.useralls.staffId
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        this.numbers.numberqj = response.data.data
      }).catch(function (error) {
        console.log('获取列表失败')
        console.log(error);
      })
    },
    //当前登录用户考勤申请加班记录查询
    querycdjb(){
      this.dialogTableVisible1 = true
      this.axios({
        url: "http://localhost:8007/provider/overtimes/queryallqjb",
        method: "post",
        data: {
          currenPage: this.pageInfo.currenPage,
          pagesize:this.pageInfo.pagesize,
          staffId:this.useralls.staffId
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        this.tableDatajb = response.data.data.records
        this.pageInfo1.total = response.data.data.total
      }).catch(function (error) {
        console.log('获取列表失败')
        console.log(error);
      })
    },

    //当前登录用户考勤打卡迟到记录查询
    querychid(){
      this.dialogTableVisible2 = true;
      this.axios({
        url: "http://localhost:8007/provider/clock/queryallcds",
        method: "post",
        data: {
          currenPage: this.pageInfocd.currenPage,
          pagesize:this.pageInfocd.pagesize,
          staffId:this.useralls.staffId,
          dates:this.value1
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.error(response)
        this.tableDatacd = response.data.data.records
        this.pageInfocd.total = response.data.data.total
      }).catch(function (error) {
        console.log('获取列表失败')
        console.log(error);
      })

    },
    //迟到次数统计
    chidnumber() {
      this.axios({
        url: "http://localhost:8007/provider/clock/querycdnumbers",
        method: "post",
        data: {
          staffId:this.useralls.staffId,
          dates:this.value1
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        this.numbers.numbercd = response.data.data
      }).catch(function (error) {
        console.log('获取列表失败')
        console.log(error);
      })
    },
    //迟到次数统计
    jiabnumber() {
      this.axios({
        url: "http://localhost:8007/provider/clock/queryjabnumbers",
        method: "post",
        data: {
          staffId:this.useralls.staffId,
          dates:this.value1
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.error(response)
        this.numbers.numberjab = response.data.data
      }).catch(function (error) {
        console.log('获取列表失败')
        console.log(error);
      })
    },
    //当前登录用户考勤打卡早退记录查询
    queryzaot(){
      this.dialogTableVisible3 = true;
      this.axios({
        url: "http://localhost:8007/provider/clock/queryallzts",
        method: "post",
        data: {
          currenPage: this.pageInfocd.currenPage,
          pagesize:this.pageInfocd.pagesize,
          staffId:this.useralls.staffId,
          dates:this.value1
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.error(response)
        this.tableDatazt = response.data.data.records
        this.pageInfocdzts.total = response.data.data.total
      }).catch(function (error) {
        console.log('获取列表失败')
        console.log(error);
      })

    },
    //早退次数统计
    zaotnumbers() {
      this.axios({
        url: "http://localhost:8007/provider/clock/queryzhaotnumbers",
        method: "post",
        data: {
          staffId:this.useralls.staffId,
          dates:this.value1
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        this.numbers.numberzt = response.data.data
      }).catch(function (error) {
        console.log('获取列表失败')
        console.log(error);
      })
    },
    //当前登录用户考勤打卡旷工记录查询
    querykuang(){
      this.dialogTableVisible4 = true;
      this.axios({
        url: "http://localhost:8007/provider/clock/queryallkuangs",
        method: "post",
        data: {
          currenPage: this.pageInfocd.currenPage,
          pagesize:this.pageInfocd.pagesize,
          staffId:this.useralls.staffId,
          dates:this.value1
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.error(response)
        this.tableDatakg = response.data.data.records
        this.pageInfocdkuang.total = response.data.data.total
      }).catch(function (error) {
        console.log('获取列表失败')
        console.log(error);
      })
    },
    //旷工次数统计
    kgnumber() {
      this.axios({
        url: "http://localhost:8007/provider/clock/querykgnumbers",
        method: "post",
        data: {
          staffId:this.useralls.staffId,
          dates:this.value1
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        this.numbers.numberkg = response.data.data
      }).catch(function (error) {
        console.log('获取列表失败')
        console.log(error);
      })
    },
  },
  mounted() {
    this.$nextTick(function () {
      this.two("mains");
    });
  },
}

</script>

<style type="text/css" scoped>
/deep/.my-cead .el-input {
  --el-input-border: none;
}
.el-radio-group {
  font-size: 0;
  display: block;
}
.el-radio-button{
  padding-right: 10px;
}
/deep/.el-radio-button--mini .el-radio-button__inner {
  padding: 7px 15px;
  font-size: 12px;
  border-radius: 5px;
  border: none;
}
.el-button--mini {
  min-height: 23px;
  padding: 6px 8px;
  font-size: 12px;
  border-radius: 5px;
}
/deep/.el-input__prefix-inner {
  pointer-events: all;
  display: none;
}
/deep/.el-input--prefix .el-input__inner {
  padding-left: 18px;
}
/deep/.el-table td.el-table__cell div {
  box-sizing: border-box;
  text-align: center;
}
@font-face {
  font-family: 'iconfont';  /* Project id 3164770 */
  src: url('//at.alicdn.com/t/font_3164770_li6io3l86zn.woff2?t=1644300384172') format('woff2'),
  url('//at.alicdn.com/t/font_3164770_li6io3l86zn.woff?t=1644300384172') format('woff'),
  url('//at.alicdn.com/t/font_3164770_li6io3l86zn.ttf?t=1644300384172') format('truetype');
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

.my-cead {
  height: 50px;
  width: 100%;
  display: flex;
  background-color: #f9f9f9;
}

.my-time {
  background-color: white;
  border-bottom: 1px solid #e9e9e9;
  border-top: 1px solid #e9e9e9;
  height: 47px;
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

.my-cead1 {
  width: 100%;
}

.an-card {
  padding: 10px 30px;
}

.an-cread {
  height: 288px;
  border: 1px solid #e9e9e9;
  display: flex;
}

.aks-div {
  height: 40px;
  padding-left: 15px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e9e9e9;
  color: black;
}

.my-caerdq {
  height: 124px;
  padding-right: 15px;
  padding-left: 50px;
  display: flex;
  align-items: center;

}

.my-ant {
  width: 195px;
  height: 51px;
  display: flex;
}

.my-ant-show {
  width: 50px;
  height: 50px;
  border-radius: 25px;
  cursor: pointer;
  display: flex;
  background-color: #cccccc;
}

.show-dv1 {
  height: 37px;
  padding-left: 5px;
  cursor: pointer;
}

.show-dv2 {
  height: 24px;
  width: 140px;
  font-size: 24px;
  color: #999;
  line-height: 17px;
  cursor: pointer;
}

.show-dv3 {
  height: 13px;
  width: 140px;
  color: black;
  font-size: 12px;
  cursor: pointer;
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

.div_a2 {
  height: 160px;
  width: 95%;
  padding: 10px;
}

.div-a3 {
  height: 65px;
  display: flex;
  text-align: center;
}

.div-a4 {
  height: 30px;
  width: 100%;
}

.ant-rows1 {
  color: rgb(30, 136, 229);
  font-size: 24px;
  line-height: 25px;
}

.ant-rows2 {
  color: rgb(252, 75, 108);
  font-size: 24px;
  line-height: 25px;
}

.ant-rows-span1 {
  background-color: rgb(30, 136, 229);
  width: 10px;
  height: 10px;
  border-radius: 5px;
  display: inline-block;
  margin-right: 10px;
}

.ant-rows-span2 {
  background-color: rgb(252, 75, 108);
  width: 10px;
  height: 10px;
  border-radius: 5px;
  display: inline-block;
  margin-right: 10px;
}

/deep/.el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell {
  background-color: #e9f7ff;
}
/deep/.el-table .el-table__cell {
  padding: 10px 0;
  min-width: 0;
  box-sizing: border-box;
  text-overflow: ellipsis;
  vertical-align: middle;
  position: relative;
  text-align: left;
}
</style>