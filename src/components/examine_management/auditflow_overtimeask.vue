<template>
  <!--  转正审批页面-->
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
          <el-table-column prop="AUDITFLOW_STATE" label="状态" width="100"/>
          <el-table-column prop="STAFF_NAME" label="当前审批人" width="150"/>
          <el-table-column prop="UPDATED_TIME" label="最近处理" width="150"/>
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
      <el-drawer v-model="drawer" :with-header="false">
        <span>我是抽屉</span>
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
          </el-pagination>
        </div>
      </el-tab-pane>
      <!--       我的申请页面:转正 -->
      <el-tab-pane label="我的申请">

        <el-button @click="resetDateFilter">重置日期过滤</el-button>
        <el-button @click="become = true" v-on:click="this.become_1.type_1 = '提前转正'">发起申请</el-button>
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

      <!--      申请转正弹出框 -->
      <el-dialog
          v-model="become"
          title="转正"
          width="50%"
          :close-on-click-modal="false"
          @close="cancel_1"
      >
        <el-form ref="form_1" :model="become_1" label-width="120px">
          <el-form-item label="员工名称 :">
            <el-input v-model="become_1.name" disabled></el-input>
          </el-form-item>
          <el-form-item label="部门名称 :">
            <el-input v-model="become_1.dept" disabled></el-input>
          </el-form-item>
          <el-form-item label="转正类型 :">
            <el-input v-model="become_1.type_1" disabled></el-input>
          </el-form-item>
          <el-form-item label="转正备注 :">
            <el-input
                v-model="become_1.remarks_1"
                type="textarea"
                maxlength="100"
                show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="申请转正日期 :">
            <el-date-picker
                v-model="become_1.date1"
                type="date"
                placeholder="选择时间"
                @change="difference"
            >
            </el-date-picker>
          </el-form-item>
          <!-- 审批人 -->
          <el-form-item label="审批人 :">
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
                <div class="sub-title" style="line-height: 10px">
                  管理二号
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                </div>
                <div class="sub-title" style="line-height: 10px">
                  管理三号
                </div>
              </div>
            </el-col>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="submitForm_1">确定</el-button>
            <el-button @click="cancel_1">取消</el-button>
          </span>
        </template>
      </el-dialog>

    </el-tabs>
  </div>
</template>

<script>
import {defineComponent, reactive, ref, toRefs} from "vue";
import {ElMessage} from "element-plus";

export default {
  setup() {
    const become = ref(false);

    // 审批人图标
    const state = reactive({
      circleUrl:
          "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      squareUrl:
          "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
      sizeList: ["large", "medium", "small"],
    });
    return {
      drawer: ref(false),
      input: ref(""),
      become,
      ...toRefs(state),
    };

  },
  data() {
    return {

      become_1: {
        //名称
        name: "",
        //部门
        dept: "",
        //类型
        type_1: "",
        //备注
        remarks_1: "",
        //日期
        date1: "",
      },

      // 待办转正审批列表
      tableData: [
        {
          date: "2016-05-02",
          //审批编号
          AUDITFLOW_ID: "0001",
          //类型
          AUDITFLOW_TYPE: "转正",
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
          AUDITFLOW_TYPE: "转正",
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
          AUDITFLOW_TYPE: "转正",
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
          AUDITFLOW_TYPE: "转正",
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
          AUDITFLOW_TYPE: "转正",
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
          AUDITFLOW_TYPE: "转正",
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
          AUDITFLOW_TYPE: "转正",
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
          AUDITFLOW_TYPE: "转正",
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
    //提交转正
    submitForm_1() {
      if (this.become_1.remarks_1.length === 0) {
        ElMessage("备注不能为空");
      } else if (this.become_1.date1.length === 0) {
        ElMessage("日期不能为空");
      } else {
        alert(1);
      }
    },
    // 转正取消
    cancel_1() {
      this.become_1 = {
        name: "",
        dept: "",
        type_1: "",
        remarks_1: "",
        date1: "",
      };
      this.become = false;
    },
    // 判断转正
    difference: function (endTime) {
      let now = new Date();
      if (endTime < now) {
        ElMessage({
          message: "转正时间不能小于当前时间，请重新选择!",
          type: "warning",
        });
        this.cancel_date();
      }
    },
    cancel_date() {
      this.become_1.date1 = "";
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
