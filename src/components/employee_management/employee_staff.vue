<!--花名册页面-->
<template>
  <div class="saas-main-content">
    <div class="icon-p">
      <el-row :gutter="30">
        <el-col :span="4">
          <el-card shadow="always" style="background-color: rgb(35, 167, 161);color:white;font-size:14px;" @click="staffroster">
            <p>在职</p>

          </el-card>
        </el-col>

        <el-col :span="5" >
          <el-card shadow="hover" style="background-color: rgb(35, 167, 161);color:white;font-size:14px;" @click="staffhistory">
            <p>离职员工</p>

          </el-card>
        </el-col>

        <el-col :span="5">
          <el-card shadow="never" style="background-color: rgb(35, 167, 161);color:white;font-size:14px; " @click="staffElite">
            <p>精英干部</p>

          </el-card>
        </el-col>
        <el-col :span="5">
          <el-card shadow="never" style="background-color: rgb(35, 167, 161);color:white;font-size:14px; " @click="staffpunishment">
            <p>惩罚员工</p>

          </el-card>
        </el-col>
        <el-col :span="5">
          <el-card shadow="never" style="background-color: rgb(35, 167, 161);color:white;font-size:14px;" @click="staffreward">
            <p>获奖员工</p>

          </el-card>
        </el-col>

      </el-row>
    </div>

    <!-- 在职员工 -->
    <div v-show="roster">
      <div style="margin-top:10px;">
        <!--搜索输入框-->
        <el-row style="width:200px;float:right;">
          <el-input v-model.number="input1" placeholder="搜索:工号/姓名" @change="searchstaff(this.input1)">
            <template #suffix>
              <el-icon class="el-input__icon"><i-search/></el-icon>
            </template>
          </el-input>
        </el-row>
      </div>
      <br/>
      <div style="margin-top:30px;">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column fixed prop="staffName" label="姓名" width="150" />
          <el-table-column prop="staffId" label="工号" width="150" />
          <el-table-column prop="staffSex" label="性别" width="150" />
          <el-table-column prop="deptName" label="部门" width="150" />
          <el-table-column prop="postname" label="职位" width="150" />
          <el-table-column prop="staffPhone" label="手机" width="150" />
          <el-table-column prop="staffIdentity" label="身份证" width="150" />
          <el-table-column prop="staffOutlook" label="政治面貌" width="150" />
          <el-table-column prop="staffstate" label="状态" width="150" >
            <template #default="scope">
              <span v-if="scope.row.staffstate==0">试用</span>
              <span v-if="scope.row.staffstate==1">正式</span>
            </template>
          </el-table-column>
          <el-table-column  prop="staffHIREDATE" label="入职日期" sortable  width="150"/>
<!--          <el-table-column fixed="right" label="操作" width="150">-->
<!--            <template #default="scope">-->
<!--              <router-link :to="{path:this.staffedit,query:{path: this.$route.query.path}}">-->
<!--                <el-button type="text" size="small" @click="handleClick(scope.row)"-->
<!--                >查看员工详细信息 </el-button>-->
<!--              </router-link>-->

