<template>
  <!--  异动审批页面-->
  <div class="body_1">
    <el-tabs type="border-card">
      <!-- 待办申请页面 -->
      <el-tab-pane label="待办申请">
        <el-button @click="Move(null)">重置</el-button>
        &nbsp;
        <el-input
            v-model="input"
            placeholder="输入名称搜索"
            style="width: 130px"
        />
        &nbsp;
        <el-button type="success" @click="Move(null)">搜索</el-button>
        <!--  表格 -->
        <el-table
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
                  <el-button type="danger" plain>驳回</el-button>>
                </template>
              </el-popconfirm>
<!--              <el-button-->
<!--                  type="primary"-->
<!--                  style="margin-left: 16px"-->
<!--                  @click="popup1(scope.row.staffName)"-->
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
              @size-change="Move(input)"
              @current-change="Move(input)"
              prev-text="上一页"
              next-text="下一页"
              background
          >
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
          <el-form-item label="当前审核状态：" v-if="details[0].auditflowstate != null">
            <el-input v-if="details[0].auditflowstate===0" v-model="state.pending" disabled></el-input>
            <el-input v-if="details[0].auditflowstate===1" v-model="state.through" disabled></el-input>
            <el-input v-if="details[0].auditflowstate===2" v-model="state.rejected" disabled></el-input>
            <el-input v-if="details[0].auditflowstate===3" v-model="state.undo" disabled></el-input>
          </el-form-item>
          <el-form-item label="审批人：" v-if="details[0].staffName2 != null">
            <el-input v-model="details[0].staffName2" disabled></el-input>
          </el-form-item>
          <el-form-item label="申请状态：" v-if="details[0].auditflowdetaiState!= null">
            <el-input v-if="details[0].auditflowdetaiState===0" v-model="state.ongoing" disabled></el-input>
            <el-input v-if="details[0].auditflowdetaiState===1" v-model="state.approval" disabled></el-input>
            <el-input v-if="details[0].auditflowdetaiState===2" v-model="state.through" disabled></el-input>
            <el-input v-if="details[0].auditflowdetaiState===3" v-model="state.rejected" disabled></el-input>
            <el-input v-if="details[0].auditflowdetaiState===4" v-model="state.undo1" disabled></el-input>
          </el-form-item>
          <el-form-item label="审批备注：" v-if="details[0].auditflowdetaiRemarks != null">
            <el-input v-model="details[0].auditflowdetaiRemarks" disabled></el-input>
          </el-form-item>
          <el-form-item label="审核时间：" v-if="details[0].auditflowdetaiRemarks != null">
            <el-input v-model="details[0].auditflowdetaiDate" disabled></el-input>
          </el-form-item>
          <el-form-item label="审批人：" v-if="details[1].staffName2 != null">
            <el-input v-model="details[1].staffName2" disabled></el-input>
          </el-form-item>
          <el-form-item label="申请状态：" v-if="details[1].auditflowdetaiState!= null">
            <el-input v-if="details[1].auditflowdetaiState===0" v-model="state.ongoing" disabled></el-input>
            <el-input v-if="details[1].auditflowdetaiState===1" v-model="state.approval" disabled></el-input>
            <el-input v-if="details[1].auditflowdetaiState===2" v-model="state.through" disabled></el-input>
            <el-input v-if="details[1].auditflowdetaiState===3" v-model="state.rejected" disabled></el-input>
            <el-input v-if="details[1].auditflowdetaiState===4" v-model="state.undo1" disabled></el-input>
          </el-form-item>
          <el-form-item label="审批备注：" v-if="details[1].auditflowdetaiRemarks != null">
            <el-input v-model="details[1].auditflowdetaiRemarks" disabled ellipsis></el-input>
          </el-form-item>
          <el-form-item label="审核时间：" v-if="details[1].auditflowdetaiRemarks != null">
            <el-input v-model="details[1].auditflowdetaiDate" disabled></el-input>
          </el-form-item>
          <el-form-item label="审批人：" v-if="details[2].staffName2 != null">
            <el-input v-model="details[2].staffName2" disabled></el-input>
          </el-form-item>
          <el-form-item label="申请状态：" v-if="details[2].auditflowdetaiState!= null">
            <el-input v-if="details[2].auditflowdetaiState===0" v-model="state.ongoing" disabled></el-input>
            <el-input v-if="details[2].auditflowdetaiState===1" v-model="state.approval" disabled></el-input>
            <el-input v-if="details[2].auditflowdetaiState===2" v-model="state.through" disabled></el-input>
            <el-input v-if="details[2].auditflowdetaiState===3" v-model="state.rejected" disabled></el-input>
            <el-input v-if="details[2].auditflowdetaiState===4" v-model="state.undo1" disabled></el-input>
          </el-form-item>
          <el-form-item label="审批备注：" v-if="details[2].auditflowdetaiRemarks != null">
            <el-input v-model="details[2].auditflowdetaiRemarks" disabled></el-input>
          </el-form-item>
          <el-form-item label="审核时间：" v-if="details[2].auditflowdetaiRemarks != null">
            <el-input v-model="details[2].auditflowdetaiDate" disabled></el-input>
          </el-form-item>
        </el-form>
      </el-drawer>
      <!-- 已办申请页面 -->
      <el-tab-pane label="已办申请">
        <el-button @click="Moved(null)">重置</el-button>
        &nbsp;
        <el-input
            v-model="input1"
            placeholder="输入名称搜索nima"
            style="width: 130px"
        />
        &nbsp;
        <el-button type="success" @click="Moved(null)">搜索</el-button>

        <el-table
            :data="tableData1"
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
            </template>
          </el-table-column>
          <el-table-column prop="staffname2" label="当前审批人" width="150"/>
          <el-table-column prop="createdTime" label="最近处理" width="150"/>

