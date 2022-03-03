<template>
  <!--  调薪审批页面-->
  <div class="body_1">
    <el-tabs type="border-card">
      <!-- 待办申请页面 -->
      <el-tab-pane label="待办申请">
        <el-button @click="salaryme(null)">重置</el-button>
        &nbsp;
        <el-input
            v-model="input"
            placeholder="输入名称搜索"
            style="width: 130px"
        />
        &nbsp;
        <el-button type="success"  @click="salaryme(null)">搜索</el-button>
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
            </template>
          </el-table-column>
          <el-table-column prop="staffName2" label="当前审批人" width="150"/>
          <el-table-column prop="createdTime" label="最近处理" width="150"/>

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
              @size-change="salaryme(input)"
              @current-change="salaryme(input)"
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
        <el-form ref="form" :model="details">
          <el-form-item label="标题：">
            <el-input v-model="details[0].auditflowTitle" disabled></el-input>
          </el-form-item>
          <el-form-item label="申请人：">
            <el-input v-model="details[0].staffName1" disabled></el-input>
          </el-form-item>
          <el-form-item label="调薪前基本工资：">
            <el-input v-model="details[0].frontSalary" disabled></el-input>
          </el-form-item>
          <el-form-item label="调薪后基本工资：">
            <el-input v-model="details[0].afterSalary" disabled></el-input>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input v-model="details[0].salaryRemarks" disabled></el-input>
          </el-form-item>
          <el-form-item label="生效日期：">
            <el-input v-model="details[0].takeeffectdate" disabled></el-input>
          </el-form-item>
          <el-form-item label="当前审核状态：">
            <el-input v-if="details[0].auditflowdetaiState===0" v-model="state.ongoing" disabled></el-input>
            <el-input v-if="details[0].auditflowdetaiState===1" v-model="state.approval" disabled></el-input>
            <el-input v-if="details[0].auditflowdetaiState===2" v-model="state.through" disabled></el-input>
            <el-input v-if="details[0].auditflowdetaiState===3" v-model="state.rejected" disabled></el-input>
          </el-form-item>
          <el-form-item label="申请状态：">
            <el-input v-if="details[0].auditflowsState===0" v-model="state.pending" disabled></el-input>
            <el-input v-if="details[0].auditflowState===1" v-model="state.through" disabled></el-input>
            <el-input v-if="details[0].auditflowState===2" v-model="state.rejected" disabled></el-input>
            <el-input v-if="details[0].auditflowState===3" v-model="state.undo" disabled></el-input>
          </el-form-item>
          <el-form-item label="审批人：">
            <el-input v-model="details[0].staffName2" disabled></el-input>
          </el-form-item>
          <el-form-item label="审批备注：">
            <el-input v-model="details[0].auditflowdetaiRemarks" disabled></el-input>
          </el-form-item>
          <el-form-item label="审核时间：">
            <el-input v-model="details[0].auditflowDetaiDate" disabled></el-input>
          </el-form-item>
        </el-form>
      </el-drawer>

      <!-- 已办申请页面 -->
      <el-tab-pane label="已办申请" @click="salaryed">
        <el-button @click="salaryed(null)">重置</el-button>
        &nbsp;
        <el-input
            v-model="input1"
            placeholder="输入名称搜索"
            style="width: 130px"
        />
        &nbsp;
        <el-button type="success" @click="salaryed(null)">搜索</el-button>

        <el-table
            ref="filterTable"
            row-key="date"
            :data="tableData1"
            style="width: 100%"
        >
          <el-table-column
              prop="auditflowdetaidate"
              label="日期"
              width="140"
          />
          <el-table-column prop="auditflowdetaiDate" label="日期" width="140"/>
          <el-table-column prop="auditflowId" label="审批编号" width="100"/>
          <el-table-column prop="auditflowType" label="流程" width="100"/>
          <el-table-column prop="staffName" label="申请人" width="150"/>
          <el-table-column prop="auditflowdetaiState" label="状态" width="100">
            <template #default="scope">
              <span v-if="scope.row.auditflowdetaiState==0">审批中</span>
              <span v-if="scope.row.auditflowdetaiState==1">待我审批</span>
              <span v-if="scope.row.auditflowdetaiState==2">已审批</span>
            </template>
          </el-table-column>
          <el-table-column prop="staffName2" label="当前审批人" width="150"/>
          <el-table-column prop="createdTime" label="最近处理" width="150"/>

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
              @size-change="salaryed(input1)"
              @current-change="salaryed(input1)"
              prev-text="上一页"
              next-text="下一页"
              background
          >
            <!--  @size-change="selectUsers"
						@current-change="selectUsers" -->
          </el-pagination>
        </div>
      </el-tab-pane>

      <!--       我的申请页面:调薪 -->
      <el-tab-pane label="我的申请">

        <el-button @click="salarymy">重置日期过滤</el-button>
        <el-button @click="salary = true" >发起申请</el-button>
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