<!--            </template>-->
<!--          </el-table-column>-->
        </el-table>
      </div>

      <!-- 分页插件 -->
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
            @size-change="searchstaff(this.input1)"
            @current-change="searchstaff(this.input1)"
            prev-text="上一页"
            next-text="下一页"
            background
        >
        </el-pagination>
      </div>

    </div>

    <!-- 历史花名册 -->
    <div class="saas-main-content" v-show="history">
      <div>

        <!--搜索输入框-->
        <el-row style="width:200px;float:right;">
          <el-input v-model.number="input2" placeholder="搜索" @change="pagingHistory(this.input2)">
            <template #suffix>
              <el-icon class="el-input__icon"><i-search/></el-icon>
            </template>
          </el-input>
        </el-row>

        <!-- 表格内容部分 -->


        <el-table :data="tableHistoryData" stripe style="width: 100%">
          <el-table-column prop="staffName" label="姓名" width="120" />
          <el-table-column prop="staffId" label="工号" width="150" />
          <el-table-column prop="deptName" label="部门" width="150" />
          <el-table-column prop="postname" label="职位" width="150" />
          <el-table-column prop="staffPhone" label="手机号" width="150" />
          <el-table-column prop="staffEmail" label="邮箱" width="150" />
          <el-table-column prop="gl" label="工龄" width="150" />
          <el-table-column prop="staffHIREDATE" label="入职日期" width="180" />
          <el-table-column prop="formalquitdate" label="离职日期" width="180" />
          <el-table-column prop="quitexplain" label="离职原因" />
        </el-table>



        <!-- 分页插件 -->
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
              @size-change="pagingHistory(this.input2)"
              @current-change="pagingHistory(this.input2)"
              prev-text="上一页"
              next-text="下一页"
              background
          >
          </el-pagination>
        </div>


      </div>
    </div>

    <!-- 精英干部 -->
    <div v-show="Elite">
      <div style="margin-top:10px;">
        <!--搜索输入框-->
        <el-row style="width:200px;float:right;">
          <el-input v-model.number="input3" placeholder="搜索" @change="pagingElite(this.input3)">
            <template #suffix>
              <el-icon class="el-input__icon"><i-search/></el-icon>
            </template>
          </el-input>
        </el-row>
      </div>
      <br/>
      <div style="margin-top:30px;">
        <el-table :data="tableEliteData" style="width: 100%">
          <el-table-column fixed prop="staffName" label="姓名" width="150" />
          <el-table-column prop="staffId" label="工号" width="150" />
          <el-table-column prop="deptName" label="部门" width="150" />
          <el-table-column prop="postname" label="职位" width="150" />
          <el-table-column prop="staffPhone" label="手机" width="150" />
          <el-table-column prop="staffEmail" label="邮箱" width="150" />
          <el-table-column prop="staffOutlook" label="政治面貌" width="150" />
          <el-table-column prop="staffEducation" label="学历" width="150" />
          <el-table-column  prop="staffHIREDATE" label="入职日期" sortable  width="150"/>
          <el-table-column  prop="staffSchool" label="毕业学校" sortable  width="150"/>

        </el-table>
      </div>

      <!-- 分页插件 -->
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
            @size-change="pagingElite(this.input3)"
            @current-change="pagingElite(this.input3)"
            prev-text="上一页"
            next-text="下一页"
            background
        >
        </el-pagination>
      </div>

    </div>

    <!-- 惩罚员工 -->
    <div v-show="punishment">
      <div style="margin-top:10px;">
        <!--搜索输入框-->
        <el-row style="width:200px;float:right;">
          <el-input v-model.number="input4" placeholder="搜索" @change="pagingpunishment(this.input4)">
            <template #suffix>
              <el-icon class="el-input__icon"><i-search/></el-icon>
            </template>
          </el-input>
        </el-row>
      </div>
      <br/>
      <div style="margin-top:30px;">
        <el-table :data="tablepunishmentData" style="width: 100%">
          <el-table-column fixed prop="staffName" label="姓名" width="150" />
          <el-table-column prop="staffId" label="工号" width="150" />
          <el-table-column prop="deptName" label="部门" width="150" />
          <el-table-column prop="postname" label="职位" width="150" />
          <el-table-column prop="punishtype" label="惩罚类型" width="150" />
          <el-table-column prop="punishunit" label="惩罚单位" width="150" />
          <el-table-column prop="punishcause" label="惩罚原因" width="150" />
          <el-table-column prop="createdtime" label="惩罚时间" width="150" />

          <el-table-column fixed="right" label="操作" width="150">
            <template #default>
              <router-link :to="{path:this.staffedit,query:{path: this.$route.query.path}}">
                <el-button type="text" size="small" @click="handleClick"
                >撤销惩罚 </el-button>
              </router-link>
            </template>
          </el-table-column>
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
            :pager-count="pageInfo.total"
            background
            @size-change="pagingpunishment(this.input4)"
            @current-change="pagingpunishment(this.input4)"
        >
        </el-pagination>
      </div>

    </div>

    <!-- 奖励员工 -->
    <div v-show="reward">
      <div style="margin-top:10px;">
        <!--搜索输入框-->
        <el-row style="width:200px;float:right;">
          <el-input v-model.number="input5" placeholder="搜索" @change="pagingreward(this.input5)">
            <template #suffix>
              <el-icon class="el-input__icon"><i-search/></el-icon>
            </template>
          </el-input>
        </el-row>
      </div>
      <br/>
      <div style="margin-top:30px;">
        <el-table :data="tablerewardData" style="width: 100%">
          <el-table-column fixed prop="staffName" label="姓名" width="150" />
          <el-table-column prop="staffId" label="工号" width="150" />
          <el-table-column prop="deptName" label="部门" width="150" />
          <el-table-column prop="postname" label="职位" width="150" />
          <el-table-column prop="gloryname" label="获奖名称" width="150" />
          <el-table-column prop="gloryunitname" label="颁发单位" width="150" />
          <el-table-column  prop="createdtime" label="获奖日期" sortable  width="150"/>
          <el-table-column prop="gloryremark" label="备注" width="150" />

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
            :pager-count="pageInfo.total"
            background
            @size-change="pagingreward(this.input5)"
            @current-change="pagingreward(this.input5)"
        >
        </el-pagination>
      </div>

    </div>



  </div>