<!--          <el-table-column label="操作">-->
<!--            <template #default="scope">-->
<!--              <el-button-->
<!--                  type="primary"-->
<!--                  style="margin-left: 5px"-->
<!--                  @click="popup1(scope.row.staffName)"-->
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
              @size-change="Moved(input1)"
              @current-change="Moved(input1)"
              prev-text="上一页"
              next-text="下一页"
              background
          >
            <!--  @size-change="selectUsers"
						@current-change="selectUsers" -->
          </el-pagination>
        </div>
      </el-tab-pane>

      <!--       我的申请页面:异动 -->
      <el-tab-pane label="我的申请">

        <el-button @click="Movemy">重置</el-button>
        <el-button @click="fqsq" v-on:click="this.Change_1.type_1 = '调岗'">发起申请</el-button>
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
<!--        &nbsp;-->
<!--        <el-button type="success" plain>搜索</el-button>-->
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
<!--              <el-button-->
<!--                  type="primary"-->
<!--                  style="margin-left: 16px"-->
<!--                  @click="popup1(scope.row.staffName)"-->
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
              @size-change="Movemy()"
              @current-change="Movemy()"
              prev-text="上一页"
              next-text="下一页"
              background
          >
          </el-pagination>
        </div>

      </el-tab-pane>

      <el-dialog
          v-model="Change"
          title="异动"
          width="50%"
          :close-on-click-modal="false"
          @close="cancel_2"
      >
        <el-form ref="form_2" :model="Change_1" label-width="120px">
          <el-form-item label="员工名称">
            <el-input v-model="this.staffName" disabled></el-input>
          </el-form-item>
          <el-form-item label="异动类型">
            <el-input v-model="Change_1.type_1" disabled></el-input>
          </el-form-item>
          <el-form-item label="原部门">
            <el-input v-model="Change_1.dept" disabled></el-input>
          </el-form-item>
          <el-form-item label="异动后部门">
            <el-select v-model="Change_1.dept_1" placeholder="部门名称" @click="allDeptName()">
              <el-option
                  v-for="item in dept"
                  :key="item.deptId"
                  :label="item.deptName"
                  :value="item.deptId"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- 头像 -->
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
            <el-button type="primary" @click="submitForm_2">确定</el-button>
            <el-button @click="cancel_2">取消</el-button>
          </span>
        </template>
      </el-dialog>

    </el-tabs>
  </div>
</template>

<script>
import {defineComponent, reactive, ref} from "vue";
import {ElMessage} from "element-plus";

