<template>

<!-- 社保缴费明细-->

  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body">
        <!-- 计薪月份 -->
        <div class="month-div">
          <span class="month_span">{{time}}</span><br />
          <span class="times">计薪月份</span><br><br />
          <el-button type="primary" size="small" @click="remove()" style="width: 80px;margin-left: 40px">
            归档
          </el-button>

        </div>
        <!-- 月金额统计 -->
        <div class="month_sum">
          <el-table size="small"
                    :data="tableDatas"
                    stripe style="width: 100%"
                    :header-cell-style="{height:'60px',textAlign: 'center',background:'#F0F0F0',color:'#6C6C6C'}"
                    :cell-style="{ textAlign: 'center', padding:'21px'}"
                    :default-sort="{ prop: 'date', order: 'descending' }"
          >
            <el-table-column prop="quantity" label="参保人数" width="215"/>
            <el-table-column prop="personage" label="个人缴费" width="215"/>
            <el-table-column prop="enterprise" label="企业缴费" width="215" />
            <el-table-column prop="total" label="合计缴费"  width="215" />
          </el-table>
        </div>

        <!-- 社保总表 -->
        <!-- 表格按钮部分 -->
        <div class="mt-20 ml-20 mr-20">
          <!-- 按钮 -->
          <el-button style="margin-left: 8px;" size="small"
            ><i class="iconfont">&#xe6a2;</i>批量导出</el-button
          >
          <el-button size="small"
            ><i class="iconfont">&#xe639;</i>批量导入</el-button
          >
          <el-button size="small" type="danger" @click="deleteList()" plain v-bind:disabled="disableds">
            <i class="iconfont">&#xe608;</i>
            批量删除
          </el-button>

          <!-- 搜索按钮 -->
          <div style="width: 68px;margin-top: 1px;margin-right: 10px;" class="resume-operation">
            <el-button size="mini" style="width: 68px;height: 29px" type="primary" @click="selectPaers()">
              搜索
            </el-button>
          </div>
          <!-- 输入框 -->
          <div class="resume-operation" style="width: 95px">
            <el-input v-model="pageInfo.staffName" placeholder="员工姓名"/>
          </div>

          <!-- 下拉选择器 -->
          <div class="resume-operation">
            <el-select clearable size="small" v-model="pageInfo.staffState" placeholder="员工状态">
              <el-option
                v-for="item in empState_options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>

          <!-- 部门树形选择框 -->

          <div style="width: 170px" class="resume-operation">
            <el-select placeholder="选择部门" v-model="deptName" clearable ref="vueSelect"  size="small"
                       @click="onclicks()" >
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
          <el-table :data="tableData" style="width: 100%;margin-top: 10px ;margin-left: 2px"
                    :header-cell-style="{textAlign: 'center',background:'#F0F0F0',color:'#6C6C6C'}"
                    :cell-style="{ textAlign: 'center' }"
                    :default-sort="{ prop: 'date', order: 'descending' }"
                    @selection-change="deletepl"
          >
            <el-table-column type="selection" width="55" />
            <el-table-column type="index" label="编号" width="100"/>
            <el-table-column prop="staffName" label="姓名" width="100"/>
            <el-table-column prop="insDetailInsuredName"  label="参保方案" width="110"/>
            <el-table-column prop="insDetailInsuredMonth" label="社保缴纳月份" width="130" />
            <el-table-column prop="insDetailSocialPersonPay" label="社保个人缴费"  width="130" />
            <el-table-column prop="insDetailSocialFirmPay" label="社保企业缴费" width="130" />
            <el-table-column prop="insDetailInsuredMonth" label="公积金缴纳月份" width="130" />
            <el-table-column
              prop="insDetailFundPersonPay"
              label="公积金个人缴费"
              width="130"
            />
            <el-table-column prop="insDetailFundFirmPay" label="公积金企业缴费" width="130" />
            <el-table-column prop="state" label="操作" width="110">
              <template #default="scope">
                <router-link :to="{path:this.path,query:{path:this.$route.query.path,id:scope.row.staffId,name:scope.row.staffName}}">
                  <el-button type="text" size="small">查看 </el-button>
                </router-link>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <!-- 分页插件 -->
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
import { ref, defineComponent } from "vue";
import {ElMessage, ElMessageBox} from "element-plus";

