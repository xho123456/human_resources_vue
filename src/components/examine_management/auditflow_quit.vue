<template>
  <!--  离职审批页面-->
  <div class="body_1">
    <el-tabs type="border-card">
      <!-- 待办申请页面 -->
      <el-tab-pane label="待办申请">
        <el-button @click="quitMe(null)">重置</el-button>
        &nbsp;
        <el-input
          v-model="input"
          placeholder="输入名称搜索"
          style="width: 130px"
        />
        &nbsp;
        <el-button type="success" @click="quitMe(input)">搜索</el-button>
        <!--  表格 -->
        <el-table
          ref="filterTable1"
          row-key="date1"
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
            @size-change="quitMe(input)"
            @current-change="quitMe(input)"
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
        <el-form-item label="当前审核状态：" v-if="details[0].auditflowState != null">
          <el-input v-if="details[0].auditflowState===0" v-model="state.pending" disabled></el-input>
          <el-input v-if="details[0].auditflowState===1" v-model="state.through" disabled></el-input>
          <el-input v-if="details[0].auditflowState===2" v-model="state.rejected" disabled></el-input>
          <el-input v-if="details[0].auditflowState===3" v-model="state.undo" disabled></el-input>
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
        <el-button @click="quited(null)">重置日期过滤</el-button>
        &nbsp;
        <el-input
          v-model="input1"
          placeholder="输入名称搜索nima"
          style="width: 130px"
        />
        &nbsp;
        <el-button type="success" @click="quited(input1)">搜索</el-button>

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
            @size-change="quitMe(input1)"
            @current-change="quitMe(input1)"
            prev-text="上一页"
            next-text="下一页"
            background
          >
            <!--  @size-change="selectUsers"
					@current-change="selectUsers" -->
          </el-pagination>
        </div>
      </el-tab-pane>
	  
	  <!--       我的申请页面:离职 -->
	        <el-tab-pane label="我的申请">
	  
	                <el-button @click="quitmy()">重置日期过滤</el-button>
	                <el-button @click="quit = true" >发起申请</el-button>
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
	  
	  
<!--	                <el-input-->
<!--	                    v-model="input"-->
<!--	                    placeholder="输入名称搜索"-->
<!--	                    style="width: 130px"-->
<!--	                />-->
<!--	                &nbsp;-->
<!--	                <el-button type="success" plain>搜索</el-button>-->
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
	                      :page-sizes="[3, 5, 10]"
	                      v-model:page-size="pageInfo.pagesize"
	                      :default-page-size="pageInfo.pagesize"
	                      layout="total, sizes, prev, pager, next, jumper"
	                      :total="pageInfo.total"
	                      :pager-count="5"
                        @size-change="quitmy()"
                        @current-change="quitmy()"
                        prev-text="上一页"
                        next-text="下一页"
	                      background
	                  >
	                  </el-pagination>
	                </div>
	        </el-tab-pane>
			
			<!--      申请离职弹出框 -->
	  <el-dialog
	      v-model="quit"
	      title="离职"
	      width="50%"
	      :close-on-click-modal="false"
	      @close="cancel_4"
	  >
	    <el-form ref="form" :model="quit_1" label-width="120px">
	      <el-form-item label="员工名称">
	        <el-input v-model="staffName" disabled></el-input>
	      </el-form-item>
	      <el-form-item label="部门编号">
	        <el-input v-model="deptId" disabled></el-input>
	      </el-form-item>
	      <el-form-item label="离职原因">
	        <el-select v-model="quit_1.type_1" placeholder="请选择离职原因">
	          <el-option label="家庭原因" value="家庭原因"></el-option>
	          <el-option label="实习生返校" value="实习生返校"></el-option>
	          <el-option label="回校深造" value="回校深造"></el-option>
	          <el-option label="交通不便" value="交通不便"></el-option>
	          <el-option label="身体健康因素" value="身体健康因素"></el-option>
	          <el-option
	              label="合同到期发起续签"
	              value="合同到期发起续签"
	          ></el-option>
	          <el-option label="薪资问题" value="薪资问题"></el-option>
	          <el-option label="福利原因" value="福利原因"></el-option>
	          <el-option label="个人发展原因" value="个人发展原因"></el-option>
	          <el-option
	              label="人际关系不融洽"
	              value="人际关系不融洽"
	          ></el-option>
	          <el-option
	              label="工作环境不适应"
	              value="工作环境不适应"
	          ></el-option>
	          <el-option
	              label="团队气氛不适应"
	              value="团队气氛不适应"
	          ></el-option>
	          <el-option
	              label="企业文化不适应"
	              value="企业文化不适应"
	          ></el-option>
	          <el-option
	              label="工作职责及目标不明确"
	              value="工作职责及目标不明确"
	          ></el-option>
	          <el-option
	              label="未得到充分的支持和授权"
	              value="未得到充分的支持和授权"
	          ></el-option>
	          <el-option label="其他" value="其他"></el-option>
	        </el-select>
	      </el-form-item>
	      <el-form-item label="离职说明">
	        <el-input
	            v-model="quit_1.remarks_1"
	            type="textarea"
	            maxlength="100"
	            show-word-limit
	        ></el-input>
	      </el-form-item>
	      <el-form-item label="申请离职日期">
	        <el-date-picker
	            v-model="quit_1.date1"
	            type="date"
	            placeholder="选择日期"
	            @change="difference5"
	        ></el-date-picker>
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
	        <el-button type="primary" @click="submitForm_4">确定</el-button>
	        <el-button @click="cancel_4">取消</el-button>
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
	  const quit = ref(false);
    return {
      drawer: ref(false),
      input: ref(""),
      input1: ref(""),
	   quit,
    };
  },
  data() {
    return {
      staffName:this.$store.state.userall.staffName,
      deptPostId:this.$store.state.userall.deptPostId,
      staffId:this.$store.state.userall.staffId,
      deptId: this.$store.state.userall.deptId,

      details:{},

		//离职表单
		quit_1: {
		  //名称
		  name: "",
		  //部门
		  dept: "",
		  //原因
		  type_1: "",
		  //备注
		  remarks_1: "",
		  //日期
		  date1: "",
		},
		
      // 待办转正审批列表
      tableData: [
      ],
      // 已办转正审批列表
      tableData1: [
      ],
      //我的申请
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
        auditFlowId:"",
      },
    };
  },
  mounted() {
    this.quitMe(null);
    this.quited(null);
    this.quitmy();
  },
  methods: {
    quitMe(like){
      if (Object.prototype.toString.call(like)===Object.prototype.toString.call(null)) {
        this.pageInfo.staffName = this.staffName;
        this.pageInfo.auditflowdetaiState=1;
        this.axios({
          method: 'post',
          url: "http://localhost:8007/provider/quit/departureMe",
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
          url: "http://localhost:8007/provider/quit/departureLikeName",
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

    quited(like){
      if (Object.prototype.toString.call(like)===Object.prototype.toString.call(null)) {
        this.pageInfo.staffName = this.staffName;
        this.pageInfo.auditflowdetaiState=2;
        this.axios({
          method: 'post',
          url: "http://localhost:8007/provider/quit/departureMe",
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
          url: "http://localhost:8007/provider/quit/departureLikeName",
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
    quitmy(){
      this.pageInfo.staffName = this.staffName;
      this.axios({
        method: 'post',
        url: "http://localhost:8007/provider/quit/departureMy",
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

	  // 提交离职
	  submitForm_4() {
	    if (this.quit_1.type_1.length === 0) {
	      ElMessage("请选择您的离职原因");
	    } else if (this.quit_1.remarks_1.length === 0) {
	      ElMessage("请输入您的离职说明");
	    } else if (this.quit_1.date1.length === 0) {
	      ElMessage("请选择日期");
	    } else {
        this.axios({
          method:'post',
          url:"http://localhost:8007/provider/quit/add",
          data:{
            staffId: this.staffId,
            // 申请人
            staffName: this.staffName,
            // 部门编号
            deptId: this.deptId,
            // 离职原因
            quitType: this.quit_1.type_1,
            // 离职说明
            quitExplain: this.quit_1.remarks_1,
            // 离职日期
            formalQuitDate: this.quit_1.date1,
            // 审批人1
            staffName1: "刘金科1",
            // 审批人2
            staffName2: "刘金科2",
            // 审批人3
            staffName3: "刘金科3",
            // 审批类型
            auditflowType: "离职",
            // 审批标题
            auditflowTitle: this.staffName + "的" + this.quit_1.type_1
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
            this.quitmy();
            this.cancel_4();
          } else {
            ElMessage.error("你已申请离职");
            this.cancel_4();
            this.quitmy();
          }
        }).catch(function (error){
          console.log('获取表单失败')
          console.log(error)
        })

	    }
	  },
	  // 取消离职
	  cancel_4() {
	    this.quit_1 = {
	      name: "",
	      dept: "",
	      type_1: "",
	      remarks_1: "",
	      date1: "",
	    };
	    this.quit = false;
	  },
	  // 判断离职
	  difference5: function (endTime) {
	    let now = new Date();
	    if (endTime < now) {
	      ElMessage({
	        message: "离职时间不能小于当前时间，请重新选择!",
	        type: "warning",
	      });
	      this.cancel_date5();
	    }
	  },
	  cancel_date5() {
	    this.quit_1.date1 = "";
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
