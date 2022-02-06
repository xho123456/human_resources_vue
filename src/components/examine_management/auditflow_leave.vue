<template>
  <!--  请假审批页面 -->
  <div class="body_1">
    <el-tabs type="border-card">
      <!-- 待办申请页面 -->
      <el-tab-pane label="待办申请">
        <el-button @click="resetDateFilter1">重置日期过滤</el-button>
        &nbsp;
        <el-input
            v-model="input"
            placeholder="输入名称搜索"
            style="width: 130px"
        />
        &nbsp;
        <el-button type="success" plain>搜索</el-button>
        <!--  表格 -->
        <el-table
            ref="filterTable1"
            row-key="date1"
            :data="tableData1"
            style="width: 100%"
        >
          <el-table-column
              prop="date1"
              label="日期"
              sortable
              width="140"
              column-key="date1"
              :filters="[
              { text: '2016-05-01', value: '2016-05-01' },
              { text: '2016-05-02', value: '2016-05-02' },
              { text: '2016-05-03', value: '2016-05-03' },
              { text: '2016-05-04', value: '2016-05-04' },
            ]"
              :filter-method="filterHandler"
          />
          <el-table-column prop="AUDITFLOW_ID" label="审批编号" width="100"/>
          <el-table-column prop="AUDITFLOW_TYPE" label="流程" width="100"/>
          <el-table-column prop="STAFF_ID" label="申请人" width="150"/>
          <!-- <el-table-column prop="name" label="操作人" width="100" /> -->
          <el-table-column prop="AUDITFLOW_STATE" label="状态" width="100"/>
          <el-table-column prop="STAFF_NAME" label="当前审批人" width="150"/>
          <el-table-column prop="UPDATED_TIME" label="最近处理" width="150"/>

          <!-- <el-table-column prop="tag" label="操作" width="100">
						<el-button type="success" plain>通过</el-button>
						<el-button type="danger" plain>驳回</el-button>
					</el-table-column> -->
          <el-table-column label="操作">
            <template #default="scope">
              <el-popconfirm
                  confirm-button-text="确定"
                  cancel-button-text="取消"
                  :icon="InfoFilled"
                  icon-color="red"
                  title="确定通过吗?"
                  @confirm="through1()"
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
                  @confirm="through2()"
              >
                <template #reference>
                  <el-button type="danger" plain>驳回</el-button>
                </template>
              </el-popconfirm>
              <el-button
                  type="primary"
                  style="margin-left: 16px"
                  @click="drawer = true"
              >
                详情
              </el-button>
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
        <el-button @click="resetDateFilter">重置日期过滤</el-button>
        &nbsp;
        <el-input
            v-model="input"
            placeholder="输入名称搜索nima"
            style="width: 130px"
        />
        &nbsp;
        <el-button type="success" plain>搜索</el-button>

        <el-table
            ref="filterTable"
            row-key="date"
            :data="tableData"
            style="width: 100%"
        >
          <el-table-column
              prop="date"
              label="日期"
              sortable
              width="140"
              column-key="date"
              :filters="[
              { text: '2016-05-01', value: '2016-05-01' },
              { text: '2016-05-02', value: '2016-05-02' },
              { text: '2016-05-03', value: '2016-05-03' },
              { text: '2016-05-04', value: '2016-05-04' },
            ]"
              :filter-method="filterHandler"
          />
          <el-table-column prop="AUDITFLOW_ID" label="审批编号" width="100"/>
          <el-table-column prop="AUDITFLOW_TYPE" label="流程" width="100"/>
          <el-table-column prop="STAFF_ID" label="申请人" width="150"/>
          <!-- <el-table-column prop="name" label="操作人" width="100" /> -->
          <el-table-column prop="AUDITFLOW_STATE" label="状态" width="100"/>
          <el-table-column prop="STAFF_NAME" label="历史审批人" width="150"/>
          <el-table-column prop="UPDATED_TIME" label="最近处理" width="140"/>

          <el-table-column label="操作">
            <template #default="scope">
              <el-button
                  type="primary"
                  style="margin-left: 5px"
                  @click="drawer = true"
              >
                详情
              </el-button>
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
              background
          >
            <!--  @size-change="selectUsers"
						@current-change="selectUsers" -->
          </el-pagination>
        </div>
      </el-tab-pane>
	  
	  <!-- 我的申请页面：请假 -->
	  <el-tab-pane label="我的申请">
	  	  
	          <el-button @click="resetDateFilter">重置日期过滤</el-button>
	          <el-button   @click="sick = true" >发起申请</el-button>
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
	  	  
	  	  
	          <el-input
	              v-model="input"
	              placeholder="输入名称搜索"
	              style="width: 130px"
	          />
	          &nbsp;
	          <el-button type="success" plain>搜索</el-button>
	          <!-- 表格   -->
	          <el-table
	              ref="filterTable"
	              row-key="date"
	              :data="tableData"
	              style="width: 100%"
	          >
	            <el-table-column
	                prop="date"
	                label="日期"
	                sortable
	                width="140"
	                column-key="date"
	                :filters="[
	          { text: '2016-05-01', value: '2016-05-01' },
	          { text: '2016-05-02', value: '2016-05-02' },
	          { text: '2016-05-03', value: '2016-05-03' },
	          { text: '2016-05-04', value: '2016-05-04' },
	        ]"
	                :filter-method="filterHandler"
	            />
	            <el-table-column prop="name" label="审批编号" width="150"/>
	            <el-table-column prop="name" label="流程" width="150"/>
	            <el-table-column prop="name" label="申请人" width="160"/>
	            <el-table-column prop="name" label="状态" width="160"/>
	            <el-table-column prop="name" label="当前审批人" width="160"/>
	            <el-table-column prop="name" label="最近处理" width="160"/>
	            <el-table-column label="操作" >
	              <template #default="scope" >
	                <el-popconfirm
	                    confirm-button-text="确定"
	                    cancel-button-text="取消"
	                    :icon="InfoFilled"
	                    icon-color="red"
	                    title="确定撤销吗?"
	                    @confirm="through1()"
	                >
	                  <template #reference>
	                    <el-button type="success" plain>撤销</el-button>
	                  </template>
	                </el-popconfirm>
	                <el-button
	                    type="primary"
	                    style="margin-left: 16px"
	                    @click="drawer = true"
	                >
	                  详情
	                </el-button>
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
	                background
	            >
	            </el-pagination>
	          </div>
	  	  
	      <!--   弹出抽屉 -->
	      <el-drawer v-model="drawer" title="I am the title" :with-header="false">
	        <span>臭傻逼啊看什么看</span>
	      </el-drawer>	  
	  </el-tab-pane>
	  
	  <!-- 请假弹出框 -->
	  <el-dialog
	      v-model="sick"
	      title="请假"
	      width="50%"
	      :close-on-click-modal="false"
	      @close="cancel_8"
	  >
	    <el-form ref="form" :model="sick_1" label-width="120px">
	      <el-form-item label="员工名称">
	        <el-input v-model="sick_1.name" disabled></el-input>
	      </el-form-item>
	      <el-form-item label="部门名称">
	        <el-input v-model="sick_1.dept" disabled></el-input>
	      </el-form-item>
	  
	      <el-form-item label="请假类型" >
	       <!-- <el-input v-model="sick_1.type_1" disabled></el-input> -->
			 <el-select v-model="value" placeholder="请选择" @change="handleNative">
			    <el-option
			      v-for="item in options"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option> 
			  </el-select>
	      </el-form-item>
			
	      <el-form-item label="请假事由">
	        <el-input
	            v-model="sick_1.remarks_1"
	            type="textarea"
	            maxlength="100"
	            show-word-limit
	        ></el-input>
	      </el-form-item>
	      <!-- 请假开始时间 -->
	      <el-form-item label="请假开始时间">
	        <el-col :span="11">
	          <el-date-picker
	              v-model="sick_1.date1"
	              type="datetime"
	              placeholder="选择时间"
	              @change="difference3_1(sick_1.date1)"
	          >
	          </el-date-picker>
	        </el-col>
	      </el-form-item>
	      <!-- 请假结束时间 -->
	      <el-form-item label="请假结束时间">
	        <el-col :span="11">
	          <el-date-picker
	              v-model="sick_1.date2"
	              type="datetime"
	              placeholder="选择时间"
	              @change="difference3_2(sick_1.date1, sick_1.date2)"
	          >
	          </el-date-picker>
	        </el-col>
	      </el-form-item>
	      <!-- 总时长 -->
	      <el-form-item label="出差总时长">
	        <el-input v-model="sick_1.date3" disabled></el-input>
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
	        <el-button type="primary" @click="submitForm_8">确定</el-button>
	        <el-button @click="cancel_8">取消</el-button>
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
	  const sick = ref(false);
	  
    return {
      drawer: ref(false),
      input: ref(""),
	  sick
    };
  },
  data() {
    return {
		//请假表单
		sick_1: {
		  //名称
		  name: "",
		  //部门
		  dept: "",
		  //请假类型
		  type_1: "",
		  //请假事由
		  remarks_1: "",
		  //开始日期
		  date1: "",
		  //结束时间
		  date2: "",
		  //请假总时长
		  date3: "",
		},
		options: [{
		          value: '病假',
		          label: '病假'
		        }, {
		          value: '事假',
		          label: '事假'
		        }, {
		          value: '丧假',
		          label: '丧假'
		        }, {
		          value: '婚假',
		          label: '婚假'
		        }, {
		          value: '产假',
		          label: '产假'
		        },{
					value: '工伤假',
					label: '工伤假'
				}
				],
		value: '',
		
      // 待办转正审批列表
      tableData: [
        {
          date: "2016-05-02",
          //审批编号
          AUDITFLOW_ID: "0001",
          //类型
          AUDITFLOW_TYPE: "请假",
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
          AUDITFLOW_TYPE: "请假",
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
          AUDITFLOW_TYPE: "请假",
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
          AUDITFLOW_TYPE: "请假",
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
          AUDITFLOW_TYPE: "请假",
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
          AUDITFLOW_TYPE: "请假",
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
          AUDITFLOW_TYPE: "请假",
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
          AUDITFLOW_TYPE: "请假",
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
      // 分页
      pageInfo: {
        // 分页参数
        currentPage: 1, //当前页
        pagesize: 3, // 页大小
        total: 0, // 总页数
      },
    };
  },
  methods: {
	  handleNative(val){
		  let obj = {};//定义对象集合
		  obj = this.options.find(item => {
			  return item.value === val;//筛选出匹配数据返回对象  
		  });  
		  this.sick_1.type_1 = obj.label;
	  },

	  
	  // 提交请假
	  submitForm_8() {
	    if (this.sick_1.remarks_1.length === 0) {
	      ElMessage("请输入请假事由");
	    } else if (this.sick_1.date1.length === 0) {
	      ElMessage("请选择开始时间");
	    } else if (this.sick_1.date2.length === 0) {
	      ElMessage("请选择结束时间");
	    } else {
	      alert(1);
	    }
	  },
	  // 取消请假
	  cancel_8() {
	    this.sick_1 = {
	      //名称
	      name: "",
	      //部门
	      dept: "",
	      //请假类型
	      type_1: "",
	      //请假事由
	      remarks_1: "",
	      //开始日期
	      date1: "",
	      //结束时间
	      date2: "",
	      //请假总时长
	      date3: "",
	    };
		this.value=" ",
	    this.sick = false;
	  },
	  // 判断请假开始时间
	  difference3_1: function (beginTime) {
	    var date = new Date();
	    if (beginTime < date) {
	      ElMessage({
	        message: "请假开始时间小于当前时间，请重新选择!",
	        type: "warning",
	      });
	      this.cancel_date3();
	    }
	  },
	  // 计算请假时长
	  difference3_2: function (beginTime, endTime) {
	    if (beginTime.length == 0) {
	      ElMessage({
	        message: "请选择请假开始时间!",
	        type: "warning",
	      });
	      this.cancel_date3();
	    } else if (endTime < beginTime) {
	      ElMessage({
	        message: "请假结束时间小于请假开始时间，请重新选择!",
	        type: "warning",
	      });
	      this.cancel_date3();
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
	        this.cancel_date3();
	      } else {
	        this.sick_1.date3 = hours + "小时";
	      }
	    }
	  },
	  
	  cancel_date3() {
	    this.sick_1.date1 = "";
	    this.sick_1.date2 = "";
	    this.sick_1.date3 = "";
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
    through1() {
      alert(1)
    },
    // 点击驳回确认按钮触发
    through2() {
      alert(1)
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
