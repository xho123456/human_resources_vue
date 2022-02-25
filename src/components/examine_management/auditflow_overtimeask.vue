<template>
  <!--  转正审批页面-->
  <div class="body_1">
    <el-tabs type="border-card">
      <!-- 待办申请页面 -->
      <el-tab-pane label="待办申请"  >
        <el-button @click="positveme(null)">重置</el-button>
        &nbsp;
        <el-input
            v-model="input"
            placeholder="输入名称搜索"
            style="width: 130px"
        />
        &nbsp;
        <el-button type="success" @click="positveme(input)">搜索</el-button>
        <!--  表格 -->
        <el-table
            :data="tableData"
            style="width: 100%"
        >
          <el-table-column
              prop="auditflowdetaidate"
              label="日期"
              width="140"
          />
          <el-table-column prop="auditflowid" label="审批编号" width="100"/>
          <el-table-column prop="auditflowtype" label="流程" width="100"/>
          <el-table-column prop="staffname1" label="申请人" width="150"/>
          <el-table-column prop="auditflowdetaistate" label="状态" width="100">
            <template #default="scope">
              <span v-if="scope.row.auditflowdetaistate==0">审批中</span>
              <span v-if="scope.row.auditflowdetaistate==1">待我审批</span>
              <span v-if="scope.row.auditflowdetaistate==2">已审批</span>
              <span v-if="scope.row.auditflowdetaistate==3">驳回</span>
            </template>
          </el-table-column>
          <el-table-column prop="staffname2" label="历史审批人" width="150"/>
          <el-table-column prop="createdtime" label="最近处理" width="140"/>
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
              @size-change="positveme(input)"
              @current-change="positveme(input)"
              prev-text="上一页"
              next-text="下一页"
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
<!--        -->
        <el-button @click="positveed(null)">重置</el-button>
        &nbsp;
        <el-input
            v-model="input2"
            placeholder="输入名称搜索"
            style="width: 130px"
        />
        &nbsp;
        <el-button type="success"  @click="positveed(input2)">搜索</el-button>
        <el-table
            :data="tableData1"
            style="width: 100%"
        >
          <el-table-column
              prop="auditflowdetaidate"
              label="日期"
              width="140"
          />
          <el-table-column prop="auditflowid" label="审批编号" width="100"/>
          <el-table-column prop="auditflowtype" label="流程" width="100"/>
          <el-table-column prop="staffname1" label="申请人" width="150"/>
          <el-table-column prop="auditflowdetaistate" label="状态" width="100">
            <template #default="scope">
              <span v-if="scope.row.auditflowdetaistate==0">审批中</span>
              <span v-if="scope.row.auditflowdetaistate==1">待我审批</span>
              <span v-if="scope.row.auditflowdetaistate==2">已审批</span>
              <span v-if="scope.row.auditflowdetaistate==3">驳回</span>
            </template>
          </el-table-column>
          <el-table-column prop="staffname2" label="历史审批人" width="150"/>
          <el-table-column prop="createdtime" label="最近处理" width="140"/>
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
              @size-change="positveed(input2)"
              @current-change="positveed(input2)"
              prev-text="上一页"
              next-text="下一页"
              background
          >
          </el-pagination>

        </div>
      </el-tab-pane>
      <!--       我的申请页面:转正 -->
      <el-tab-pane label="我的申请">

        <el-button @click="resetDateFilter">重置</el-button>
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


        <!-- 表格   -->
        <el-table
            ref="filterTable"
            row-key="date"
            :data="tableData2"
            style="width: 100%"
        >
          <el-table-column
              prop="auditflowdetaidate"
              label="日期"
              width="140"
          />
          <el-table-column prop="auditflowid" label="审批编号" width="100"/>
          <el-table-column prop="auditflowtype" label="流程" width="100"/>
          <el-table-column prop="staffname1" label="申请人" width="150"/>
          <el-table-column prop="auditflowdetaistate" label="状态" width="100">
            <template #default="scope">
              <span v-if="scope.row.auditflowdetaistate==0">审批中</span>
              <span v-if="scope.row.auditflowdetaistate==1">审批中</span>
              <span v-if="scope.row.auditflowdetaistate==2">已审批</span>
              <span v-if="scope.row.auditflowdetaistate==3">驳回</span>
            </template>
          </el-table-column>
          <el-table-column prop="staffname2" label="历史审批人" width="150"/>
          <el-table-column prop="createdtime" label="最近处理" width="140"/>
          <el-table-column label="操作" >
            <template #default="scope" >
              <el-popconfirm
                  confirm-button-text="确定"
                  cancel-button-text="取消"
                  :icon="InfoFilled"
                  icon-color="red"
                  title="确定撤销吗?"
                  @confirm="through3()"
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
              @size-change="resetDateFilter"
              @current-change="resetDateFilter"
              prev-text="上一页"
              next-text="下一页"
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
            <el-input v-model="staffName" disabled></el-input>
          </el-form-item>
        <el-form-item label="部门编号                  :">
            <el-input v-model="postNmae" disabled></el-input>
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
                    审批专员1
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
                  审批专员2
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                </div>
                <div class="sub-title" style="line-height: 10px">
                  审批专员3
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
      postNmae:this.$store.state.userall.deptPostId,
      staffId:this.$store.state.userall.staffId,
      staffName:this.$store.state.userall.staffName,


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
        date: "",
      },

      input:null,
      input2:null,
      input3:null,

      // 待办转正审批列表
      tableData: [

      ],
      // 已办转正审批列表
      tableData1: [

      ],
      // 我的转正审批列表
      tableData2: [],
      // 分页
      pageInfo: {
        // 分页参数
        currentPage: 1, //当前页
        pagesize: 3, // 页大小
        total: 0, // 总页数
        staffname1: '',
        staffid:'',
      },
    };
  },
  mounted() {
    this.positveme(null);
    this.positveed();
    this.resetDateFilter();
  },
  methods: {
    positveme(like){
      if(Object.prototype.toString.call(like)===Object.prototype.toString.call(null)) {
        var _this = this;
        _this.axios.get(
            "http://localhost:8007/provider/worker", {
              params: this.pageInfo,
            }).then((response) => {
          console.log(response);

          _this.tableData = response.data.data.records
          _this.pageInfo.total = response.data.data.total
        })
      }else {
        this.pageInfo.staffname1=like;
        //alert(this.pageInfo.staffname1);
        this.axios({
          method:'post',
          url:"http://localhost:8007/provider/worker/likename",
          data:this.pageInfo,
          responseType:'json',
          responseEncoding:'utf-8',
        }).then((response)=>{
          console.log(response);
          this.tableData = response.data.data.records
          this.pageInfo.total=response.data.data.total
        }).catch(function (error){
          console.log('获取表单失败')
          console.log(error)
        })
      }
    },
    positveed(like){
      if(Object.prototype.toString.call(like)===Object.prototype.toString.call(null)) {
        var _this = this;
        _this.axios.get(
            "http://localhost:8007/provider/worker/positveed", {
              params: this.pageInfo,
            }).then((response) => {
          console.log(response);
          if (response.data.data != null) {
            _this.tableData1 = response.data.data.records
            _this.pageInfo.total = response.data.data.total
          }
        })
      }else {
        this.pageInfo.staffname1=like;
        this.axios({
          method:'post',
          url:"http://localhost:8007/provider/positveed/likename",
          data:this.pageInfo,
          responseType:'json',
          responseEncoding:'utf-8',
        }).then((response)=>{
          console.log(response);
          this.tableData1 = response.data.data.records
          this.pageInfo.total=response.data.data.total
        }).catch(function (error){
          console.log('获取表单失败')
          console.log(error)
        })
      }
    },

    //提交转正
    submitForm_1() {
      if (this.become_1.remarks_1.length === 0) {
        ElMessage("备注不能为空");
      } else if (this.become_1.date1.length === 0) {
        ElMessage("日期不能为空");
      } else {
        this.axios({
          method:'post',
          url:"http://localhost:8007/provider/worker/add",
          data:{
            staffId: this.staffId,
            // 申请人
            staffName: this.staffName,
            // 部门名称
            deptId: this.postNmae,
            // 转正类型
            workertype: this.become_1.type_1,
            // 转正备注
            auditflowdetaiRemarks: this.become_1.remarks_1,
            // 转正日期
            workerdate: this.become_1.date1,
            // 审批人1
            staffName1: "审批专员1",
            // 审批人2
            staffName2: "审批专员2",
            // 审批人3
            staffName3: "审批专员3",
            // 审批类型
            auditflowType: "转正",
            // 审批标题
            auditflowTitle: this.staffName + "的" + this.become_1.type_1
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
           // this.resetDateFilter();
            this.cancel_1();
          } else {
            ElMessage.error("申请失败");
            this.cancel_1();
          //  this.resetDateFilter();
          }
        }).catch(function (error){
          console.log('获取表单失败')
          console.log(error)
        })
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
    // 我的申请
    resetDateFilter() {
      this.pageInfo.staffid=this.staffId;
      this.axios({
        method:'post',
        url:"http://localhost:8007/provider/worker/myid",
        data:this.pageInfo,
        responseType:'json',
        responseEncoding:'utf-8',
      }).then((response)=>{
        console.log(response);
        this.tableData2 = response.data.data.records
        this.pageInfo.total=response.data.data.total
      }).catch(function (error){
        console.log('获取表单失败')
        console.log(error)
      })
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
      if (this.postNmae==16){
        alert("审批1")
      }else if (this.postNmae==17){
        alert("审批2")
      }else if (this.postNmae==18){
        alert("审批3")
      }else {
        ElMessage({
          message:"权限不够",
          type:"warning"
        })
      }

    },
    // 点击驳回确认按钮触发
    through2(){
      if (this.postNmae==16){
        alert("审批1")
      }else if (this.postNmae==17){
        alert("审批2")
      }else if (this.postNmae==18){
        alert("审批3")
      }else {
        ElMessage({
          message:"权限不够",
          type:"warning"
        })
      }
    },
    // 点击撤销确认按钮触发
    through3(){
      if (this.postNmae==16){
        alert("审批1"+this.staffId)
      }else if (this.postNmae==17){
        alert("审批2"+this.staffId)
      }else if (this.postNmae==18){
        alert("审批3"+this.staffId)
      }else {
        ElMessage({
          message:"权限不够",
          type:"warning"
        })
      }
    }
  }
};
</script>

<style scoped>
@import url("../../css/Examine_2.css");
/deep/.el-table .el-table__cell{
  text-align: center;
}
</style>
