<template>
  <!--  出差审批页面-->
  <div class="body_1">
    <el-tabs type="border-card">
      <!-- 待办申请页面 -->
      <el-tab-pane label="待办申请">
        <el-button @click="errandMe(null)">重置</el-button>
        &nbsp;
        <el-input
          v-model="input"
          placeholder="输入名称搜索"
          style="width: 130px"
        />
        &nbsp;
        <el-button type="success" @click="errandMe(input)">搜索</el-button>
        <!--  表格 -->
        <el-table
          ref="filterTable1"
          row-key="date1"
          :data="tableData"
          style="width: 100%"
        >
          <el-table-column prop="auditflowdetaiDate" label="日期" width="140"/>
          <el-table-column prop="auditflowId" label="审批编号" width="100"/>
          <el-table-column prop="auditflowType" label="流程" width="100"/>
          <el-table-column prop="staffName" label="申请人" width="150"/>
          <el-table-column prop="auditflowdetaiState" label="状态" width="100">
            <template #default="scope">
              <span v-if="scope.row.auditflowdetaiState==0">审批中</span>
              <span v-if="scope.row.auditflowdetaiState==1">待我审批</span>
              <span v-if="scope.row.auditflowdetaiState==2">已审批</span>
              <span v-if="scope.row.auditflowdetaiState==3">驳回</span>
            </template>
          </el-table-column>
          <el-table-column prop="staffName2" label="历史审批人" width="150"/>
          <el-table-column prop="createdTime" label="最近处理" width="140"/>

          <el-table-column label="操作">
            <template #default="scope">
              <el-popconfirm
                  confirm-button-text="确定"
                  cancel-button-text="取消"
                  :icon="InfoFilled"
                  icon-color="red"
                  title="确定通过吗?"
                  @confirm="through1(scope.row)"
              >
                <template #reference>
                  <el-button type="success" plain>通过</el-button>
                </template>
              </el-popconfirm>
              <el-popconfirm
                  confirm-button-text="确定"
                  cancel-button-text="取消"
                  :icon="InfoFilled"
                  icon-color="red"
                  title="确定驳回吗?"
                  @confirm="through2(scope.row)"
              >
                <template #reference>
                  <el-button type="danger" plain>驳回</el-button>
                </template>
              </el-popconfirm>
<!--              <el-button-->
<!--                type="primary"-->
<!--                style="margin-left: 16px"-->
<!--                @click="drawer = true"-->
<!--              >-->
<!--                详情-->
<!--              </el-button>-->
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页插件 -->
        <div class="demo-pagination-block">
          <el-pagination
            v-model:currentPage="pageInfo.currentPage"
            :page-sizes="[3, 5, 10, 50]"
            v-model:page-size="pageInfo.pagesize"
            :default-page-size="pageInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageInfo.total"
            :pager-count="5"
            @size-change="errandMe(input)"
            @current-change="errandMe(input)"
            prev-text="上一页"
            next-text="下一页"
            background
          >

          </el-pagination>
        </div>
      </el-tab-pane>
      <!-- 点击详情，弹出抽屉-->
      <el-drawer v-model="drawer" title="I am the title" :with-header="false">
        <span>Hi there!</span>
      </el-drawer>
      <!-- 已办申请页面 -->
      <el-tab-pane label="已办申请">
        <el-button @click="erranded(null)">重置</el-button>
        &nbsp;
        <el-input
          v-model="input1"
          placeholder="输入名称搜索"
          style="width: 130px"
        />
        &nbsp;
        <el-button type="success" @click="erranded(input1)">搜索</el-button>

        <el-table
          ref="filterTable"
          row-key="date"
          :data="tableData1"
          style="width: 100%"
        >
          <el-table-column prop="auditflowdetaiDate" label="日期" width="140"/>
          <el-table-column prop="auditflowId" label="审批编号" width="100"/>
          <el-table-column prop="auditflowType" label="流程" width="100"/>
          <el-table-column prop="staffName" label="申请人" width="150"/>
          <el-table-column prop="auditflowdetaiState" label="状态" width="100">
            <template #default="scope">
              <span v-if="scope.row.auditflowdetaiState==0">审批中</span>
              <span v-if="scope.row.auditflowdetaiState==1">待我审批</span>
              <span v-if="scope.row.auditflowdetaiState==2">已审批</span>
              <span v-if="scope.row.auditflowdetaiState==3">驳回</span>
            </template>
          </el-table-column>
          <el-table-column prop="staffName2" label="历史审批人" width="150"/>
          <el-table-column prop="createdTime" label="最近处理" width="140"/>