export default {
  data() {
    const defaultProps = {
      children: 'deptlist',
      label: 'deptName',
    }
    return {

      //批量删除按钮是否被禁用
      disableds:true,

      //接收表格数据`
      table:[],
      //存放全选id
      id:[],

      defaultProps,
      deptlists:[],

      time:'',
      //跳转页面路径
      path:"/social/social_payment/someone_insured_particulars",
      // 部门名称
      deptName: '',
      // 员工姓名搜索框
      empName_search:"",
      //员工状态下拉选择器
      empState_options: [
        { value: 0, label: "试用期" },
        { value: 1, label: "在职" },
      ],
      empState:"",//员工状态下拉选择器的值
      // 分页参数
      pageInfo: {
        currentPage: 1,
        pagesize: 3,
        total: 0,
        //部门编号
        deptId:'',
        //员工姓名
        staffName:'',
        //员工状态
        staffState:'',

      },


      tableDatas:[
        {
          quantity:0,
          personage:0,
          enterprise:0,
          total:0
        }
      ],

      tableData: [],
    };
  },
  created() {
    this.selectAlldepts();
    this.selectPaers()
    this.getCurrentTime()
    this.detail()
  },

  methods:{
    /**
     * 批量删除
     * @param val
     */
    deleteList(){
      this.id=[];
      for (let i=0 ; i<this.table.length ; i++){
        this.id.push(this.table[i].insuredPaymentId)

      }
      this.axios({
        method:'post',
        url:"http://localhost:8007/provider/insuredPayment/delete",
        data:{
          insuredPaymentId:this.id,
        },
        responseType:'json',
        responseEncoding:'utf-8',
      }).then(response=>{
        if(response.data.data === '删除成功'){
          ElMessage({
            type:'success',
            message:'删除成功'
          })
          this.selectPaers()
        }else{
          ElMessage.error("删除失败")
        }
      })
    },

    //判断删除按钮是否可用
    deletepl(val){

      this.table=val
      if(this.table != ''){
        this.disableds=false
      }else {
        this.disableds=true
      }
    },

    /**
     * 是否要归档操作
     */
    remove(){
      ElMessageBox.confirm(
          '是否将本月社保归档！！！',
          '友情提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: '友情提示',
          }
      )
          .then(() => {
            this.pigeonhole();
          })


    },
    /**
     * 归档操作
     */
    pigeonhole(){
      this.axios({
        method:'get',
        url:"http://localhost:8007/provider/insuredArchive/pigeonhole",
        responseType:'json',
        responseEncoding:'utf-8',
      }).then((response)=>{
            if(response.data.data === '归档成功'){
              ElMessage({
                type:'success',
                message:'归档成功'
              })
            this.selectPaers()
            }else {
              ElMessage.error("归档失败")
            }
      })
    },

    /**
     * 参保明细金额数据
     */
    detail(){

      this.axios({
        method:'get',
        url:"http://localhost:8007/provider/insuredDetail/detail",
        responseType:'json',
        responseEncoding:'utf-8',
      }).then((response)=>{

        this.tableDatas[0].quantity=response.data.data.length

        for(let i=0;i<response.data.data.length;i++){
          //个人
          this.tableDatas[0].personage+=response.data.data[i].insDetailSocialPersonPay+response.data.data[i].insDetailFundPersonPay
          //企业
          this.tableDatas[0].enterprise+=response.data.data[i].insDetailSocialFirmPay+response.data.data[i].insDetailFundFirmPay

        }
        //总金额
        this.tableDatas[0].total=this.tableDatas[0].personage+this.tableDatas[0].enterprise
        this.tableDatas[0].personage=this.tableDatas[0].personage.toFixed(2)
        this.tableDatas[0].enterprise=this.tableDatas[0].enterprise.toFixed(2)
        this.tableDatas[0].total=this.tableDatas[0].total.toFixed(2)

      })
    },

    /**
     * 分页查询参保明细数据
     */
    selectPaers(){
      this.axios({
        method:'post',
        url:"http://localhost:8007/provider/insuredDetail/page",
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
      }).catch(function (error) {
        console.log('获取列表失败')
      })
    },
    /**
     * 获取系统当前时间
     */
    getCurrentTime() {
      //获取当前时间并打印
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth()+1;
      this.time= yy+'/'+mm;
    },
  }
}





</script>

<style scoped>
.times{
  margin-left: 53px;
}

/* 月金额统计 */
.month_sum {
  display: inline-block;
  margin-left: 393px;
  width: 861px;
  height: 159px;
  margin-top: 32px;
  margin-bottom: 40px;

}

/* 计薪月份div */
.month-div {
  display: inline-block;
  margin: 40px;
  margin-left: 80px;
  margin-bottom: -157px;
  float: left;
  margin-top: 68px;

}

/* 计薪月份 */
.month_span {
  font-weight: bold;
  font-size: 30px;
  margin-left: 34px;

}

/* 调整输入框的高度 */
::v-deep .el-input__inner {
  height: 32px;
}

/* 分页的样式 */
.demo-pagination-block {
  float: right;
  margin: 20px;
}

/**
	 * 下拉选择器样式
	 */
.resume-operation {
  padding-left: 8px;
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

.j-card-body{
  padding:0 2%;
}

@font-face {
  font-family: 'iconfont';  /* Project id 2990377 */
  src: url('//at.alicdn.com/t/font_2990377_1cwdx3n4atr.woff2?t=1639139822080') format('woff2'),
  url('//at.alicdn.com/t/font_2990377_1cwdx3n4atr.woff?t=1639139822080') format('woff'),
  url('//at.alicdn.com/t/font_2990377_1cwdx3n4atr.ttf?t=1639139822080') format('truetype');
}

</style>