<!--        <el-input-->
<!--            v-model="input"-->
<!--            placeholder="输入名称搜索"-->
<!--            style="width: 130px"-->
<!--        />-->
        &nbsp;
<!--        <el-button type="success" plain>搜索</el-button>-->
        <!-- 表格   -->
        <el-table
            ref="filterTable"
            row-key="date"
            :data="tableData"
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
              @size-change="salarymy"
              @current-change="salarymy"
              prev-text="上一页"
              next-text="下一页"
              background
          >
          </el-pagination>
        </div>

      </el-tab-pane>

      <!--      申请调薪弹出框 -->
      <el-dialog
          v-model="salary"
          title="调薪"
          width="50%"
          :close-on-click-modal="false"
          @close="cancel_3"
      >
        <el-form ref="form" :model="salary_1" label-width="120px">
          <el-form-item label="员工名称">
            <el-input v-model="salary_1.name" disabled></el-input>
          </el-form-item>
          <el-form-item label="部门名称">
            <el-input v-model="salary_1.dept" disabled></el-input>
          </el-form-item>
          <el-form-item label="调薪前基本工资">
            <el-input v-model="salary_1.qjbgz" disabled></el-input>
          </el-form-item>
          <el-form-item label="调薪后基本工资">
            <el-input-number :precision="2" :step="100" :max="30000" :min="0"
                             v-model="salary_1.hjbgz"
                             oninput="value=value.toString().match(/^\d+(?:\.\d{0,2})?/)"
            ></el-input-number>
          </el-form-item>

          <el-form-item label="调薪备注">
            <el-input
                v-model="salary_1.remarks_1"
                type="textarea"
                maxlength="100"
                show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="期望调薪日期">
            <el-date-picker
                v-model="salary_1.date1"
                type="date"
                placeholder="选择日期"
                @change="difference6"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="审批人">
            <!-- 头像 -->
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
			      <el-button type="primary" @click="submitForm_3">确定</el-button>
			      <el-button @click="cancel_3">取消</el-button>
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
    const salary = ref(false);
    // 审批人图标

    return {
      drawer: ref(false),
      input: ref(""),
      input1: ref(""),
      salary,
    };
  },
  data() {
    return {
      staffName:this.$store.state.userall.staffName,
      deptPostId:this.$store.state.userall.deptPostId,
      staffId:this.$store.state.userall.staffId,
      deptId: this.$store.state.userall.deptId,

      //调薪表单
      salary_1: {
        //名称
        name: "",
        //部门
        dept: "",
        //调薪前基本工资
        qjbgz: "",
        //调薪后基本工资
        hjbgz: "",
        //日期
        date1: "",
        //备注
        remarks_1: "",
      },
      // 待办转正审批列表
      tableData: [
        {
          date: "2016-05-02",
          //审批编号
          AUDITFLOW_ID: "0001",
          //类型
          AUDITFLOW_TYPE: "调薪",
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
          AUDITFLOW_TYPE: "调薪",
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
          AUDITFLOW_TYPE: "调薪",
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
          AUDITFLOW_TYPE: "调薪",
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
          AUDITFLOW_TYPE: "调薪",
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
          AUDITFLOW_TYPE: "调薪",
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
          AUDITFLOW_TYPE: "调薪",
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
          AUDITFLOW_TYPE: "调薪",
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
    this.salaryme();
    this.salaryed();
    this.salarymy();

  },
  methods: {
    salaryme(like){
      if (Object.prototype.toString.call(like)===Object.prototype.toString.call(null)) {
        this.pageInfo.staffName = this.staffName;
        this.pageInfo.auditflowdetaiState=1;
        this.axios({
          method: 'post',
          url: "http://localhost:8007/provider/salary",
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
          url: "http://localhost:8007/provider/salary/salaryed",
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
    salaryed(like){
      if (Object.prototype.toString.call(like)===Object.prototype.toString.call(null)) {
        this.pageInfo.staffName = this.staffName;
        this.pageInfo.auditflowdetaiState=2;
        this.axios({
          method: 'post',
          url: "http://localhost:8007/provider/salary",
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
          url: "http://localhost:8007/provider/salary/salaryed",
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

    salarymy(){
      this.myFixedwage();
      this.pageInfo.staffName = this.staffName;
      this.axios({
        method: 'post',
        url: "http://localhost:8007/provider/salary/salarymy",
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

    myFixedwage(){
      this.pageInfo.staffId=this.staffId;
      this.axios({
        method: 'post',
        url: "http://localhost:8007/provider/salary/fixed",
        data: this.pageInfo,
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response)=>{
        console.log(response);
        this.salary_1.qjbgz=response.data.data.fixedwageOfficialmoney
      }).catch(function (error){
        console.log('获取表单失败')
        console.log(error)
      })

    },


    // 提交调薪
    submitForm_3() {
      if (this.salary_1.hjbgz.length === 0) {
        ElMessage("请输入您期望的调薪后基本工资");
      } else if (this.salary_1.remarks_1.length === 0) {
        ElMessage("请输入备注");
      } else if (this.salary_1.date1.length === 0) {
        ElMessage("请选择日期");
      } else {
        this.axios({
          method:'post',
          url:"http://localhost:8007/provider/salary/add",
          data:{
            staffId: this.staffId,
            // 申请人
            staffName: this.staffName,
            // 部门编号
            deptId: this.deptId,

            //调薪前基本工资
            frontSalary: this.salary_1.qjbgz,
            //调薪后基本工资
            afterSalary: this.salary_1.hjbgz,
            // 调薪日期
            takeEffectDate: this.salary_1.date1,
            //调薪备注
            salaryRemarks: this.salary_1.remarks_1,

            // 审批人1
            staffName1: "刘金科1",
            // 审批人2
            staffName2: "刘金科2",
            // 审批人3
            staffName3: "刘金科3",
            // 审批类型
            auditflowType: "调薪",
            // 审批标题
            auditflowTitle: this.staffName + "的" + this.salary_1.remarks_1
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
            this.salarymy();
            this.cancel_3();
          } else {
            ElMessage.error("申请失败");
            this.cancel_3();
            this.salarymy();
          }
        }).catch(function (error){
          console.log('获取表单失败')
          console.log(error)
        })

      }
    },
    // 取消调薪
    cancel_3() {
      this.salary_1 = {
        name: "",
        dept: "",
        qjbgz: "",
        qgwgz: "",
        hjbgz: "",
        hgwgz: "",
        date1: "",
        remarks_1: "",
      };
      this.salary = false;
    },
    // 判断调薪
    difference6: function (endTime) {
      let now = new Date();
      if (endTime < now) {
        ElMessage({
          message: "调薪时间不能小于当前时间，请重新选择!",
          type: "warning",
        });
        this.cancel_date6();
      }
    },
    cancel_date6() {
      this.salary_1.date1 = "";
    },

    // 重置日期过滤
    resetDateFilter1() {
      this.$refs.filterTable1.clearFilter("date1");
    },
    // 重置日期过滤
    resetDateFilter() {
      this.$refs.filterTable.clearFilter("date");
    },
    // 筛选
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
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
          this.salarymy();
        } else {
          ElMessage.error("撤销失败");
          this.salarymy();
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
