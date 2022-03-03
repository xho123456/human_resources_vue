<template>
  <!-- 补打卡审批页面-->
  <div class="body_1">
    <el-tabs type="border-card">
      <!-- 待办申请页面 -->
      <el-tab-pane label="待办申请">
        <el-button @click="upcardMe(null)">重置</el-button>
        &nbsp;
        <el-input
            v-model="input"
            placeholder="输入名称搜索"
            style="width: 130px"
        />
        &nbsp;
        <el-button type="success" @click="upcardMe(input)">搜索</el-button>
        <!--  表格 -->
        <el-table
            ref="filterTable1"
            row-key="date1"
            :data="tableData1"
            style="width: 100%"
        >
          <el-table-column
              prop="auditflowdetaiDate"
              label="日期"
              width="140"
              column-key="date1"
          />
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
<!--                  type="primary"-->
<!--                  style="margin-left: 16px"-->
<!--                  @click="drawer = true"-->
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
              @size-change="upcardMe(input)"
              @current-change="upcardMe(input)"
              prev-text="上一页"
              next-text="下一页"
              background
          >
            <!--  @size-change="selectUsers" @current-change="selectUsers" -->
          </el-pagination>
        </div>
      </el-tab-pane>
      <!-- 点击详情，弹出抽屉-->
      <el-drawer v-model="drawer" title="I am the title" :with-header="false">
        <span>Hi there!</span>
      </el-drawer>
      <!-- 已办申请页面 -->
      <el-tab-pane label="已办申请">
        <el-button @click="upcarded(null)">重置</el-button>
        &nbsp;
        <el-input
            v-model="input1"
            placeholder="输入名称搜索nima"
            style="width: 130px"
        />
        &nbsp;
        <el-button type="success" @click="upcarded(input1)">搜索</el-button>

        <el-table
            ref="filterTable"
            row-key="date"
            :data="tableData"
            style="width: 100%"
        >
          <el-table-column
              prop="auditflowdetaiDate"
              label="日期"
              width="140"
          />
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
<!--                  type="primary"-->
<!--                  style="margin-left: 5px"-->
<!--                  @click="drawer = true"-->
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
              @size-change="upcarded(input1)"
              @current-change="upcarded(input1)"
              prev-text="上一页"
              next-text="下一页"
              background
          >
          </el-pagination>
        </div>
      </el-tab-pane>
	  <!-- 我的申请页面：补打卡 -->
	  <el-tab-pane label="我的申请">
	  	  
	          <el-button @click="upcardmy">重置</el-button>
	          <el-button   @click="punch = true" >发起申请</el-button>
	          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	  	  
	  	  
<!--	          <el-input-->
<!--	              v-model="input"-->
<!--	              placeholder="输入名称搜索"-->
<!--	              style="width: 130px"-->
<!--	          />-->
<!--	          &nbsp;-->
<!--	          <el-button type="success" plain>搜索</el-button>-->
	          <!-- 表格   -->
	          <el-table
	              ref="filterTable"
	              row-key="date"
	              :data="tableData2"
	              style="width: 100%"
	          >
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
                  @size-change="upcardmy()"
                  @current-change="upcardmy()"
                  prev-text="上一页"
                  next-text="下一页"
	                background
	            >
	            </el-pagination>
	          </div>

	  </el-tab-pane>
	  
	  <!-- 补打卡弹出框 -->
	  <el-dialog
	      v-model="punch"
	      title="补打卡"
	      width="50%"
	      :close-on-click-modal="false"
	      @close="cancel_6"
	  >
	    <el-form ref="form" :model="punch_1" label-width="120px">
	      <el-form-item label="员工名称">
	        <el-input v-model="punch_1.name" disabled></el-input>
	      </el-form-item>
	      <el-form-item label="补打卡类型">
	        <el-select v-model="punch_1.type_1" placeholder="选择类型">
	          <el-option label="未签到" value="未签到"></el-option>
	          <el-option label="未签退" value="未签退"></el-option>
	        </el-select>
	      </el-form-item>
	      <!-- 补打卡时间 -->
	      <el-form-item label="实际打卡时间">
	        <el-date-picker
	            v-model="punch_1.date1"
	            type="datetime"
	            placeholder="选择时间"
	            @change="difference4"
	        >
	        </el-date-picker>
	      </el-form-item>
	      <el-form-item label="补打卡备注">
	        <el-input
	            v-model="punch_1.remarks_1"
	            type="textarea"
	            maxlength="100"
	            show-word-limit
	        ></el-input>
	      </el-form-item>
	      <!-- 头像（审批人） -->
	      <el-form-item label="审批人">
	        <el-col :span="12">
	          <div class="demo-basic--circle">
	            <div class="block">
	              <el-avatar :size="50" :src="circleUrl"></el-avatar>
	              <div class="sub-title" style="line-height: 10px">
	                管理一号
	              </div>
	            </div>
	          </div>
	        </el-col>
	        <el-col :span="12">
	          <div class="demo-basic--circle">
	            <div class="block">
	              <el-avatar :size="50" :src="circleUrl"></el-avatar>
	            </div>
	            <div class="sub-title" style="line-height: 10px">管理二号</div>
	          </div>
	        </el-col>
	        <el-col :span="12">
	          <div class="demo-basic--circle">
	            <div class="block">
	              <el-avatar :size="50" :src="circleUrl"></el-avatar>
	            </div>
	            <div class="sub-title" style="line-height: 10px">管理三号</div>
	          </div>
	        </el-col>
	      </el-form-item>
	    </el-form>
	    <template #footer>
	      <span class="dialog-footer">
	        <el-button type="primary" @click="submitForm_6">确定</el-button>
	        <el-button @click="cancel_6">取消</el-button>
	      </span>
	    </template>
	  </el-dialog>
	  
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
import {defineComponent, ref} from "vue";
import {ElMessage} from "element-plus";