</template>

<script lang="ts">
import {defineComponent,ref} from 'vue'
import {ElMessage} from "element-plus";
export default {
//操作时间

  data() {
    const value2 = ref('')
    return {
      leave:'/employee/message/employee_roster/leave',
      staffedit:'/employee/message/employee_roster/staffedit',
      roster:true,
      history:false,
      Elite:false,
      punishment:false,
      reward:false,

      tableData: [
        {
          staffName: '',
          staffId:"",
          deptName: '',
          postname: '',
          staffPhone: '',
          staffOutlook: '',
          staffHIREDATE: '',
          staffSex:'',
          staffIdentity:'',
          staffstate:'',
        },

      ],
      tableHistoryData: [
        {
          staffName: '',
          staffId:'',
          deptName: '',
          postname: '',
          staffPhone: '',
          staffEmail: '',
          gl:'',
          staffHIREDATE: '',
          formalquitdate:'',
          quitexplain:'',
        },

      ],

      tableEliteData: [
        {
          staffName: '',
          staffId:'',
          deptName: '',
          postname: '',
          staffPhone: '',
          staffEmail: '',
          staffHIREDATE: '',
          staffOutlook:'',
          staffEducation:'',
          staffSchool:'',
        },

      ],

      tablepunishmentData:[
        {
          staffName: '',
          staffId:'',
          deptName: '',
          postname: '',
          punishunit: '',
          punishtype: '',
          punishcause: '',
          createdtime:'',

        },
      ],

      tablerewardData:[
        {
          staffName: '',
          staffId:'',
          deptName: '',
          postname: '',
          createdtime:'',
          gloryname:'',
          gloryremark:'',
          gloryunitname:'',
        },
      ],

      pageInfo: {
        // 分页参数
        currentPage: 1, //当前页
        pagesize: 3, // 页大小
        total: 0, // 总页数

        staffName: '',
        staffId:'',
      },
      input1:null,
      input2:null,
      input3:null,
      input4:null,
      input5:null,
      value2:"",
    }
  },
  created() {
    this.searchstaff(null);
    this.pagingHistory(null);
    this.pagingreward(null);
    this.pagingElite(null);
    this.pagingpunishment(null);
  },
  methods:{
    pagingHistory(like){
      if(Object.prototype.toString.call(like)===Object.prototype.toString.call(null)){
        var _this = this;
        _this.axios.get(
            "http://localhost:8007/provider/staff/history", {
              params:this.pageInfo,
            }).then((response)=>{
          console.log(response);
          _this.tableHistoryData = response.data.data.records
          _this.pageInfo.total=response.data.data.total
        }).catch(function (error){
          console.log('获取表单失败')
          console.log(error)
        })
      }else if (Object.prototype.toString.call(like)===Object.prototype.toString.call(123)){
        this.pageInfo.staffId=like;
        this.axios({
          method:'post',
          url:"http://localhost:8007/provider/staff/history/getId",
          data:this.pageInfo,
          responseType:'json',
          responseEncoding:'utf-8',
        }).then((response)=>{
          console.log(response);
          this.tableHistoryData = response.data.data.records
          this.pageInfo.total=response.data.data.total
        }).catch(function (error){
          console.log('获取表单失败')
          console.log(error)
        })

      }else if (Object.prototype.toString.call(like)===Object.prototype.toString.call("周刘奇")){
        this.pageInfo.staffName=like;
        this.axios({
          method:'post',
          url:"http://localhost:8007/provider/staff/history/likename",
          data:this.pageInfo,
          responseType:'json',
          responseEncoding:'utf-8',
        }).then((response)=>{
          console.log(response);
          this.tableHistoryData = response.data.data.records
          this.pageInfo.total=response.data.data.total
        }).catch(function (error){
          console.log('获取表单失败')
          console.log(error)
        })
      }
    },

    pagingElite(like){
      if(Object.prototype.toString.call(like)===Object.prototype.toString.call(null)){
        var _this = this;
        _this.axios.get(
            "http://localhost:8007/provider/staff/elite", {
              params:this.pageInfo,
            }).then((response)=>{
          console.log(response);
          _this.tableEliteData = response.data.data.records
          _this.pageInfo.total=response.data.data.total
        }).catch(function (error){
          console.log('获取表单失败')
          console.log(error)
        })
      }else if (Object.prototype.toString.call(like)===Object.prototype.toString.call(123)){
        this.pageInfo.staffId=like;
        this.axios({
          method:'post',
          url:"http://localhost:8007/provider/staff/elite/getId",
          data:this.pageInfo,
          responseType:'json',
          responseEncoding:'utf-8',
        }).then((response)=>{
          console.log(response);
          this.tableEliteData = response.data.data.records
          this.pageInfo.total=response.data.data.total
        }).catch(function (error){
          console.log('获取表单失败')
          console.log(error)
        })

      }else if (Object.prototype.toString.call(like)===Object.prototype.toString.call("周刘奇")){
        this.pageInfo.staffName=like;
        this.axios({
          method:'post',
          url:"http://localhost:8007/provider/staff/elite/likename",
          data:this.pageInfo,
          responseType:'json',
          responseEncoding:'utf-8',
        }).then((response)=>{
          console.log(response);
          this.tableEliteData = response.data.data.records
          this.pageInfo.total=response.data.data.total
        }).catch(function (error){
          console.log('获取表单失败')
          console.log(error)
        })
      }
    },

    pagingpunishment(like){
      if(Object.prototype.toString.call(like)===Object.prototype.toString.call(null)){
        var _this = this;
        _this.axios.get(
            "http://localhost:8007/provider/staff/punishment", {
              params:this.pageInfo,
            }).then((response)=>{
          console.log(response);
          _this.tablepunishmentData = response.data.data.records
          _this.pageInfo.total=response.data.data.total
        }).catch(function (error){
          console.log('获取表单失败')
          console.log(error)
        })
      }else if (Object.prototype.toString.call(like)===Object.prototype.toString.call(123)){
        this.pageInfo.staffId=like;
        this.axios({
          method:'post',
          url:"http://localhost:8007/provider/staff/punishment/getId",
          data:this.pageInfo,
          responseType:'json',
          responseEncoding:'utf-8',
        }).then((response)=>{
          console.log(response);
          this.tablepunishmentData = response.data.data.records
          this.pageInfo.total=response.data.data.total
        }).catch(function (error){
          console.log('获取表单失败')
          console.log(error)
        })

      }else if (Object.prototype.toString.call(like)===Object.prototype.toString.call("周刘奇")){
        this.pageInfo.staffName=like;
        this.axios({
          method:'post',
          url:"http://localhost:8007/provider/staff/punishment/likename",
          data:this.pageInfo,
          responseType:'json',
          responseEncoding:'utf-8',
        }).then((response)=>{
          console.log(response);
          this.tablepunishmentData = response.data.data.records
          this.pageInfo.total=response.data.data.total
        }).catch(function (error){
          console.log('获取表单失败')
          console.log(error)
        })
      }
    },

    pagingreward(like){
      if(Object.prototype.toString.call(like)===Object.prototype.toString.call(null)){
        var _this = this;
        _this.axios.get(
            "http://localhost:8007/provider/staff/reward", {
              params:this.pageInfo,
            }).then((response)=>{
          console.log(response);
          _this.tablerewardData = response.data.data.records
          _this.pageInfo.total=response.data.data.total
        }).catch(function (error){
          console.log('获取表单失败')
          console.log(error)
        })
      }else if (Object.prototype.toString.call(like)===Object.prototype.toString.call(123)){
        this.pageInfo.staffId=like;
        this.axios({
          method:'post',
          url:"http://localhost:8007/provider/staff/reward/getId",
          data:this.pageInfo,
          responseType:'json',
          responseEncoding:'utf-8',
        }).then((response)=>{
          console.log(response);
          this.tablerewardData = response.data.data.records
          this.pageInfo.total=response.data.data.total
        }).catch(function (error){
          console.log('获取表单失败')
          console.log(error)
        })

      }else if (Object.prototype.toString.call(like)===Object.prototype.toString.call("周刘奇")){
        this.pageInfo.staffName=like;
        this.axios({
          method:'post',
          url:"http://localhost:8007/provider/staff/reward/likename",
          data:this.pageInfo,
          responseType:'json',
          responseEncoding:'utf-8',
        }).then((response)=>{
          console.log(response);
          this.tablerewardData  = response.data.data.records
          this.pageInfo.total=response.data.data.total
        }).catch(function (error){
          console.log('获取表单失败')
          console.log(error)
        })
      }

    },

    searchstaff(like){
      if(Object.prototype.toString.call(like)===Object.prototype.toString.call(null)){
        var _this = this;
        _this.axios.get(
            "http://localhost:8007/provider/staff", {
              params:this.pageInfo,
            }).then((response)=>{
          console.log(response);
          _this.tableData = response.data.data.records
          _this.pageInfo.total=response.data.data.total
        }).catch(function (error){
          console.log('获取表单失败')
          console.log(error)
        })
      }else if (Object.prototype.toString.call(like)===Object.prototype.toString.call(123)){
        this.pageInfo.staffId=like;
        this.axios({
          method:'post',
          url:"http://localhost:8007/provider/staff/getId",
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

      }else if (Object.prototype.toString.call(like)===Object.prototype.toString.call("周刘奇")){
        this.pageInfo.staffName=like;
        this.axios({
          method:'post',
          url:"http://localhost:8007/provider/staff/likename",
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

    staffroster(){
      this.roster=true;
      this.history=false;
      this.Elite=false;
      this.punishment=false;
      this.reward=false;

      this.searchstaff(null);
    },
    staffhistory(){
      this.roster=false;
      this.history=true;
      this.Elite=false;
      this.punishment=false;
      this.reward=false;

      this.pagingHistory(null);
    },
    staffElite(){
      this.roster=false;
      this.history=false;
      this.Elite=true;
      this.punishment=false;
      this.reward=false;

      this.pagingElite(null);
    },
    staffpunishment(){
      this.roster=false;
      this.history=false;
      this.Elite=false;
      this.punishment=true;
      this.reward=false;

      this.pagingpunishment(null);
    },
    staffreward(){
      this.roster=false;
      this.history=false;
      this.Elite=false;
      this.punishment=false;
      this.reward=true;

      this.pagingreward(null);
    },
  }
}
</script>

<style scoped>
@import url("../../css/navigation.css");
/deep/.cell {
  padding-left: 10px;
  text-align: center;
  color: black;
}
/deep/.el-card__body {
  /* padding: var(--el-card-padding); */
  padding: 10px 0;
}
/deep/.icon-p p{
  text-align: center;
}
/* 分页的样式 */
/deep/.demo-pagination-block {
  float: right;
  margin: 20px;
}

/deep/.el-table .el-table__cell{
  text-align: center;
}
</style>