export default {
  setup() {
    const Change = ref(false);
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
      input1: ref(""),
      Change,
    };
  },
  data() {
    return {
      staffName:this.$store.state.userall.staffName,
      deptPostId:this.$store.state.userall.deptPostId,
      staffId:this.$store.state.userall.staffId,
      deptId: this.$store.state.userall.deptId,

      details:{},

      //异动表单
      Change_1: {
        //名称
        name: "",
        //类型
        type_1: "",
        //部门
        dept: "",
        //部门二
        dept_1: "",
      },
      // 异动后查部门
      dept: ref([

      ]),

      // 待办转正审批列表
      tableData: [
      ],
      // 已办转正审批列表
      tableData1: [
      ],

      tableData2: [
      ],

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
    this.Move();
    this.Moved();
    this.Movemy();
  },
  methods: {
    Move(like){
      if (Object.prototype.toString.call(like)===Object.prototype.toString.call(null)) {
        this.pageInfo.staffName = this.staffName;
        this.pageInfo.auditflowdetaiState=1;
        this.axios({
          method: 'post',
          url: "http://localhost:8007/provider/move",
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
          url: "http://localhost:8007/provider/move/moveappered",
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
    Moved(like){
      if (Object.prototype.toString.call(like)===Object.prototype.toString.call(null)) {
        this.pageInfo.staffName = this.staffName;
        this.pageInfo.auditflowdetaiState=2;
        this.axios({
          method: 'post',
          url: "http://localhost:8007/provider/move",
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
      }else {
        this.pageInfo.staffName = this.staffName;
        this.pageInfo.staffName1 = like;
        this.pageInfo.auditflowdetaiState=2;
        this.axios({
          method: 'post',
          url: "http://localhost:8007/provider/move/moveappered",
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

    Movemy(){
      this.pageInfo.staffName = this.staffName;
      this.axios({
        method: 'post',
        url: "http://localhost:8007/provider/move/movemy",
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

    MoveDeptName(){
      this.pageInfo.staffId=this.staffId;
      this.axios({
        method: 'post',
        url: "http://localhost:8007/provider/move/deptName",
        data: this.pageInfo,
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response)=>{
        console.log(response);
        this.Change_1.dept=response.data.data.deptName
      }).catch(function (error){
        console.log('获取表单失败')
        console.log(error)
      })
    },

    allDeptName(){
      this.axios.get(
          "http://localhost:8007/provider/move/alldeptName", {

          }).then((response) => {
        console.log("数据:",response);

        this.dept = response.data.data
      })
    },

    fqsq(){
      this.Change = true;
      this.MoveDeptName();
      this.allDeptName();
    },

    // 提交异动
    submitForm_2() {
      if (this.Change_1.dept_1.length === 0) {
        ElMessage("部门不能为空");
      } else {
        this.axios({
          method:'post',
          url:"http://localhost:8007/provider/move/add",
          data:{
            staffId: this.staffId,
            // 申请人
            staffName: this.staffName,
            // 部门编号
            deptId: this.deptId,

            // 异动类型
            transferType: this.Change_1.type_1,
            // 调动前部门
            createdDeptName: this.Change_1.dept,
            // 调动后部门
            updatedDeptName: this.Change_1.dept_1,

            // 审批人1
            staffName1: "刘金科1",
            // 审批人2
            staffName2: "刘金科2",
            // 审批人3
            staffName3: "刘金科3",
            // 审批类型
            auditflowType: "异动",
            // 审批标题
            auditflowTitle: this.staffName + "的" + this.Change_1.type_1
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
            this.Movemy();
            this.cancel_2();
          } else {
            ElMessage.error("申请失败");
            this.cancel_2();
            this.Movemy();
          }
        }).catch(function (error){
          console.log('获取表单失败')
          console.log(error)
        })
      }
    },
    // 异动取消
    cancel_2() {
      this.Change_1 = {
        name: "",
        type_1: "",
        dept: "",
        dept_1: "",
      };
      this.Change = false;
    },

    //弹出抽屉
    popup1(like){
      this.drawer=true;
      this.pageInfo.staffName = like;
      this.axios({
        method: 'post',
        url: "http://localhost:8007/provider/move/movemy",
        data: this.pageInfo,
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log(response);
        this.details = response.data.data.records
      }).catch(function (error) {
        console.log('获取表单失败')
        console.log(error)
      })
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