<!-- 招聘计划 -->
<template>
	<div class="saas-main-content">
		<div class="j-card j-card-bordered mainContent">
      <!--标题-->
      <div class="my-cead">
        <div style="width:97%;padding-left: 20px;display: flex;align-items: center;justify-content: space-between;">
          <div style="display: flex;align-items: center;">
            <div class="my-span1" style="display: flex;">
              <i class="iconfont" style="font-size: 20px">&#xe7d9;</i>
            </div>
            <div class="my-span2">招聘计划</div>
          </div>
        </div>
      </div>
      <!--内容-->
			<div class="j-card-body ">

				<!-- 表格按钮部分 -->
				<div class="mt-20 ml-20 mr-20">

							<el-button type="primary" size="small" plain @click="addplands()">
								+ 新增</el-button>


							<el-button type="primary" size="small" plain @click="derive()">
								<el-icon style="font-size: 13px">
									<i-folder-opened />
								</el-icon>
								导出
							</el-button>
							
						<div style=" float: right">
							<el-select size="small" style="top: 2px;" v-model="pageInfo.recruitmentZt" clearable placeholder="招聘状态">
								<el-option v-for="item in options2" :key="item.value" :label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
                             &nbsp;
              <el-input v-model="pageInfo.recruitmentPlanName" placeholder="招聘计划名称"
								class="input-with-select" size="small" style="width: 300px;">
								<template #append>
									<el-button @click="getrecrselectAll()">搜索</el-button>
								</template>
							</el-input>
						</div>

					<!--
            查看招聘计划对话框
          -->
					<el-dialog v-model="dialogVisible" title="查看招聘计划" width="50%">
						<el-form ref="ruleForm" :model="ruleForm" label-width="120px" class="demo-ruleForm">

							<el-row :gutter="10">
								<el-col :span="10">
									<el-form-item label="招聘计划名称：">
										<el-input v-model="ruleForm.input1" disabled />
									</el-form-item>
								</el-col>

								<el-col :span="10">
									<el-form-item label="需求部门：">
										<el-input v-model="ruleForm.input2" disabled />
									</el-form-item>
								</el-col>
							</el-row>

							<el-row :gutter="10">
								<el-col :span="10">
									<el-form-item label="招聘职位：">
										<el-input v-model="ruleForm.input3" disabled />
									</el-form-item>
								</el-col>

								<el-col :span="10">
									<el-form-item label="最低学历：">
										<el-input v-model="ruleForm.input4" disabled />
									</el-form-item>
								</el-col>
							</el-row>
							<el-row :gutter="10">
								<el-col :span="10">
									<el-form-item label="月薪范围：">
										<el-input v-model="ruleForm.input5" disabled />
									</el-form-item>
								</el-col>

								<el-col :span="10">
									<el-form-item label="需招聘人数：">
										<el-input v-model="ruleForm.input6" disabled />
									</el-form-item>
								</el-col>
							</el-row>
							<el-form-item label="计划时间范围：" required style="width:602px">
								<el-input v-model="ruleForm.input7" disabled />
							</el-form-item>

							<el-form-item label="发布人：" required>
								<el-input v-model="ruleForm.input8" disabled style="width: 486px;" />
							</el-form-item>
						</el-form>
						<template #footer>
							<span class="dialog-footer">
								<el-button type="primary" @click="dialogVisible = false">关闭</el-button>
							</span>
						</template>
					</el-dialog>

					<!--
             编辑招聘计划对话框
          -->
					<el-dialog v-model="upDialong" title="编辑招聘计划" width="50%">
						<el-form ref="Fromrs" :model="updateForm" :rules="Fromres" label-width="120px"
							class="demo-ruleForm">
							<el-row :gutter="10">
								<el-col :span="10">
									<el-form-item label="招聘计划名称：" prop="planname">
										<el-input v-model="updateForm.planname"></el-input>
									</el-form-item>
								</el-col>

								<el-col :span="14">
									<el-form-item label="需求部门：" prop="plandept">
										<el-select v-model="updateForm.plandept" clearable ref="vueSelect"
											@click="onclicks()" @clear="onplandept()" disabled>
											<el-option hidden></el-option>
											<el-tree :data="deptlists" show-checkbox :default-expand-all=true
												:check-strictly=true node-key="deptId" :props="defaultProps" ref="tree"
												@check-change="handleCheckChange()" />
										</el-select>
									</el-form-item>
								</el-col>
							</el-row>

							<el-row :gutter="10">
								<el-col :span="10">
									<el-form-item label="招聘职位：" prop="planpost">
										<el-select disabled v-if="updateForm.plandept ==''"></el-select>

										<el-select v-model="updateForm.planpost" clearable placeholder="请选择"
											v-if="updateForm.plandept!=''" disabled>
											<span v-for="keyposts in postlists">
												<el-option :label=keyposts.postName :value=keyposts.deptPostId>
												</el-option>
											</span>
										</el-select>
									</el-form-item>
								</el-col>

								<el-col :span="14">
									<el-form-item label="最低学历：" prop="planeducation">
										<el-select v-model="updateForm.planeducation" placeholder="请选择">
											<el-option label="不限" value="不限"></el-option>
											<el-option label="初中" value="初中"></el-option>
											<el-option label="高中" value="高中"></el-option>
											<el-option label="大专" value="大专"></el-option>
											<el-option label="本科" value="本科"></el-option>
											<el-option label="硕士" value="硕士"></el-option>
											<el-option label="博士" value="博士"></el-option>
										</el-select>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row :gutter="10">
								<el-col :span="10">
									<el-form-item label="月薪范围：" prop="plansalary">
										<el-select v-model="updateForm.plansalary">
											<el-option label="3000-5000" value="3000-5000"></el-option>
											<el-option label="5000-8000" value="5000-8000"></el-option>
											<el-option label="8000-12000" value="8000-12000"></el-option>
											<el-option label="12000以上" value="12000以上"></el-option>
										</el-select>
									</el-form-item>
								</el-col>

								<el-col :span="14">
									<el-form-item label="需招聘人数：">
										<el-input-number v-model="updateForm.plansum" :min="1" :max="30"
											controls-position="right" />
									</el-form-item>
								</el-col>
							</el-row>
							<el-form-item label="计划时间范围：" required style="width:602px" prop="plantime">
								<el-date-picker v-model="updateForm.plantime" type="daterange" start-placeholder="开始时间"
									end-placeholder="结束时间" style="width:485px;"
									:default-value="[new Date(2010, 9, 1), new Date(2010, 10, 1)]">
								</el-date-picker>
							</el-form-item>
						</el-form>
						<template #footer>
							<span class="dialog-footer">
								<el-button @click="keepupdateplans('Fromrs')">确定</el-button>
								<el-button type="primary" @click="cancel('Fromrs')">取消</el-button>
							</span>
						</template>
					</el-dialog>

				</div>

				<!-- 表格内容部分 -->
				<div class="sub-Content__primary">
					<el-table :data="tableData" style="width: 100%; cursor: pointer" size="mini"
						:header-cell-style="{background:'#eef1f6',color:'#606266',textAlign:'center'}" :stripe=true>
						<el-table-column type="index" label="序号" />
						<el-table-column label="招聘计划名称" width="200">
							<template #default="scope">
								<router-link :to="{path:this.plandetails,query:{path:this.$route.query.path,id:scope.row.recruitmentPlanId
                    ,zw:scope.row.postName,name:scope.row.recruitmentPlanName}}">
									{{ scope.row.recruitmentPlanName }}
								</router-link>
							</template>
						</el-table-column>
						<el-table-column prop="postName" label="招聘职位" width="200" />
						<el-table-column prop="deptName" label="需求部门" width="200" />
						<el-table-column prop="recruitmentPlanNumber" label="招聘人数" width="140" />
						<el-table-column prop="recruitmentPlanStartTime" label="发布时间" width="200" />
						<el-table-column prop="staffName" label="发布人" width="200" />
						<el-table-column label="招聘状态" width="200">
							<template #default="scope">
								{{ scope.row.recruitmentZt == 0 ? '招聘中' : '已结束' }}
							</template>
						</el-table-column>
						<el-table-column fixed="right" label="操作" width="140">
							<template #default="scope">
								<div v-if="tableData[scope.$index].recruitmentZt==0">
									<el-button type="text" size="small" @click="updateplan(scope.row)">编辑</el-button>
									<el-popconfirm title="是否确定关闭?" @confirm="gconfirmgb(scope.row.recruitmentPlanId)"
										@cancel="gcancelgb()">
										<template #reference>
											<el-button type="text" size="small">关闭</el-button>
										</template>
									</el-popconfirm>
								</div>
								<div v-else-if="tableData[scope.$index].recruitmentZt==1">
									<el-button type="text" size="small" @click="selectrow(scope.row)">查看</el-button>
									<el-popconfirm title="是否确认删除该招聘计划?"
										@confirm="deleteconfirmgb(scope.row.recruitmentPlanId)">
										<template #reference>
											<el-button type="text" size="small">删除</el-button>
										</template>
									</el-popconfirm>

								</div>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</div>
			<!-- 分页插件 -->
			<div class="demo-pagination-block">
				<!-- <span class="demonstration">All combined</span> -->
				<el-pagination v-model:currentPage="pageInfo.currenPage" :page-sizes="[1,5,7]"
					v-model:page-size="pageInfo.pagesize" :default-page-size="pageInfo.pagesize"
					layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.total" :pager-count="5" background
					@size-change="getrecrselectAll" @current-change="getrecrselectAll" prev-text="上一页" next-text="下一页">
				</el-pagination>
			</div>
		</div>
	</div>

	<!--
     新增招聘计划对话框
  -->
	<el-dialog v-model="addDialong" title="新增招聘计划" width="50%">
		<el-form ref="Fromrs" :model="addForm" :rules="Fromres" label-width="120px" class="demo-ruleForm">
			<el-row :gutter="10">
				<el-col :span="10">
					<el-form-item label="招聘计划名称：" prop="planname">
						<el-input v-model="addForm.planname"></el-input>
					</el-form-item>
				</el-col>

				<el-col :span="14">
					<el-form-item label="需求部门：" prop="plandept">
						<el-select v-model="addForm.plandept" clearable ref="vueSelect" @click="onclicks()"
							@clear="onplandept()">
							<el-option hidden></el-option>
							<el-tree :data="deptlists" :default-expand-all=true :check-on-click-node=true
								:check-strictly=true node-key="deptId" :props="defaultProps" ref="tree"
								@check-change="handleCheckChange()" />
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>

			<el-row :gutter="10">
				<el-col :span="10">
					<el-form-item label="招聘职位：" prop="planpost">
						<el-select disabled v-if="addForm.plandept ==''"></el-select>

						<el-select v-model="addForm.planpost" clearable placeholder="请选择" v-if="addForm.plandept!=''">
							<span v-for="keyposts in postlists">
								<el-option :label=keyposts.postName :value=keyposts.deptPostId></el-option>
							</span>
						</el-select>
					</el-form-item>
				</el-col>

				<el-col :span="14">
					<el-form-item label="最低学历：" prop="planeducation">
						<el-select v-model="addForm.planeducation" placeholder="请选择">
							<el-option label="不限" value="不限"></el-option>
							<el-option label="初中" value="初中"></el-option>
							<el-option label="高中" value="高中"></el-option>
							<el-option label="大专" value="大专"></el-option>
							<el-option label="本科" value="本科"></el-option>
							<el-option label="硕士" value="硕士"></el-option>
							<el-option label="博士" value="博士"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="10">
				<el-col :span="10">
					<el-form-item label="月薪范围：" prop="plansalary">
						<el-select v-model="addForm.plansalary">
							<el-option label="3000-5000" value="3000-5000"></el-option>
							<el-option label="5000-8000" value="5000-8000"></el-option>
							<el-option label="8000-12000" value="8000-12000"></el-option>
							<el-option label="12000以上" value="12000以上"></el-option>
						</el-select>
					</el-form-item>
				</el-col>

				<el-col :span="14">
					<el-form-item label="需招聘人数：">
						<el-input-number v-model="addForm.plansum" :min="1" :max="30" controls-position="right" />
					</el-form-item>
				</el-col>
			</el-row>
			<el-form-item label="计划时间范围：" required style="width:602px" prop="plantime">
				<el-date-picker v-model="addForm.plantime" type="daterange" start-placeholder="开始时间"
					end-placeholder="结束时间" style="width:485px;"
					:default-value="[new Date(2010, 9, 1), new Date(2010, 10, 1)]">
				</el-date-picker>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="addplan('Fromrs')">确定</el-button>
				<el-button type="primary" @click="cancel('Fromrs')">取消</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script>
	import {
		ElMessage,
		ElMessageBox
	} from 'element-plus'
	import {
		export_json_to_excel
	} from "../../excal/Export2Excel";
	import {
		ref
	} from 'vue'

	export default {
		data() {
			const defaultProps = {
				children: 'deptlist',
				label: 'deptName',
			}
			return {
				defaultProps,
				//路由
        aa:[1,2,3],
				plandetails: '/recruitment/plan/details',
        addplans:'/recruitment/plan/addplans',
        //当前登录用户消息
        useralls:this.$store.state.userall,

				//查看招聘计划对话框显示隐藏
				dialogVisible: false,
				//编辑招聘计划对话框
				upDialong: false,
				//分页
				pageInfo: {
					currenPage: 1,
					/* 当前的页 */
					pagesize: 3,
					total: 0,
					//招聘计划状态
					recruitmentZt: '',
					//招聘计划名称
					recruitmentPlanName: '',
				},
				//查看招聘计划
				ruleForm: {
					//招聘计划名称
					input1: '',
					//职位
					input2: '',
					//部门
					input3: '',
					//学历
					input4: '',
					//月薪
					input5: '',
					//人数
					input6: '',
					//发布时间
					input7: [],
					//发布人
					input8: '',
				},
				//招聘状态
				options2: [{
						value: '0',
						label: '招聘中'
					},
					{
						value: '1',
						label: '已结束'
					}
				],
				//表对象
				tableData: [],
				//新增招聘计划
				addDialong: false,
				//新增招聘计划表单
				addForm: {
					planid: '',
					//招聘计划名称
					planname: '',
					//部门
					plandeptid: '',
					plandept: '',
					//职位
					planpost: '',
					//学历
					planeducation: '',
					//月薪
					plansalary: '',
					//人数
					plansum: 1,
					//发布时间
					plantime: [],
				},
				updateForm: {
					planid: '',
					//招聘计划名称
					planname: '',
					//部门
					plandeptid: '',
					plandept: '',
					//职位
					planpost: '',
					//学历
					planeducation: '',
					//月薪
					plansalary: '',
					//人数
					plansum: 1,
					//发布时间
					plantime: [],
				},
				//新增表单效验
				Fromres: {
					planname: [{
						required: true,
						message: '计划名称不可为空',
						trigger: 'change',
					}, ],
					plandept: [{
						required: true,
						message: '不可为空',
						trigger: 'change',
					}, ],
					planpost: [{
						required: true,
						message: '不可为空',
						trigger: 'change',
					}, ],
					planeducation: [{
						required: true,
						message: '不可为空',
						trigger: 'change',
					}, ],
					plansalary: [{
						required: true,
						message: '不可为空',
						trigger: 'change',
					}, ],
					plantime: [{
						required: true,
						message: '不可为空',
						trigger: 'change',
					}, ],
				},
				//存放部门信息
				deptlists: '',
				postlists: '',
			}
		},
		created() {
			this.getrecrselectAll();
			//所有部门查询
			this.selectAlldept();
		},
		methods: {

			//添加招聘计划按钮事件
			addplands() {
				this.addDialong = true
				//清空表单
				this.addForm = {
					planname: '',
					plandeptid: '',
					plandept: '',
					planpost: '',
					planeducation: '',
					plansalary: '',
					plansum: 1,
					plantime: ''
				}
			},
			//部门Select选择器清空事件
			onplandept() {
				this.addForm.plandept = ''
				this.addForm.plandeptid = ''
				//清空职位信息
				this.addForm.planpost = ''
				this.postlists = ''
			},
			//点击Select选择器清空原有复选框选项
			onclicks() {
				this.$refs.tree.setCheckedKeys([]);
			},
			//节点选中状态发生变化时的回调
			handleCheckChange(data, checked, indeterminate) {
				//获取所有选中的节点 start
				let res = this.$refs.tree.getCheckedNodes()
				res.forEach((item) => {
					this.addForm.plandeptid = item.deptId
					this.addForm.plandept = item.deptName
					//清空职位信息
					this.addForm.planpost = ''
					//查询所属职位信息
					this.planAlldeptpost();
					//关闭Select选择器
					this.$refs.vueSelect.blur();
				})
			},
			//分页查询招聘数据方法
			getrecrselectAll() {
				this.axios({
					url: "http://localhost:8007/provider/recruitment/selectAll",
					method: "post",
					data: this.pageInfo,
					responseType: 'json',
					responseEncoding: 'utf-8',
				}).then((response) => {
					console.log(response);
					this.tableData = response.data.data.records
					this.pageInfo.total = response.data.data.total
				}).catch(function(error) {
					console.log('获取列表失败')
					console.log(error);
				})
			},
			//消息提示框确认按钮事件:关闭招聘计划
			gconfirmgb(row) {
				this.axios.post(
					"http://localhost:8007/provider/recruitment/updaterecruitmentPlan", {
						"recruitmentPlanId": row,
						"recruitmentZt": 1
					}).then((response) => {
					console.log(response)
					if (response.data.data === "成功") {
						ElMessage({
							message: "操作成功",
							type: "success",
						});
					} else {
						ElMessage.error("操作失败");
					}
					this.getrecrselectAll();
				}).catch(function(error) {
					console.log(error);
				});
			},
			//招聘计划 删除操作
			deleteconfirmgb(row) {
				this.axios({
					url: "http://localhost:8007/provider/recruitment/deleterecruitmentPlan",
					method: "post",
					data: [row],
					responseType: 'json',
					responseEncoding: 'utf-8',
				}).then((response) => {
					if (response.data.data === "成功") {
						ElMessage({
							message: "删除成功",
							type: "success",
						});
					} else {
						ElMessage.error("删除失败");
					}
					this.getrecrselectAll();
				}).catch(function(error) {
					console.log(error);
				})
			},
			//消息提示框取消按钮事件
			gcancelgb() {
				ElMessage({
					message: '已取消该操作',
					type: 'warning',
				})
			},
			//新增计划取消按钮事件
			cancel(formName) {
				this.upDialong = false
				this.addDialong = false;
				this.addForm.planname = '';
				this.addForm.plandept = '';
				this.addForm.planpost = '';
				this.addForm.planeducation = '';
				this.addForm.plansalary = '';
				this.addForm.plansum = 1;
				this.addForm.plantime = '';
				this.$refs[formName].resetFields();
			},
			//查看招聘计划详情
			selectrow(row) {
				this.dialogVisible = true
				this.ruleForm.input1 = row.recruitmentPlanName;
				this.ruleForm.input2 = row.deptName;
				this.ruleForm.input3 = row.postName;
				this.ruleForm.input4 = row.educationName;
				this.ruleForm.input5 = row.recruitmentPlanSalary;
				this.ruleForm.input6 = row.recruitmentPlanNumber;
				this.ruleForm.input7[0] = row.recruitmentPlanStartTime;
				this.ruleForm.input7[1] = row.recruitmentPlanEndTime;
				this.ruleForm.input8 = row.staffName;
			},
			/**
			 * select：查询所有部门信息
			 */
			selectAlldept() {
				this.axios({
					url: "http://localhost:8007/provider/dept/dept/selectAlldept",
					method: "post",
					responseType: 'json',
					responseEncoding: 'utf-8',
				}).then((response) => {
					console.log(response);
					this.deptlists = response.data.data
				}).catch(function(error) {
					console.log('获取列表失败')
					console.log(error);
				})
			},
			//通过部门id查询所属职位
			planAlldeptpost() {
				this.axios({
					url: "http://localhost:8007/provider/deptpost/yyxdeptpost",
					method: "post",
					data: {
						deptId: this.addForm.plandeptid
					},
					responseType: 'json',
					responseEncoding: 'utf-8',
				}).then((response) => {
					this.postlists = response.data.data
				}).catch(function(error) {
					console.log('获取列表失败')
					console.log(error);
				})
			},
			/**
			 * 新增招聘计划
			 */
			addplan(name) {
				this.$refs[name].validate((valid) => {
					if (valid) {
						this.axios({
							url: "http://localhost:8007/provider/recruitment/addplans",
							method: "post",
							data: {
								recruitmentPlanName: this.addForm.planname,
								deptId: this.addForm.plandeptid,
								deptPostId: this.addForm.planpost,
								educationName: this.addForm.planeducation,
								recruitmentPlanNumber: this.addForm.plansum,
								recruitmentPlanStartTime: this.addForm.plantime[0],
								recruitmentPlanEndTime: this.addForm.plantime[1],
								recruitmentPlanSalary: this.addForm.plansalary,
								staffId: this.useralls.staffId,
								createdTime: new Date(),
								updatedTime: new Date()
							},
							responseType: 'json',
							responseEncoding: 'utf-8',
						}).then((response) => {
							if (response.data.data === "成功") {
								ElMessage({
									message: "操作成功",
									type: "success",
								});
							}
							this.addDialong = false;
							this.getrecrselectAll();
						}).catch(function(error) {
							console.log(error);
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			//招聘计划编辑
			updateplan(row) {
				this.upDialong = true;
				this.updateForm.planid = row.recruitmentPlanId
				this.updateForm.planname = row.recruitmentPlanName
				this.updateForm.plandept = row.deptName
				this.updateForm.planpost = row.postName
				this.updateForm.planeducation = row.educationName
				this.updateForm.plansalary = row.recruitmentPlanSalary
				this.updateForm.plansum = row.recruitmentPlanNumber
				this.updateForm.plantime[0] = row.recruitmentPlanStartTime
				this.updateForm.plantime[1] = row.recruitmentPlanEndTime

			},
			keepupdateplans(name) {
				this.$refs[name].validate((valid) => {
					if (valid) {
						this.axios.post(
							"http://localhost:8007/provider/recruitment/updaterecruitmentPlan", {
								recruitmentPlanId: this.updateForm.planid,
								recruitmentPlanName: this.updateForm.planname,
								educationName: this.updateForm.planeducation,
								recruitmentPlanNumber: this.updateForm.plansum,
								recruitmentPlanStartTime: this.updateForm.plantime[0],
								recruitmentPlanEndTime: this.updateForm.plantime[1],
								recruitmentPlanSalary: this.updateForm.plansalary,
							}).then((response) => {
							console.log(response)
							if (response.data.data === "成功") {
								ElMessage({
									message: "操作成功",
									type: "success",
								});
							}
							this.upDialong = false;
							this.getrecrselectAll();
						}).catch(function(error) {
							console.log(error);
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},

			// 点击导出操作
			derive() {
				ElMessageBox.confirm(
					'此操作将导出excel文件, 是否继续?',
					'提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning',
					}
				).then(() => {
					this.deriveExcel();
				}).catch(() => {
					ElMessage({
						type: 'info',
						message: '取消成功',
					})
				})
			},
			// 导出方法
			deriveExcel() {
				var _this = this;
				let tHeader = ["招聘计划名称", "招聘职位", "需求部门", "招聘人数", "发布时间", "发布人"]; // 导出的表头名
				let filterVal = ["recruitmentPlanName", "postName", "deptName", "recruitmentPlanNumber",
					"recruitmentPlanStartTime", "staffName"
				]; //导出其prop属性
				ElMessageBox.prompt('请输入文件名', '提示', {
						confirmButtonText: '生成',
						cancelButtonText: '取消',
					}).then(({
						value
					}) => {
						let data = _this.formatJson(filterVal, _this.tableData);
						export_json_to_excel(tHeader, data, value);
						ElMessage({
							type: 'success',
							message: `生成成功`,
						})
					})
					.catch(() => {
						ElMessage({
							type: 'info',
							message: '取消成功',
						})
					})
			},
			formatJson(filterVal, jsonData) {
				return jsonData.map((v) => filterVal.map((j) => v[j]));
			},
		}
	}
</script>


<style type="text/css" scoped>
	@import url("../../css/zpdaohang.css");

  /deep/.el-table td.el-table__cell div {
    box-sizing: border-box;
    text-align: center;
  }
	.demo-pagination-block {
		margin-left: 15px;
		margin-top: 10px;
		margin-bottom: 30px;
	}

	.saas-main-content {
		min-height: 500px;
	}

	.j-card-bordered {
		border: 1px solid #e9e9e9;
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

	.j-card {
		background: #fff;
		border-radius: 4px;
		font-size: 14px;
		position: relative;
		overflow: hidden;
		transition: all 0.3s;
		margin-top: 0px;
		min-height: 100%;
	}

	.mr-20 {
		margin-right: 20px;
	}

	.ml-20 {
		margin-left: 20px;
	}

	.mt-20 {
		margin-top: 20px;
	}

	.mainContent .sub-Content__primary {
		padding: 25px 20px;
		background: #fff;
		border-radius: 4px;
	}

	.el-table {
		font-size: 13px;
	}

	/deep/ .el-table th.el-table__cell>.cell {
		display: inline-block;
		box-sizing: border-box;
		position: relative;
		vertical-align: middle;
		width: 100%;
		font-weight: initial;
		color: black;
	}

  @font-face {
    font-family: 'iconfont';  /* Project id 3164770 */
    src: url('//at.alicdn.com/t/font_3164770_te5p4157fzj.woff2?t=1644419209354') format('woff2'),
    url('//at.alicdn.com/t/font_3164770_te5p4157fzj.woff?t=1644419209354') format('woff'),
    url('//at.alicdn.com/t/font_3164770_te5p4157fzj.ttf?t=1644419209354') format('truetype');
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
  .demo-pagination-block {
    margin-left: 15px;
    margin-top: 10px;
    margin-bottom: 30px;
  }


  .my-cead {
    height: 50px;
    width: 100%;
    display: flex;
    background-color: #f9f9f9;
    border-bottom:1px solid #eaeaea;
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
</style>
