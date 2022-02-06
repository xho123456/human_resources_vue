<!-- 新增简历-->

<template>
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <!--标题-->
      <div class="j-card-head">
        <div class="j-card-head-title">
          <span>新增简历</span>
        </div>
      </div>
      <!--内容-->
      <div class="j-card-body ">
        <div class="sub-Content__primary">
          <div class="ant-card ant-card-bordered">
            <div class="ant-card-head">
              <div class="ant-card-head-wrapper">
                <div class="ant-card-head-title">
                </div>
              </div>
            </div>
            <div class="ant-card-body">

              <el-form :inline="true" :model="formInline" status-icon
                       label-width="110px"
                       :rules="addformInline"
                       ref="Fromnames">
                <el-row :gutter="10">
                  <el-col :span="10" :offset="2">
                    <el-form-item label="应聘部门：">
                      <el-select v-model="formInline.adddepts" clearable ref="vueSelect"  size="small" style="width: 260px"
                                 @click="onclicks()"  @clear="setdepts()">
                        <el-option hidden></el-option>
                        <el-tree
                            :data="planForm.deptlist"
                            :default-expand-all=true
                            :check-on-click-node=true
                            :check-strictly=true
                            node-key="deptId"
                            :props="defaultProps"
                            ref="tree"
                            @check-change="handleCheckChange()"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>

                  <el-col :span="10">
                    <el-form-item label="姓名：" prop="resumname">
                      <el-input v-model="formInline.resumname" size="small" style="width: 260px;"
                                placeholder="请输入名称"></el-input>
                    </el-form-item>
                  </el-col>


                  <el-col :span="10" :offset="2">
                    <el-form-item label="应聘职位：">
                      <el-select  clearable placeholder="招聘职位" size="small" style="width: 260px"
                                 v-if="formInline.adddepts==''" disabled>
                      </el-select>
                      <el-select v-model="formInline.addposts" clearable placeholder="招聘职位" size="small" style="width: 260px"
                                 v-if="formInline.adddepts!=''" @clear="emptypost()">
                       <span v-for="keyposts in planForm.deptpostlist">
                         <el-option :label=keyposts.postName :value=keyposts.deptPostId @click="setposts()"></el-option>
                      </span>
                      </el-select>
                    </el-form-item>
                  </el-col>


                  <el-col :span="10">
                    <el-form-item label="手机号：" prop="phone" required>
                      <el-input v-model="formInline.phone" size="small" style="width: 260px;"
                                placeholder="请填写手机号"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="10" :offset="2">
                    <el-form-item clearable label="招聘计划：">
                      <el-select v-model="formInline.addplans" size="small" style="width: 260px;" placeholder="请选择">
                          <span v-for="plankey in planForm.planslist">
                             <el-option :label=plankey.recruitmentPlanName :value=plankey.recruitmentPlanId></el-option>
                          </span>
                      </el-select>
                    </el-form-item>
                  </el-col>


                  <el-col :span="10">
                    <el-form-item label="邮箱：" prop="email" required>
                      <el-input v-model="formInline.email" size="small" style="width: 260px;"
                                placeholder="请填写手机号"></el-input>
                    </el-form-item>
                  </el-col>


                  <el-col :span="10" :offset="2">
                    <el-form-item label="备注：">
                      <el-input
                          v-model="formInline.elremarks"
                          :rows="6"
                          type="textarea"
                          style="width: 500px;"
                      />
                    </el-form-item>
                  </el-col>

                  <el-col :span="8" :offset="8">
                    <el-form-item>
                      <el-button size="small"  @click="goshang()">取消</el-button>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <el-button size="small" type="primary" plain @click="addResume('Fromnames')">保存</el-button>
                    </el-form-item>
                  </el-col>
                </el-row>



              </el-form>

            </div>
          </div>
        </div>


      </div>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue'
import {ElMessage} from "element-plus";

