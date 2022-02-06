<!--简历：候选人-->
<template>
  <div class="sub-Content__primary">
    <div class="ant-spin-nested-loading">
      <div class="ant-spin-container">
        <div class="mt-20 ml-20 mr-20">

          <router-link :to="{path:this.addresume,query:{path:this.$route.query.path}}">
            <el-button size="small" type="primary" plain>
                + 新增
            </el-button>
          </router-link>
&nbsp;
          <el-button size="small" type="primary" plain>
            <el-icon style="font-size: 12px">
              <i-upload/>
            </el-icon>
            导入
          </el-button>

          <el-button size="small" type="primary" plain  @click="derive()">
            <el-icon style="font-size: 13px">
              <i-folder-opened/>
            </el-icon>
            导出
          </el-button>

          <el-button size="small" type="primary" plain @click="deletesume()">批量删除</el-button>

          <el-button size="small" type="primary" plain @click="icons =! icons">筛选</el-button>

          <el-input
              v-model="pageInfo.resumeName"
              placeholder="请输入应聘者姓名"
              class="input-with-select"
              size="small"
              style="width: 300px; float: right"
          >
            <template #append>
              <el-button @click="beckselectAllhxr()">搜索</el-button>
            </template>
          </el-input>


        </div>
      </div>
      <!--
        筛选框
      -->
      <div class="icon-s" v-show="icons">
        <el-row :gutter="10">
          <el-col :span="6.2">
            <!-- 创建 时间搜索 -->
            <el-date-picker
                style="width: 315px"
                size="small"
                v-model="pageInfo.toujTime"
                type="daterange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-value="[new Date(2010, 9, 1), new Date(2010, 10, 1)]"
            >
            </el-date-picker>
          </el-col>

          <el-col :span="3.5">
            <el-select v-model="pageInfo.deptMane" clearable ref="vueSelect"  size="small"
                       @click="onclicks()">
              <el-option hidden></el-option>
              <el-tree
                  :data="deptlist"
                  :default-expand-all=true
                  :check-on-click-node=true
                  :check-strictly=true
                  node-key="deptId"
                  :props="defaultProps"
                  ref="tree"
                  @check-change="handleCheckChangesx()"
              />
            </el-select>
          </el-col>

          <el-col :span="3.5">
            <el-select v-model="pageInfo.postName" placeholder="投递职位" size="small" disabled
                       v-if="pageInfo.deptIdss==''">
              <span v-for="keypost in deptpostlist">
                 <el-option :label=keypost.postName :value=keypost.postName></el-option>
              </span>
            </el-select>

            <el-select v-model="pageInfo.postName" placeholder="投递职位" size="small" v-if="pageInfo.deptIdss!=''">
              <span v-for="keypost in deptpostlist">
                 <el-option :label=keypost.postName :value=keypost.postName></el-option>
              </span>
            </el-select>
          </el-col>


          <el-col :span="3.5">
            <el-select v-model="pageInfo.resumeEducation" placeholder="学历" size="small">
              <el-option label="初中" value="初中"></el-option>
              <el-option label="高中" value="高中"></el-option>
              <el-option label="大专" value="大专"></el-option>
              <el-option label="本科" value="本科"></el-option>
              <el-option label="硕士" value="硕士"></el-option>
              <el-option label="博士" value="博士"></el-option>
              <el-option label="其他" value="其他"></el-option>
            </el-select>
          </el-col>


          <el-col :span="1.8">
            <el-button type="primary" @click="beckselectAllhxr()" size="mini">确定</el-button>
          </el-col>

          <el-col :span="1.8">
            <el-button type="primary" @click="reset()" size="mini">重置</el-button>
          </el-col>
          <el-col :span="2">
            <span style="cursor: pointer" @click="reset(),icons =! icons"> 收起 <i class="iconfont">&#xe76e;</i></span>
          </el-col>
        </el-row>
      </div>
    </div>
    <br/>
    <!-- 表格数据 -->
    <div class="ant-table-wrapper j_statistics_layout">
      <el-table :data="tableData" style="width: 100%; cursor: pointer" size="mini"
                :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                @selection-change="deleteresumeall" :stripe=true>
        <el-table-column fixed="left" align="center" prop="resumeId" type="selection" width="80"/>
        <el-table-column fixed="left" label="姓名" width="100">
          <template #default="scope">
            <router-link :to="{path:this.details,query:{path:this.$route.query.path,name:scope.row.resumeId,posta:scope.row.postName}}">{{scope.row.resumeName}}</router-link>
          </template>
        </el-table-column>
        <el-table-column fixed="left" prop="postName" label="投递职位" width="140"/>
        <el-table-column prop="resumeSex" label="性别" width="140"/>
        <el-table-column prop="resumeEducation" label="学历" width="140"/>
        <el-table-column prop="resumePhone" label="手机号" width="140"/>
        <el-table-column prop="resumeScoller" label="毕业学校" width="140"/>
        <el-table-column prop="resumeHy" label="婚姻状况" width="140"/>
        <el-table-column prop="resumeAge" label="年龄" width="140"/>
        <el-table-column prop="resumeBirthday" label="出生日期" width="140"/>
        <el-table-column prop="resumeQxingz" label="期望薪资" width="140"/>
        <el-table-column prop="resumeQzhiw" label="期望职位" width="140"/>
        <el-table-column prop="resumeShengg" label="身高" width="140"/>
        <el-table-column prop="resumeZjzw" label="最近职位" width="140"/>
        <el-table-column prop="resumeIntroduce" label="自我评价" width="140"/>
        <el-table-column prop="resumeMailbox" label="邮箱" width="140"/>
        <el-table-column prop="remarks" label="备注" width="140"/>
        <el-table-column prop="resumeResidence" label="所在地" width="140"/>
        <el-table-column prop="toujTime" label="投简日期" width="140"/>
        <el-table-column prop="resumePoliticalOutlook" label="政治面貌" width="140"/>
        <el-table-column fixed="right" label="操作" width="120">
          <template #default="scope">
            <div style="width: 75px">
              <el-button type="text" size="small" @click="remarks=true,elremarksId=tableData[scope.$index].resumeId">备注</el-button>
              <el-row class="block-col-2" style="float: right;">
                <el-col :span="8">
                  <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <el-button type="text" size="small">更多<i class="iconfont" style="font-size: 10px">&#xe772;</i></el-button>
                </span>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item @click="open(scope.row.resumeId)">删除</el-dropdown-item>
                        <el-dropdown-item @click="zeliminate(scope.row.resumeId)">转入储备人才</el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </el-col>
              </el-row>
            </div>

          </template>
        </el-table-column>
      </el-table>

      <div class="demo-pagination-block">
        <el-pagination
            v-model:currentPage="pageInfo.currenPage"
            :page-sizes="[5, 10, 30, 50]"
            v-model:page-size="pageInfo.pagesize"
            :default-page-size="pageInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageInfo.total"
            :pager-count="5"
            background
            @size-change="beckselectAllhxr()"
            @current-change="beckselectAllhxr()"
        >
        </el-pagination>
      </div>
    </div>
  </div>
  <!-- 备注信息对话框 -->
  <el-dialog
      v-model="remarks"
      title="备注"
      width="30%">
    <el-input
        v-model="elremarks"
        :rows="6"
        type="textarea"
    />
    <template #footer>
                  <span class="dialog-footer">
                    <el-button @click="addremarks()">确定</el-button>
                    <el-button type="primary" @click="remarks = false,elremarks=''">取消</el-button>
                  </span>
    </template>
  </el-dialog>