<!--          <el-table-column label="操作">-->
<!--            <template #default="scope">-->
<!--              <el-button-->
<!--                type="primary"-->
<!--                style="margin-left: 5px"-->
<!--                @click="drawer = true"-->
<!--              >-->
<!--                详情-->
<!--              </el-button>-->
<!--            </template>-->
<!--          </el-table-column>-->
        </el-table>

        <!-- 分页插件 -->
        <div class="demo-pagination-block">
          <el-pagination
            v-model:currentPage="pageInfo.currentPage"
            :page-sizes="[3, 5, 10, 50]"
            v-model:page-size="pageInfo.pagesize"
            :default-page-size="pageInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageInfo.total"
            :pager-count="5"
            @size-change="erranded(input1)"
            @current-change="erranded(input1)"
            prev-text="上一页"
            next-text="下一页"
            background
          >

          </el-pagination>
        </div>
      </el-tab-pane>
	  
	  <!-- 我的申请页面：出差 -->
	  <el-tab-pane label="我的申请">
	  	  
	          <el-button @click="errandmy">重置</el-button>
	          <el-button   @click="travel = true" >发起申请</el-button>


	          <!-- 表格   -->
	          <el-table
	              ref="filterTable"
	              row-key="date"
	              :data="tableData2"
	              style="width: 100%"
	          >
              <el-table-column prop="auditflowdetaiDate" label="日期" width="140"/>
              <el-table-column prop="auditflowId" label="审批编号" width="100"/>
              <el-table-column prop="auditflowType" label="流程" width="100"/>
              <el-table-column prop="staffName" label="申请人" width="150"/>
              <el-table-column prop="auditflowState" label="状态" width="100">
                <template #default="scope">
                  <span v-if="scope.row.auditflowState===0">审批中</span>
                  <span v-if="scope.row.auditflowState===1">通过</span>
                  <span v-if="scope.row.auditflowState===2">驳回</span>
                  <span v-if="scope.row.auditflowState===3">撤销</span>
                </template>
              </el-table-column>
              <el-table-column prop="staffName2" label="历史审批人" width="150"/>
              <el-table-column prop="createdTime" label="最近处理" width="140"/>

	            <el-table-column label="操作" >
	              <template #default="scope" >
	                <el-popconfirm
	                    confirm-button-text="确定"
	                    cancel-button-text="取消"
	                    :icon="InfoFilled"
	                    icon-color="red"
	                    title="确定撤销吗?"
	                    @confirm="through3(scope.row.auditflowId)"
	                >
	                  <template #reference>
	                    <el-button type="success" plain>撤销</el-button>
	                  </template>
	                </el-popconfirm>
