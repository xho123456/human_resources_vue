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
              <el-form>
                <el-form-item prop="insuredPaymentNumber">
                  <span>社保基数：</span>
                  <el-input

                      :disabled="open"
                      v-model="insured.insuredPaymentNumber"
                      size="small"
                      placeholder="请输入社保基数"
                      onkeyup="this.value= this.value.match(/\d+(\.\d{0,2})?/) ? this.value.match(/\d+(\.\d{0,2})?/)[0] : ''" />
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

              <el-form >
                <el-form-item prop="name">
                  公积金基数：
                  <el-input

                      :disabled="enable"
                      v-model="fund.insuredPaymentNumber"
                      style="width: 244px"
                      size="small"
                      placeholder="请输入公积金基数"
                      onkeyup="this.value= this.value.match(/\d+(\.\d{0,2})?/) ? this.value.match(/\d+(\.\d{0,2})?/)[0] : ''"
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
          <el-button style="width: 80px" size="small" @click="deleteList()" type="primary"
                     :disabled="this.defInsuredName !== '' & this.table.length>0 & this.insured.insuredPaymentNumber !=='' || this.table.length>0 & this.fund.insuredPaymentNumber !==''?'true':'disabled'">提交</el-button>
          {{this.table.length}}
          <!-- 搜索按钮 -->
          <div style="width: 68px;margin-top: 1px;" class="resume-operation">
              <el-button size="mini" style="width: 68px;height: 29px" type="primary" @click="selectPaers()">
                搜索
              </el-button>
          </div>

          <!-- 搜索框 -->
          <el-input v-model="pageInfo.staffName" style="margin-right: 9px" size="small" class="resume-operation" placeholder="员工名称">
          </el-input>

          <!-- 部门下拉选择器 -->
          <div style="width: 177px;" class="resume-operation">
            <el-select v-model="deptName" clearable ref="vueSelect"  size="small" placeholder="请选择部门"  @change="selectPaers"
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
                    @selection-change="aa"
          >
            <!-- 多选框 -->
            <el-table-column type="selection" width="55"/>
            <el-table-column type="index" label="编号"/>
            <el-table-column prop="staffName" label="姓名"/>
            <el-table-column prop="deptName" label="部门"/>
            <el-table-column prop="postName" label="职位"/>
            <el-table-column prop="staffPhone" label="电话号码"/>
            <el-table-column prop="staffHiredate" label="入职日期"/>

          </el-table>
        </div>

        <!-- 分页 -->
        <div class="demo-pagination-block">
          <el-pagination
              v-model:current-page="pageInfo.currentPage"
              v-model:currentPage="pageInfo.currentPage"
              v-model:page-size="pageInfo.pagesize"
              :default-page-size="pageInfo.pagesize"
              :page-sizes="[3, 4, 5, 6]"
              :page-size="3"
              :pager-count="4"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pageInfo.total"
              @size-change="selectPaers()"
              @current-change="selectPaers()"
              prev-text="上一页"
              next-text="下一页"
              background
          >
          </el-pagination>
        </div>
      </div>
    </div>

  </div>



</template>

<script>
import {ref, defineComponent} from "vue";
import {ElMessage} from "element-plus";

export default {
  data() { const defaultProps = {
    children: 'deptlist',
    label: 'deptName',
  }
    return {
      // 部门名称
      deptName: '',

      defaultProps,
      deptlists:[],
      deptId:'',
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

      // 参保方案名称
      defInsuredName: '',


      // 参保方案下拉选择器值
      insured_scheme: [],

      // 分页参数
      pageInfo: {
        currentPage: 1,
        pagesize: 3,
        total: 0,
        //部门编号
        deptId:'',
        //员工名称
        staffName:''
      },

      // 未参保人员表数据
      tableData: [
      ],
      //提交按钮
      submit:true,

      //接收表格所有员工id
      table:[],
      //员工编号
      staffName:[],



    };
  },
  created() {
    this.selectPaers();
    this.getCurrentTime();
    this.selectAlldepts();

  },
  methods:{
    aa(val){
      this.table=val
    },
    /**
     * 判断提交按钮是否可用
     */
    deletepl(){
      // if(this.defInsuredName === ''|| this.table =='' || this.insured.insuredPaymentNumber ==='' && this.fund.insuredPaymentNumber ===''){
      //     this.submit=true
      // }else if(this.defInsuredName !== '' && this.table !='' && this.insured.insuredPaymentNumber !=='' && this.fund.insuredPaymentNumber !==''){
      //     this.submit=false
      // }else if(this.defInsuredName !== '' && this.table !='' && this.insured.insuredPaymentNumber !=='' || this.fund.insuredPaymentNumber ===''){
      //     this.submit=false
      // }else if(this.defInsuredName !== '' && this.table !='' && this.fund.insuredPaymentNumber !=='' || this.insured.insuredPaymentNumber ===''){
      //     this.submit=false
      // }else {
      //     this.submit=true
      // }
    },
    /**
     * 提交
     */
    deleteList(){
      for (let i=0 ; i<this.table.length ; i++){
        this.staffName.push(this.table[i].staffName)
      }
      this.axios({
        method:'post',
        url:"http://localhost:8007/provider/insuredPayment/insert",
        data: {
          defInsuredName:this.defInsuredName,
          insured:this.insured.insuredPaymentNumber,
          insuredPaymentSalaryMonth:this.fund.insuredPaymentSalaryMonth,
          insuredPaymentNumber:this.fund.insuredPaymentNumber,
          staffName:this.staffName,
        },
        responseType:'json',
        responseEncoding:'utf-8',
      }).then(response=>{
        if(response.data.data === '新增成功'){
          ElMessage({
            type:'success',
            message:'新增成功'
          })
          this.selectPaers()
          this.staffName=[]
          this.insured.insuredPaymentNumber=''
          this.fund.insuredPaymentNumber=''
          this.defInsuredName=''
          // this.deletepl()
        }else{
          ElMessage.error("新增失败")
          this.staffName=[]
        }
      })
    },

    /**
     * 分页查询参保明细数据
     */
    selectPaers(){
      this.axios({
        method:'post',
        url:"http://localhost:8007/provider/insuredPayment/page",
        data:this.pageInfo,
        responseType:'json',
        responseEncoding:'utf-8',
      }).then((response)=>{

        this.tableData = response.data.data.records
        this.pageInfo.total=response.data.data.total

      })
    },
    //点击Select选择器清空原有复选框选项
    onclicks() {
      this.$refs.tree.setCheckedKeys([]);
    },
    //筛选：节点选中状态发生变化时的回调
    handleCheckChangesx(data, checked, indeterminate) {
      //获取所有选中的节点 start
      let res = this.$refs.tree.getCheckedNodes()
      res.forEach((item) => {
        this.pageInfo.deptId = item.deptId
        this.deptName = item.deptName
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
        this.deptlists = response.data.data
      })
    },


    adds(){
      if(this.valued===false){
        this.open=!this.open
        this.insured.insuredPaymentNumber =''
      }else {
        this.open=!this.open


      }
    },
    add(){
      if(this.valueb===false){
        this.enable=!this.enable
        this.fund.insuredPaymentNumber =''
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