</template>

<script>
import {
  ref
} from 'vue'
import {ElMessageBox, ElMessage} from 'element-plus'
import {export_json_to_excel} from "../../excal/Export2Excel";

export default {
  data() {
    const defaultProps = {
      children: 'deptlist',
      label: 'deptName',
    }
    return {
      defaultProps,
      //路由地址
      addresume: '/recruitment/recruit/addresume',
      details: '/recruitment/resume/details',

      //简历id数组：全选删除
      resumeb: [],
      id: [],

      //分页、模糊查询数据
      pageInfo: {
        currenPage: 1,
        /* 当前的页 */
        pagesize: 5,
        total: 0,
        //投简时间
        toujTime: '',
        //学历
        resumeEducation: '',
        //投递职位
        postName: '',
        //搜索框
        resumeName: '',
        //部门编号
        deptIdss:'',
        //部门名称
        deptMane:''
      },
      //筛选框显示隐藏
      icons: false,
      //搜索框
      input: "",
      //表格数据
      tableData: [],
      //备注信息对话框显示隐藏事件
      remarks: false,
      //备注信息存放、简历编号
      elremarks: '',
      elremarksId: '',
      //存放部门信息、职位信息
      deptlist:'',
      deptpostlist:'',

    }
  },
  created() {
    this.beckselectAllhxr();
    this.selectAlldept();
  },

  methods: {
    //点击Select选择器清空原有复选框选项
    onclicks() {
      this.$refs.tree.setCheckedKeys([]);
    },
    //筛选：节点选中状态发生变化时的回调
    handleCheckChangesx(data, checked, indeterminate) {
      //获取所有选中的节点 start
      let res = this.$refs.tree.getCheckedNodes()
      res.forEach((item) => {
        this.pageInfo.deptIdss = item.deptId
        this.pageInfo.deptMane = item.deptName
        //查询所属职位信息
        this.setuppost();
        //关闭Select选择器
        this.$refs.vueSelect.blur();
      })
    },
    Formall(){
      for (var i=0 ; i<this.deptlist.length;i++){
        if(this.pageInfo.deptIdss==this.deptlist[i].deptId){
          this.pageInfo.deptMane = this.deptlist[i].deptName
        }
      }

    },
    //分页查询全部简历信息
    beckselectAllhxr(){
      this.axios({
        url: " http://localhost:8007/provider/resume/selectAllhxr",
        method: "post",
        data: {
          startTime: this.pageInfo.toujTime[0],
          endTime: this.pageInfo.toujTime[1],
          currenPage: this.pageInfo.currenPage,
          resumeEducation: this.pageInfo.resumeEducation,
          postName: this.pageInfo.postName,
          pagesize: this.pageInfo.pagesize,
          resumeName: this.pageInfo.resumeName,
          deptName: this.pageInfo.deptMane,
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log(response);
        this.tableData = response.data.data.records
        this.pageInfo.total = response.data.data.total
      }).catch(function (error) {
        console.log('获取列表失败')
        console.log(error);
      })
    },
    //筛选框重置操作
    reset() {
      this.pageInfo.toujTime = '';
      this.pageInfo.postName = '';
      this.pageInfo.resumeEducation = '';
      this.pageInfo.deptIdss = '';
      this.pageInfo.deptMane='';
      this.beckselectAllhxr();
    },
    //取全选数据
    deleteresumeall(val){
      this.resumeb =val
    },
    //全选删除方法
    deletesume() {
      this.id = []
      for (let i = 0; i < this.resumeb.length; i++) {
        this.id.push(this.resumeb[i].resumeId);
      }
      if (this.id.length==0){
        ElMessage({
          message: "请选择简历信息",
          type: "warning",
        });
      }else {
        //删除事件
        this.axios({
          url: " http://localhost:8007/provider/recruitment/deleteByidResumes",
          method: "post",
          data: this.id,
          responseType: 'json',
          responseEncoding: 'utf-8',
        }).then((response) => {
          if (response.data.data === "成功") {
            ElMessage({
              message: "删除成功",
              type: "success",
            });
            this.id = []
            this.beckselectAllhxr();
          } else {
            ElMessage.error("删除失败");
          }
          this.getrecrselectAll();
        }).catch(function (error) {
          console.log(error);
        })
      }
    },
    //删除按钮消息提示框 事件
    open(row) {
      ElMessageBox.confirm(
          '是否删除该数据?',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          })
          .then(() => {
            //删除事件
            this.axios({
              url: " http://localhost:8007/provider/recruitment/deleteByidResumes",
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
                this.beckselectAllhxr();
              } else {
                ElMessage.error("删除失败");
              }
              this.getrecrselectAll();
            }).catch(function (error) {
              console.log(error);
            })
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: '已取消操作',
            })
          })
    },
    //转入转入储备人才事件
    zeliminate(row) {
      ElMessageBox.confirm(
          '确认是否转入?',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          })
          .then(() => {
            //删除事件
            this.axios({
              url: "http://localhost:8007/provider/resume/zeliminate",
              method: "post",
              data: {
                resumeId: row,
                resumeZt: 3
              },
              responseType: 'json',
              responseEncoding: 'utf-8',
            }).then((response) => {
              if (response.data.data === "成功") {
                ElMessage({
                  message: "操作成功",
                  type: "success",
                });
                this.beckselectAllhxr();
              } else {
                ElMessage.error("操作失败");
              }
              this.getrecrselectAll();
            }).catch(function (error) {
              console.log(error);
            })
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: '已取消操作',
            })
          })
    },
    //个人简历：备注信息修改
    addremarks(index) {
      if (this.elremarks==''){
        ElMessage({
          message: '请填写备注',
          type: 'warning',
        })
      }else{
        this.axios.post(
            "http://localhost:8007/provider/resume/updatebz", {
              resumeId: this.elremarksId,
              remarks: this.elremarks
            }).then((response) => {
          if (response.data.data === "成功") {
            ElMessage({
              message: "操作成功",
              type: "success",
            });
            this.beckselectAllhxr();
          } else {
            ElMessage.error("操作失败");
          }
          this.remarks = false;
          this.elremarks = ''
        }).catch(function (error) {
          console.log(error);
        });
      }
    },
    /**
     * 查询所有部门信息
     */
    selectAlldept(){
      this.axios({
        url:"http://localhost:8007/provider/dept/dept/selectAlldept",
        method:"post",
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log(response);
        this.deptlist =response.data.data
      }).catch(function (error) {
        console.log('获取列表失败')
        console.log(error);
      })
    },
    /**
     * 根据部门 id 查询所属部门的所有职位名称
     */
    selectAlldeptpost(){
      this.axios({
        url:"http://localhost:8007/provider/deptpost/yyxdeptpost",
        method:"post",
        data:{
          deptId:this.pageInfo.deptIdss
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log(response);
        this.deptpostlist =response.data.data
      }).catch(function (error) {
        console.log('获取列表失败')
        console.log(error);
      })
    },
    setuppost(){
      this.pageInfo.postName =''
      this.selectAlldeptpost();
    },


    // 点击导出操作
    derive() {
      ElMessageBox.confirm(
          '此操作将导出excel文件, 是否继续?',
          '提示',
          {
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
      let tHeader = ["姓名","投递职位","性别","学历","手机号","毕业学校","婚姻状况","年龄","出生日期","期望薪资","期望职位","身高","最近职位","自我评价","邮箱","备注","所在地","投简日期","政治面貌"]; // 导出的表头名
      let filterVal = ["resumeName", "postName", "resumeSex", "resumeEducation", "resumePhone", "resumeScoller","resumeHy","resumeAge", "resumeBirthday","resumeQxingz","resumeQzhiw","resumeShengg","resumeZjzw","resumeIntroduce","resumeMailbox","remarks","resumeResidence","toujTime","resumePoliticalOutlook"];//导出其prop属性
      ElMessageBox.prompt('请输入文件名', '提示', {
        confirmButtonText: '生成',
        cancelButtonText: '取消',
      }).then(({value}) => {
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
.demo-pagination-block {
  margin-left: 15px;
  margin-top: 10px;
  margin-bottom: 30px;
}

.icon-s {
  width: 97%;
  height: 45px;
  border-radius: 4px;
  border: 1px solid #ddd;
  margin-top: 10px;
  padding: 16px;
}
.mainContent .sub-Content__primary {
  padding: 5px 24px;
  background: #fff;
  border-radius: 4px;
}

.ant-spin-nested-loading {
  position: relative;
}

.ant-spin-container {
  position: relative;
  transition: opacity 0.3s;
}

.ant-table-wrapper::after {
  clear: both;
}

.ant-table-wrapper::before, .ant-table-wrapper::after {
  display: table;
  content: '';
}

</style>