<!--	                <el-button-->
<!--	                    type="primary"-->
<!--	                    style="margin-left: 16px"-->
<!--	                    @click="drawer = true"-->
<!--	                >-->
<!--	                  详情-->
<!--	                </el-button>-->
	              </template>
	            </el-table-column>
	          </el-table>
	  	  
	          <!-- 分页插件 -->
	          <div class="demo-pagination-block">
	            <el-pagination
	                v-model:currentPage="pageInfo.currentPage"
	                :page-sizes="[3, 5, 10, 50]"
	                v-model:page-size="pageInfo.pagesize"
	                :default-page-size="pageInfo.pagesize"
	                layout="total, sizes, prev, pager, next, jumper"
	                :total="pageInfo.total"
	                :pager-count="5"
                  @size-change="errandmy()"
                  @current-change="errandmy()"
                  prev-text="上一页"
                  next-text="下一页"
	                background
	            >
	            </el-pagination>
	          </div>
	  	  

	  </el-tab-pane>
	  
	  <!-- 出差弹出框 -->
	  <el-dialog
	      v-model="travel"
	      title="出差"
	      width="50%"
	      :close-on-click-modal="false"
	      @close="cancel_7"
	  >
	    <el-form ref="form" :model="travel_1" label-width="120px">
	      <el-form-item label="员工名称">
	        <el-input v-model="this.staffName" disabled></el-input>
	      </el-form-item>
	      <el-form-item label="部门编号">
	        <el-input v-model="this.deptId" disabled></el-input>
	      </el-form-item>
	      <!-- 出差地址选择器 -->
	      <el-form-item label="出差地址">
	        <div id="app">
	          <div>
	            <el-cascader
	                size="large"
	                :options="options"
	                v-model="travel_1.remarks_1"
	                @change="handleChange"
	            >
	            </el-cascader>
	          </div>
	        </div>
	      </el-form-item>
	      <el-form-item label="出差事由">
	        <el-input
	            v-model="travel_1.remarks_2"
	            type="textarea"
	            maxlength="100"
	            show-word-limit
	        ></el-input>
	      </el-form-item>
	      <!-- 出差开始时间 -->
	      <el-form-item label="出差开始时间">
	        <el-date-picker
	            v-model="travel_1.date1"
	            type="date"
	            @change="difference2_1(travel_1.date1)"
	            placeholder="选择时间"
	        ></el-date-picker>
	      </el-form-item>
	      <!-- 出差结束时间 -->
	      <el-form-item label="出差结束时间">
	        <el-date-picker
	            v-model="travel_1.date2"
	            type="date"
	            placeholder="选择时间"
	            @change="difference2_2(travel_1.date1, travel_1.date2)"
	        ></el-date-picker>
	      </el-form-item>
	      <!-- 出差总时长 -->
	      <el-form-item label="请假总时长">
	        <el-input v-model="travel_1.date3" disabled></el-input>
	      </el-form-item>
	      <!-- 头像（审批人） -->
	      <el-form-item label="审批人">
	        <el-col :span="12">
	          <div class="demo-basic--circle">
	            <div class="block">
	              <el-avatar :size="50" :src="circleUrl"></el-avatar>
	              <div class="sub-title" style="line-height: 10px">
	                刘金科1
	              </div>
	            </div>
	          </div>
	        </el-col>
	        <el-col :span="12">
	          <div class="demo-basic--circle">
	            <div class="block">
	              <el-avatar :size="50" :src="circleUrl"></el-avatar>
	            </div>
	            <div class="sub-title" style="line-height: 10px">刘金科2</div>
	          </div>
	        </el-col>
	        <el-col :span="12">
	          <div class="demo-basic--circle">
	            <div class="block">
	              <el-avatar :size="50" :src="circleUrl"></el-avatar>
	            </div>
	            <div class="sub-title" style="line-height: 10px">刘金科3</div>
	          </div>
	        </el-col>
	      </el-form-item>
	    </el-form>
	    <template #footer>
	      <span class="dialog-footer">
	        <el-button type="primary" @click="submitForm_7">确定</el-button>
	        <el-button @click="cancel_7">取消</el-button>
	      </span>
	    </template>
	  </el-dialog>·
	  
    </el-tabs>
  </div>
</template>

<script>

import {
  Search,
  Edit,
  Check,
  Message,
  Star,
  Delete,
} from "@element-plus/icons";
import { defineComponent, ref } from "vue";
import {ElMessage} from "element-plus";
import {regionData, CodeToText} from "element-china-area-data"; //地址选择器导入

