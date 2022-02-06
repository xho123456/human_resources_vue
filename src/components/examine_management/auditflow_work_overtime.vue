<template>
  <!--  加班审批页面-->
  <div class="body_1">
    <el-tabs type="border-card">
      <!-- 待办申请页面 -->
      <el-tab-pane label="待办申请">
        <el-button @click="resetDateFilter1">重置日期过滤</el-button>
        &nbsp;
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
          <el-table-column prop="AUDITFLOW_ID" label="审批编号" width="100" />
          <el-table-column prop="AUDITFLOW_TYPE" label="流程" width="100" />
          <el-table-column prop="STAFF_ID" label="申请人" width="150" />
          <!-- <el-table-column prop="name" label="操作人" width="100" /> -->
          <el-table-column prop="AUDITFLOW_STATE" label="状态" width="100" />
          <el-table-column prop="STAFF_NAME" label="当前审批人" width="150" />
          <el-table-column prop="UPDATED_TIME" label="最近处理" width="150" />

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
          <el-table-column prop="AUDITFLOW_ID" label="审批编号" width="100" />
          <el-table-column prop="AUDITFLOW_TYPE" label="流程" width="100" />
          <el-table-column prop="STAFF_ID" label="申请人" width="150" />
          <!-- <el-table-column prop="name" label="操作人" width="100" /> -->
          <el-table-column prop="AUDITFLOW_STATE" label="状态" width="100" />
          <el-table-column prop="STAFF_NAME" label="历史审批人" width="150" />
          <el-table-column prop="UPDATED_TIME" label="最近处理" width="140" />
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
	  
	  <!--       我的申请页面:加班 -->
	        <el-tab-pane label="我的申请">
	  
	                <el-button @click="resetDateFilter">重置日期过滤</el-button>
	                <el-button  @click="overtime = true" >发起申请</el-button>
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
	  
	  <!-- 加班弹出框 -->
	  <el-dialog
	      v-model="overtime"
	      title="加班"
	      width="50%"
	      :close-on-click-modal="false"
	      @close="cancel_5"
	  >
	    <el-form ref="form" :model="overtime_1" label-width="120px">
	      <el-form-item label="员工名称">
	        <el-input v-model="overtime_1.name" disabled></el-input>
	      </el-form-item>
	      <el-form-item label="加班类型">
	        <el-select v-model="overtime_1.type_1" placeholder="选择类型">
	          <el-option label="工作日加班" value="工作日加班"></el-option>
	          <el-option label="休息日加班" value="休息日加班"></el-option>
	          <el-option label="节假日加班" value="节假日加班"></el-option>
	        </el-select>
	  
	      </el-form-item>
	      <!-- 加班开始 -->
	      <el-form-item label="加班开始时间">
	        <el-date-picker
	            v-model="overtime_1.date1"
	            type="datetime"
	            placeholder="选择时间"
	            @change="difference1_1(overtime_1.date1)"
	        >
	        </el-date-picker>
	      </el-form-item>
	      <!-- 加班结束 -->
	      <el-form-item label="加班结束时间">
	        <el-date-picker
	            v-model="overtime_1.date2"
	            type="datetime"
	            placeholder="选择时间"
	            @change="difference1_2(overtime_1.date1, overtime_1.date2)"
	        >
	        </el-date-picker>
	      </el-form-item>
	      <!--  加班总时长-->
	      <el-form-item label="加班总时长">
	        <el-input v-model="overtime_1.date3" disabled></el-input>
	      </el-form-item>
	      <el-form-item label="加班事由">
	        <el-input
	            v-model="overtime_1.remarks_1"
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
	        <el-button type="primary" @click="submitForm_5">确定</el-button>
	        <el-button @click="cancel_5">取消</el-button>
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
import { defineComponent, ref } from "vue";
import {ElMessage} from "element-plus";
export default {
  setup() {
	   const overtime = ref(false);
	  
    return {
      drawer: ref(false),
      input: ref(""),
	   overtime,
    };
  },
  data() {
    return {
		//加班表单
		overtime_1: {
		  //名称
		  name: "",
		  //部门
		  dept: "",
		  //类型
		  type_1: "",
		  //开始时间
		  date1: "",
		  //结束时间
		  date2: "",
		  // 总时长
		  date3: "",
		  //备注
		  remarks_1: "",
		},
		
      // 待办转正审批列表
      tableData: [
        {
          date: "2016-05-02",
          //加班编号
          AUDITFLOW_ID: "0001",
          //类型
          AUDITFLOW_TYPE: "加班",
          //申请人（员工名称）
          STAFF_ID: "名字",
          //加班状态
          AUDITFLOW_STATE: "通过",
          //加班人
          STAFF_NAME: "管理员",
          //最近处理
          UPDATED_TIME: "2020-01-01",
        },
        {
          date: "2016-05-03",
          //加班编号
          AUDITFLOW_ID: "0001",
          //类型
          AUDITFLOW_TYPE: "加班",
          //申请人（员工名称）
          STAFF_ID: "名字",
          //加班状态
          AUDITFLOW_STATE: "通过",
          //加班人
          STAFF_NAME: "管理员",
          //最近处理
          UPDATED_TIME: "2020-01-01",
        },
        {
          date: "2016-05-04",
          //加班编号
          AUDITFLOW_ID: "0001",
          //类型
          AUDITFLOW_TYPE: "加班",
          //申请人（员工名称）
          STAFF_ID: "名字",
          //加班状态
          AUDITFLOW_STATE: "通过",
          //加班人
          STAFF_NAME: "管理员",
          //最近处理
          UPDATED_TIME: "2020-01-01",
        },
        {
          date: "2016-05-05",
          //加班编号
          AUDITFLOW_ID: "0001",
          //类型
          AUDITFLOW_TYPE: "加班",
          //申请人（员工名称）
          STAFF_ID: "名字",
          //加班状态
          AUDITFLOW_STATE: "通过",
          //加班人
          STAFF_NAME: "管理员",
          //最近处理
          UPDATED_TIME: "2020-01-01",
        },
      ],
      // 已办转正审批列表
      tableData1: [
        {
          date1: "2016-05-02",
          //加班编号
          AUDITFLOW_ID: "0001",
          //类型
          AUDITFLOW_TYPE: "加班",
          //申请人（员工名称）
          STAFF_ID: "名字",
          //加班状态
          AUDITFLOW_STATE: "通过",
          //加班人
          STAFF_NAME: "管理员",
          //最近处理
          UPDATED_TIME: "2020-01-01",
        },
        {
          date1: "2016-05-03",
          //加班编号
          AUDITFLOW_ID: "0001",
          //类型
          AUDITFLOW_TYPE: "加班",
          //申请人（员工名称）
          STAFF_ID: "名字",
          //加班状态
          AUDITFLOW_STATE: "通过",
          //加班人
          STAFF_NAME: "管理员",
          //最近处理
          UPDATED_TIME: "2020-01-01",
        },
        {
          date1: "2016-05-04",
          //加班编号
          AUDITFLOW_ID: "0001",
          //类型
          AUDITFLOW_TYPE: "加班",
          //申请人（员工名称）
          STAFF_ID: "名字",
          //加班状态
          AUDITFLOW_STATE: "通过",
          //加班人
          STAFF_NAME: "管理员",
          //最近处理
          UPDATED_TIME: "2020-01-01",
        },
        {
          date1: "2016-05-05",
          //加班编号
          AUDITFLOW_ID: "0001",
          //类型
          AUDITFLOW_TYPE: "加班",
          //申请人（员工名称）
          STAFF_ID: "名字",
          //加班状态
          AUDITFLOW_STATE: "通过",
          //加班人
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
	  // 提交加班
	  submitForm_5() {
	    if (this.overtime_1.type_1.length === 0) {
	      ElMessage("请选择您的加班类型");
	    } else if (this.overtime_1.date1.length === 0) {
	      ElMessage("请选择开始时间");
	    } else if (this.overtime_1.date2.length === 0) {
	      ElMessage("请选择结束时间");
	    } else if (this.overtime_1.remarks_1.length === 0) {
	      ElMessage("请输入加班事由");
	    } else {
	      alert(1);
	    }
	  },
	  // 取消加班
	  cancel_5() {
	    this.overtime_1 = {
	      name: "",
	      dept: "",
	      type_1: "",
	      date1: "",
	      date2: "",
	      date3: "",
	      remarks_1: "",
	    };
	    this.overtime = false;
	  },
	  // 判断加班开始时间
	  difference1_1: function (beginTime) {
	    var jbtype = this.overtime_1.type_1; //获取加班类型
	    var date = new Date();
	    if (jbtype.length === 0) {
	      ElMessage({
	        message: "请选择加班类型!",
	        type: "warning",
	      });
	      this.cancel_date();
	    } else if (beginTime < date) {
	      ElMessage({
	        message: "加班开始时间小于当前时间，请重新选择!",
	        type: "warning",
	      });
	      this.cancel_date();
	    }
	  },
	  // 计算加班天数
	  difference1_2: function (beginTime, endTime) {
	    var jbtype = this.overtime_1.type_1; //获取加班类型
	    console.log(jbtype);
	    if (jbtype.length === 0) {
	      ElMessage({
	        message: "请选择加班类型!",
	        type: "warning",
	      });
	      this.cancel_date();
	    }
	    // 判断是否选择加班时间
	    else if (beginTime.length == 0) {
	      ElMessage({
	        message: "请选择加班开始时间!",
	        type: "warning",
	      });
	      this.cancel_date();
	      // 判断加班结束时间是否小于加班出差开始时间
	    } else if (endTime < beginTime) {
	      ElMessage({
	        message: "加班结束时间小于加班出差开始时间，请重新选择!",
	        type: "warning",
	      });
	      this.cancel_date();
	    } else {
	      var dateBegin = new Date(beginTime);
	      var dateEnd = new Date(endTime);
	      var dateDiff = dateEnd.getTime() - dateBegin.getTime(); //时间差的毫秒数
	      var hours = Math.floor(dateDiff / (3600 * 1000)); //计算出小时数
	      var leave1 = dateDiff % (3600 * 1000); //计算小时数后剩余的分钟数
	      //计算相差分钟数
	      var minutes = Math.floor(leave1 / (60 * 1000)); //计算相差分钟数
	      console.log("minutes " + minutes);
	      if (minutes >= 40) {
	        var hours = hours + 1;
	      }
	      if (hours == 0) {
	        ElMessage({
	          message: "开始时间与结束时间相同，请重新选择!",
	          type: "warning",
	        });
	        this.cancel_date();
	      } else if (jbtype === "工作日加班") {
	        if (hours > 3) {
	          ElMessage({
	            message: "工作日加班时间不能大于3小时，请重新选择!",
	            type: "warning",
	          });
	          this.cancel_date();
	        } else {
	          this.overtime_1.date3 = hours + "小时";
	        }
	      } else if (jbtype === "休息日加班") {
	        if (hours > 8) {
	          ElMessage({
	            message: "休息日加班时间不能大于8小时，请重新选择!",
	            type: "warning",
	          });
	          this.cancel_date();
	        } else {
	          this.overtime_1.date3 = hours + "小时";
	        }
	      } else if (jbtype === "节假日加班") {
	        if (hours > 8) {
	          ElMessage({
	            message: "节假日加班时间不能大于8小时，请重新选择!",
	            type: "warning",
	          });
	          this.cancel_date();
	        } else {
	          this.overtime_1.date3 = hours + "小时";
	        }
	      }
	    }
	  },
	  // 时间
	  cancel_date() {
	    this.overtime_1.type_1 = "";
	    this.overtime_1.date1 = "";
	    this.overtime_1.date2 = "";
	    this.overtime_1.date3 = "";
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
    through1(){
      alert(1)
    },
    // 点击驳回确认按钮触发
    through2(){
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