export default {
  data() {
    //验证邮箱规则
    var checkEmail = (rule, value, cb) => {
      //验证邮箱的正则表达式
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      if (regEmail.test(value)) {
        return cb();
      }
      cb(new Error("请输入合法的邮箱"));
    }
    //验证手机号规则
    var checkMobile = (rule, value, cb) => {
      //验证手机号的正则表达式
      const regMobile =/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
      if (regMobile.test(value)) {
        return cb();
      }
      cb(new Error("请输入合法的手机号"));
    }
    const defaultProps = {
      children: 'deptlist',
      label: 'deptName',
    }
    return {
      defaultProps,
      //Form表单绑定值
      formInline: {
        deptids: '',
        adddepts: '',
        addposts: '',
        addplans: '',
        addzt:0,
        resumname:'',
        phone:'',
        email: '',
        //备注
        elremarks:''
      },
      planForm:{
        //存放所有部门信息
        deptlist:'',
        //存放所有职位信息
        deptpostlist:'',
        //存放所有招聘计划信息
        planslist: '',
      },

      //表单效验规则
      addformInline:{
        resumname:[
          {
            required: true,
            message: '输入的名称不能为空',
            trigger: 'blur',
          },
          {
            min: 2,
            max: 8,
            message: '请输入正确的名称',
            trigger: 'blur',
          },
        ],
        phone:[
          {
            required: true,
            message: '输入的名称不能为空',
            trigger: 'change',
          },
          {
            validator:checkMobile,
            trigger: 'blur'
          }
        ],
        email:[
          {
            required: true,
            message: '输入的名称不能为空',
            trigger: 'change',
          },
          {
            validator:checkEmail,
            trigger: 'blur'
          }
        ]
      },
    }
  },
  created() {
    //页面加载时执行：查询所有部门信息
    this.Alldept();
  },
  methods: {
    //点击Select选择器清空原有复选框选项
    onclicks() {
      this.$refs.tree.setCheckedKeys([]);
    },
    //节点选中状态发生变化时的回调
    handleCheckChange(data, checked, indeterminate) {
      //获取所有选中的节点 start
      let res = this.$refs.tree.getCheckedNodes()
      res.forEach((item) => {
        this.formInline.deptids = item.deptId
        this.formInline.adddepts = item.deptName
        //清空职位信息
        this.formInline.addposts=''
        this.formInline.addplans=''
        //查询所属职位信息
        this.Alldeptpost();
        //关闭Select选择器
        this.$refs.vueSelect.blur();
      })
    },
    //取消返回上以及
    goshang() {
      this.$router.go(-1);
    },
    /**
     * 查询所有部门信息
     */
    Alldept() {
      this.axios({
        url: "http://localhost:8007/provider/dept/dept/selectAlldept",
        method: "post",
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        this.planForm.deptlist = response.data.data
      }).catch(function (error) {
        console.log('获取列表失败')
        console.log(error);
      })
    },
    //部门Select选择器清空事件
    setdepts(){
      this.planForm.deptpostlist = ''
      this.planForm.planslist = ''
      this.formInline.addplans=''
    },
    /**
     * 根据部门 id 查询所属部门的所有职位名称
     */
    Alldeptpost() {
      this.axios({
        url: "http://localhost:8007/provider/deptpost/yyxdeptpost",
        method: "post",
        data: {
          deptId: this.formInline.deptids
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        this.planForm.deptpostlist = response.data.data
      }).catch(function (error) {
        console.log('获取列表失败')
        console.log(error);
      })
    },
    //通过职位id和部门id查询所有招聘计划名称
    PlanAll() {
      this.axios({
        url: "http://localhost:8007/provider/recruitment/findByidplan",
        method: "post",
        data: {
          deptId: this.formInline.deptids,
          deptPostId: this.formInline.addposts
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        this.planForm.planslist = response.data.data
      }).catch(function (error) {
        console.log('获取列表失败')
        console.log(error);
      })
    },
    setposts(){
      this.formInline.addplans=''
      this.PlanAll();
    },
    //职位下拉框清空事件
    emptypost(){
      this.planForm.planslist = ''
      this.formInline.addplans=''
    },
    //新增简历
    addResume(name){
      this.$refs[name].validate((valid) => {
        if (valid) {
          //判断添加简历是否安排职位
          if (this.formInline.addplans===''){
            this.formInline.addzt = 0;
          }else{
            this.formInline.addzt = 1;
          }
          this.axios({
            url: "http://localhost:8007/provider/resume/addresumes",
            method: "post",
            data: {
              resumeName:this.formInline.resumname,
              resumePhone:this.formInline.phone,
              resumeMailbox:this.formInline.email,
              recruitmentPlanId:this.formInline.addplans,
              remarks:this.formInline.elremarks,
              resumeZt:this.formInline.addzt
            },
            responseType: 'json',
            responseEncoding: 'utf-8',
          }).then((response) => {
            console.log(response)
            if (response.data.data === "成功") {
              ElMessage({
                message: "操作成功！！！",
                type: "success",
              });
              this.$router.go(-1);
            } else {
              ElMessage.error("操作失败！！！");
            }
          }).catch(function (error) {
            console.log('获取列表失败')
            console.log(error);
          })
        } else {
          return false
        }
      })
    }

  }
}


</script>


<style type="text/css" scoped>

.mainContent .sub-Content__primary {
  padding: 12px 24px;
  background: #fff;
  border-radius: 4px;
}

.mainContent .ant-card-bordered {
  transition: box-shadow 0.5s;
  border: 1px solid #d3dae2;
}

.mainContent .ant-card, .edit__forms .ant-card {
  width: 100%;
}

.ant-card {
  color: rgba(0, 0, 0, 0.65);
  background: #fff;
  border-radius: 2px;
}

.ant-card {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: #333;
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  list-style: none;
  font-feature-settings: 'tnum';
  position: relative;
  background: #fff;
  border-radius: 2px;
  transition: all 0.3s;
}

.ant-card:not(.normal) .ant-card-head {
  background: #f2f4fa;
}

.ant-card:not(.normal) .ant-card-head {
  background: #f0f3f6;
  border-bottom: none;
}

.ant-card-head {
  color: rgba(0, 0, 0, 0.85);
  background: transparent;
  border-bottom: 1px solid #e8e8e8;
  border-radius: 2px 2px 0 0;
}

.ant-card-head {
  min-height: 40px;
  margin-bottom: -1px;
  padding: 0 24px;
  color: #f0f3f6;
  font-weight: 500;
  font-size: 16px;
  background: transparent;
  border-bottom: 1px solid #e8e8e8;
  border-radius: 2px 2px 0 0;
  zoom: 1;
}

.ant-card-head::before, .ant-card-head::after {
  display: table;
  content: '';
}

*, ::before, ::after {
  box-sizing: border-box;
}

.ant-card-head-wrapper {
  display: flex;
  align-items: center;
}

.mainContent .ant-card .ant-card-head-title, .edit__forms .ant-card .ant-card-head-title {
  font-weight: bold;
  color: #333;
  padding: 10px 0;
  border-bottom: none;
}

.ant-card-head-title {
  display: inline-block;
  flex: 1;
  padding: 16px 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.ant-layout, .ant-layout * {
  box-sizing: border-box;
}

.mainContent .ant-card-body {
  padding: 25px 25px;
}


.j-card-head {
  height: 48px;
  line-height: 48px;
  background: #fff;
  border-bottom: 1px solid #e9e9e9;
  margin: 0 24px;
  overflow: hidden;
}


.j-card-head-title {
  float: left;
  font-size: 18px;
  display: inline-block;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
  letter-spacing: 0.3px;
}

.mainContent .sub-Content__primary {
  padding: 12px 24px;
  background: #fff;
  border-radius: 4px;
}

.saas-main-content {
  padding-top: 12px;
  min-height: 500px;
}

.j-card-bordered {
  border: 1px solid #e9e9e9;
}

.j-card {
  background: #fff;
  border-radius: 4px;
  font-size: 14px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
  margin-top: 8px;
  min-height: 100%;
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
  margin-top: 8px;
  min-height: 100%;
}
</style>