export default {
  setup() {
	  const travel = ref(false);
    return {
      drawer: ref(false),
      input: ref(""),
      input1: ref(""),
	  travel,
    };
  },
  data() {
    return {
      staffName:this.$store.state.userall.staffName,
      deptPostId:this.$store.state.userall.deptPostId,
      staffId:this.$store.state.userall.staffId,
      deptId: this.$store.state.userall.deptId,


      options: regionData,
      selectedOptions: [],
      //出差表单
      travel_1: {
        //名称
        name: "",
        //部门
        dept: "",
        //出差地点
        remarks_1: "",
        //出差事由
        remarks_2: "",
        //开始时间
        date1: "",
        //结束时间
        date2: "",
        //出差总时长
        date3: "",
      },
		
      // 待办转正审批列表
      tableData: [
        {
          date: "2016-05-02",
          //审批编号
          AUDITFLOW_ID: "0001",
          //类型
          AUDITFLOW_TYPE: "出差",
          //申请人（员工名称）
          STAFF_ID: "名字",
          //审批状态
          AUDITFLOW_STATE: "通过",
          //审批人
          STAFF_NAME: "管理员",
          //最近处理
          UPDATED_TIME: "2020-01-01",
        },
        {
          date: "2016-05-03",
          //审批编号
          AUDITFLOW_ID: "0001",
          //类型
          AUDITFLOW_TYPE: "出差",
          //申请人（员工名称）
          STAFF_ID: "名字",
          //审批状态
          AUDITFLOW_STATE: "通过",
          //审批人
          STAFF_NAME: "管理员",
          //最近处理
          UPDATED_TIME: "2020-01-01",
        },
        {
          date: "2016-05-04",
          //审批编号
          AUDITFLOW_ID: "0001",
          //类型
          AUDITFLOW_TYPE: "出差",
          //申请人（员工名称）
          STAFF_ID: "名字",
          //审批状态
          AUDITFLOW_STATE: "通过",
          //审批人
          STAFF_NAME: "管理员",
          //最近处理
          UPDATED_TIME: "2020-01-01",
        },
        {
          date: "2016-05-05",
          //审批编号
          AUDITFLOW_ID: "0001",
          //类型
          AUDITFLOW_TYPE: "出差",
          //申请人（员工名称）
          STAFF_ID: "名字",
          //审批状态
          AUDITFLOW_STATE: "通过",
          //审批人
          STAFF_NAME: "管理员",
          //最近处理
          UPDATED_TIME: "2020-01-01",
        },
      ],
      // 已办转正审批列表
      tableData1: [
        {
          date1: "2016-05-02",
          //审批编号
          AUDITFLOW_ID: "0001",
          //类型
          AUDITFLOW_TYPE: "出差",
          //申请人（员工名称）
          STAFF_ID: "名字",
          //审批状态
          AUDITFLOW_STATE: "通过",
          //审批人
          STAFF_NAME: "管理员",
          //最近处理
          UPDATED_TIME: "2020-01-01",
        },
        {
          date1: "2016-05-03",
          //审批编号
          AUDITFLOW_ID: "0001",
          //类型
          AUDITFLOW_TYPE: "出差",
          //申请人（员工名称）
          STAFF_ID: "名字",
          //审批状态
          AUDITFLOW_STATE: "通过",
          //审批人
          STAFF_NAME: "管理员",
          //最近处理
          UPDATED_TIME: "2020-01-01",
        },
        {
          date1: "2016-05-04",
          //审批编号
          AUDITFLOW_ID: "0001",
          //类型
          AUDITFLOW_TYPE: "出差",
          //申请人（员工名称）
          STAFF_ID: "名字",
          //审批状态
          AUDITFLOW_STATE: "通过",
          //审批人
          STAFF_NAME: "管理员",
          //最近处理
          UPDATED_TIME: "2020-01-01",
        },
        {
          date1: "2016-05-05",
          //审批编号
          AUDITFLOW_ID: "0001",
          //类型
          AUDITFLOW_TYPE: "出差",
          //申请人（员工名称）
          STAFF_ID: "名字",
          //审批状态
          AUDITFLOW_STATE: "通过",
          //审批人
          STAFF_NAME: "管理员",
          //最近处理
          UPDATED_TIME: "2020-01-01",
        },
      ],

      tableData2:[],

      // 分页
      pageInfo: {
        // 分页参数
        currentPage: 1, //当前页
        pageSize: 3, // 页大小
        total: 0, // 总页数

        staffName:"",
        staffName1: "",
        auditflowdetaiState:0,
      },
    };
  },
  mounted() {
    this.errandMe(null);
    this.erranded(null);
    this.errandmy();
  },
  methods: {
    errandMe(like){
      if (Object.prototype.toString.call(like)===Object.prototype.toString.call(null)) {
        this.pageInfo.staffName = this.staffName;
        this.pageInfo.auditflowdetaiState=1;
        this.axios({
          method: 'post',
          url: "http://localhost:8007/provider/erection/erectionMe",
          data: this.pageInfo,
          responseType: 'json',
          responseEncoding: 'utf-8',
        }).then((response) => {
          console.log(response);
          this.tableData = response.data.data.records
          this.pageInfo.total = response.data.data.total
        }).catch(function (error) {
          console.log('获取表单失败')
          console.log(error)
        })
      }else {
        this.pageInfo.staffName = this.staffName;
        this.pageInfo.auditflowdetaiState=1;
        this.pageInfo.staffName1 = like;
        this.axios({
          method: 'post',
          url: "http://localhost:8007/provider/erection/LikeName",
          data: this.pageInfo,
          responseType: 'json',
          responseEncoding: 'utf-8',
        }).then((response) => {
          console.log(response);
          this.tableData = response.data.data.records
          this.pageInfo.total = response.data.data.total
        }).catch(function (error) {
          console.log('获取表单失败')
          console.log(error)
        })
      }
    },

    erranded(like){
      if (Object.prototype.toString.call(like)===Object.prototype.toString.call(null)) {
        this.pageInfo.staffName = this.staffName;
        this.pageInfo.auditflowdetaiState=2;
        this.axios({
          method: 'post',
          url: "http://localhost:8007/provider/erection/erectionMe",
          data: this.pageInfo,
          responseType: 'json',
          responseEncoding: 'utf-8',
        }).then((response) => {
          console.log(response);
          this.tableData1 = response.data.data.records
          this.pageInfo.total = response.data.data.total
        }).catch(function (error) {
          console.log('获取表单失败')
          console.log(error)
        })
      }else {
        this.pageInfo.staffName = this.staffName;
        this.pageInfo.staffName1 = like;
        this.pageInfo.auditflowdetaiState=2;
        this.axios({
          method: 'post',
          url: "http://localhost:8007/provider/erection/LikeName",
          data: this.pageInfo,
          responseType: 'json',
          responseEncoding: 'utf-8',
        }).then((response) => {
          console.log(response);
          this.tableData1 = response.data.data.records
          this.pageInfo.total = response.data.data.total
        }).catch(function (error) {
          console.log('获取表单失败')
          console.log(error)
        })
      }
    },
    errandmy(){
      this.pageInfo.staffName = this.staffName;
      this.axios({
        method: 'post',
        url: "http://localhost:8007/provider/erection/erectionMy",
        data: this.pageInfo,
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log(response);
        this.tableData2 = response.data.data.records
        this.pageInfo.total = response.data.data.total
      }).catch(function (error) {
        console.log('获取表单失败')
        console.log(error)
      })
    },

	  // 地址选择器
	  handleChange() {
		for (let i = 0; i < this.selectedOptions.length; i++) {
		  this.travel_1.remarks_1 += CodeToText[this.selectedOptions[i]];
		}
	  },
  
	  // 提交出差
	  submitForm_7() {
	    if (this.travel_1.remarks_1.length === 0) {
	      ElMessage("请输入出差地址");
	    } else if (this.travel_1.remarks_2.length === 0) {
	      ElMessage("请输入出差事由");
	    } else if (this.travel_1.date1.length === 0) {
	      ElMessage("请选择开始时间");
	    } else if (this.travel_1.date2.length === 0) {
	      ElMessage("请选择结束时间");
	    } else {
        this.axios({
          method:'post',
          url:"http://localhost:8007/provider/erection/add",
          data:{
            staffId: this.staffId,
            // 申请人
            staffName: this.staffName,
            // 部门编号
            deptId: this.deptId,
            // 出差地点
            travelPlace: this.travel_1.remarks_1,
            // 出差事由
            travelMatter: this.travel_1.remarks_2,
            // 出差开始日期
            travelSDate: this.travel_1.date1,
            //出差结束日期
            travelEDate:this.travel_1.date2,
            //出差总小时
            travelTotalDate:this.travel_1.date2,

            // 审批人1
            staffName1: "刘金科1",
            // 审批人2
            staffName2: "刘金科2",
            // 审批人3
            staffName3: "刘金科3",
            // 审批类型
            auditflowType: "出差",
            // 审批标题
            auditflowTitle: this.staffName + "的" + this.travel_1.remarks_2
          },
          responseType:'json',
          responseEncoding:'utf-8',
        }).then((response)=>{
          console.log(response);
          if (response.data.info === 1111) {
            ElMessage({
              type: "success",
              message: "申请成功",
            });
            this.errandmy();
            this.cancel_7();
          } else {
            ElMessage.error("申请失败");
            this.cancel_7();
            this.errandmy();
          }
        }).catch(function (error){
          console.log('获取表单失败')
          console.log(error)
        })

      }
	  },


	  // 取消出差
	  cancel_7() {
	    this.travel_1 = {
	      name: "",
	      dept: "",
	      remarks_1: "",
	      remarks_2: "",
	      date1: "",
	      date2: "",
	      date3: "",
	    };
	    this.travel = false;
	  },
 // 判断出差开始时间
    difference2_1: function (beginTime) {
      var date = new Date();
      if (beginTime < date) {
        ElMessage({
          message: "加班开始时间小于当前时间，请重新选择!",
          type: "warning",
        });
        this.cancel_date2();
      }
    },
    // 计算出差开始天数
    difference2_2: function (beginTime, endTime) {
      if (beginTime.length == 0) {
        ElMessage({
          message: "请选择出差开始时间!",
          type: "warning",
        });
        this.cancel_date();
      } else if (endTime < beginTime) {
        ElMessage({
          message: "出差结束时间小于出差开始时间，请重新选择!",
          type: "warning",
        });
        this.cancel_date2();
      } else {
        var dateBegin = new Date(beginTime);
        var dateEnd = new Date(endTime);
        var dateDiff = dateEnd.getTime() - dateBegin.getTime(); //时间差的毫秒数
        var days = Math.floor(dateDiff / (24 * 60 * 60 * 1000));
        console.log("天数：" + days);
        var hours = Math.floor(days * 8);
        console.log("时间差：" + hours);
        if (hours == 0) {
          ElMessage({
            message: "开始时间与结束时间相同，请重新选择!",
            type: "warning",
          });
          this.cancel_date2();
        } else {
          this.travel_1.date3 = hours + "小时";
        }
      }
    },
	  cancel_date2() {
	    this.travel_1.date1 = "";
	    this.travel_1.date2 = "";
	    this.travel_1.date3 = "";
	  },
	  
    // 重置日期过滤
    resetDateFilter1() {
      this.$refs.filterTable1.clearFilter("date1");
    },
    // 重置日期过滤
    resetDateFilter() {
      this.$refs.filterTable.clearFilter("date");
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    // 筛选
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    // 点击通过确认按钮触发
    through1(row){
      if (this.postId==16){
        this.axios({
          method:'post',
          url:"http://localhost:8007/provider/auditflow/positive",
          data:row,
          responseType:'json',
          responseEncoding:'utf-8',
        }).then(response=>{
          console.log(response)
          if (response.data.info === 1111) {
            ElMessage({
              type: "success",
              message: "通过成功",
            });
          } else{
            ElMessage.error("通过失败");
          }
        })
      }else if (this.postId==17){
        this.axios({
          method:'post',
          url:"http://localhost:8007/provider/auditflow/positive",
          data:row,
          responseType:'json',
          responseEncoding:'utf-8',
        }).then(response=>{
          console.log(response)
          if (response.data.info === 1111) {
            ElMessage({
              type: "success",
              message: "通过成功",
            });
          } else {
            ElMessage.error("通过失败");
          }
        })
      }else if (this.postId==18){
        this.axios({
          method:'post',
          url:"http://localhost:8007/provider/auditflow/positiveend",
          data:row,
          responseType:'json',
          responseEncoding:'utf-8',
        }).then(response=>{
          console.log(response)
          if (response.data.info === 1111) {
            ElMessage({
              type: "success",
              message: "通过成功",
            });
          } else {
            ElMessage.error("通过失败");
          }
        })
      }else {
        ElMessage({
          message: "权限不够",
          type: "warning"
        })
      }
    },
    // 点击驳回确认按钮触发
    through2(row){
      if (this.postId==16){
        this.axios({
          method:'post',
          url:"http://localhost:8007/provider/auditflow/rejected",
          data:row,
          responseType:'json',
          responseEncoding:'utf-8',
        }).then(response=>{
          console.log(response)
          if (response.data.info === 1111) {
            ElMessage({
              type: "success",
              message: "驳回成功",
            });
          } else{
            ElMessage.error("驳回失败");
          }
        })
      }else if (this.postId==17){
        this.axios({
          method:'post',
          url:"http://localhost:8007/provider/auditflow/rejected",
          data:row,
          responseType:'json',
          responseEncoding:'utf-8',
        }).then(response=>{
          console.log(response)
          if (response.data.info === 1111) {
            ElMessage({
              type: "success",
              message: "驳回成功",
            });
          } else {
            ElMessage.error("驳回失败");
          }
        })
      }else if (this.postId==18){
        this.axios({
          method:'post',
          url:"http://localhost:8007/provider/auditflow/rejected",
          data:row,
          responseType:'json',
          responseEncoding:'utf-8',
        }).then(response=>{
          console.log(response)
          if (response.data.info === 1111) {
            ElMessage({
              type: "success",
              message: "驳回成功",
            });
          } else {
            ElMessage.error("驳回失败");
          }
        })
      }else {
        ElMessage({
          message: "权限不够",
          type: "warning"
        })
      }
    },

    through3(id) {
      this.pageInfo.auditFlowId = id;
      this.axios({
        method: 'post',
        url: "http://localhost:8007/provider/undo",
        data: this.pageInfo,
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log(response);
        if (response.data.info === 1111) {
          ElMessage({
            type: "success",
            message: "撤销成功",
          });
          this.Movemy();
        } else {
          ElMessage.error("撤销失败");
          this.Movemy();
        }
      }).catch(function (error) {
        console.log('获取表单失败')
        console.log(error)
      })
    }


    },
};
</script>

<style scoped>
@import url("../../css/Examine_2.css");
/deep/.el-table .el-table__cell{
  text-align: center;
}
</style>