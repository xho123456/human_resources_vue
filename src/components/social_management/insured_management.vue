<template>

<!--参保人员管理-->

  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body">
        <div class="insured">批量参保</div>

        <div class="inputs">
          <span style="margin-left: 23px">参保方案：</span>
          <el-select
              @change="operation()"
              v-model="defInsuredName"
              style="width: 325px"
              size="small"
              clearable
              placeholder="请选择"
              @focus="scheme()"
          >
            <el-option
                v-for="item in insured_scheme"
                :key="item.defInsuredName"
                :label="item.defInsuredName"
                :value="item.defInsuredId"
            >
            </el-option>
          </el-select>
          <!--图标-->
          <el-popover placement="top" :width="225" trigger="hover">
            <template #reference>
              <el-button type="text">
                <i class="iconfont" style="color: orange">&nbsp; &#xe619;</i>
              </el-button>
            </template>
            <!--跳转参保方案页面-->
            <span style="color: #938c8c">
              添加社保方案请前往
              <router-link :to="{path:this.path,query:{path:this.$route.query.path}}">
                参保方案
              </router-link>
              页
            </span>
          </el-popover>
          <br/><br/>


          <!-- 填写基本参数的表单 -->
          <div style="text-align: center">
            <!-- 社保 -->
            <div class="form-div">
              <el-switch
                  @change="adds()"
                  v-model="valued"
                  class="form-seitch"
                  inline-prompt
                  active-text="开"
                  inactive-text="关"/>
              <el-form :rules="rules">
                <el-form-item prop="name">
                  <span>社保基数：</span>
                  <el-input
                      :disabled="open"
                      v-model="insured.insuredPaymentNumber"
                      size="small"
                      placeholder="请输入社保基数"
                  />
                </el-form-item>
                <el-form-item prop="name">
                  <span style="margin-left: -3px">参保月份：</span>
                  <el-date-picker
                      :disabled="true"
                      v-model="insured.insuredPaymentInsuredMonth"
                      style="width: 246px"
                      size="small"
                      type="month"
                      placeholder="选择参保月份"
                  />
                </el-form-item>
                <el-form-item>

                  <span style="margin-left: -3px">计薪月份：</span>
                  <el-date-picker
                      :disabled="true"
                      v-model="insured.insuredPaymentSalaryMonth"
                      style="width: 246px"
                      size="small"
                      type="month"
                      placeholder="选择计薪月份"
                  />
                </el-form-item>
              </el-form>
            </div>

            <!-- 公积金 -->
            <div class="form-div">
              <el-switch
                  @change="add()"
                  v-model="valueb"
                  class="form-seitch"
                  inline-prompt
                  active-text="开"
                  inactive-text="关"
              />

              <el-form :rules="rules">
                <el-form-item prop="name">
                  公积金基数：
                  <el-input
                      :disabled="enable"
                      v-model="fund.insuredPaymentNumber"
                      style="width: 244px"
                      size="small"
                      placeholder="请输入公积金基数"
                  />
                </el-form-item>
                <el-form-item>

                  <span style="margin-left: 12px">参保月份：</span>
                  <el-date-picker
                      v-model="fund.insuredPaymentInsuredMonth"
                      :disabled="true"
                      style="width: 246px"
                      size="small"
                      type="month"
                      placeholder="选择参保月份"
                  />
                </el-form-item>
                <el-form-item>
                  <span style="margin-left: 12px">计薪月份：</span>
                  <el-date-picker
                      v-model="fund.insuredPaymentSalaryMonth"
                      :disabled="true"
                      disabled="false"
                      style="width: 246px"
                      size="small"
                      type="month"
                      placeholder="选择计薪月份"
                  />
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>

        <!-- 表格按钮部分 -->
        <div class="mt-20 ml-20 mr-20" style="margin-bottom: 20px;">
          <!-- 提交按钮 -->
          <el-button style="width: 80px" size="small" type="primary">提交</el-button>

          <!-- 搜索框 -->
          <el-input v-model="search" size="small" class="resume-operation" placeholder="搜索">
            <template #suffix>
              <el-icon class="el-input__icon">
                <i-search/>
              </el-icon>
            </template>
          </el-input>

          <!-- 下拉选择器 -->
          <div style="width: 200px" class="resume-operation">
            <el-select v-model="pageInfo.deptMane" clearable ref="vueSelect"  size="small"
                       @click="onclicks()">
              <el-option hidden></el-option>
              <el-tree
                  :data="deptlists"
                  :default-expand-all=true
                  :check-on-click-node=true
                  :check-strictly=true
                  node-key="deptId"
                  :props="defaultProps"
                  ref="tree"
                  @check-change="handleCheckChangesx()"
              />
            </el-select>
          </div>
        </div>

        <!-- 表格内容部分 -->
        <div class="sub-Content__primary">
          <el-table :data="tableData" style="width: 100%"
                    :header-cell-style="{textAlign: 'center',background:'#F0F0F0',color:'#6C6C6C'}"
                    :cell-style="{ textAlign: 'center' }"
                    :default-sort="{ prop: 'date', order: 'descending' }"
                    @selection-change="deletepl"
          >
            <!-- 多选框 -->
            <el-table-column type="selection" width="55"/>
            <el-table-column prop="id" label="编号"/>
            <el-table-column prop="name" label="姓名"/>
            <el-table-column prop="dept" label="部门"/>
            <el-table-column prop="post" label="职位"/>
            <el-table-column prop="phone" label="电话号码"/>
            <el-table-column prop="hiredate" label="入职日期"/>
            <el-table-column prop="positive_dates" label="转正日期"/>
          </el-table>
        </div>

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
              @size-change="selectUsers"
              @current-change="selectUsers"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
  {{deptIdss}}