export default {
  setup() {
	   const punch = ref(false);
	   
    return {
      drawer: ref(false),
      input: ref(""),
      input1:ref(""),
	    punch,
    };
  },
  data() {
    return {
      staffName:this.$store.state.userall.staffName,
      deptPostId:this.$store.state.userall.deptPostId,
      staffId:this.$store.state.userall.staffId,
      deptId: this.$store.state.userall.deptId,

		//补打卡表单
		punch_1: {
		  //名称
		  name: "",
		  //类型
		  type_1: "",
		  //打卡时间
		  date1: "",
		  // 备注
		  remarks_1: "",
		},
		
      // 待办转正审批列表
      tableData: [
        {
          date: "2016-05-02",
          //审批编号
          AUDITFLOW_ID: "0001",
          //类型
          AUDITFLOW_TYPE: "补打卡",
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
          AUDITFLOW_TYPE: "补打卡",
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
          AUDITFLOW_TYPE: "补打卡",
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
          AUDITFLOW_TYPE: "补打卡",
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
      tableData1: [
        {
          date1: "2016-05-02",
          //审批编号
          AUDITFLOW_ID: "0001",
          //类型
          AUDITFLOW_TYPE: "补打卡",
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
          AUDITFLOW_TYPE: "补打卡",
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
          AUDITFLOW_TYPE: "补打卡",
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
          AUDITFLOW_TYPE: "补打卡",
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
    this.upcardMe(null);
    this.upcarded(null);
    this.upcardmy();
  },
  methods: {
    upcardMe(like){
      if (Object.prototype.toString.call(like)===Object.prototype.toString.call(null)) {
        this.pageInfo.staffName = this.staffName;
        this.pageInfo.auditflowdetaiState=1;
        this.axios({
          method: 'post',
          url: "http://localhost:8007/provider/fillclock/fillclockMe",
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
          url: "http://localhost:8007/provider/fillclock/LikeName",
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

    upcarded(like){
      if (Object.prototype.toString.call(like)===Object.prototype.toString.call(null)) {
        this.pageInfo.staffName = this.staffName;
        this.pageInfo.auditflowdetaiState=2;
        this.axios({
          method: 'post',
          url: "http://localhost:8007/provider/fillclock/fillclockMe",
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
          url: "http://localhost:8007/provider/fillclock/LikeName",
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
    upcardmy(){
      this.pageInfo.staffName = this.staffName;
      this.axios({
        method: 'post',
        url: "http://localhost:8007/provider/fillclock/fillclockMy",
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
    },


	  // 提交补打卡
	  submitForm_6() {
	    if (this.punch_1.type_1.length === 0) {
	      ElMessage("请选择您的补打卡类型");
	    } else if (this.punch_1.date1.length === 0) {
	      ElMessage("请选择实际打卡时间");
	    } else if (this.punch_1.remarks_1.length === 0) {
	      ElMessage("请输入补打卡备注");
	    } else {
        this.axios({
          method:'post',
          url:"http://localhost:8007/provider/fillclock/add",
          data:{
            staffId: this.staffId,
            // 申请人
            staffName: this.staffName,
            // 部门编号
            deptId: this.deptId,

            // 补打卡类型
            cardType: this.punch_1.type_1,
            // 备注
            cardRemarks: this.punch_1.remarks_1,
            // 补卡时间
            cardDate: this.punch_1.date1,

            // 审批人1
            staffName1: "刘金科1",
            // 审批人2
            staffName2: "刘金科2",
            // 审批人3
            staffName3: "刘金科3",
            // 审批类型
            auditflowType: "补打卡",
            // 审批标题
            auditflowTitle: this.staffName + "的" + this.punch_1.type_1
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
            this.upcardmy();
            this.cancel_6();
          } else {
            ElMessage.error("申请失败");
            this.cancel_6();
            this.upcardmy();
          }
        }).catch(function (error){
          console.log('获取表单失败')
          console.log(error)
        })
      }
    },
	  // 取消补打卡
	  cancel_6() {
	    this.punch_1 = {
	      //名称
	      name: "",
	      //类型
	      type_1: "",
	      //打卡时间
	      date1: "",
	      // 备注
	      remarks_1: "",
	    };
	    this.punch = false;
	  },
	  // 判断补打卡
	  difference4: function (beginTime) {
	    let now = new Date();
	    if (beginTime > now) {
	      ElMessage({
	        message: "补卡时间不能大于当前时间，请重新选择!",
	        type: "warning",
	      });
	      this.cancel_date4();
	    }
	  },
	  cancel_date4() {
	    this.punch_1.date1 = "";
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

    through3(id){
      this.pageInfo.auditFlowId=id;
      this.axios({
        method:'post',
        url:"http://localhost:8007/provider/undo",
        data:this.pageInfo,
        responseType:'json',
        responseEncoding:'utf-8',
      }).then((response)=>{
        console.log(response);
        if (response.data.info === 1111) {
          ElMessage({
            type: "success",
            message: "撤销成功",
          });
          this.quitmy();
        } else {
          ElMessage.error("撤销失败");
          this.quitmy();
        }
      }).catch(function (error){
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