</template>

<script>
import {ref, defineComponent} from "vue";

export default {
  data() { const defaultProps = {
    children: 'deptlist',
    label: 'deptName',
  }
    return {
      defaultProps,
      deptlists:[],
      deptIdss:'',
      //社保禁用启用
      open:true,
      //基金禁用启用
      enable:true,
      //参保集合
      insured:{
        insuredPaymentNumber:'',
        insuredPaymentInsuredMonth:'',
        insuredPaymentSalaryMonth:'',
      },
      //积金集合
      fund:{
        insuredPaymentNumber:'',
        insuredPaymentInsuredMonth:'',
        insuredPaymentSalaryMonth:'',
    },
      //开关
      valued:false,
      valueb:false,
      //跳地址路由
      path: "/social/basic_setup/insured_scheme",
      // 参保方案
      defInsuredName: '',
      // 参保方案下拉选择器值
      insured_scheme: [],
      // 分页参数
      pageInfo: {
        currentPage: 1, //当前页
        pagesize: 3, // 页大小
        total: 0, // 总页数
      },
      // 部门名称
      dept_name: null,
      // 选择部门 下拉选择器
      depts: [
        {value: "1", label: "部门1"},
        {value: "2", label: "部门2"},
        {value: "3", label: "部门3"},
      ],
      // 表格上的 搜索框
      search: null,
      // 未参保人员表数据
      tableData: [
        {
          id: 1, // 员工id
          name: "员工1", // 员工名称
          dept: "部门1", // 员工所属部门
          post: "职位1", // 员工职位
          phone: "11111", // 员工手机号
          hiredate: "1999-12-11", // 员工入职日期
          positive_dates: "2000-02-11", // 员工转正日期
        },
      ],

      // 表单验证
      rules: {
        name: [
          {required: true, message: '请输入活动名称', trigger: 'blur'},
          {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ],
      }

    };
  },
  created() {
    this.getCurrentTime();
    this.selectAlldepts();
  },
  methods:{
    //点击Select选择器清空原有复选框选项
    onclicks() {
      this.$refs.tree.setCheckedKeys([]);
    },
    //筛选：节点选中状态发生变化时的回调
    handleCheckChangesx(data, checked, indeterminate) {
      //获取所有选中的节点 start
      let res = this.$refs.tree.getCheckedNodes()
      res.forEach((item) => {
        this.deptIdss = item.deptId

        //关闭Select选择器
        this.$refs.vueSelect.blur();
      })
    },
    /**
     * select：查询所有部门信息
     */
    selectAlldepts() {
      this.axios({
        url: "http://localhost:8007/provider/dept/dept/selectAlldept",
        method: "post",
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log(response);
        this.deptlists = response.data.data
      }).catch(function (error) {
        console.log('获取列表失败')
        console.log(error);
      })
    },

    adds(){
      if(this.valued===false){
        this.open=!this.open
      }else {
        this.open=!this.open
      }
    },
    add(){
      if(this.valueb===false){
        this.enable=!this.enable
      }else {
        this.enable=!this.enable
      }


    },
    /**
     * 操作
     */
    operation(){
      if(this.defInsuredName!==''){
        this.valued=true
      }
      if(this.defInsuredName!==''){
        this.valueb=true
      }
      if(this.valued===true){
        this.open=false
      }
      if(this.valueb===true){
        this.enable=false
      }

  },
    /**
     * 获取系统当前时间
     */
    getCurrentTime() {
      //获取当前时间并打印
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth()+1;
      this.insured.insuredPaymentInsuredMonth = yy+'/'+mm;
      this.insured.insuredPaymentSalaryMonth = yy+'/'+mm;
      this.fund.insuredPaymentInsuredMonth = yy+'/'+mm;
      this.fund.insuredPaymentSalaryMonth = yy+'/'+mm;
    },
    /**
     * 查询方案名称
     */
    scheme(){
        this.axios({
          method:'post',
          url:"http://localhost:8007/provider/defInsured/scheme",
          responseType:'json',
          responseEncoding:'utf-8',
        }).then(request=>{
          console.error(request.data.data)
          this.insured_scheme = request.data.data
        })
}
  }
};
</script>

<style scoped>

/* 表单验证 */
::v-deep .el-form-item__error {
  margin-left: 135px;
}

/* 开关 */
.form-seitch {
  padding: 40px 0 40px 0;
  margin-left: -300px;
}

/* 表单左右div */
.form-div {
  margin: 10px;
  display: inline-block;
  border: 1px solid #e5e8ed;
  width: 490px;
  height: 373px;
}

/* 输入框 */
.el-input {
  width: 50%;
  display: inline-block;
}

/* 外div 内边距 */
.inputs {
  /*  上、右、下、左  */
  padding: 10px 40px 53px 40px;
}

/* 批量参保 */
.insured {
  font-size: 18px;
  border-bottom: 1px solid #f4f5f7;
  padding-bottom: 5px;
}

.j-card-body {
  padding: 10px 25px 20px 25px;
}

/* 调整输入框的高度 */
/* ::v-deep .el-input__inner {
  height: 32px;
} */

/* 分页的样式 */
.demo-pagination-block {
  float: right;
  margin: 20px;
}

/**
	 * 下拉选择器样式
	 */
.resume-operation {
  float: right;
  width: 120px;
}

/* 外层阴影 */
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

.j-card-body {
  padding: 2%;
}

/* 去掉路由样式 */
a {
  text-decoration: none;
  color: #4779b9;
}

@font-face {
  font-family: 'iconfont';  /* Project id 2990377 */
  src: url('//at.alicdn.com/t/font_2990377_1cwdx3n4atr.woff2?t=1639139822080') format('woff2'),
  url('//at.alicdn.com/t/font_2990377_1cwdx3n4atr.woff?t=1639139822080') format('woff'),
  url('//at.alicdn.com/t/font_2990377_1cwdx3n4atr.ttf?t=1639139822080') format('truetype');
}
</style>

